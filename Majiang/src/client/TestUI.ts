class TestUI extends eui.Component{
	private urlTxt: eui.TextInput;
	private reqTypeTxt: eui.TextInput;
	private sendBtn: eui.Button;
	private resultTxt: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/mySkins/testUISkin.exml";

		this.initListeners();
	}

	private initListeners():void{
		this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSendBtn, this);
	}

	private clickSendBtn(e: egret.TouchEvent): void{
		var url = this.urlTxt.text;
		var type = this.reqTypeTxt.text;
		var self = this;
		if(url.length > 0) {
			var req = new XMLHttpRequest();
			//回调方法
			req.onreadystatechange = function(){
				if(req.readyState == 4){
					if(req.status == 200){
						var message=req.responseText;
						self.resultTxt.text = message;
						console.log(message);
					}
					else{
						console.log("返回其他状态 "+req.status);
					}

				}
			}
			req.open(type, url, true);
			if(type.toUpperCase() == "POST"){
				req.setRequestHeader("Content-type","application/x-www-four-urlencoded");
			}
			req.send();
		}
	}

	
}