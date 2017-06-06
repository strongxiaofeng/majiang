var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/mySkins/mainUISkin.exml";
        _this.init();
        return _this;
    }
    MainUI.prototype.init = function () {
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.matchPlayer, this);
    };
    //开始匹配
    MainUI.prototype.matchPlayer = function () {
        var data = new BaseMsg();
        data.command = Commands.MATCH_PLAYER;
        data.content = { "name": GlobalConfig.name };
        NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
    };
    MainUI.prototype.onMatchPlayerBack = function (data) {
    };
    return MainUI;
}(eui.Component));
__reflect(MainUI.prototype, "MainUI");
//# sourceMappingURL=MainUI.js.map