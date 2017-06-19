class CardUtil {
	/**
	 * 牌的命名:
	 * 从0到107 先后分别是万条同 1-9
	 * 比如 0123一万 4567二万... 104 105 106 107 九筒
	 * */
	public constructor() {
	}

	public static getCardRourceByNum(n){
		//万
		if(n<36){
			return "wan"+(Math.floor(n/4) +1)+"_png";
		}
		//条
		else if(n<72){
			return "tiao"+(Math.floor((n-36)/4) +1)+"_png";
		}
		//筒
		else{
			return "tong"+(Math.floor((n-72)/4) +1)+"_png";
		}
	}

	/**创建一张牌 
	 * 
	 * num:点数
	 * type:0 我的牌 1我的打开的牌 2右边打开 3上面打开 4左边打开
	*/
	public static getCardViewByNum(num, type){

	}

}