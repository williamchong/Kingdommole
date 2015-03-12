var Utils = require('./utils');

var Formulas = {};

Formulas.dmg = function (weaponLevel, armorLevel) {
    //weaponlevel is useless now, every monster have hp = 1
    var dealt = weaponLevel * 5 + Utils.randomInt(weaponLevel,weaponLevel);
    var absorbed = armorLevel * 3 + Utils.randomInt(0, armorLevel);
    var dmg =  dealt - absorbed;

    //console.log("abs: "+absorbed+"   dealt: "+ dealt+"   dmg: "+ (dealt - absorbed));
    if (dmg <= 0) {
        return Utils.randomInt(0, 3);
    } else {
        return dmg;
    }
};

Formulas.hp = function (armorLevel) {
    var hp = 100 + ((armorLevel - 1) * 50);
    return hp;
};

if (typeof exports !== 'undefined') {
    module.exports = Formulas;
}
