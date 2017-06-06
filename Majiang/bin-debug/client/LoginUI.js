var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.skinName = ("resource/mySkins/loginUISkin.exml");
        _this.init();
        NetController.getInstance().connect();
        return _this;
    }
    LoginUI.prototype.init = function () {
        this.loginGroup.visible = true;
        this.registerGroup.visible = false;
        // this.nameInput.textDisplay.size = 30;
        // this.nameInput1.textDisplay.size = 50;
        // this.passInput.textDisplay.size = 50;
        // this.passInput1.textDisplay.size = 50;
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendLogin, this);
        this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRegister, this);
        this.registerBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendRegister, this);
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeLogin, this);
    };
    LoginUI.prototype.sendLogin = function () {
        var name = this.nameInput.text;
        var psw = this.passInput.text;
        var data = new BaseMsg();
        data.command = Commands.LOGIN;
        data.content = { "name": name, "password": psw };
        NetController.getInstance().sendData(data, this.loginBack, this);
    };
    LoginUI.prototype.loginBack = function (data) {
        var code = data.code;
        if (code == 0) {
            console.log("登录成功");
        }
        else {
            console.log("登录失败");
        }
    };
    LoginUI.prototype.sendRegister = function () {
        var name = this.nameInput1.text;
        var psw = this.passInput1.text;
        var data = new BaseMsg();
        data.command = Commands.REGISTER;
        data.content = { "name": name, "password": psw };
        NetController.getInstance().sendData(data, this.registerBack, this);
        GlobalConfig.name = name;
    };
    LoginUI.prototype.registerBack = function (data) {
        var code = data.code;
        if (code == 0) {
            console.log("注册成功");
            UIManager.getInstance().openUI("MainUI");
        }
        else {
            console.log("注册失败");
        }
    };
    LoginUI.prototype.changeRegister = function () {
        this.loginGroup.visible = false;
        this.registerGroup.visible = true;
    };
    LoginUI.prototype.changeLogin = function () {
        this.loginGroup.visible = true;
        this.registerGroup.visible = false;
    };
    return LoginUI;
}(eui.Component));
__reflect(LoginUI.prototype, "LoginUI");
//# sourceMappingURL=LoginUI.js.map