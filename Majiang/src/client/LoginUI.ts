class LoginUI extends eui.Component{

	private loginGroup: eui.Group;
	private nameInput: eui.TextInput;
	private passInput: eui.TextInput;
	private loginBtn:eui.Button;
	private registerBtn:eui.Button;

	private registerGroup: eui.Group;
	private nameInput1: eui.TextInput;
	private passInput1: eui.TextInput;
	private returnBtn:eui.Button;
	private registerBtn1:eui.Button;



	public constructor() {
		super();
		this.skinName = ("resource/mySkins/loginUISkin.exml");

		this.init();

		NetController.getInstance().connect();
	}

	private init(): void{
		this.loginGroup.visible = true;
		this.registerGroup.visible = false;
		// this.nameInput.textDisplay.size = 30;
		// this.nameInput1.textDisplay.size = 50;
		// this.passInput.textDisplay.size = 50;
		// this.passInput1.textDisplay.size = 50;

		this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendLogin, this);
		this.registerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRegister, this);
		this.registerBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendRegister, this);
		this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeLogin, this);
	}

	private sendLogin(): void{
		var name = this.nameInput.text;
		var psw = this.passInput.text;

		var data = new BaseMsg();
		data.command = Commands.LOGIN;
		data.content = {"name":name, "password":psw};
		NetController.getInstance().sendData(data, this.loginBack, this);
	}
	private loginBack(data:BaseMsg): void{
		let code = data.code;
		if(code==0) {
			console.log("登录成功");
		}
		else{
			console.log("登录失败");
		}
	}
	private sendRegister(): void{
		var name = this.nameInput1.text;
		var psw = this.passInput1.text;

		var data = new BaseMsg();
		data.command = Commands.REGISTER;
		data.content = {"name":name, "password":psw};
		NetController.getInstance().sendData(data, this.registerBack, this);
		
		GlobalConfig.name = name;
		
	}
	private registerBack(data:BaseMsg): void{
		let code = data.code;
		if(code==0) {
			console.log("注册成功");
        	UIManager.getInstance().openUI("MainUI");
		}
		else{
			console.log("注册失败");
		}
	}

	private changeRegister(): void{
		this.loginGroup.visible = false;
		this.registerGroup.visible = true;
	}
	private changeLogin(): void{
		this.loginGroup.visible = true;
		this.registerGroup.visible = false;
	}
}