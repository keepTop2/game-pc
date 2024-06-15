/**
 *  @describe 一些公共方法
 */
class Common {


	// 密码正则
	static passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;


	// 新增会员手机号码      ---     11位数字
	static addPhoneNumber = /^(?!1(70|71|67|62|46))1[0-9]\d{9}$/;

	// 邮箱正则
	static emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

	// 比率正则 （匹配0-100的两位小数）
	static ratioReg = /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/;

	// 正负整数正则
	static positiNegatiInt = /^((?!^-?\d*$).)*$/;

	// 0-7位数字正则
	static quotaReg = /^[0-9]{0,7}$/;
	//验证码6位正则
	static codeReg = /^[0-9]\d{5}$/;

	/**
	 *  @describe 三位数分割逗号
	 */
	static thousands(num: number) {
		if (num || num == 0) {
			var str = String(num);
			var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
			return str.replace(reg, '$1,');
		}
		return '';
	}
	/**
	 * @description 转换银行卡号
	 */
	static bankCardHiding(number: string) {
		if (number) {
			const hiddenChars = ' **** **** ';
			const visibleChars = number.slice(0, 4) + hiddenChars + number.slice(-4);
			return visibleChars;
		}
	}
	/**
	 * @description 转换USDT地址
	 */
	static USDTAddressHiding(number: string) {
		if (number) {
			if (number === '**** **** **** ****') {
				return number;
			} else {
				const hiddenChars = ' **** **** ';
				const visibleChars = number.slice(0, 6) + hiddenChars + number.slice(-6);
				return visibleChars;
			}
		}
	}
	/**
	 * @description 转换姓名
	 */
	static userNameHiding(number: string) {
		if (number) {
			const hiddenChars = '*';
			const hiddenChars1 = '**';
			let visibleChars;
			if (number.length == 4) {
				visibleChars = number.slice(0, 1) + hiddenChars1 + number.slice(3);
			} else {
				visibleChars = number.slice(0, 1) + hiddenChars + number.slice(2);
			}

			return visibleChars;
		}
	}

	/**
	 * @description 保留二位小数
	 * @param
	 */

	static moneyFormat(money: any) {
		let total = String(money);
		//没有小数补齐这个0
		if (total.indexOf('.') == -1) {
			total = total + '.00';
		} else {
			//有小数截取前二位小数
			total = total.substring(0, total.indexOf('.') + 3);
		}
		return total;
	}

	/**
	 * @param name
	 * @returns boolean
	 * @description 判断是否有效真实姓名
	 */
	static isActualName(name: string): boolean {
		if (!name) {
			return false;
		}
		const isHavaPeriod = name.indexOf('。');
		if (isHavaPeriod != -1) {
			return false;
		}

		const pointIndexOf = name.indexOf('.');
		// const pointLastindexOf = name.lastIndexOf("·")
		if (pointIndexOf == 0) {
			return false;
		}
		//替换.
		name = name.replace('.', '');
		name = name.replace('·', '');
		// console.log(name)
		//正则
		const pattern = /^[\u4e00-\u9fa5a-zA-Z.]+$/;
		if (!pattern.test(name)) {
			return false;
		}
		return true;
	}
}

export default Common;
