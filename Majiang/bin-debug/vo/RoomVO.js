var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomVO = (function (_super) {
    __extends(RoomVO, _super);
    function RoomVO() {
        return _super.call(this) || this;
    }
    return RoomVO;
}(BaseVO));
__reflect(RoomVO.prototype, "RoomVO");
var RoomContent = (function () {
    function RoomContent() {
    }
    return RoomContent;
}());
__reflect(RoomContent.prototype, "RoomContent");
var OtherCardNum = (function () {
    function OtherCardNum() {
    }
    return OtherCardNum;
}());
__reflect(OtherCardNum.prototype, "OtherCardNum");
var PlayedCardsInfo = (function () {
    function PlayedCardsInfo() {
    }
    return PlayedCardsInfo;
}());
__reflect(PlayedCardsInfo.prototype, "PlayedCardsInfo");
var HuInfo = (function () {
    function HuInfo() {
    }
    return HuInfo;
}());
__reflect(HuInfo.prototype, "HuInfo");
var GangOrPengInfo = (function () {
    function GangOrPengInfo() {
    }
    return GangOrPengInfo;
}());
__reflect(GangOrPengInfo.prototype, "GangOrPengInfo");
//# sourceMappingURL=RoomVO.js.map