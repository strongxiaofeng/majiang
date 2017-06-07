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
		this.startBtn.enabled = false;

		var data = new BaseMsg();
		data.command = Commands.MATCH_PLAYER;
		data.content = {"name": GlobalConfig.username};
		NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
	}

	private onMatchPlayerBack(data){
		console.log("匹配返回 ",data);
		if(data.code == 0){
			GameModel.getInstance().roomPlayersData = data.content.players;
			UIManager.getInstance().openUI("RoomUI");
		}
	}
}