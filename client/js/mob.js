
define(['character'], function(Character) {

    var Mob = Character.extend({
        init: function(id, kind) {
            this._super(id, kind);
            this.aggroRange = 1;
            var isLq = String(id).charAt(0) == '9';
            this.isAggressive = !isLq;
            console.log(isLq + ' ' + id);
            if(isLq) 
            	console.log('static');
            else
            	console.log('mc')
        }
    });

    return Mob;
});
