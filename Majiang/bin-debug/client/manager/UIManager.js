var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager() {
    }
    UIManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    };
    UIManager.prototype.setRoot = function (root) {
        this.root = root;
    };
    UIManager.prototype.openUI = function (cls) {
        if (this.lastui) {
            if (this.lastui["dispose"]) {
                this.lastui["dispose"]();
            }
            this.root.removeChild(this.lastui);
            this.lastui = null;
        }
        var ui = eval("new " + cls);
        this.root.addChild(ui);
        this.lastui = ui;
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map