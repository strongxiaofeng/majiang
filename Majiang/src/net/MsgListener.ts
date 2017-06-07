class MsgListener {
	private static _instance:MsgListener;
	private dispacher: egret.EventDispatcher;
	private pool = {};

	private constructor() {
		this.dispacher = new egret.EventDispatcher();
	}
	public static getInstance(): MsgListener{
		if(!this._instance){
			this._instance = new MsgListener();
		}
		return this._instance;
	}

	public addListeners(command, obj): void{
		this.dispacher.addEventListener(command, (e:egret.Event)=>{obj.receiveMsg(command, e.data)}, this);
	}

	public dispatch(command, data): void{
		console.log("派发事件 "+command)
		this.dispacher.dispatchEventWith(command, false, data);
	}

}