function test(str){
    console.log('I choose '+str);
}

define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
            {
                "text": [
                    "It is dangerous to go alone...",
                    "Stay safe!!!"
                ]
            },
            {
                //Tutorial
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (126 <= x && x <= 128 && 284 <= y && y <= 286);
                },
                "text": [
                   "Welcome to Kingdommole! When you see a npc, ...",
                   "Touch to talk with them!...",
                   "Touch them multiple times to listen to all they have to say!"
                ]
            },
            {
                //Tutorial
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (126 <= x && x <= 128 && 291 <= y && y <= 293);
                },
                "text": [
                    "Hi there, adventurer!...",
                    "Let me tell you how to fight!...",
                    "There are two types of monsters...",
                    "You need to answer Multiple Choice question to defeat the first type,...",
                    "and code a correct program to defeat the second ones....",
                    "Time to practise! Try to defeat the rats over there!..."
                ]
            },
            {
                //python road
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (45 <= x && x <= 47 && 236 <= y && y <= 238);
                },
                "text": [
                    "Python area is up ahead!"
                ]
            },
            {
                //beach entry
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (46 <= x && x <= 48 && 253 <= y && y <= 255);
                },
                "text": [
                    "Hi there, adventurer!...",
                    "The beach became dangerous after giant crabs appeared....",
                    "The only way to defeat them is using C language!"
                ]
            },
            {
                //beach shortcut
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (78 <= x && x <= 80 && 249 <= y && y <= 251);
                },
                "text": [
                    "It is a shortcut to the beach....",
                    "I am here to prevent the giant crabs invading our village!"
                ]
            },            
            
            
            {
                //beach function tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (71 <= x && x <= 73 && 268 <= y && y <= 270);
                },
                "text": [
                    "Put the codes you frequently use in a function!...",
                    "Your code will be easier to read....",
                    "It will also be simpler when debugging!"
                ]
            },            
            {
                //village globlins
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (66 <= x && x <= 74 && 196 <= y && y <= 204);
                },
                "text": [
                    "Goblins are coming!!!...",
                    "We must protect our village!!!"
                ]
            }
        ],

        "king": [
            "Hi, I'm the King...",
            "I run this place...",
            "Like a boss...",
            "I talk to people...",
            "Like a boss...",
            "I wear a crown...",
            "Like a boss...",
            "I do nothing all day...",
            "Like a boss...",
            "Now leave me alone...",
            "Like a boss"
        ],

        "villagegirl": [
            {
                "text":[
                    "Hi there, adventurer!...",
                    "How do you like this game?...",
                    "It's all happening in a single web page! Isn't it crazy?...",
                    "It's all made possible thanks to WebSockets....",
                ]
            },
            //outside spawn
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (32 <= x && x <= 34 && 249 <= y && y <= 251);
                },
                "text": [
                    "There are many hidden quests throughout the village!...",
                    "Go and try them all!"
                ]
            },
            //village rat quest
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (14 <= x && x <= 16 && 221 <= y && y <= 223);
                },
                "text": [
                    "There are so many mice!...",
                    "Can you help me to get rid of them?...",
                    "I will reward you! "
                ]
            },
            {
                //beach camp
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (18 <= x && x <= 20 && 260 <= y && y <= 262);
                },
                "text": [
                    "Do you know the difference between ...",
                    "if(1) printf(\"hi\");...",
                    "and ...",
                    "if(1); printf(\"hi\"); ?"
                ]
            },
            
            
        ],

        "villager": [
            {
                "text":[
                    "Howdy stranger. Do you like poetry?...",
                    "Roses are red, violets are blue...",
                    "I like hunting rats, and so do you...",
                    "The rats are dead, now what to do?...",
                    "To be honest, I have no clue....",
                    "Maybe the forest, could interest you...",
                    "or instead, cook a rat stew."
                ]
            },
            // tutorial
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (130 <= x && x <= 132 && 295 <= y && y <= 2947);
                },
                "text": [
                    "If the programming task is too difficult,...",
                    "You can click 'ESCAPE!' or ESC,...",
                    "and RUN AWAY!"
                ]
            },
            // tutorial
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (123 <= x && x <= 125 && 295 <= y && y <= 297);
                },
                "text": [
                    "You can use your keyboard to answer Multiple Choice questions!...",
                    "'1' is the option on top left,...",
                    "'2' is the option on top right,...",
                    "'3' is the option on bottom left,...",
                    "'4' is the option on bottom right."
                ]
            },
            //outside spawn
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (38 <= x && x <= 40 && 249 <= y && y <= 251);
                },
                "text": [
                    "Welcome to our village!...",
                    "Up in the northern forest is the Python area...",
                    "Down to the southern beach is the territory of C crabs"
                ]
            },
            //village hidden chest
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (37 <= x && x <= 39 && 224 <= y && y <= 226);
                },
                "text": [
                    "Go straight up for python area...",
                    "Also I heard there is a hidden chest in our village....",
                    "Don't know where it is though."
                ]
            },
            {
                //beach camp
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (19 <= x && x <= 21 && 262 <= y && y <= 264);
                },
                "text": [
                    "Besides if-then-else, you can use switch....",
                    "Besides for-loops, you can use while-loops....",
                    "If you want to defeat the giant crab,...",
                    "You better master these programming features."
                ]
            }
        ],
        "agent": [
            {
                "text":[
                    "I like going shortcuts...",
                    "Saves much time...",
                    "Yet they are also more dangerous...",
                    "Are you strong enough for the challange?"
                ]
            },
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (66 <= x && x <= 68 && 219 <= y && y <= 221);
                },
                "text": [
                    "Do you know how to use if-then-else in C?...",
                    "If you don't know, you can't defeat the goblins!"
                ]
            }
        ],

        "rick": [
            "We're no strangers to love...",
            "You know the rules and so do I...",
            "A full commitment's what I'm thinking of...",
            "You wouldn't get this from any other guy...",
            "I just wanna tell you how I'm feeling...",
            "Gotta make you understand...",
            "Never gonna give you up...",
            "Never gonna let you down...",
            "Never gonna run around and desert you...",
            "Never gonna make you cry...",
            "Never gonna say goodbye...",
            "Never gonna tell a lie and hurt you"
        ],

        "scientist": [
            {"text": [//default
				"Greetings....",
				"I am the inventor of these two potions....",
				"The red one will replenish your health points......",
				"The orange one will turn you into a firefox and make you invincible......",
				"But it only lasts for a short while....",
				"So make good use of it!...",
				"Now if you'll excuse me, I need to get back to my experiments..."
			]},
			{
                "condition": function(game){
                    console.log(game.player.nextGridX+' '+game.player.nextGridY);
                    console.log(game.player);return (game.player.invincible);
                },
                "text": [
				    "Did you not listen to what I said?!!...",
				    "the famous fire-potion only lasts a few seconds...",
				    "You shouldn't be wasting them talking to me…"
			    ]
            },
			{"condition": function(game){return ((game.player.getSpriteName() == "firefox")
											&& !(game.player.invincible));},
			 "text": [
				"Ha ha ha, *name*...",
				"All that glitters is not gold…...",
				"-sigh-...",
				"Did you really think you could abuse me with your disguise?...",
				"I conceived that f…, that potion....",
				"Better not use your outfit as a deterrent,...",
				"The goons you'll meet will attack you whatever you look like."
			]}
			
		],

        "nyan": [
            "nyan nyan nyan nyan nyan...",
            "nyan nyan nyan nyan nyan nyan nyan...",
            "nyan nyan nyan nyan nyan nyan...",
            "nyan nyan nyan nyan nyan nyan nyan nyan"
        ],

        "forestnpc": [
            "lorem ipsum dolor sit amet...",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "lavanpc": [
            "lorem ipsum dolor sit amet...",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "priest": [
            {
                "text":[
                    "Oh, hello, young man....",
                    "Wisdom is everything, so I'll share a few guidelines with you....",
                    "You are free to go wherever you like in this world...",
                    "but beware of the many foes that await you....",
                    "You can find many weapons and armors by killing enemies....",
                    "The tougher the enemy, the higher the potential rewards....",
                    "You can also unlock achievements by exploring and hunting....",
                    "Click on the small cup icon to see a list of all the achievements....",
                    "Please stay a while and enjoy the many surprises of KingdomMole...",
                    "Farewell, young friend."
                ]
            },
            //python entry
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (46 <= x && x <= 48 && 183 <= y && y <= 186);
                },
                "text": [
                    "Welcome to the Python Area...",
                    "If you are not familiar with python,...",
                    "Go straight up and learn all the basics!...",
                    "For expert, go left to test your skills!"
                ]
            },
            //python 0
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (40 <= x && x <= 42 && 176 <= y && y <= 178);
                },
                "text": [
                    "This is Python lesson 1!...",
                    "To print a string, just type <font face=Courier>print \"Hello\"</font>",
                    "Also you dont need to declare datatype for variable... ",
                    "Don't use reserved words as name though!"
                ]
            },
            //python 1
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (21 <= x && x <= 23 && 175 <= y && y <= 177);
                },
                "text": [
                    "This is Python lesson 2!...",
                    "Assigning variable is easy since datatype is auto detected!...",
                    "However sometimes you need to convert them manually for desired operations",
                    "By the way, did you notice print automatically adds a new line?"
                ]
            },
            //python 2
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (15 <= x && x <= 17 && 163 <= y && y <= 165);
                },
                "text": [
                    "This is Python lesson 3!...",
                    "Common datatypes in python includes int,float,str,bool,etc",
                    "Note that while some datatypes can be automatically casted...",
                    "Incompatible datatypes will cause error!..."
                ]
            },
            //python 3
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (34 <= x && x <= 36 && 162 <= y && y <= 164);
                },
                "text": [
                    "This is Python lesson 4!...",
                    "To build a list in python, just type <font face=Courier>a = [1,2,3,4] </font>...",
                    "Acessing its element, <font face=Courier>e1 = a[0]</font>, which is just like C...",
                    "Also, did you notice opeartion with a float with cast int into float? "
                ]
            },
            //python 4
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (63 <= x && x <= 65 && 175 <= y && y <= 177);
                },
                 "text": [
                    "This is Python lesson 5!...",
                    "When using print, you can also use formatting stiring...",
                    "like %d, %s, etc as in C!"   
                ]
            },
            //python 5
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (70 <= x && x <= 72 && 163 <= y && y <= 165);
                },
                "text": [
                    "This is Python lesson 6!...",
                    "Instead of brackets, python use indentation to indicate code blocks!...",
                    "Be sure to style your code properly for it to work!"   
                ]
            },
            //python 6
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (59 <= x && x <= 61 && 152 <= y && y <= 154);
                },
                 "text": [
                    "This is Python lesson 7!...",
                    "It is a good pratise to divide your program into functions...",
                    "To define functions in python...",
                    "Just type <font face=Courier>def foo()</font>"   
                ]
            },
            //python 7
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (49 <= x && x <= 51 && 147 <= y && y <= 149);
                },
                "text": [
                    "This is Python lesson 8!...",
                    "Loops are useful for doing repetitive things...",
                    "To write a for in python...",
                    "Just type <font face=Courier>for i in range(4)</font>...",
                    "Remember the indentation matters!"   
                ]
            },
            //python 8
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (39 <= x && x <= 41 && 150<= y && y <= 152);
                },
                "text": [
                    "This is Python lesson 8!...",
                    "Another useful loop is while() loop,...",
                    "which does not stop until the condition inside () is not true...",
                    "Just type <font face=Courier>while(condition)</font> and try...",
                    "Remember the indentation matters!"   
                ]
            },
            //python end
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (23 <= x && x <= 25 && 151<= y && y <= 153);
                },
                "text": [
                    "You have finished all python tutorial!...",
                    "Congrauations!"
                ]
            },
            //village rat quest
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (124 <= x && x <= 126 && 292 <= y && y <= 295);
                },
                "text": [
                    "I am sure you can learn something about programming here....",
                    "Questions in orange bubbles are based on C,...",
                    "Questions in blue bubbles are based on Python."
                ]
            },
            {
                //beach data type tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (42 <= x && x <= 44 && 272 <= y && y <= 274);
                },
                "text": [
                    "There are so many data types in C,...",
                    "such as char, long, int, float and double"
                ]
            },
            {
                //beach data variable tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (52 <= x && x <= 54 && 280 <= y && y <= 282);
                },
                "text": [
                    "Every variable in C should start with letters....",
                    "The variable names can contains letters, digits and underscore."
                ]
            },
            {
                //beach mathematics tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (22 <= x && x <= 24 && 279 <= y && y <= 281);
                },
                "text": [
                    "There are mathematics operators in C....",
                    "You must be familiar with '+-*/%'....",
                    "How about '++','--','-=','+=','*=' and '/='?"
                ]
            },
            {
                //beach loops
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (24 <= x && x <= 28 && 295 <= y && y <= 298);
                },
                "text": [
                    "The crabs in the front are strong....",
                    "You have to understand if-then-else and loops to beat them."
                ]
            },
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (61 <= x && x <= 63 && 271 <= y && y <= 273);
                },
                "text": [
                    "Try to use conditional statements to defeat the crabs next to me!"
                ]
            },
            {
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (64 <= x && x <= 66 && 279 <= y && y <= 281);
                },
                "text": [
                    "Try to use iterations to defeat the crabs next to me!"
                ]
            }
        ],

        "sorcerer": [
            {
                "text": [
                    "Ah... I had foreseen you would come to see me....",
                    "Well? How do you like my new staff?...",
                    "Pretty cool, eh?...",
                    "Where did I get it, you ask?...",
                    "I understand. It's easy to get envious....",
                    "I actually crafted it myself, using my mad wizard skills....",
                    "But let me tell you one thing......",
                    "There are lots of items in this game....",
                    "Some more powerful than others....",
                    "In order to find them, exploration is key....",
                    "Good luck."
                ]
            },
            {
                //village sword quest
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (14 <= x && x <= 16 && 249 <= y && y <= 251);
                },
                "text": [
                    "Want a better sword?...",
                    "Only true warriors can use my sword!...",
                    "Kill the sketetons and show me what you are!"
                ]
            },
            {
                //ESTR cave
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (81 <= x && x <= 83 && 212 <= y && y <= 214);
                },
                "text": [
                    "Our King puts the legendary armors in this cave....",
                    "I summon sketetons to protect it....",
                    "Only legendary warrior can get the armor."
                ]
            },
            {
                //beach portal
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (70 <= x && x <= 73 && 265 <= y && y <= 268);
                },
                "text": [
                    "The big crab is really too strong!...",
                    "No one will make fun of you if you escape....",
                    "Step on the tile next to me,...",
                    "and I will send you back to the village"
                ]
            }
        ],

        "octocat": [
            {
                "text": [
                    "WARNING: A boss is nearby! Be careful!"
                   ]
            }
        ],

        "coder": [
            {
                "text": [
                    "Hi! Do you know that you can also play KingdomMole on your tablet or mobile?...",
                    "That's the beauty of HTML5!...",
                    "Give it a try..."
                ]
            },
            {
                //tutorial
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (128 <= x && x <= 130 && 292 <= y && y <= 294);
                },
                "text": [
                    "To finish the programming task,...",
                    "You should read the task description first....",
                    "Understand the task better by reading the input and output sample....",
                    "We have prepared a classic Hello World program in C....",
                    "Press 'Submit' to kill the rat!"
                ]
            },   
            {
                //beach variable tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (49 <= x && x <= 51 && 281 <= y && y <= 283);
                },
                "text": [
                    "Do you know what is a <a href=\"http://en.wikipedia.org/wiki/Reserved_word\" target=\"_blank\">reserved word</a>?"
                ]
            },
            {
                //beach secret path tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (47 <= x && x <= 49 && 253 <= y && y <= 255);
                },
                "text": [
                    "% and \\ are special characters in formating string....",
                    "We need to use some way to <a href=\"http://en.wikipedia.org/wiki/Escape_character\" target=\"_blank\">ESCAPE</a> them....",
                    "Do you know how to print them out using printf()?"
                ]
            },
            {
                //beach library tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (50 <= x && x <= 52 && 257 <= y && y <= 259);
                },
                "text": [
                    "There are lots of libraries in C!...",
                    "It is impossible for us to memorize every functions....",
                    "Therefore, we need to read <a href=\"https://www-s.acm.illinois.edu/webmonkeys/book/c_guide/\" target=\"_blank\">documentations</a>."
                ]
            },
            
            
            {
                //beach bitwise operators tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (64 <= x && x <= 67 && 294 <= y && y <= 297);
                },
                "text": [
                    "Do you know &, |, ~, ^, >> and << are valid operators in C?...",
                    "They are bitwise operators....",
                    "Google 'C language bitwise operators' to learn more about it!"
                ]
            },
            {
                //beach big crab tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (67 <= x && x <= 69 && 269 <= y && y <= 272);
                },
                "text": [
                    "Array can make you day easier....",
                    "Try to learn it by yourself! <a href=\"http://www.tutorialspoint.com/cprogramming/c_arrays.html\" target=\"_blank\">link</a>...",
                    "The best way to defeat the big crab is using 2 dimensional array."
                ]
            },
        ],

        "beachnpc": [
            {
                "text": [
                    "Don't mind me, I'm just here on vacation....",
                    "I have to say......",
                    "These giant crabs are somewhat annoying....",
                    "Could you please get rid of them for me?...",
                    "I will give you a burger."
                ]
            },
            {
                //crab tips
                "condition": function(game){
                    var x = game.player.nextGridX;
                    var y = game.player.nextGridY;
                    return (57 <= x && x <= 59 && 253 <= y && y <= 255);
                },
                "text": [
                    "There is a big crab ruling the beach....",
                    "It even has a private swimming pool!...",
                    "I am jealous of it..."
                ]
            },
        ],

        "desertnpc": [
            "One does not simply walk into these mountains......",
            "An ancient undead lord is said to dwell here....",
            "Nobody knows exactly what he looks like......",
            "...for none has lived to tell the tale....",
            "It's not too late to turn around and go home, kid."
        ],

        "othernpc": [
            "lorem ipsum...",
            "lorem ipsum"
        ]
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            if(typeof NpcTalk[this.itemKind][0] === 'string'){
				this.discourse = -1;
				this.talkCount = NpcTalk[this.itemKind].length;
			}
			else{
				this.discourse = 0;
				this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
			}
            this.talkIndex = 0;
        },
        
        selectTalk: function(game){
			var change = false;
			if(this.discourse != -1){
				var found = false;
				for(var i = 1; !found && i<NpcTalk[this.itemKind].length; i++){
					if(NpcTalk[this.itemKind][i]["condition"](game)){
						if(this.discourse != i){
							change = true;
							this.discourse = i;
							this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
						}
						found = true;
					}
				}
				if(!found){
					if(this.discourse != 0){
						change = true;
						this.discourse = 0;
						this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
					}
				}
			}
			return change;
		},

        talk: function(game) {
            var msg = "";

            if(this.selectTalk(game) || (this.talkIndex > this.talkCount) ){
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
				if(this.discourse == -1){
					msg = NpcTalk[this.itemKind][this.talkIndex];
				}
				else{
					msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
				}
            }
            this.talkIndex += 1;

            return msg.replace('*name*',game.player.name);
        }
    });

    return Npc;
});
