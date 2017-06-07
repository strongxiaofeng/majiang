class NetController {
	private static _instance:NetController;
	private ws:WS;
	private sequence:number = 1;

	/**简易的存储结构 以sequence做key，存储协议返回的回调函数 */
	private callbackPool = {};

	private constructor() {
	}
	public static getInstance(){
		if(!this._instance){
			this._instance = new NetController();
		}
		return this._instance;
	}


	public connect ():void{
		if(!this.ws){
			this.ws = new WS();
        	this.ws.connect("192.168.8.184", 8181);
		}
	}

	/**收到数据 */
	public readData(msg:BaseMsg): void{
		let sqs = msg.sequence;
		if(sqs){
			let cb = this.callbackPool[sqs];
			if(cb){
				cb.callback.call(cb.thisObj, msg);
				this.callbackPool[sqs] = null;
			}
			delete this.callbackPool[sqs];
		}
		//没有sqs 是服务器主动发的
		else{
			console.log("这是推送消息");
			MsgListener.getInstance().dispatch(msg.command, msg);
		}
	}
	/**发出数据 */
	public sendData(data: BaseMsg, callback:Function=null, thisObj:any=null): void{
		data.sequence = this.sequence++;
		this.ws.sendData(JSON.stringify(data));

		if(callback && thisObj){
			this.callbackPool[data.sequence] = {callback:callback, thisObj:thisObj};
		}
	}

	public showState(s:string): void{
		console.log(s);
	}

}