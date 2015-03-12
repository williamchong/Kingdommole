var cls = require('./lib/class');
var fs = require('fs');
var file = require('../../shared/js/file');
var Utils = require('./utils');
var _ = require('underscore');
var socketioclient = require('socket.io-client');

var Quiz = cls.Class.extend({
	init: function(){
        var self = this;
        this.isLoaded = false;
        var mcFilePath = 'tools/quiz/MultipleChoice.json';
        var lqFilePath = 'tools/quiz/LongQuestion.json'
        // read mc
        file.exists(mcFilePath, function (exists) {
            if (!exists) {
                log.error(mcFilePath + ' doesn\'t exist.');
                return;
            }
            fs.readFile(mcFilePath, function (err, file) {
                var json = JSON.parse(file.toString());
                self.initMultipleChoiceQuestionBank(json);
            });
        });
        // read lq
        file.exists(lqFilePath, function (exists) {
            if (!exists) {
                log.error(lqFilePath + ' doesn\'t exist.');
                return;
            }
            fs.readFile(lqFilePath, function (err, file) {
                var json = JSON.parse(file.toString());
                self.initLongQuestionBank(json);
            });
        });
        // read tutorial
        self.initTutorialQuestionBank();
        // create a wait list for  docker response
        this.waitList = {};
        // connect to docker server
        this.judge = socketioclient.connect('localhost:40200');
        // registor
        this.judge.on('result', function (result) 
        {
            // check player
            var record = self.waitList[result.user];
            var player = record.player;
            player.handleLongQuestionResult(result,record);
        });

	},
	initMultipleChoiceQuestionBank: function(questionBank){
        this.mcSections = questionBank.sections;
        // put the json in memory may hurt the performance....
	},
    initLongQuestionBank: function(questionBank){
        this.lqSections = questionBank.sections;
        // put the json in memory may hurt the performance....
    },
    getMultipleChoice: function(sid){
        //shuffle
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
        var ret = {};
        ret.sid = sid;
        ret.qid = Utils.random(this.mcSections[sid].questions.length);
        var q = this.mcSections[sid].questions[ret.qid];
        ret.stem = q.stem;
        shuffle(q.languages);
        shuffle(q.keys);
        shuffle(q.distractors);
        ret.languages = q.languages[0]
        ret.options = [q.keys[0]];
        for (var i = 0; i < 3; ++i){
            ret.options.push(q.distractors[i]);
        }
        shuffle(ret.options);
        return ret;
    },
    // section id an question id
    checkMultipleChoice: function(sid, qid, choice){
        // var ret = (this.mcSections[sid].questions[qid].key == choice);
        var q = this.mcSections[sid].questions[qid];
        var ret = false;
        for (var i = 0; i < q.keys.length; ++i){
            if (choice == q.keys[i]){
                ret = true;
                break;
            }
        }
        log.info('CHECKMC: ' + choice + ' ' + ret + ' ' + JSON.stringify(q) );
        return ret;
    },
    getLongQuestion: function(player, mob){
        var mid = mob.id;
        if(mob.lq >= 0){
            var type = 'question'
            var sid = mob.lq;
            var qid = Utils.random(this.lqSections[sid].questions.length);
            var q = this.lqSections[sid].questions[qid];
        } else if (mob.tut >=0 ){
            var type = 'tutorial'
            var sid = mob.tut;
            var lang = mob.lang
            var q = this.tutSections[lang][sid];
            q.languages = [lang];
        }
        var record = {
            'type' : type,
            'player' : player,
            'mob' : mob,
            'question' : q
        }
        log.info('GLQ: ' + player.name + '(' +player.x+ ','+player.y+ ') ' +  JSON.stringify(record.question) );
        this.waitList[player.name] = record;
        return q;
    },
    // we need player object
    checkLongQuestion: function(playerName, code, language){
        //add tutorial
        log.info('LQS: ' + playerName +' '+ language);
        console.log(code);
        var record = this.waitList[playerName];
        if (record.type == 'tutorial'){
            var q = record.question;
            if(q.insert){
                code = q.insert(code)
            }
            stdin="";
            if(q.stdin){
                stdin = q.stdin;
            }
            var submission = {
                'user' : playerName,
                'code' : code,
                'stdin' : stdin,
                'language' : 1,
            };  
            this.judge.emit('sandbox', submission);
        } else {
            var submission = {
                'user' : playerName,
                'problem' : record.question.name,
                'code' : code,
                'language' : 0,
            };    
            this.judge.emit('submission', submission);
        }
        
    },
    initTutorialQuestionBank: function(){
        // hardcode is good, unless the question bank grow quickly
        this.tutSections = {
            python:[
                {
                    name: "Hello Python!",
                    description: "Please print 'I am ready!'",
                    sample: 
                        "# It is a comment\n" + 
                        "# Everything after '#' will not be executed\n" + 
                        "print \"Hello Python!\"",
                    checker: function(stdout, stderr){
                        if ((stdout.match(/\n/g) || []).length >= 2){
                            return "'print' will append a newline character for you, you don't need to print a new line";
                        }else if(stdout == "I am ready!\n"){
                            return true;
                        }else {
                            return "Did you print something else?"
                        }
                    }
                },
                {
                    name: "Strong Typing",
                    description: "Convert a and b to string, concatenate them and assign to variable s!",
                    sample:
                        "# You can use str(x) to change variable x to string\n" +
                        "# Integer cannot concatenate to string\n" +
                        "# Only string can concatenate to string\n" +
                        "a = 3\n" +
                        "b = 4\n" +
                        "s = None" +
                        "# s is a varaible contain nothing" +
                        "s = a + b\n",
                    insert: function(code){
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code +
                            "\nif(not s):\n\tsys.stderr.write('UNDEF')\n" +
                            "elif(s == 7):\n\tsys.stderr.write('SEVEN')\n" +
                            "elif(s == '7'):\n\tsys.stderr.write('ORDER')\n" +
                            "elif(s == 34):\n\tsys.stderr.write('TYPE')\n" +
                            "elif(s == 'ab' or s == 'ba'):\n\tsys.stderr.write('STRING')\n" +
                            "elif(s == '34'):\n\tsys.stderr.write('GOOD')\n" +
                            "else:\n\tsys.stderr.write('UNKNOWN')\n";
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if ((stderr.match(/GOOD/g) || []).length >= 1){
                            return true;
                        }else if((stderr.match(/UNDEF/g) || []).length >= 1){
                            return "Assign the concatenated string to variable s";
                        }else if((stderr.match(/SEVEN/g) || []).length >= 1){
                            return "You need to convert a and b to string,\n" + 
                            "before using '+' to concatenate strings";
                        }else if((stderr.match(/ORDER/g) || []).length >= 1){
                            return "You need to convert a and b to string,\n" + 
                            "before using '+' to concatenate strings";
                        }else if((stderr.match(/TYPE/g) || []).length >= 1){
                            return "Using string concatenate instead of assign 34 to s";
                        }else if((stderr.match(/STRING/g) || []).length >= 1){
                            return "You should concatenate variable a and b\n" +
                                "Not string 'a' and 'b'";
                        }else {
                            return "'+' means add for integers and means concatenate for strings";
                        }
                    }
                },
                {
                    name: "Dynamic Typing",
                    description: 
                        "Assign a string to variable word\n" +
                        "Assign an integer to variable number\n",
                    sample: 
                        "# Python is strongly typed,\n"+
                        "# but the variables is not bind with a specific data type\n" +
                        "x = 1 # x is an integer now\n" +
                        "x = 'asdf' # It is OK to assign a string to x\n" +
                        "word = 1234\n" +
                        "number = 'hi'\n",
                    insert: function(code){
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code + "\n" +
                            "if(not(word) or not(number)):\n" +
                            "\tsys.stderr.write('DEF')\n" +
                            "elif(not (type(word) is str)):\n" + 
                            "\tsys.stderr.write('STR')\n" +
                            "elif((type(number) is str) and (number.isdigit())):\n" +
                            "\tsys.stderr.write('DIGIT')\n" +
                            "elif(not (type(number) is int)):\n" +
                            "\tsys.stderr.write('INT')\n" +
                            "elif((type(word) is str) and (type(number) is int)):\n" +
                            "\tsys.stderr.write('GOOD')\n" +
                            "else:\n" + 
                            "\tsys.stderr.write('DEF')\n";
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if ((stderr.match(/GOOD/g) || []).length >= 1){
                            return true;
                        }else if((stderr.match(/INT/g) || []).length >= 1){
                            return "Assign an integer to variable number" ;
                        }else if((stderr.match(/DIGIT/g) || []).length >= 1){
                            return "Variable number is an String of integer, \nbut not an integer" ;
                        }else if((stderr.match(/STR/g) || []).length >= 1){
                            return "Assign a string to variable word"
                        }else {
                            return "Python is Dynamically Typed, you don't need to know the variable type when assigning value!";
                        }
                    }
                },
                {
                    name: "List",
                    description: 
                        "Set the third element of fruits to 'lemon'",
                    sample:
                        "# List in python is similar to array in C\n" +
                        "# len() function return the length of list\n" +
                        "fruits = ['apple', 'orange', None, 'banana']\n" +
                        "# len(fruits) == 4\n",
                    insert: function(code) {
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code + "\n" +
                            "if(not(fruits) or not(type(fruits) is list) or (len(fruits) < 3)):\n\tsys.stderr.write('UNDEF')\n" +
                            "elif(fruits[2] == 'lemon'):\n\tsys.stderr.write('OK')\n" +
                            "elif(fruits[3] == 'lemon'):\n\tsys.stderr.write('INDEX')\n" +
                            "elif(not(fruits[2])):\n\tsys.stderr.write('WRONG')\n" +
                            "elif(fruits[2] != 'lemon'):\n\tsys.stderr.write('SPELL')\n" +
                            "else:\n\tsys.stderr.write('UNKNOWN')\n";
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if ((stderr.match(/OK/g) || []).length >= 1){
                            return true;
                        }else if((stderr.match(/UNDEF/g) || []).length >= 1){
                            return "Set the third element of fruits to 'lemon";
                        }else if((stderr.match(/INDEX/g) || []).length >= 1){
                            return "List is zero-based, the third element should be fruits[2]"
                        }else if((stderr.match(/WRONG/g) || []).length >= 1){
                            return "Set the third element of fruits to 'lemon'"
                        }else if((stderr.match(/SPELL/g) || []).length >= 1){
                            return "Did you print something else?";
                        }else {
                            return "Python is Dynamically Typed, assign the value to variable is OK";
                        }
                    }
                },
                {
                    name: "Format String",
                    description:
                        "Print 4 * 3 = 12 using formating string",
                    sample:
                        "a = 4\n" + 
                        "b = 3\n" +
                        "# It is same as printf(\"%d + %d = %d\", a, b, a+b); in C\n" +
                        "print \"%d + %d = %d\" % (a,b,a+b)\n",
                    checker: function(stdout, stderr){
                        if(stdout === "4 * 3 = 12\n"){
                            return true;
                        } else if(stdout === "4 + 3 = 12\n"){
                            return "You printed '4 + 3 = 12'!"
                        } else {
                            return "Print 4 * 3 = 12 using formating string";
                        }
                    }
                },
                {
                    name: "Function",
                    description:
                        "Fix the bug by adding proper indentation and print 'Hello!'",
                    sample:
                        "# A function name 'greeting' is defined\n" +
                        "def greeting():\n"+
                        "# Python use indentation instead of blanket to define a block\n" +
                        "# Add a tab to the line below to make the code belong to the function\n" +
                        "print 'Hello!'\n",
                    insert: function(code) {
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code + "\n" +
                            "if (not greeting):\n" +
                            "\tsys.stderr.write('UNDEF')\n" +
                            "else:\n" +
                            "\tgreeting();\n"
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if (stderr === 'UNDEF') {
                            return "Add a tab character at the begining of line 5";
                        } else {
                            if (stdout === 'Hello!\n'){
                                return true
                            } else {
                                return "Did you print something else?";
                            }
                        }

                    },
                },
                {
                    name: "If Then Else If",
                    description:
                        "Write a function check() which take an integer.\n" +
                        "If it is positive, then print 'Positive'\n" +
                        "If it is negative, then print 'Be positive'\n" +
                        "If it is zero, then print 'Zero'\n" + 
                        "You do not need to call the function",
                    sample:
                        "# Parameter explaination, i don't know how to express\n" +
                        "def check(number):\n"+
                        "\tif(number > 0):\n"+
                        "\t\n" + 
                        "\telif(number < 0):\n" +
                        "\t\n" + 
                        "\telse:\n" +
                        "\t\n" ,
                    insert: function(code) {
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code + "\n" +
                            "if (not check):\n" +
                            "\tsys.stderr.write('UNDEF')\n" +
                            "else:\n" +
                            "\tcheck(100)\n" +
                            "\tcheck(-100)\n" +
                            "\tcheck(0)\n" 
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if (stderr === 'UNDEF') {
                            return "Add a tab character at the begining of line 5";
                        } else {
                            res = stdout.split("\n");
                            if (res[0] !== 'Positive'){
                                return 'Print "Positive" if the input number is larger than zero.';
                            } else if (res[1] !== 'Be positive'){
                                return 'Print "Be positive" if the input number is smaller than zero.';
                            } else if (res[2] !== 'Zero'){
                                return 'Print "Zero" if the input number is zero.';
                            } else {
                                return true;
                            }
                        }
                    }
                },
                {
                    name: "For Loop",
                    description:
                        "Using for-loop to iterate the array friends,\n" +
                        "and print 'Hi, {your friends name}!'\n",
                    sample:
                        "friends = ['Alice', 'Bob', 'Chris', 'David','Eva']\n" +
                        "\n" +
                        "# i will change from 0 to 4\n" +
                        "# for i in range(len(friends)):\n" +
                        "\n" +
                        "# name will change from 'Alice' to 'Eva'\n" +
                        "# for name in friends:\n" +
                        "\n" +
                        "name = None\n" +
                        "print 'Hi, %s!' % name\n",
                    insert: function(code) {
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code + "\n" +
                            "if (not friends or len(friends) != 5):\n" +
                            "\tsys.stderr.write('UNDEF');"
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if (stderr === 'UNDEF') {
                            return "You should not modify the array 'friends'";
                        } else {
                            if (stdout === "Hi, Alice!\nHi, Bob!\nHi, Chris!\nHi, David!\nHi, Eva!\n") {
                                return true;
                            } else {
                                return "Wrong Answer. Try again."
                            }
                        }
                    }
                },
                {
                    name: "While Loop",
                    description:
                        "Write a function countdown which take one parameter num using.\n" + 
                        "The function countdown from num to 1 and print 'Bang!'\n",
                    sample:
                        "def countdown(num):\n" +
                        "\twhile():\n" +
                        "\t\tprint num\n" +
                        "\tprint 'Bang!'\n",
                    insert: function(code) {
                        var newCode;
                        newCode = 
                            "import sys\n" + 
                            code + "\n" +
                            "if (not countdown):\n" +
                            "\tsys.stderr.write('UNDEF');\n" +
                            "else:\n" +
                            "\tcountdown(10)"
                        return newCode;
                    },
                    checker: function(stdout, stderr){
                        if (stderr === 'UNDEF') {
                            return "Do you forget to define the function 'countdown'?";
                        } else {
                            if(stdout === "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nBang!\n"){
                                return true;
                            } else {
                                return "Wrong Answer! Try Again!";
                            }
                        }
                    }
                }
            ]
        }
    }
});
module.exports = Quiz;
