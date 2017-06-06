var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestUI = (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/mySkins/testUISkin.exml";
        _this.initListeners();
        return _this;
    }
    TestUI.prototype.initListeners = function () {
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSendBtn, this);
    };
    TestUI.prototype.clickSendBtn = function (e) {
        var url = this.urlTxt.text;
        var type = this.reqTypeTxt.text;
        var self = this;
        if (url.length > 0) {
            var req = new XMLHttpRequest();
            //回调方法
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        var message = req.responseText;
                        self.resultTxt.text = message;
                        console.log(message);
                    }
                    else {
                        console.log("返回其他状态 " + req.status);
                    }
                }
            };
            req.open(type, url, true);
            if (type.toUpperCase() == "POST") {
                req.setRequestHeader("Content-type", "application/x-www-four-urlencoded");
            }
            req.send();
        }
    };
    return TestUI;
}(eui.Component));
__reflect(TestUI.prototype, "TestUI");
//# sourceMappingURL=TestUI.js.map