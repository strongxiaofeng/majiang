class UIManager {
	private static _instance:UIManager;
	private root:eui.UILayer;
	private lastui:eui.Component;

	private constructor() {
	}

	public static getInstance() : UIManager{
		if(!this._instance){
			this._instance = new UIManager();
		}
		return this._instance;
	}

	public setRoot(root:eui.UILayer){
		this.root = root;
	}

	public openUI(cls:string){
		if(this.lastui){
			if(this.lastui["dispose"]){
				this.lastui["dispose"]();
			}
			this.root.removeChild(this.lastui);
			this.lastui = null;
		}

		var ui = eval("new "+cls);
		this.root.addChild(ui);
		this.lastui = ui;
	}
}