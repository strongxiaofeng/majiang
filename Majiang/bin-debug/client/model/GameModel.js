var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameModel = (function () {
    function GameModel() {
    }
    GameModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameModel();
        }
        return this._instance;
    };
    Object.defineProperty(GameModel.prototype, "roomPlayersData", {
        get: function () {
            return this._roomPlayersData;
        },
        set: function (data) {
            this._roomPlayersData = data;
        },
        enumerable: true,
        configurable: true
    });
    return GameModel;
}());
__reflect(GameModel.prototype, "GameModel");
//# sourceMappingURL=GameModel.js.map