var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestSocketUI = (function (_super) {
    __extends(TestSocketUI, _super);
    function TestSocketUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/mySkins/TestSocketUISkin.exml";
        _this.initListeners();
        _this.initSocket();
        console.log("asa");
        return _this;
    }
    TestSocketUI.prototype.initListeners = function () {
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSend, this);
    };
    TestSocketUI.prototype.clickSend = function () {
        var text = this.dataTxt.text;
        this.ws.sendData(text);
    };
    TestSocketUI.prototype.initSocket = function () {
        this.ws = new WS();
        this.ws.connect("192.168.8.184", 8181);
    };
    TestSocketUI.prototype.readData = function (msg) {
        this.returnTxt.text = JSON.stringify(msg);
    };
    TestSocketUI.prototype.showState = function (s) {
        this.stateLabel.text = s;
    };
    return TestSocketUI;
}(eui.Component));
__reflect(TestSocketUI.prototype, "TestSocketUI");
//# sourceMappingURL=TestSocketUI.js.map