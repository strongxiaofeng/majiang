
/**先只管发消息，收消息让View自己收 */
class GameController {
	private static _instance:GameController;

	/**玩家发送的操作码 定缺，出牌， 碰, 杠, 胡, 过*/
	private playCommand_lackCard = 1;
	private playCommand_playCard = 2;
	private playCommand_pengCard = 3;
	private playCommand_gangCard = 4;
	private playCommand_huCard = 5;
	private playCommand_guoCard = 6;

	private constructor() {
		this.initListener();
	}
	public static getInstance ():GameController{
		if(!this._instance){
			this._instance = new GameController();
		}
		return this._instance;
	}

	private initListener(): void{
		// MsgListener.getInstance().addListeners(Commands.ROOM_NOTIFY, this);
	}

	/**收到推送 */
	public receiveMsg(command, data):void {
	}
	
	/**发送定缺 */
	public sendLack(roomId:number, index:number, lack:string, callback:Function=null, thisobj:any=null): void{
		var data = new RoomActionVO();
		data.command = Commands.PLAY_GAME;
		data.content = new RoomActionContent();
		data.content.roomId = roomId;
		data.content.index = index;
		data.content.state = this.playCommand_lackCard;
		data.content.lack = lack;
		NetController.getInstance().sendData(data, callback, thisobj);
	}
	/**发送出牌 */
	public sendPlayCard(roomId:number, index:number, card:number, callback:Function=null, thisobj:any=null): void{
		var data = new RoomActionVO();
		data.command = Commands.PLAY_GAME;
		data.content = new RoomActionContent();
		data.content.roomId = roomId;
		data.content.index = index;
		data.content.state = this.playCommand_playCard;
		data.content.card = card;
		NetController.getInstance().sendData(data, callback, thisobj);
	}
	/**发送碰牌 */
	public sendPengCard(roomId:number, index:number, callback:Function=null, thisobj:any=null): void{
		var data = new RoomActionVO();
		data.command = Commands.PLAY_GAME;
		data.content = new RoomActionContent();
		data.content.roomId = roomId;
		data.content.index = index;
		data.content.state = this.playCommand_pengCard;
		NetController.getInstance().sendData(data, callback, thisobj);
	}
	/**发送杠牌 */
	public sendGangCard(roomId:number, index:number, callback:Function=null, thisobj:any=null): void{
		var data = new RoomActionVO();
		data.command = Commands.PLAY_GAME;
		data.content = new RoomActionContent();
		data.content.roomId = roomId;
		data.content.index = index;
		data.content.state = this.playCommand_gangCard;
		NetController.getInstance().sendData(data, callback, thisobj);
	}
	/**发送胡牌 */
	public sendHuCard(roomId:number, index:number, callback:Function=null, thisobj:any=null): void{
		var data = new RoomActionVO();
		data.command = Commands.PLAY_GAME;
		data.content = new RoomActionContent();
		data.content.roomId = roomId;
		data.content.index = index;
		data.content.state = this.playCommand_huCard;
		NetController.getInstance().sendData(data, callback, thisobj);
	}
	/**发送过牌 */
	public sendGuo(roomId:number, index:number, callback:Function=null, thisobj:any=null): void{
		var data = new RoomActionVO();
		data.command = Commands.PLAY_GAME;
		data.content = new RoomActionContent();
		data.content.roomId = roomId;
		data.content.index = index;
		data.content.state = this.playCommand_guoCard;
		NetController.getInstance().sendData(data, callback, thisobj);
	}


}