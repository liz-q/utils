/**
 * @description 验证是否是数字类型
 * */
function isNumber (num: any): boolean {
	return num !== '' && num !== null && !isNaN(num)
}
export default isNumber
