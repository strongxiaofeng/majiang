var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetController = (function () {
    function NetController() {
        this.sequence = 1;
        /**简易的存储结构 以sequence做key，存储协议返回的回调函数 */
        this.callbackPool = {};
    }
    NetController.getInstance = function () {
        if (!this._instance) {
            this._instance = new NetController();
        }
        return this._instance;
    };
    NetController.prototype.connect = function () {
        if (!this.ws) {
            this.ws = new WS();
            this.ws.connect("192.168.8.184", 8181);
        }
    };
    /**收到数据 */
    NetController.prototype.readData = function (msg) {
        var sqs = msg.sequence;
        if (sqs) {
            var cb = this.callbackPool[sqs];
            if (cb) {
                cb.callback.call(cb.thisObj, msg);
                this.callbackPool[sqs] = null;
            }
            delete this.callbackPool[sqs];
        }
        else {
            console.log("这是推送消息");
            MsgListener.getInstance().dispatch(msg.command, msg);
        }
    };
    /**发出数据 */
    NetController.prototype.sendData = function (data, callback, thisObj) {
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        data.sequence = this.sequence++;
        this.ws.sendData(JSON.stringify(data));
        if (callback && thisObj) {
            this.callbackPool[data.sequence] = { callback: callback, thisObj: thisObj };
        }
    };
    NetController.prototype.showState = function (s) {
        console.log(s);
    };
    return NetController;
}());
__reflect(NetController.prototype, "NetController");
//# sourceMappingURL=NetController.js.map