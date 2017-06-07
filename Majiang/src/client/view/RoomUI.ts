class RoomUI extends eui.Component{
	private myNameTxt: eui.Label;
	private myBalanceTxt: eui.Label;
	private leftNameTxt: eui.Label;
	private leftBalanceTxt: eui.Label;
	private rightNameTxt: eui.Label;
	private rightBalanceTxt: eui.Label;
	private topNameTxt: eui.Label;
	private topBalanceTxt: eui.Label;
	private leftCardTxt: eui.Label;

	private myCardGroup: eui.Group;
	private leftCardGroup: eui.Group;
	private rightCardGroup: eui.Group;
	private topCardGroup: eui.Group;

	/**我的座位号 0-3 */
	private myseat:number;
	/**我的牌数据 */
	private mycards : number[]= [];



	public constructor() {
		super();
		this.skinName = "resource/mySkins/roomUISkin.exml";

		this.init();
	}

	private init(): void{
		this.initView();
		this.initListeners();
		this.initData();

	}

	private initView(): void{

	}

	private initListeners(): void{
		MsgListener.getInstance().addListeners(Commands.STATE_DEAL_CARDS, this);
	}

	private initData(): void{
		var playerData = GameModel.getInstance().roomPlayersData;
		console.log(playerData);

		for(var i=0; i<4; i++){
			//我是第几个位置 0-3
			if(playerData[i].name == GlobalConfig.username){
				this.myseat = i;
				this.setPlayer("my",playerData[i]);
				this.setPlayer("right",playerData[(i+1 > 3 ? i-3 : i+1)]);
				this.setPlayer("top",playerData[(i+2 > 3 ? i-2 : i+2)]);
				this.setPlayer("left",playerData[(i+3 > 3 ? i-1 : i+3)]);
			}
		}

		if(playerData[0].name == GlobalConfig.username){
		}
	}

	/**收到推送 */
	public receiveMsg(command, data):void {
		console.log("收到推送的事件 "+command, data);
		switch(command){
			case Commands.STATE_DEAL_CARDS:
				this.onCards(data);
				break;
			case Commands.STATE_PLAY_CARD:
				this.onPlayCard(data);
				break;
			case Commands.STATE_PENG_CARD:
				this.onPengCard(data);
				break;
			case Commands.STATE_PAYOUT:
				this.onPayout(data);
				break;
		}
	}

	/**收到新牌，自己的或者别人的 */
	private onCards(data:BaseMsg): void{
		//自己发牌
		if(data.content.addCards){
			this.addMyCard(data.content.addCards);
		}
		//别人发牌
		else if(data.content.otherCardNum){
			let otherCardNum = data.content.otherCardNum;
			for(var index in otherCardNum){
				this.setOtherCardNum(index, otherCardNum[index]);
			}
		}

		this.setLeftCardNum(data.content.leftCardsNum);
	}
	/**该某人出牌了 */
	private onPlayCard(data): void{
		var index = data.index;
		//该我出牌
		if(index == this.myseat){
			var num = this.myCardGroup.numChildren;
			for(var i=0; i<num; i++){
				// this.myCardGroup.getChildAt(i).addEventListener();
			}
			
		}
		//别人出牌
		else{

		}
	}
	/**我可以选择 碰/杠/胡/过 了 */
	private onPengCard(data): void{

	}
	/**派彩 */
	private onPayout(data): void{

	}

	/**刷新自己的牌数据 */
	private addMyCard(arr:number[]){
		this.mycards = this.mycards.concat(arr);
		this.mycards.sort();
		this.setMyCards(this.mycards);
	}
	/**刷新自己的牌显示 */
	private setMyCards(arr){
		this.myCardGroup.removeChildren();

		//显示牌的中心点是960 每个牌宽100
		var startx = 960-arr.length*50
		for(var i=0;i<arr.length;i++) {
			var src = CardUtil.getCardRourceByNum(arr[i]);
			var img:eui.Image = new eui.Image(src);
			img.x = startx+i*100;
			img.y = 900;
			this.myCardGroup.addChild(img);
		}

	}
	/**刷新别人的牌数 */
	private setOtherCardNum(index, n){
		if(index!=0 || index!=1 || index!=2 || index!=3) {
			return;
		}


	}

	/**刷新人名和余额 */
	private setPlayer(prefix, data):void {
		this[prefix+"NameTxt"].text = data.name;
		this[prefix+"BalanceTxt"].text = data.balance;
	}
	/**刷新剩余牌数 */
	private setLeftCardNum(n): void{
		this.leftCardTxt.text = "还剩牌:"+n;
	}


}