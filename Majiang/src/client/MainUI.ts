class MainUI extends eui.Component{

	private startBtn: eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/mySkins/mainUISkin.exml";

		this.init();
	}

	private init(){
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.matchPlayer, this);
	}

	//开始匹配
	private matchPlayer(){
		var data = new BaseMsg();
		data.command = Commands.MATCH_PLAYER;
		data.content = {"name":GlobalConfig.name};
		NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
	}

	private onMatchPlayerBack(data){

	}
}