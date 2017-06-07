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
        _this.skinName = "resource/mySkins/roomUISkin.exml";
        _this.init();
        return _this;
    }
    RoomUI.prototype.init = function () {
        this.initView();
        this.initData();
    };
    RoomUI.prototype.initView = function () {
    };
    RoomUI.prototype.initData = function () {
        var playerData = GameModel.getInstance().roomPlayersData;
        console.log(playerData);
        for (var i = 0; i < 4; i++) {
            //我是第几个位置 0-3
            if (playerData[i].name == GlobalConfig.username) {
                this.setPlayer("my", playerData[i]);
                this.setPlayer("right", playerData[(i + 1 > 3 ? i - 3 : i + 1)]);
                this.setPlayer("top", playerData[(i + 2 > 3 ? i - 2 : i + 2)]);
                this.setPlayer("left", playerData[(i + 3 > 3 ? i - 1 : i + 3)]);
            }
        }
        if (playerData[0].name == GlobalConfig.username) {
        }
    };
    /**刷新人名和余额 */
    RoomUI.prototype.setPlayer = function (prefix, data) {
        this[prefix + "NameTxt"].text = data.name;
        this[prefix + "BalanceTxt"].text = data.balance;
    };
    return RoomUI;
}(eui.Component));
__reflect(RoomUI.prototype, "RoomUI");
//# sourceMappingURL=RoomUI.js.map