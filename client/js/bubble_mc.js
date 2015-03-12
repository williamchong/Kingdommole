define(['jquery', 'timer'], function($, Timer) {

    var Bubble = Class.extend({
        // time seems useless
        init: function(mid, sid, qid, element, time) {
            this.mid = mid;
            this.sid = sid;
            this.qid = qid;
            this.element = element;
            this.timer = new Timer(500000, time);
        },

        isOver: function(time) {
            if(this.timer.isOver(time)) {
                return true;
            }
            return false;
        },

        destroy: function() {
            $(this.element).remove();
        },

        reset: function(time) {
            this.timer.lastTime = time;
        }
    });

    var BubbleManager = Class.extend({
        init: function(container, game) {
            this.container = container;
            this.game = game;
            this.bubbles = {};
        },
        // we need GameClient to send result
        setGameClient: function(gameclient){
            this.gameclient = gameclient;
            // console.log(this.gameclient);
        },
        getBubbleById: function(id) {
            if(id in this.bubbles) {
                return this.bubbles[id];
            }
            return null;
        },

        // time seems useless
        create: function(mc, time) {
            var self = this;
            var mid = mc.mid;
            var sid = mc.sid;
            var qid = mc.qid;
            var stem = mc.stem;
            var options = mc.options;
            var language = mc.languages;
            console.log(mc);
            // time is undefined
            if(!this.bubbles[mid]) {
               
                var tag = "<div id=\""+mid+"\" class=\"bubble\"><p>"+stem+"</p>";
                for(var i = 0; i < options.length; ++i){
                    tag += "<button type=\"button\" id=\"button"+i+"\" class=\"mcbubble"+mid+"\">"+options[i]+"</button>";
                }
                var el = $(tag);
                $(el).appendTo(this.container);
                // add color
                switch(language.toLowerCase()){
                    case 'c':
                    case '0':
                        $(el).css("background", "rgba(196, 104, 44, 0.8)");
                        break;
                    case 'python':
                    case 'py':
                    case '1':
                        $(el).css("background", "rgba(85, 133, 166, 0.8)");
                        break;
                    case 'ruby':
                    case 'rb':
                    case '2':
                        break;
                    case 'javascript':
                    case 'js':
                    case '3':
                        break;
                }

                var bubble = new Bubble(mid, sid, qid, el, time);
                this.bubbles[mid] = bubble;
                $('.mcbubble'+mid).click(function(event) {
                    var option = $(event.target).html(); 
                    self.gameclient.sendMultipleChoiceAnswer(bubble.mid, bubble.sid, bubble.qid, option);
                    self.destroyBubble($(event.target).closest("div").attr("id"));
                    // prevent click on button identified as move command
                    event.stopPropagation();
                });
                $(".started").keyup(function(event){
                    if(event.keyCode == 49){
                        $("#button0").click();
                    }
                    if(event.keyCode == 50){
                        $("#button1").click();
                    }
                    if(event.keyCode == 51){
                        $("#button2").click();
                    }
                    if(event.keyCode == 52){
                        $("#button3").click();
                    }
                });

            }
        },

        update: function(time) {
            var self = this,
                bubblesToDelete = [];
            
            _.each(this.bubbles, function(bubble) {
              
            mob=self.game.getEntityById(bubble.mid);
            if (mob) {self.game.assignMCTo(mob)}else{
                bubble.destroy();
                delete self.bubbles[bubble.mid];
            };
            });

           
        },

        clean: function() {
            var self = this,
                bubblesToDelete = [];

            _.each(this.bubbles, function(bubble) {
                bubble.destroy();
                bubblesToDelete.push(bubble.id);
            });

            _.each(bubblesToDelete, function(id) {
                delete self.bubbles[id];
            });

            this.bubbles = {};
        },

        destroyBubble: function(id) {
            var bubble = this.getBubbleById(id);

            if(bubble) {
                bubble.destroy();
                delete this.bubbles[id];
            }
        },

        forEachBubble: function(callback) {
            _.each(this.bubbles, function(bubble) {
                callback(bubble);
            });
        }
    });

    return BubbleManager;
});
