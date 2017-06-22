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
	private myOpenCardGroup: eui.Group;
	private myPlayedCardGroup: eui.Group;
	private leftCardGroup: eui.Group;
	private leftOpenCardGroup: eui.Group;
	private leftPlayedCardGroup: eui.Group;
	private rightCardGroup: eui.Group;
	private rightOpenCardGroup: eui.Group;
	private rightPlayedCardGroup: eui.Group;
	private topOpenCardGroup: eui.Group;
	private topCardGroup: eui.Group;
	private topPlayedCardGroup: eui.Group;

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

	private effect_gang: eui.Image;
	private effect_peng: eui.Image;
	private effect_hu_my: eui.Image;
	private effect_hu_left: eui.Image;
	private effect_hu_right: eui.Image;
	private effect_hu_top: eui.Image;

	/**出牌显示容器 */
	private playCardGroup:eui.Group;
	/**出牌的人 */
	private playedName:eui.Label;
	/**出的牌 */
	private playedCard:eui.Image;
	/**出牌箭头 */
	private arrow:eui.Image;
	
	private roomCommand_dice = 1;
	private roomCommand_dealCard = 2;
	private roomCommand_lackCard = 3;
	private roomCommand_curPlayIndex = 4;
	private roomCommand_handleCard = 5;
	private roomCommand_playedCard = 6;
	private roomCommand_huCard = 7;
	private roomCommand_gangCard = 8;
	private roomCommand_pengCard = 9;
	private roomCommand_gameOver = 10;

	private roomId:number;
	/**我的座位号 0-3 */
	private myseat:number;
	/**我手上的的牌 */
	private mycards : number[]= [];
	/**我摆出的牌 */
	private myOpencards : number[]= [];
	/**我打出的牌 */
	private myPlayedcards : number[]= [];
	/**右边手上的的牌 */
	private rightCardsNum:number = 0;
	/**右边摆出的牌 */
	private rightOpenCards:number[] = [];
	/**右边打出的牌 */
	private rightPlayedCards:number[] = [];
	/**上边手上的的牌 */
	private topCardsNum:number = 0;
	/**上边摆出的牌 */
	private topOpenCards:number[] = [];
	/**上边打出的牌 */
	private topPlayedCards:number[] = [];
	/**左边手上的的牌 */
	private leftCardsNum:number = 0;
	/**左边摆出的牌 */
	private leftOpenCards:number[] = [];
	/**左边打出的牌 */
	private leftPlayedCards:number[] = [];

	/**我的定缺 */
	private myLack:string="";
	/**我的摸的最新的牌 */
	private myLastestCard:number;
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
		this.initPlayers();

	}

	private initView(): void{

	}

	private initListeners(): void{
		MsgListener.getInstance().addListeners(Commands.ROOM_NOTIFY, this);

		this.lackBtn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
		this.lackBtn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
		this.lackBtn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
		this.actionBtn_peng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionPeng, this);
		this.actionBtn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGang, this);
		this.actionBtn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionHu, this);
		this.actionBtn_guo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGuo, this);
	}
	private initPlayers(): void{
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
	}

	/**收到推送 */
	public receiveMsg(command, data):void {
		console.log("收到推送的事件 "+command, data);
		if(command == Commands.ROOM_NOTIFY){
			if(data.content.roomId){
				console.log("房间id "+data.content.roomId);
				this.roomId = data.content.roomId;
			}
			switch(data.content.state){
				case this.roomCommand_dice:
					this.onDice(data);
					break;
				case this.roomCommand_dealCard://发牌
					this.onCards(data);
					break;
				case this.roomCommand_lackCard://定缺
					this.onLackCard(data);
					break;
				case this.roomCommand_curPlayIndex:
					this.onCurPlayerIndex(data);
					break;
				case this.roomCommand_handleCard://出牌/碰/杠/胡
					this.onHandleCards(data);
					break;
				case this.roomCommand_playedCard:
					this.onPlayedCards(data);
					break;
				case this.roomCommand_huCard:
					this.onHuCard(data);
					break;
				case this.roomCommand_gangCard:
					this.onGangCard(data);
					break;
				case this.roomCommand_pengCard:
					this.onPengCard(data);
					break;
				case this.roomCommand_gameOver://结算
					this.onGameOver(data);
					break;
			}
		}
		
	}
	/**收到骰子和庄家 */
	private onDice(data: RoomVO): void{
		var dice = data.content.dice;
		var curPlayerIndex = data.content.curPlayIndex;
		console.log("收到骰子结果 ",dice," 初始庄家 ",curPlayerIndex);
	}
	/**收到发牌，自己的或者别人的 */
	private onCards(data: RoomVO): void{
		//自己发牌
		if(data.content.addCards && data.content.addCards.length>0){
			this.addMyCard(data.content.addCards);
		}
		//碰 杠之后 我的牌要变少
		else if(data.content.removeCards && data.content.removeCards.length>0){
			this.removeMyCard(data.content.removeCards);
		}
		//别人发牌
		else if(data.content.otherCardNum){
			let index = data.content.otherCardNum.index
			let num = data.content.otherCardNum.num;
			this.setOtherCardNum(index, num);
		}

		this.setLeftCardNum(data.content.leftCardsNum);
	}
	/**收到定缺消息 */
	private onLackCard(data: RoomVO): void{
		var arr = data.content.lackCards;
		if(arr && arr.length>0){
			//告知所有人的定缺
			console.log("收到所有人的定缺消息 ",arr);
			var i = this.myseat;
			this.myLack = arr[i];
			this.setMyCards(this.mycards);

			this.myLackImg.source = "lack"+arr[i]+"_png";

			i++;
			if(i>3) i-=4;
			this.rightLackImg.source = "lack"+arr[i]+"_png";

			i++;
			if(i>3) i-=4;
			this.topLackImg.source = "lack"+arr[i]+"_png";

			i++;
			if(i>3) i-=4;
			this.leftLackImg.source = "lack"+arr[i]+"_png";

		}
		else{
			//通知玩家开始定缺
			this.lackGroup.visible = true;
		}
	}
	/**收到当前出牌人，刷新箭头指向位置 */
	private onCurPlayerIndex(data: RoomVO): void{
		this.setArrow(data.content.curPlayIndex);
	}
	/**收到可以碰/杠/胡/出牌 */
	private onHandleCards(data: RoomVO): void{
		/**我可以杠 */
		var gangAble = data.content.gangAble;
		/**我可以胡 */
		var huAble = data.content.huAble;
		/**我可以碰 */
		var pengAble = data.content.pengAble;
		/**我是否可以出牌 */
		var playAble = data.content.playAble;

		if(playAble){
			this.setPlayCardAble();
		}

		if(gangAble || huAble || pengAble){
			this.setHandleCard(huAble, gangAble, pengAble);
		}
	}
	/**收到某玩家出过的牌，最后一个元素表示新出的 */
	private onPlayedCards(data: RoomVO): void{
		var index = data.content.playedCards.index;
		var cards = data.content.playedCards.cards;
		console.log('座位 '+index+" 出的牌有 ",cards);
		if(this.myseat == index){
			this.myPlayedcards = cards;
			this.setMyPlayedCards(cards);
		}
		else if((this.myseat+1)%4 == index%4){
			this.rightPlayedCards = cards;
			this.setRightPlayedCards(cards);
		}
		else if((this.myseat+2)%4 == index%4){
			this.topPlayedCards = cards;
			this.setTopPlayedCards(cards);
		}
		else if((this.myseat+3)%4 == index%4){
			this.leftPlayedCards = cards;
			this.setLeftPlayedCards(cards);
		}

		this.showPlayedCard(index, cards[cards.length-1]);
	}
	/**收到某玩家胡了某张牌 */
	private onHuCard(data: RoomVO): void{
		var index = data.content.huInfo.index;
		var card = data.content.huInfo.card;
		console.log("玩家"+index+"胡了牌"+"card");

		var str = "";
		if(index == this.myseat){
			str = "my";
		}
		else if(index%4 == (this.myseat+1)%4 ){
			str = "right";
		}
		else if(index%4 == (this.myseat+2)%4 ){
			str = "top";
		}
		else if(index%4 == (this.myseat+3)%4 ){
			str = "left";
		}
		this["effect_hu_"+str].visible = true;
	}
	/**收到某玩家杠了某张牌 */
	private onGangCard(data: RoomVO): void{
		var index = data.content.gangOrPengInfo.index;
		var card = data.content.gangOrPengInfo.card;
		var showedCards = data.content.gangOrPengInfo.showedCards;
		console.log("玩家"+index+"杠了牌"+"card"+" 他摆出来的牌有 ", showedCards);

		if(this.myseat == index){
			this.myOpencards = showedCards;
			this.setMyOpenCards(showedCards);
		}
		else if((this.myseat+1)%4 == index%4){
			this.rightOpenCards = showedCards;
			this.setRightOpenCards(showedCards);
		}
		else if((this.myseat+2)%4 == index%4){
			this.topOpenCards = showedCards;
			this.setTopOpenCards(showedCards);
		}
		else if((this.myseat+3)%4 == index%4){
			this.leftOpenCards = showedCards;
			this.setLeftOpenCards(showedCards);
		}

		var targetX = 0;
		var targetY = 0;

		if(index == this.myseat){
			targetX = 960;
			targetY = 891;
		}
		else if(index%4 == (this.myseat+1)%4 ){
			targetX = 1558;
			targetY = 500;
		}
		else if(index%4 == (this.myseat+2)%4 ){
			targetX = 960;
			targetY = 169;
		}
		else if(index%4 == (this.myseat+3)%4 ){
			targetX = 249;
			targetY = 500;
		}

		this.effect_gang.visible = true;
		this.effect_gang.x = 960;
		this.effect_gang.y = 540;
		egret.Tween.get(this.effect_gang)
			.to({x:targetX, y:targetY},500)
			.wait(500)
			.call(()=>{
				egret.Tween.removeTweens(this.effect_gang);
				this.effect_gang.visible = false;
				this.effect_gang.x = 960;
				this.effect_gang.y = 540;
			}, this)

	}
	/**收到某玩家碰了某张牌 */
	private onPengCard(data: RoomVO): void{
		var index = data.content.gangOrPengInfo.index;
		var card = data.content.gangOrPengInfo.card;
		var showedCards = data.content.gangOrPengInfo.showedCards;
		console.log("玩家"+index+"碰了牌"+"card"+" 他摆出来的牌有 ", showedCards);

		if(this.myseat == index){
			this.myOpencards = showedCards;
			this.setMyOpenCards(showedCards);
		}
		else if((this.myseat+1)%4 == index%4){
			this.rightOpenCards = showedCards;
			this.setRightOpenCards(showedCards);
		}
		else if((this.myseat+2)%4 == index%4){
			this.topOpenCards = showedCards;
			this.setTopOpenCards(showedCards);
		}
		else if((this.myseat+3)%4 == index%4){
			this.leftOpenCards = showedCards;
			this.setLeftOpenCards(showedCards);
		}

		var targetX = 0;
		var targetY = 0;

		if(index == this.myseat){
			targetX = 960;
			targetY = 891;
		}
		else if(index%4 == (this.myseat+1)%4 ){
			targetX = 1558;
			targetY = 500;
		}
		else if(index%4 == (this.myseat+2)%4 ){
			targetX = 960;
			targetY = 169;
		}
		else if(index%4 == (this.myseat+3)%4 ){
			targetX = 249;
			targetY = 500;
		}

		this.effect_peng.visible = true;
		this.effect_peng.x = 960;
		this.effect_peng.y = 540;
		egret.Tween.get(this.effect_peng)
			.to({x:targetX, y:targetY},500)
			.wait(500)
			.call(()=>{
				egret.Tween.removeTweens(this.effect_peng);
				this.effect_peng.visible = false;
				this.effect_peng.x = 960;
				this.effect_peng.y = 540;
			}, this)
	}
	/**收到游戏结束 */
	private onGameOver(data: RoomVO): void{
		console.log("游戏结束");
	}
	
	
	
	/**我要定缺 */
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

		GameController.getInstance().sendLack(this.roomId, this.myseat, str, (data)=>{
			if(data.code == 0){
				console.log("定缺成功");
			}
		}, this)
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
	/**我可以出牌了 */
	private setPlayCardAble(): void{
		console.log("我可以出牌");
		var num = this.myCardGroup.numChildren;
		for(var i=0; i<num; i++){
			var card:Card = <Card>this.myCardGroup.getChildAt(i);
			card.addEventListener(egret.TouchEvent.TOUCH_TAP, (e:egret.Event)=>{
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
	private onCardChoosed(c:Card):void{
		var num = this.myCardGroup.numChildren;
		for(var i=0; i<num; i++){
			var card:Card = <Card>this.myCardGroup.getChildAt(i);
			card.y = 900;
		}
		c.y = 860;
	}
	/**出牌 */
	private onCardOut(card:Card):void{
		//出牌时也要隐藏杠胡选择面板
		this.actionGroup.visible = false;
		
		var cardValue:number = card.num;
		GameController.getInstance().sendPlayCard(this.roomId, this.myseat, cardValue, (data)=>{
			if(data.code==0){
				console.log("出牌成功");
				this.mycards.splice(this.mycards.indexOf(cardValue), 1);
				this.setMyCards(this.mycards);
			}
			else{
				console.log("出牌失败");
			}
		}, this);
	}
	/**推荐一张牌到最右边 */
	private setSuggestPlayCard(): void{
		console.log("是否有缺牌没打完："+this.iHaveLackCard()+" 是否有新模的牌 "+this.myLastestCard);
		//如果已经缺牌，把最新摸的牌放到最右边 再把最右边的牌作为推荐牌
		if(!this.iHaveLackCard() && this.myLastestCard>-1){
			this.sortCardBySuggest(this.mycards, this.myLastestCard);
		}
		var card:Card = <Card>this.myCardGroup.getChildAt(this.myCardGroup.numChildren-1);
		card.x += 50;
	}
	/**有人出牌了 */
	private showPlayedCard(index:number, card:number):void{
		this.playCardGroup.visible = true;
		this.playedName.text = this.playerData[index].name+"出牌了：";
		this.playedCard.source = CardUtil.getCardRourceByNum(card);
	}

	/**设置选择 碰/杠/胡 哪些可以点击 哪些不能点 */
	private setHandleCard(huAble:boolean, gangAble:boolean, pengAble:boolean): void{
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
		this.actionGroup.visible = false;
		GameController.getInstance().sendPengCard(this.roomId, this.myseat, (data)=>{
			if(data.code == 0){
				console.log("碰牌成功");
			}
			else{
				console.log("碰牌失败");
			}
		}, this);
	}
	/**我要杠牌 */
	private actionGang(): void{
		this.actionGroup.visible = false;
		GameController.getInstance().sendGangCard(this.roomId, this.myseat, (data)=>{
			if(data.code == 0){
				console.log("杠牌成功");
			}
			else{
				console.log("杠牌失败");
			}
		}, this);
	}
	/**我要胡牌 */
	private actionHu(): void{
		this.actionGroup.visible = false;
		GameController.getInstance().sendHuCard(this.roomId, this.myseat, (data)=>{
			if(data.code == 0){
				console.log("胡牌成功");
				this.setMyCards(this.mycards);
			}
			else{
				console.log("胡牌失败");
			}
		}, this);
	}
	/**我要过牌 */
	private actionGuo(): void{
		this.actionGroup.visible = false;
		GameController.getInstance().sendGuo(this.roomId, this.myseat, (data)=>{
		}, this);	
	}

	/**刷新自己的牌数据 */
	private addMyCard(arr:number[]){
		//摸了一张牌的情况
		if(arr.length == 1){
			this.myLastestCard = arr[0];
		}

		this.mycards = this.mycards.concat(arr);
		this.setMyCards(this.mycards);
	}
	/**刷新自己的牌数据 */
	private removeMyCard(arr:number[]){
		for(var i=0; i<arr.length; i++){
			var index = this.mycards.indexOf(arr[i]);
			if(index > -1){
				this.mycards.splice(index, 1);
			}
		}
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
	/**将牌按定缺的花色排序，当前摸的牌排到最后面 */
	private sortCardBySuggest(arr, n): Array<any>{
		let lack = this.myLack;
		if(lack.length>0){
			//定缺的花色
			var arr1 = [];
			//不是缺的花色
			var arr2 = [];

			if(lack=="wan"){
				for(var i=0;i<arr.length;i++){
					if(arr[i] == n) continue;
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
					if(arr[i] == n) continue;
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
					if(arr[i] == n) continue;
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
			return (arr1.concat(arr2)).concat([n]);
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
		for(var i=0;i<arr.length;i++) {
			var card = new Card(0,0,arr[i])
			card.x = 260+i*100;
			card.y = 900;
			this.myCardGroup.addChild(card);

			if(this.myLack == "wan" && arr[i]<36){
				card.alpha = 0.6;
			}
			else if(this.myLack == "tiao" && arr[i]>=36 && arr[i]<72){
				card.alpha = 0.6;
			}
			else if(this.myLack == "tong" && arr[i]>=72){
				card.alpha = 0.6;
			}
		}
	}
	/**是否还有缺牌没打完 */
	private iHaveLackCard():boolean{
		var b = false;
		for(var i=0;i<this.mycards.length;i++) {
			var num = this.mycards[i];

			if(this.myLack == "wan" && num<36){
				b = true;
			}
			else if(this.myLack == "tiao" && num>=36 && num<72){
				b = true;
			}
			else if(this.myLack == "tong" && num>=72){
				b = true;
			}
		}
		return b;
	}
	private setMyOpenCards(arr:Array<number>){
		arr = this.sortCard(arr);
		var w:number = <number>Card.sizeConfig[0][1][1];
		var h:number = <number>Card.sizeConfig[0][1][2];
		var len = arr.length;

		this.myOpenCardGroup.removeChildren();
		for(var i=0; i<len; i++){
			var card = new Card(0,1,arr[i]);
			this.myOpenCardGroup.addChild(card);
			card.x = 1600- w*i;
			card.y = 937;
		}
	}
	private setMyPlayedCards(arr:Array<number>){
		var w:number = <number>Card.sizeConfig[0][2][1];
		var h:number = <number>Card.sizeConfig[0][2][2];

		this.myPlayedCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(0,2,arr[i]);
			this.myPlayedCardGroup.addChildAt(card, 0);
			card.x = 500+(i%20)*w;
			card.y = 700+ (Math.floor(i/20)) * h;

			console.log("刷新一张出过的牌 x "+card.x+" y "+card.y);
		}
	}
	private setRightCardsNum(num){
		this.rightCardGroup.removeChildren();
		for(var i=0; i<num; i++){
			var card = new Card(1,0);
			this.rightCardGroup.addChild(card);
			card.x = 1710 - num*10 + i*10;
			card.y = 740 - num*39 + i*39;
		}
	}
	private setRightOpenCards(arr:Array<number>){
		this.rightOpenCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(1,1,arr[i]);
			this.rightOpenCardGroup.addChild(card);
			card.x = 1507 + i*8;
			card.y = 260 + i*30;
		}
	}
	private setRightPlayedCards(arr:Array<number>){
		var w = <number>Card.sizeConfig[1][1][1];
		this.rightPlayedCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(1,2,arr[i]);
			this.rightPlayedCardGroup.addChild(card);
			card.x = 1360 - Math.floor(i/12+1)*w + (i%12)*6;
			card.y = 260 + (i%12)*30;
		}
	}
    private setTopCardsNum(num){
		this.topCardGroup.removeChildren();
		for(var i=0; i<num; i++){
			var card = new Card(2,0);
			this.topCardGroup.addChild(card);
			card.x = 1500-num*66+i*66;
			card.y = 125;
		}
    }
	private setTopOpenCards(arr:Array<number>){
		var w = <number>Card.sizeConfig[2][1][1];
		this.topOpenCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(2,1,arr[i]);
			this.topOpenCardGroup.addChildAt(card, 0);
			card.x = 650+i*w;
			card.y = 200;
		}
	}
	private setTopPlayedCards(arr:Array<number>){
		var w = <number>Card.sizeConfig[2][2][1];
		var h = <number>Card.sizeConfig[2][2][2];
		this.topPlayedCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(2,2,arr[i]);
			this.topPlayedCardGroup.addChildAt(card,0);
			card.x = 700+(i%14)*w;
			card.y = 300- Math.floor(i/14+1)*h ;
		}
	}
    private setLeftCardsNum(num){
		this.leftCardGroup.removeChildren();
		for(var i=0; i<num; i++){
			var card = new Card(3,0);
			this.leftCardGroup.addChild(card);
			card.x = 276 + num*10 - i*10;
			card.y = 740 - num*39 + i*39;
		}
    }
	private setLeftOpenCards(arr:Array<number>){
		this.leftOpenCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(3,1,arr[i]);
			this.leftOpenCardGroup.addChild(card);
			card.x = 500 - i*8;
			card.y = 273 + i*30;
		}
	}
	private setLeftPlayedCards(arr:Array<number>){
		var w = <number>Card.sizeConfig[1][2][1];
		this.leftPlayedCardGroup.removeChildren();
		for(var i=0; i<arr.length; i++){
			var card = new Card(3,2,arr[i]);
			this.leftPlayedCardGroup.addChild(card);
			card.x = 760- Math.floor(i/10+1)*w - (i%10)*6;
			card.y = 350 + (i%10)*30;
		}
	}


	/**刷新别人的牌数 */
	private setOtherCardNum(index, n){
		if( (index+1)%4 == this.myseat%4){
            this.setRightCardsNum(n);
        }
        else if( (index+2)%4 == this.myseat%4){
            this.setTopCardsNum(n);
        }
        else if( (index+3)%4 == this.myseat%4){
            this.setLeftCardsNum(n);
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