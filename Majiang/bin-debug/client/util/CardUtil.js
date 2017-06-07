var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardUtil = (function () {
    /**
     * 牌的命名:
     * 从0到107 先后分别是万条同 1-9
     * 比如 0123一万 4567二万... 104 105 106 107 九筒
     * */
    function CardUtil() {
    }
    CardUtil.getCardRourceByNum = function (n) {
        //万
        if (n < 36) {
            return "wan" + (Math.floor(n / 4) + 1) + "_png";
        }
        else if (n < 72) {
            return "tiao" + (Math.floor((n - 36) / 4) + 1) + "_png";
        }
        else {
            return "tong" + (Math.floor((n - 72) / 4) + 1) + "_png";
        }
    };
    return CardUtil;
}());
__reflect(CardUtil.prototype, "CardUtil");
//# sourceMappingURL=CardUtil.js.map