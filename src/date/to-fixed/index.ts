import isNumber from '../../validation/is-number'

const round = (num: number, digit: number) => {
	let digitStr = '1'
	for (let i = 0; i < digit; i ++) {
		digitStr += 0
	}
	const power = parseInt(digitStr)
	num = Math.round(num * power) / power
	return num.toFixed(digit)
}

/**
 * @description 数字保留指定精度
 * @param num 数字
 * @param digit 精度
 * @param isOriginal 是否使用原生 toFixed 四舍五入机制（银行家舍入法），默认为 false
 * */
function toFixed (num: number, digit: number = 2, isOriginal: boolean = false): number | boolean {
	return isNumber(num) && parseFloat(isOriginal ? num.toFixed(digit) : round(num, digit))
}
export default toFixed
