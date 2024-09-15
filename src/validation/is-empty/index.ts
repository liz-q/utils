/**
 * @description 验证值是否是空值
 * @param val 需要验证的值
 * @return Boolean
 * */
function isEmpty (val: any) {
	return val === null || val === undefined || val === ''
}
export default isEmpty
