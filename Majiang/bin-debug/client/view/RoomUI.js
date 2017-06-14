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
        _this.roomCommand_dice = 1;
        _this.roomCommand_dealCard = 2;
        _this.roomCommand_lackCard = 3;
        _this.roomCommand_curPlayIndex = 4;
        _this.roomCommand_handleCard = 5;
        _this.roomCommand_playedCard = 6;
        _this.roomCommand_huCard = 7;
        _this.roomCommand_gangCard = 8;
        _this.roomCommand_pengCard = 9;
        _this.roomCommand_gameOver = 10;
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
        this.initPlayers();
    };
    RoomUI.prototype.initView = function () {
    };
    RoomUI.prototype.initListeners = function () {
        MsgListener.getInstance().addListeners(Commands.ROOM_NOTIFY, this);
        this.lackBtn_wan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
        this.lackBtn_tiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
        this.lackBtn_tong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lack, this);
        this.actionBtn_peng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionPeng, this);
        this.actionBtn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGang, this);
        this.actionBtn_hu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionHu, this);
        this.actionBtn_guo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.actionGuo, this);
    };
    RoomUI.prototype.initPlayers = function () {
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
    };
    /**收到推送 */
    RoomUI.prototype.receiveMsg = function (command, data) {
        console.log("收到推送的事件 " + command, data);
        if (command == Commands.ROOM_NOTIFY) {
            if (data.content.roomId) {
                console.log("房间id " + data.content.roomId);
                this.roomId = data.content.roomId;
            }
            switch (data.content.state) {
                case this.roomCommand_dice:
                    this.onDice(data);
                    break;
                case this.roomCommand_dealCard:
                    this.onCards(data);
                    break;
                case this.roomCommand_lackCard:
                    this.onLackCard(data);
                    break;
                case this.roomCommand_curPlayIndex:
                    break;
                case this.roomCommand_handleCard:
                    this.onHandleCards(data);
                    break;
                case this.roomCommand_playedCard:
                    break;
                case this.roomCommand_huCard:
                    break;
                case this.roomCommand_gangCard:
                    break;
                case this.roomCommand_pengCard:
                    break;
                case this.roomCommand_gameOver:
                    this.onGameOver(data);
                    break;
            }
        }
    };
    /**收到骰子和庄家 */
    RoomUI.prototype.onDice = function (data) {
        var dice = data.content.dice;
        var curPlayerIndex = data.content.curPlayIndex;
        console.log("收到骰子结果 ", dice, " 初始庄家 ", curPlayerIndex);
    };
    /**收到发牌，自己的或者别人的 */
    RoomUI.prototype.onCards = function (data) {
        //自己发牌
        if (data.content.addCards && data.content.addCards.length > 0) {
            this.addMyCard(data.content.addCards);
        }
        else if (data.content.otherCardNum) {
            var index = data.content.otherCardNum.index;
            var num = data.content.otherCardNum.num;
            this.setOtherCardNum(index, num);
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
            //通知玩家开始定缺
            this.lackGroup.visible = true;
        }
    };
    /**收到当前出牌人，刷新箭头指向位置 */
    RoomUI.prototype.onCurPlayerIndex = function (data) {
        this.setArrow(data.content.curPlayIndex);
    };
    /**收到可以碰/杠/胡/出牌 */
    RoomUI.prototype.onHandleCards = function (data) {
        /**我可以杠 */
        var gangAble = data.content.gangAble;
        /**我可以胡 */
        var huAble = data.content.huAble;
        /**我可以碰 */
        var pengAble = data.content.pengAble;
        /**我是否可以出牌 */
        var playAble = data.content.playAble;
        if (playAble) {
            this.setPlayCardAble();
        }
        if (gangAble || huAble || pengAble) {
            this.setHandleCard(huAble, gangAble, pengAble);
        }
    };
    /**收到某玩家出过的牌，最后一个元素表示新出的 */
    RoomUI.prototype.onPlayedCards = function (data) {
        var index = data.content.playedCards.index;
        var cards = data.content.playedCards.cards;
        this.showPlayedCard(index, cards.pop());
    };
    /**收到某玩家胡了某张牌 */
    RoomUI.prototype.onHuCard = function (data) {
        var index = data.content.huInfo.index;
        var card = data.content.huInfo.card;
        console.log("玩家" + index + "胡了牌" + "card");
    };
    /**收到某玩家杠了某张牌 */
    RoomUI.prototype.onGangCard = function (data) {
        var index = data.content.gangOrPengInfo.index;
        var card = data.content.gangOrPengInfo.card;
        var showedCards = data.content.gangOrPengInfo.showedCards;
        console.log("玩家" + index + "杠了牌" + "card" + " 他摆出来的牌有 ", showedCards);
    };
    /**收到某玩家碰了某张牌 */
    RoomUI.prototype.onPengCard = function (data) {
        var index = data.content.gangOrPengInfo.index;
        var card = data.content.gangOrPengInfo.card;
        var showedCards = data.content.gangOrPengInfo.showedCards;
        console.log("玩家" + index + "碰了牌" + "card" + " 他摆出来的牌有 ", showedCards);
    };
    /**收到游戏结束 */
    RoomUI.prototype.onGameOver = function (data) {
        console.log("游戏结束");
    };
    /**我要定缺 */
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
        GameController.getInstance().sendLack(this.roomId, this.myseat, str, function (data) {
            if (data.code == 0) {
                console.log("定缺成功");
            }
        }, this);
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
    /**我可以出牌了 */
    RoomUI.prototype.setPlayCardAble = function () {
        var _this = this;
        console.log("我可以出牌");
        var num = this.myCardGroup.numChildren;
        for (var i = 0; i < num; i++) {
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
        GameController.getInstance().sendPlayCard(this.roomId, this.myseat, cardValue, function (data) {
            if (data.code == 0) {
                console.log("出牌成功");
                _this.showPlayedCard(_this.myseat, cardValue);
                _this.mycards.splice(_this.mycards.indexOf(cardValue), 1);
                _this.setMyCards(_this.mycards);
            }
            else {
                console.log("出牌失败");
            }
        }, this);
    };
    /**推荐一张牌到最右边 */
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
    /**设置选择 碰/杠/胡 哪些可以点击 哪些不能点 */
    RoomUI.prototype.setHandleCard = function (huAble, gangAble, pengAble) {
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
        GameController.getInstance().sendPengCard(this.roomId, this.myseat, function (data) {
            if (data.code == 0) {
                console.log("碰牌成功");
            }
            else {
                console.log("碰牌失败");
            }
        }, this);
    };
    /**我要杠牌 */
    RoomUI.prototype.actionGang = function () {
        GameController.getInstance().sendGangCard(this.roomId, this.myseat, function (data) {
            if (data.code == 0) {
                console.log("杠牌成功");
            }
            else {
                console.log("杠牌失败");
            }
        }, this);
    };
    /**我要胡牌 */
    RoomUI.prototype.actionHu = function () {
        GameController.getInstance().sendHuCard(this.roomId, this.myseat, function (data) {
            if (data.code == 0) {
                console.log("胡牌成功");
            }
            else {
                console.log("胡牌失败");
            }
        }, this);
    };
    /**我要过牌 */
    RoomUI.prototype.actionGuo = function () {
        GameController.getInstance().sendGuo(this.roomId, this.myseat, function (data) {
        }, this);
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