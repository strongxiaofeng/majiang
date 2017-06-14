class RoomActionVO extends BaseVO{
	public constructor() {
		super();
	}
	public content: RoomActionContent;
}

class RoomActionContent{
	public roomId:number;
	public index:number;
	public name:string;
	/**操作类型 定缺，出牌， 碰, 杠, 胡, 过 */
	public state:number;
	public lack:string;
	public card:number;
}