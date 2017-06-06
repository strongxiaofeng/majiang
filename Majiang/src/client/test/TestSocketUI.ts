class TestSocketUI extends eui.Component{
	private stateLabel: eui.Label;
	private dataTxt: eui.TextInput;
	private returnTxt: eui.Label;
	private sendBtn: eui.Button;
	private ws:WS;
	public constructor() {
		super();
		this.skinName = "resource/mySkins/TestSocketUISkin.exml";
		this.initListeners();

		this.initSocket();
		console.log("asa");
	}

	private initListeners(): void{
		this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSend, this);
	}

	private clickSend(): void{
		var text = this.dataTxt.text;
		this.ws.sendData(text);
	}

	private initSocket():void{
        this.ws = new WS();
        this.ws.connect("192.168.8.184", 8181);
	}

	public readData(msg:BaseMsg): void{
		this.returnTxt.text = JSON.stringify(msg);
	}

	public showState(s:string): void{
		this.stateLabel.text = s;
	}
}