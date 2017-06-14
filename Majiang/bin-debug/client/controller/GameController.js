var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**先只管发消息，收消息让View自己收 */
var GameController = (function () {
    function GameController() {
        /**玩家发送的操作码 定缺，出牌， 碰, 杠, 胡, 过*/
        this.playCommand_lackCard = 1;
        this.playCommand_playCard = 2;
        this.playCommand_pengCard = 3;
        this.playCommand_gangCard = 4;
        this.playCommand_huCard = 5;
        this.playCommand_guoCard = 6;
        this.initListener();
    }
    GameController.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameController();
        }
        return this._instance;
    };
    GameController.prototype.initListener = function () {
        // MsgListener.getInstance().addListeners(Commands.ROOM_NOTIFY, this);
    };
    /**收到推送 */
    GameController.prototype.receiveMsg = function (command, data) {
    };
    /**发送定缺 */
    GameController.prototype.sendLack = function (roomId, index, lack, callback, thisobj) {
        if (callback === void 0) { callback = null; }
        if (thisobj === void 0) { thisobj = null; }
        var data = new RoomActionVO();
        data.command = Commands.PLAY_GAME;
        data.content = new RoomActionContent();
        data.content.roomId = roomId;
        data.content.index = index;
        data.content.state = this.playCommand_lackCard;
        data.content.lack = lack;
        NetController.getInstance().sendData(data, callback, thisobj);
    };
    /**发送出牌 */
    GameController.prototype.sendPlayCard = function (roomId, index, card, callback, thisobj) {
        if (callback === void 0) { callback = null; }
        if (thisobj === void 0) { thisobj = null; }
        var data = new RoomActionVO();
        data.command = Commands.PLAY_GAME;
        data.content = new RoomActionContent();
        data.content.roomId = roomId;
        data.content.index = index;
        data.content.state = this.playCommand_playCard;
        data.content.card = card;
        NetController.getInstance().sendData(data, callback, thisobj);
    };
    /**发送碰牌 */
    GameController.prototype.sendPengCard = function (roomId, index, callback, thisobj) {
        if (callback === void 0) { callback = null; }
        if (thisobj === void 0) { thisobj = null; }
        var data = new RoomActionVO();
        data.command = Commands.PLAY_GAME;
        data.content = new RoomActionContent();
        data.content.roomId = roomId;
        data.content.index = index;
        data.content.state = this.playCommand_pengCard;
        NetController.getInstance().sendData(data, callback, thisobj);
    };
    /**发送杠牌 */
    GameController.prototype.sendGangCard = function (roomId, index, callback, thisobj) {
        if (callback === void 0) { callback = null; }
        if (thisobj === void 0) { thisobj = null; }
        var data = new RoomActionVO();
        data.command = Commands.PLAY_GAME;
        data.content = new RoomActionContent();
        data.content.roomId = roomId;
        data.content.index = index;
        data.content.state = this.playCommand_gangCard;
        NetController.getInstance().sendData(data, callback, thisobj);
    };
    /**发送胡牌 */
    GameController.prototype.sendHuCard = function (roomId, index, callback, thisobj) {
        if (callback === void 0) { callback = null; }
        if (thisobj === void 0) { thisobj = null; }
        var data = new RoomActionVO();
        data.command = Commands.PLAY_GAME;
        data.content = new RoomActionContent();
        data.content.roomId = roomId;
        data.content.index = index;
        data.content.state = this.playCommand_huCard;
        NetController.getInstance().sendData(data, callback, thisobj);
    };
    /**发送过牌 */
    GameController.prototype.sendGuo = function (roomId, index, callback, thisobj) {
        if (callback === void 0) { callback = null; }
        if (thisobj === void 0) { thisobj = null; }
        var data = new RoomActionVO();
        data.command = Commands.PLAY_GAME;
        data.content = new RoomActionContent();
        data.content.roomId = roomId;
        data.content.index = index;
        data.content.state = this.playCommand_guoCard;
        NetController.getInstance().sendData(data, callback, thisobj);
    };
    return GameController;
}());
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map