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
        /**我的定缺 */
        _this.myLack = "";
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
        this.actionBtn_peng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionPeng, this);
        this.actionBtn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGang, this);
        this.actionBtn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionHu, this);
        this.actionBtn_guo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGuo, this);
    };
    RoomUI.prototype.initData = function () {
        var playerData = GameModel.getInstance().roomPlayersData;
        this.playerData = playerData;
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
        /**我可以杠 */
        var gangAble = data.content.gangAble;
        /**我可以胡 */
        var huAble = data.content.huAble;
        /**我可以碰 */
        var pengAble = data.content.pengAble;
        /**该谁出牌 */
        var playIndex = data.content.playIndex;
        /**我是否可以出牌 */
        var playAble = data.content.playAble;
        var action = data.content.action;
        var card = data.content.card;
        var index = data.content.index;
        if (action == "play" && card >= 0 && index >= 0) {
            console.log("玩家" + index + "出牌了 " + card);
            this.showPlayedCard(index, card);
        }
        this.setArrow(playIndex);
        //我可以出一张牌
        if (playAble && playIndex == this.myseat) {
            console.log("我可以出牌");
            this.setPlayCardAble();
        }
        if (gangAble || huAble || pengAble) {
            this.onHandleCard(huAble, gangAble, pengAble);
        }
    };
    /**设置箭头指向出牌的人 */
    RoomUI.prototype.setArrow = function (index) {
        this.arrow.visible = true;
        if (index == this.myseat) {
            this.arrow.rotation = 90;
        }
        else if (index % 4 == (this.myseat + 1) % 4) {
            this.arrow.rotation = 0;
        }
        else if (index % 4 == (this.myseat + 2) % 4) {
            this.arrow.rotation = -90;
        }
        else if (index % 4 == (this.myseat + 3) % 4) {
            this.arrow.rotation = 180;
        }
    };
    /**我可以出牌了，给牌加事件 */
    RoomUI.prototype.setPlayCardAble = function () {
        var _this = this;
        var num = this.myCardGroup.numChildren;
        for (var i = 0; i < num; i++) {
            console.log("注册鼠标事件");
            var cardImg = this.myCardGroup.getChildAt(i);
            cardImg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                console.log("点击牌 " + e.target.name);
                if (e.target.y == 900) {
                    _this.onCardChoosed(e.target);
                }
                else if (e.target.y == 860) {
                    _this.onCardOut(e.target);
                }
            }, this);
        }
        this.setSuggestPlayCard();
    };
    /**鼠标选中一张 */
    RoomUI.prototype.onCardChoosed = function (img) {
        var num = this.myCardGroup.numChildren;
        for (var i = 0; i < num; i++) {
            var card = this.myCardGroup.getChildAt(i);
            card.y = 900;
        }
        img.y = 860;
    };
    /**出牌 */
    RoomUI.prototype.onCardOut = function (card) {
        var _this = this;
        var cardValue = parseInt(card.name);
        var data = new BaseMsg();
        data.command = Commands.PLAY_GAME;
        data.content = { "roomId": this.roomId, "index": this.myseat, "state": this.playCommand_playCard, "action": "play", "card": cardValue };
        NetController.getInstance().sendData(data, function (d) {
            if (d.code == 0) {
                console.log("出牌成功");
                _this.showPlayedCard(_this.myseat, cardValue);
                _this.mycards.splice(_this.mycards.indexOf(cardValue), 1);
                _this.setMyCards(_this.mycards);
            }
        }, this);
    };
    /**移一张推荐出的牌到最右边 */
    RoomUI.prototype.setSuggestPlayCard = function () {
        var card = this.myCardGroup.getChildAt(this.myCardGroup.numChildren - 1);
        card.x += 50;
    };
    /**有人出牌了 */
    RoomUI.prototype.showPlayedCard = function (index, card) {
        this.playCardGroup.visible = true;
        this.playedName.text = this.playerData[index].name + "出牌了：";
        this.playedCard.source = CardUtil.getCardRourceByNum(card);
    };
    /**我可以选择 碰/杠/胡/过 了 */
    RoomUI.prototype.onHandleCard = function (huAble, gangAble, pengAble) {
        this.actionGroup.visible = true;
        this.actionBtn_peng.enabled = pengAble;
        this.actionBtn_gang.enabled = gangAble;
        this.actionBtn_hu.enabled = huAble;
        this.actionBtn_peng.alpha = pengAble ? 1 : 0.5;
        this.actionBtn_gang.alpha = gangAble ? 1 : 0.5;
        this.actionBtn_hu.alpha = huAble ? 1 : 0.5;
    };
    /**我要碰牌 */
    RoomUI.prototype.actionPeng = function () {
    };
    /**我要杠牌 */
    RoomUI.prototype.actionGang = function () {
    };
    /**我要胡牌 */
    RoomUI.prototype.actionHu = function () {
    };
    /**我要过牌 */
    RoomUI.prototype.actionGuo = function () {
    };
    /**派彩 */
    RoomUI.prototype.onPayout = function (data) {
    };
    /**刷新自己的牌数据 */
    RoomUI.prototype.addMyCard = function (arr) {
        this.mycards = this.mycards.concat(arr);
        this.setMyCards(this.mycards);
    };
    /**将牌按定缺的花色排序，缺的花色排在后面, 没有定缺就按万条同排序 */
    RoomUI.prototype.sortCard = function (arr) {
        var lack = this.myLack;
        if (lack.length > 0) {
            //定缺的花色
            var arr1 = [];
            //不是缺的花色
            var arr2 = [];
            if (lack == "wan") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] < 36) {
                        arr2.push(arr[i]);
                    }
                    else {
                        arr1.push(arr[i]);
                    }
                }
            }
            else if (lack == "tiao") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] >= 36 && arr[i] < 72) {
                        arr2.push(arr[i]);
                    }
                    else {
                        arr1.push(arr[i]);
                    }
                }
            }
            else if (lack == "tong") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] >= 72) {
                        arr2.push(arr[i]);
                    }
                    else {
                        arr1.push(arr[i]);
                    }
                }
            }
            arr1.sort(function (a, b) {
                return parseInt(a) - parseInt(b);
            });
            arr2.sort(function (a, b) {
                return parseInt(a) - parseInt(b);
            });
            return arr1.concat(arr2);
        }
        else {
            arr.sort(function (a, b) {
                return parseInt(a) - parseInt(b);
            });
            return arr;
        }
    };
    /**刷新自己的牌显示 */
    RoomUI.prototype.setMyCards = function (arr) {
        this.myCardGroup.removeChildren();
        arr = this.sortCard(arr);
        console.log("排序之后的牌", arr);
        //显示牌的中心点是960 每个牌宽100
        var startx = 960 - arr.length * 50;
        for (var i = 0; i < arr.length; i++) {
            var src = CardUtil.getCardRourceByNum(arr[i]);
            var img = new eui.Image(src);
            img.x = startx + i * 100;
            img.y = 900;
            img.name = arr[i] + "";
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