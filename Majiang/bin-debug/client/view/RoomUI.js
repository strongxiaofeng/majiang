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
        MsgListener.getInstance().addListeners(Commands.STATE_DEAL_CARDS, this);
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
        switch (command) {
            case Commands.STATE_DEAL_CARDS:
                this.onCards(data);
                break;
            case Commands.STATE_PLAY_CARD:
                this.onPlayCard(data);
                break;
            case Commands.STATE_PENG_CARD:
                this.onPengCard(data);
                break;
            case Commands.STATE_PAYOUT:
                this.onPayout(data);
                break;
        }
    };
    /**收到新牌，自己的或者别人的 */
    RoomUI.prototype.onCards = function (data) {
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
    /**该某人出牌了 */
    RoomUI.prototype.onPlayCard = function (data) {
        var index = data.index;
        //该我出牌
        if (index == this.myseat) {
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
        this.mycards.sort();
        this.setMyCards(this.mycards);
    };
    /**刷新自己的牌显示 */
    RoomUI.prototype.setMyCards = function (arr) {
        this.myCardGroup.removeChildren();
        //显示牌的中心点是960 每个牌宽100
        var startx = 960 - arr.length * 50;
        for (var i = 0; i < arr.length; i++) {
            var src = CardUtil.getCardRourceByNum(arr[i]);
            var img = new eui.Image(src);
            img.x = startx + i * 100;
            img.y = 900;
            this.myCardGroup.addChild(img);
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