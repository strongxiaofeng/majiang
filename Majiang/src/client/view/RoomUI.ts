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

	/**出牌显示容器 */
	private playCardGroup:eui.Group;
	/**出牌的人 */
	private playedName:eui.Label;
	/**出的牌 */
	private playedCard:eui.Image;
	/**出牌箭头 */
	private arrow:eui.Image;
	
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
	private myLack:string="";
	/**玩家数据 */
	private playerData:any;

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
		this.actionBtn_peng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionPeng, this);
		this.actionBtn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGang, this);
		this.actionBtn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionHu, this);
		this.actionBtn_guo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGuo, this);
	}
	private initData(): void{
		var playerData = GameModel.getInstance().roomPlayersData;
		this.playerData = playerData;
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
		/**我可以杠 */
		var gangAble = data.content.gangAble;
		/**我可以胡 */
		var huAble = data.content.huAble;
		/**我可以碰 */
		var pengAble = data.content.pengAble;
		/**该谁出牌 */
		var playIndex = data.content.playIndex;
		/**我是否可以出牌 */
		var playAble = data.content.playAble;
		var action = data.content.action;
		var card = data.content.card;
		var index = data.content.index;

		if(action == "play" && card>=0 && index>=0){
			console.log("玩家"+index+"出牌了 "+card);
			this.showPlayedCard(index, card);
		}

		this.setArrow(playIndex);
		//我可以出一张牌
		if(playAble && playIndex==this.myseat){
			console.log("我可以出牌");
			this.setPlayCardAble();
		}

		if(gangAble || huAble || pengAble){
			this.onHandleCard(huAble, gangAble, pengAble);
		}
	}
	/**设置箭头指向出牌的人 */
	private setArrow(index:number):void{
		this.arrow.visible = true;
		if(index == this.myseat){
			this.arrow.rotation = 90;
		}
		else if( index%4 == (this.myseat+1)%4){
			this.arrow.rotation = 0;
		}
		else if( index%4 == (this.myseat+2)%4){
			this.arrow.rotation = -90;
		}
		else if( index%4 == (this.myseat+3)%4){
			this.arrow.rotation = 180;
		}
	}
	/**我可以出牌了，给牌加事件 */
	private setPlayCardAble(): void{
		var num = this.myCardGroup.numChildren;
		for(var i=0; i<num; i++){
			console.log("注册鼠标事件");
			var cardImg:eui.Image = <eui.Image>this.myCardGroup.getChildAt(i);
			cardImg.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.Event)=>{
				console.log("点击牌 "+e.target.name);
				if(e.target.y == 900){
					this.onCardChoosed(e.target);
				}
				else if(e.target.y == 860){
					this.onCardOut(e.target);
				}
			},this);
		}
		this.setSuggestPlayCard();
	}
	/**鼠标选中一张 */
	private onCardChoosed(img:eui.Image):void{
		var num = this.myCardGroup.numChildren;
		for(var i=0; i<num; i++){
			var card:eui.Image = <eui.Image>this.myCardGroup.getChildAt(i);
			card.y = 900;
		}
		img.y = 860;
	}
	/**出牌 */
	private onCardOut(card:eui.Image):void{
		var cardValue:number = parseInt(card.name);
		var data = new BaseMsg();
		data.command = Commands.PLAY_GAME;
		data.content = {"roomId":this.roomId, "index":this.myseat , "state": this.playCommand_playCard,"action":"play", "card":cardValue};
		NetController.getInstance().sendData(data, (d)=>{
			if(d.code==0){
				console.log("出牌成功");
				this.showPlayedCard(this.myseat, cardValue);
				this.mycards.splice(this.mycards.indexOf(cardValue), 1);
				this.setMyCards(this.mycards);
			}
		}, this);
	}
	/**移一张推荐出的牌到最右边 */
	private setSuggestPlayCard(): void{
		var card:eui.Image = <eui.Image>this.myCardGroup.getChildAt(this.myCardGroup.numChildren-1);
		card.x += 50;
	}
	/**有人出牌了 */
	private showPlayedCard(index:number, card:number):void{
		this.playCardGroup.visible = true;
		this.playedName.text = this.playerData[index].name+"出牌了：";
		this.playedCard.source = CardUtil.getCardRourceByNum(card);
	}

	/**我可以选择 碰/杠/胡/过 了 */
	private onHandleCard(huAble:boolean, gangAble:boolean, pengAble:boolean): void{
		this.actionGroup.visible = true;
		this.actionBtn_peng.enabled = pengAble;
		this.actionBtn_gang.enabled = gangAble;
		this.actionBtn_hu.enabled = huAble;
		this.actionBtn_peng.alpha = pengAble ? 1 : 0.5;
		this.actionBtn_gang.alpha = gangAble ? 1 : 0.5;
		this.actionBtn_hu.alpha = huAble ? 1 : 0.5;
	}

	/**我要碰牌 */
	private actionPeng(): void{

	}
	/**我要杠牌 */
	private actionGang(): void{
		
	}
	/**我要胡牌 */
	private actionHu(): void{
		
	}
	/**我要过牌 */
	private actionGuo(): void{
		
	}








	/**派彩 */
	private onPayout(data): void{

	}

	/**刷新自己的牌数据 */
	private addMyCard(arr:number[]){
		this.mycards = this.mycards.concat(arr);
		this.setMyCards(this.mycards);
	}
	/**将牌按定缺的花色排序，缺的花色排在后面, 没有定缺就按万条同排序 */
	private sortCard(arr): Array<any>{
		let lack = this.myLack;
		if(lack.length>0){
			//定缺的花色
			var arr1 = [];
			//不是缺的花色
			var arr2 = [];

			if(lack=="wan"){
				for(var i=0;i<arr.length;i++){
					if(arr[i]<36){
						arr2.push(arr[i]);
					}
					else{
						arr1.push(arr[i]);
					}
				}
			}
			else if(lack=="tiao"){
				for(var i=0;i<arr.length;i++){
					if(arr[i]>=36 && arr[i]<72){
						arr2.push(arr[i]);
					}
					else{
						arr1.push(arr[i]);
					}
				}
			}
			else if(lack=="tong"){
				for(var i=0;i<arr.length;i++){
					if(arr[i]>=72){
						arr2.push(arr[i]);
					}
					else{
						arr1.push(arr[i]);
					}
				}
			}
			arr1.sort(function(a:any,b:any):number{
				return parseInt(a)-parseInt(b);
			});
			arr2.sort(function(a:any,b:any):number{
				return parseInt(a)-parseInt(b);
			});
			return arr1.concat(arr2);
		}
		else{
			arr.sort(function(a:any,b:any):number{
				return parseInt(a)-parseInt(b);
			});
			return arr;
		}
	}
	/**刷新自己的牌显示 */
	private setMyCards(arr:Array<number>){
		this.myCardGroup.removeChildren();

		arr = this.sortCard(arr);
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