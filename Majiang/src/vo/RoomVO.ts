class RoomVO extends BaseVO{
	public constructor() {
		super();
	}

	public content: RoomContent;
}

class RoomContent{
	roomId: number;
  	/**
	 *  通知类型 依次是
		1通知骰子点数和庄家
		2通知摸牌（通知自己和其他人）
		3通知定缺
		4通知所有玩家 当前的出牌人
		5通知单个玩家可以操作 胡/杠/碰/出牌
		6通知某个玩家出了什么牌，他一共出过哪些牌
		7通知某个玩家胡了什么牌
		8通知某个玩家杠了什么牌, 他摆出来的所有牌
		9通知某个玩家碰了什么牌, 他摆出来的所有牌
		10通知所有玩家 游戏结束
	*/
	state: number;
	/**2个骰子摇出来的点数结果 */
	dice: Array<number>;
	/**所有人的定缺 */
	lackCards:Array<string>
	/**当前出牌人 */
	curPlayIndex: number;
	/**摸到的牌 */
	addCards: Array<number>;
	/**移除的牌 碰或者杠会用到 */
	removeCards: Array<number>;
	/**他人牌数变动 */
	otherCardNum: OtherCardNum;
	/**剩余的牌 */
	leftCardsNum:number;
	huAble: boolean;
	pengAble: boolean;
	gangAble: boolean;
	playAble: boolean;
	/**某玩家出过的牌，最后一个表示刚打出的 */
	playedCards: PlayedCardsInfo;
	/**某玩家胡牌,自摸的话不显示胡的牌 */
	huInfo: HuInfo;
	/**某玩家杠/碰牌 */
	gangOrPengInfo: GangOrPengInfo;
}

class OtherCardNum{
	index:number;
	num:number;
}
class PlayedCardsInfo{
	index:number;
	cards:Array<number>;
}
class HuInfo{
	index:number;
	card:number
}
class GangOrPengInfo{
	index:number;
	card:number;
	showedCards:Array<number>;
}