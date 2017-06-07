class MainUI extends eui.Component{

	private startBtn: eui.Button;
	private startingTip: eui.Image;
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
		this.startTween();

		var data = new BaseMsg();
		data.command = Commands.MATCH_PLAYER;
		data.content = {"name": GlobalConfig.username};
		NetController.getInstance().sendData(data, this.onMatchPlayerBack, this);
	}

	private startTween():void{
		this.startingTip.visible = true;
		this.startingTip.rotation = 5;
		egret.Tween.get(this.startingTip, {loop:true})
			.to({rotation:-5}, 500)
			.to({rotation:5}, 500)
	}

	private onMatchPlayerBack(data){
		console.log("匹配返回 ",data);
		if(data.code == 0){
			GameModel.getInstance().roomPlayersData = data.content.players;
			UIManager.getInstance().openUI("RoomUI");
		}
	}
}