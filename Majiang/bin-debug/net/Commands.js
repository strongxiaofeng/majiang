var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Commands = (function () {
    function Commands() {
    }
    return Commands;
}());
Commands.SYSTEM_MSG = 1;
Commands.REGISTER = 2;
Commands.LOGIN = 3;
Commands.MATCH_PLAYER = 4;
Commands.STATE_DEAL_CARDS = 5;
Commands.STATE_PLAY_CARD = 6;
Commands.STATE_PENG_CARD = 7;
Commands.STATE_PAYOUT = 8;
__reflect(Commands.prototype, "Commands");
//# sourceMappingURL=Commands.js.map