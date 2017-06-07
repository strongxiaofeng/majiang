class GameModel {
	private static _instance:GameModel;
	private _roomPlayersData:any;

	private constructor() {
	}
	public static getInstance():GameModel{
		if(!this._instance){
			this._instance = new GameModel();
		}
		return this._instance;
	}

	public set roomPlayersData(data:any){
		this._roomPlayersData = data;
	}

	public get roomPlayersData(): any{
		return this._roomPlayersData;
	}
	
}