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

	private lackGroup: eui.Group;
	private actionGroup: eui.Group;
	private lackBtn_wan: eui.Button;
	private lackBtn_tiao: eui.Button;
	private lackBtn_tong: eui.Button;
	private actionBtn_peng: eui.Button;
	private actionBtn_gang: eui.Button;
	private actionBtn_hu: eui.Button;
	private actionBtn_guo: eui.Button;

	private leftLackImg: eui.Image;
	private rightLackImg: eui.Image;
	private topLackImg: eui.Image;
	private myLackImg: eui.Image;

	
	private playCommand_sendCard = 0;
	private playCommand_lackCard = 1;
	private playCommand_playCard = 2;
	private playCommand_payout = 3;

	private roomId:number;
	/**我的座位号 0-3 */
	private myseat:number;
	/**我的牌数据 */
	private mycards : number[]= [];
	/**我的定缺 */
	private myLack:string;


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
		MsgListener.getInstance().addListeners(Commands.PLAY_GAME, this);

		this.lackBtn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
		this.lackBtn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
		this.lackBtn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
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
		if(command == Commands.PLAY_GAME){
			switch(data.content.state){
				case this.playCommand_sendCard://发牌
					this.onCards(data);
					break;
				case this.playCommand_lackCard://定缺
					this.onLackCard(data);
					break;
				case this.playCommand_playCard://出牌/碰/杠/胡
					this.onPlayCard(data);
					break;
				case this.playCommand_payout://结算
					this.onPayout(data);
					break;
			}
		}
		
	}

	/**收到新牌，自己的或者别人的 */
	private onCards(data:BaseMsg): void{
		if(data.content.roomId){
			console.log("房间id "+data.content.roomId);
			this.roomId = data.content.roomId;
		}
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
	/**收到定缺消息 */
	private onLackCard(data): void{
		var arr = data.content.lackCards;
		if(arr && arr.length>0){
			//告知所有人的定缺
			console.log("收到所有人的定缺消息 ",arr);
			var i = this.myseat;
			this.myLack = arr[i];
			this.setMyCards(this.mycards);

			this.myLackImg.source = "lack"+arr[i]+"_png";

			i++;
			if(i>3) i-=3;
			this.rightLackImg.source = "lack"+arr[i]+"_png";

			i++;
			if(i>3) i-=3;
			this.topLackImg.source = "lack"+arr[i]+"_png";

			i++;
			if(i>3) i-=3;
			this.leftLackImg.source = "lack"+arr[i]+"_png";

		}
		else{
			//通知定缺
			this.lackGroup.visible = true;
		}
	}
	
	/**定缺 */
	private lack(e:egret.Event):void{
		this.lackGroup.visible = false;
		var str = "";
		if(e.target == this.lackBtn_wan){
			str = "wan";
		}
		else if(e.target == this.lackBtn_tiao){
			str = "tiao";
		}
		else if(e.target == this.lackBtn_tong){
			str = "tong";
		}


		var data = new BaseMsg();
		data.command = Commands.PLAY_GAME;
		data.content = {"roomId":this.roomId, "index":this.myseat , "state": this.playCommand_lackCard, "lackCard":str};
		NetController.getInstance().sendData(data, (d)=>{
			if(d.code==0){
			}
		}, this);
	}

	/**该某人做动作了 */
	private onPlayCard(data): void{
		var gangAble = data.content.gangAble;
		var huAble = data.content.huAble;
		var pengAble = data.content.pengAble;
		var playAble = data.content.playAble;
		//我可以出一张牌
		if(playAble){
			console.log("我可以出牌");
			mouse.setMouseMoveEnabled(true);
			var num = this.myCardGroup.numChildren;
			for(var i=0; i<num; i++){
				console.log("注册鼠标事件");
				var card:eui.Image = <eui.Image>this.myCardGroup.getChildAt(i);
				card.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.Event)=>{
					console.log("点击了牌 "+e.target.name);
					if(e.target.y == 900){
						e.target.y = 850;
					}
					else if(e.target.y == 850){
						e.target.y = 900;
					}
				},this);
			}
			
		}
		//别人出牌
		else{
			
		}
	}
	
	/**鼠标悬停到麻将上 */
	private onCardOver(e:egret.Event):void{
		var card = e.target;
		console.log(card);
		card.y = 870;
	}
	/**鼠标离开麻将 */
	private onCardOut(e:egret.Event):void{
		var card = e.target;
		console.log(card);
		card.y = 900;
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
		this.setMyCards(this.mycards);
	}
	/**刷新自己的牌显示 */
	private setMyCards(arr:Array<number>){
		this.myCardGroup.removeChildren();

		arr.sort();
		console.log("排序之后的牌",arr);

		//显示牌的中心点是960 每个牌宽100
		var startx = 960-arr.length*50
		for(var i=0;i<arr.length;i++) {
			var src = CardUtil.getCardRourceByNum(arr[i]);
			var img:eui.Image = new eui.Image(src);
			img.x = startx+i*100;
			img.y = 900;
			img.name = arr[i]+"";
			this.myCardGroup.addChild(img);

			if(this.myLack == "wan" && arr[i]<36){
				img.alpha = 0.6;
			}
			else if(this.myLack == "tiao" && arr[i]>=36 && arr[i]<72){
				img.alpha = 0.6;
			}
			else if(this.myLack == "tong" && arr[i]>=72){
				img.alpha = 0.6;
			}
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