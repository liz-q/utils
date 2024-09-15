/**
 * @description 给数字或者金额千分位添加逗号
 * @param money 必须传入数字类型
 * @param precision 精度 默认是小数点后两位
 * @param splitDesc 分隔符
 * */
function formatMoney (money: number, precision: number = 2, splitDesc: string = ',') {
	const str = money.toFixed(precision)
	const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
	return str.replace(reg, '$1' + splitDesc)
}
export default formatMoney
