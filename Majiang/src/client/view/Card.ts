class Card extends egret.DisplayObjectContainer{
	/**牌的位置 0自己 1右 2上 3左*/
	private location:number;
	/**牌的类型 0手上的牌 1摆出来的牌 2打出牌的牌*/
	private type:number;
	/**牌的点数 */
	public num:number;

	/**各个位置的牌大小配置 */
	public static sizeConfig = {
		0:[
			["cardbg_my_png",100,160,100,127],
			["cardbg_my_open_png",57,81,57,62],
			["cardbg_my_open_png",57,81,57,62]
		],
		1:[
			["cardbg_left_png",17,43],
			["cardbg_left_open_png",48,39,48,29],
			["cardbg_left_open_png",48,39,48,29]
		],
		2:[
			["cardbg_top_png",66,98],
			["cardbg_top_open_png",57,81,57,62],
			["cardbg_top_open_png",57,81,57,62]
		],
		3:[
			["cardbg_left_png",17,43],
			["cardbg_left_open_png",48,39,48,29],
			["cardbg_left_open_png",48,39,48,29]
		]
	}

	/**new 一张牌，以左上为x */
	public constructor(location:number, type:number, num:number=-1) {
		super();
		this.location = location;
		this.type = type;
		this.num = num;

		this.init();

		this.touchEnabled = true;
		this.touchChildren = false;
	}

	private init(): void{
		var bgsrc = Card.sizeConfig[this.location][this.type][0];
		var bgwidth = Card.sizeConfig[this.location][this.type][1];
		var bgheight = Card.sizeConfig[this.location][this.type][2];
		var numwidth = Card.sizeConfig[this.location][this.type][3];
		var numheight = Card.sizeConfig[this.location][this.type][4];


		var bg = new eui.Image(bgsrc);
		bg.width = bgwidth;
		bg.height = bgheight;
		bg.anchorOffsetX = bgwidth/2;
		bg.anchorOffsetY = bgheight/2;
		this.addChild(bg);
		if(this.location==1 && this.type==0){
			bg.scaleX = -1;
		}

		if(numwidth && numheight){
			var numImg = new eui.Image(CardUtil.getCardRourceByNum(this.num));
			numImg.width = numwidth;
			numImg.height = numheight;
			numImg.anchorOffsetX = numwidth/2;
			numImg.anchorOffsetY = numheight/2;
			this.addChild(numImg);

			if(this.location == 0 && this.type == 0){
				numImg.y = bgheight/2 - numheight/2;
			}
			else{
				numImg.y = -bgheight/2+numheight/2;
			}

			//右侧的牌 花色旋转-90
			if(this.location == 1 && this.type != 0){
				numImg.rotation = -90;
				numImg.width = numheight;
				numImg.height = numwidth;
				numImg.anchorOffsetX = numheight/2;
				numImg.anchorOffsetY = numwidth/2;
			}
			//坐侧的牌 花色旋转90
			else if(this.location == 3 && this.type != 0){
				numImg.rotation = 90;
				numImg.width = numheight;
				numImg.height = numwidth;
				numImg.anchorOffsetX = numheight/2;
				numImg.anchorOffsetY = numwidth/2;
			}
		}
	}
}