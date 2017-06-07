var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgListener = (function () {
    function MsgListener() {
        this.pool = {};
        this.dispacher = new egret.EventDispatcher();
    }
    MsgListener.getInstance = function () {
        if (!this._instance) {
            this._instance = new MsgListener();
        }
        return this._instance;
    };
    MsgListener.prototype.addListeners = function (command, obj) {
        this.dispacher.addEventListener(command, function (e) { obj.receiveMsg(command, e.data); }, this);
    };
    MsgListener.prototype.dispatch = function (command, data) {
        console.log("派发事件 " + command);
        this.dispacher.dispatchEventWith(command, false, data);
    };
    return MsgListener;
}());
__reflect(MsgListener.prototype, "MsgListener");
//# sourceMappingURL=MsgListener.js.map