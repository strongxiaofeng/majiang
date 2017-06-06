class WS {
	private socket: egret.WebSocket;
	/**是否用二进制发送数据 */
	private isBin:boolean = false;
	public constructor() {
	}

	public connect(url, port):void{
		this.socket = new egret.WebSocket();
        this.socket.type = this.isBin ? egret.WebSocket.TYPE_BINARY : egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.socket.connect(url, port);
	}

	private onReceiveMessage(e: egret.Event):void{
		console.log("socket 收到了消息");
		if(this.isBin){
			var byte:egret.ByteArray = new egret.ByteArray();
			this.socket.readBytes(byte);
			var msg:string = byte.readUTF();
			console.log("收到二进制数据:");
			console.log("readUTF : "+msg);
		}
		else{
			var msg = this.socket.readUTF();
			console.log("收到字符串数据:");
			console.log("readUTF : "+msg);
		}

	   NetController.getInstance().readData(JSON.parse(msg));
	}

	public sendData(data:string): void{
		if(this.isBin){
			var byte:egret.ByteArray = new egret.ByteArray();
			byte.writeUTF(data);
			byte.position = 0;
			this.socket.writeBytes(byte, 0, byte.bytesAvailable);
		}
		else{
			this.socket.writeUTF(data);
		}
    }

	private onSocketOpen():void{
		NetController.getInstance().showState("socket 连接上了");
	}
	private onSocketClose():void{
		NetController.getInstance().showState("socket 关闭了");
	}
	private onSocketError():void{
		NetController.getInstance().showState("socket error");
	}


}