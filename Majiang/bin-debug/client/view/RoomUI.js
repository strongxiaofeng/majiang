var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomUI = (function (_super) {
    __extends(RoomUI, _super);
    function RoomUI() {
        var _this = _super.call(this) || this;
        _this.playCommand_sendCard = 0;
        _this.playCommand_lackCard = 1;
        _this.playCommand_playCard = 2;
        _this.playCommand_payout = 3;
        /**我的牌数据 */
        _this.mycards = [];
        _this.skinName = "resource/mySkins/roomUISkin.exml";
        _this.init();
        return _this;
    }
    RoomUI.prototype.init = function () {
        this.initView();
        this.initListeners();
        this.initData();
    };
    RoomUI.prototype.initView = function () {
    };
    RoomUI.prototype.initListeners = function () {
        MsgListener.getInstance().addListeners(Commands.PLAY_GAME, this);
        this.lackBtn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
        this.lackBtn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
        this.lackBtn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
    };
    RoomUI.prototype.initData = function () {
        var playerData = GameModel.getInstance().roomPlayersData;
        console.log(playerData);
        for (var i = 0; i < 4; i++) {
            //我是第几个位置 0-3
            if (playerData[i].name == GlobalConfig.username) {
                this.myseat = i;
                this.setPlayer("my", playerData[i]);
                this.setPlayer("right", playerData[(i + 1 > 3 ? i - 3 : i + 1)]);
                this.setPlayer("top", playerData[(i + 2 > 3 ? i - 2 : i + 2)]);
                this.setPlayer("left", playerData[(i + 3 > 3 ? i - 1 : i + 3)]);
            }
        }
        if (playerData[0].name == GlobalConfig.username) {
        }
    };
    /**收到推送 */
    RoomUI.prototype.receiveMsg = function (command, data) {
        console.log("收到推送的事件 " + command, data);
        if (command == Commands.PLAY_GAME) {
            switch (data.content.state) {
                case this.playCommand_sendCard:
                    this.onCards(data);
                    break;
                case this.playCommand_lackCard:
                    this.onLackCard(data);
                    break;
                case this.playCommand_playCard:
                    this.onPlayCard(data);
                    break;
                case this.playCommand_payout:
                    this.onPayout(data);
                    break;
            }
        }
    };
    /**收到新牌，自己的或者别人的 */
    RoomUI.prototype.onCards = function (data) {
        if (data.content.roomId) {
            console.log("房间id " + data.content.roomId);
            this.roomId = data.content.roomId;
        }
        //自己发牌
        if (data.content.addCards) {
            this.addMyCard(data.content.addCards);
        }
        else if (data.content.otherCardNum) {
            var otherCardNum = data.content.otherCardNum;
            for (var index in otherCardNum) {
                this.setOtherCardNum(index, otherCardNum[index]);
            }
        }
        this.setLeftCardNum(data.content.leftCardsNum);
    };
    /**收到定缺消息 */
    RoomUI.prototype.onLackCard = function (data) {
        var arr = data.content.lackCards;
        if (arr && arr.length > 0) {
            //告知所有人的定缺
            console.log("收到所有人的定缺消息 ", arr);
            var i = this.myseat;
            this.myLack = arr[i];
            this.setMyCards(this.mycards);
            this.myLackImg.source = "lack" + arr[i] + "_png";
            i++;
            if (i > 3)
                i -= 3;
            this.rightLackImg.source = "lack" + arr[i] + "_png";
            i++;
            if (i > 3)
                i -= 3;
            this.topLackImg.source = "lack" + arr[i] + "_png";
            i++;
            if (i > 3)
                i -= 3;
            this.leftLackImg.source = "lack" + arr[i] + "_png";
        }
        else {
            //通知定缺
            this.lackGroup.visible = true;
        }
    };
    /**定缺 */
    RoomUI.prototype.lack = function (e) {
        this.lackGroup.visible = false;
        var str = "";
        if (e.target == this.lackBtn_wan) {
            str = "wan";
        }
        else if (e.target == this.lackBtn_tiao) {
            str = "tiao";
        }
        else if (e.target == this.lackBtn_tong) {
            str = "tong";
        }
        var data = new BaseMsg();
        data.command = Commands.PLAY_GAME;
        data.content = { "roomId": this.roomId, "index": this.myseat, "state": this.playCommand_lackCard, "lackCard": str };
        NetController.getInstance().sendData(data, function (d) {
            if (d.code == 0) {
            }
        }, this);
    };
    /**该某人做动作了 */
    RoomUI.prototype.onPlayCard = function (data) {
        var gangAble = data.content.gangAble;
        var huAble = data.content.huAble;
        var pengAble = data.content.pengAble;
        var playAble = data.content.playAble;
        //我可以出一张牌
        if (playAble) {
            console.log("我可以出牌");
            mouse.setMouseMoveEnabled(true);
            var num = this.myCardGroup.numChildren;
            for (var i = 0; i < num; i++) {
                console.log("注册鼠标事件");
                var card = this.myCardGroup.getChildAt(i);
                card.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (e.target.y == 900) {
                        e.target.y = 850;
                    }
                    else if (e.target.y == 850) {
                        e.target.y = 900;
                    }
                }, this);
            }
        }
        else {
        }
    };
    /**鼠标悬停到麻将上 */
    RoomUI.prototype.onCardOver = function (e) {
        var card = e.target;
        console.log(card);
        card.y = 870;
    };
    /**鼠标离开麻将 */
    RoomUI.prototype.onCardOut = function (e) {
        var card = e.target;
        console.log(card);
        card.y = 900;
    };
    /**我可以选择 碰/杠/胡/过 了 */
    RoomUI.prototype.onPengCard = function (data) {
    };
    /**派彩 */
    RoomUI.prototype.onPayout = function (data) {
    };
    /**刷新自己的牌数据 */
    RoomUI.prototype.addMyCard = function (arr) {
        this.mycards = this.mycards.concat(arr);
        this.setMyCards(this.mycards);
    };
    /**刷新自己的牌显示 */
    RoomUI.prototype.setMyCards = function (arr) {
        this.myCardGroup.removeChildren();
        arr.sort();
        //显示牌的中心点是960 每个牌宽100
        var startx = 960 - arr.length * 50;
        for (var i = 0; i < arr.length; i++) {
            var src = CardUtil.getCardRourceByNum(arr[i]);
            var img = new eui.Image(src);
            img.x = startx + i * 100;
            img.y = 900;
            this.myCardGroup.addChild(img);
            if (this.myLack == "wan" && arr[i] < 36) {
                img.alpha = 0.6;
            }
            else if (this.myLack == "tiao" && arr[i] >= 36 && arr[i] < 72) {
                img.alpha = 0.6;
            }
            else if (this.myLack == "tong" && arr[i] >= 72) {
                img.alpha = 0.6;
            }
        }
    };
    /**刷新别人的牌数 */
    RoomUI.prototype.setOtherCardNum = function (index, n) {
        if (index != 0 || index != 1 || index != 2 || index != 3) {
            return;
        }
    };
    /**刷新人名和余额 */
    RoomUI.prototype.setPlayer = function (prefix, data) {
        this[prefix + "NameTxt"].text = data.name;
        this[prefix + "BalanceTxt"].text = data.balance;
    };
    /**刷新剩余牌数 */
    RoomUI.prototype.setLeftCardNum = function (n) {
        this.leftCardTxt.text = "还剩牌:" + n;
    };
    return RoomUI;
}(eui.Component));
__reflect(RoomUI.prototype, "RoomUI");
//# sourceMappingURL=RoomUI.js.map