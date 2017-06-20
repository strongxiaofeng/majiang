
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libsrc/mouse/bin/mouse/mouse.js",
	"polyfill/promise.js",
	"bin-debug/vo/BaseVO.js",
	"bin-debug/client/controller/GameController.js",
	"bin-debug/client/GlobalConfig.js",
	"bin-debug/client/manager/UIManager.js",
	"bin-debug/client/model/GameModel.js",
	"bin-debug/client/util/CardUtil.js",
	"bin-debug/client/view/Card.js",
	"bin-debug/client/view/LoginUI.js",
	"bin-debug/client/view/MainUI.js",
	"bin-debug/client/view/RoomUI.js",
	"bin-debug/vo/RoomVO.js",
	"bin-debug/Main.js",
	"bin-debug/net/Commands.js",
	"bin-debug/net/MsgListener.js",
	"bin-debug/net/NetController.js",
	"bin-debug/net/WS.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/vo/RoomActionVO.js",
	"bin-debug/LoadingUI.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1920,
		contentHeight: 1080,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};