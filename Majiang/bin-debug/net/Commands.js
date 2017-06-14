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
Commands.PLAY_GAME = 5;
Commands.ROOM_NOTIFY = 6;
__reflect(Commands.prototype, "Commands");
//# sourceMappingURL=Commands.js.map