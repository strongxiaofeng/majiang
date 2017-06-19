var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card = (function (_super) {
    __extends(Card, _super);
    /**new 一张牌，以左上为x */
    function Card(location, type, num) {
        if (num === void 0) { num = -1; }
        var _this = _super.call(this) || this;
        /**各个位置的牌大小配置 */
        _this.sizeConfig = {
            0: [
                ["cardbg_my_png", 100, 160, 100, 127],
                ["cardbg_my_open_png", 57, 81, 57, 62],
                ["cardbg_my_open_png", 57, 81, 57, 62]
            ],
            1: [
                ["cardbg_left_png", 17, 43],
                ["cardbg_left_open_png", 48, 39, 48, 29],
                ["cardbg_left_open_png", 48, 39, 48, 29]
            ],
            2: [
                ["cardbg_top_png", 66, 98],
                ["cardbg_top_open_png", 57, 81, 57, 62],
                ["cardbg_top_open_png", 57, 81, 57, 62]
            ],
            3: [
                ["cardbg_left_png", 17, 43],
                ["cardbg_left_open_png", 48, 39, 48, 29],
                ["cardbg_left_open_png", 48, 39, 48, 29]
            ]
        };
        _this.location = location;
        _this.type = type;
        _this.num = num;
        _this.init();
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    Card.prototype.init = function () {
        var bgsrc = this.sizeConfig[this.location][this.type][0];
        var bgwidth = this.sizeConfig[this.location][this.type][1];
        var bgheight = this.sizeConfig[this.location][this.type][2];
        var numwidth = this.sizeConfig[this.location][this.type][3];
        var numheight = this.sizeConfig[this.location][this.type][4];
        var bg = new eui.Image(bgsrc);
        bg.width = bgwidth;
        bg.height = bgheight;
        bg.anchorOffsetX = bgwidth / 2;
        bg.anchorOffsetY = bgheight / 2;
        this.addChild(bg);
        if (this.location == 1 && this.type == 0) {
            bg.scaleX = -1;
        }
        if (numwidth && numheight) {
            var numImg = new eui.Image(CardUtil.getCardRourceByNum(this.num));
            numImg.width = numwidth;
            numImg.height = numheight;
            numImg.anchorOffsetX = numwidth / 2;
            numImg.anchorOffsetY = numheight / 2;
            this.addChild(numImg);
            if (this.location == 0 && this.type == 0) {
                numImg.y = bgheight / 2 - numheight / 2;
            }
            else {
                numImg.y = -bgheight / 2 + numheight / 2;
            }
            //右侧的牌 花色旋转-90
            if (this.location == 1 && this.type != 0) {
                numImg.rotation = -90;
                numImg.width = numheight;
                numImg.height = numwidth;
                numImg.anchorOffsetX = numheight / 2;
                numImg.anchorOffsetY = numwidth / 2;
            }
            else if (this.location == 3 && this.type != 0) {
                numImg.rotation = 90;
                numImg.width = numheight;
                numImg.height = numwidth;
                numImg.anchorOffsetX = numheight / 2;
                numImg.anchorOffsetY = numwidth / 2;
            }
        }
    };
    return Card;
}(egret.DisplayObjectContainer));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map