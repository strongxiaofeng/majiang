var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WS = (function () {
    function WS() {
        /**是否用二进制发送数据 */
        this.isBin = false;
    }
    WS.prototype.connect = function (url, port) {
        this.socket = new egret.WebSocket();
        this.socket.type = this.isBin ? egret.WebSocket.TYPE_BINARY : egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.socket.connect(url, port);
    };
    WS.prototype.onReceiveMessage = function (e) {
        console.log("socket 收到了消息");
        if (this.isBin) {
            var byte = new egret.ByteArray();
            this.socket.readBytes(byte);
            var msg = byte.readUTF();
            console.log("收到二进制数据:");
            console.log("readUTF : " + msg);
        }
        else {
            var msg = this.socket.readUTF();
            console.log("收到字符串数据:");
            console.log("readUTF : " + msg);
        }
        NetController.getInstance().readData(JSON.parse(msg));
    };
    WS.prototype.sendData = function (data) {
        if (this.isBin) {
            var byte = new egret.ByteArray();
            byte.writeUTF(data);
            byte.position = 0;
            this.socket.writeBytes(byte, 0, byte.bytesAvailable);
        }
        else {
            this.socket.writeUTF(data);
        }
    };
    WS.prototype.onSocketOpen = function () {
        NetController.getInstance().showState("socket 连接上了");
    };
    WS.prototype.onSocketClose = function () {
        NetController.getInstance().showState("socket 关闭了");
    };
    WS.prototype.onSocketError = function () {
        NetController.getInstance().showState("socket error");
    };
    return WS;
}());
__reflect(WS.prototype, "WS");
//# sourceMappingURL=WS.js.map