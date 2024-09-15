/**
 * @description 将数组元素用指定分隔符拼接成字符串
 * @param arr
 * @param separator 默认值为 “/"
 * @param filterEmpty 是否过滤结果中的空值 默认true
 * */
function joinSeparator (arr: Array<any>, separator: string = '/', filterEmpty = true) {
	if (!Array.isArray(arr)) return arr
	let a = filterEmpty ? arr.filter(o => o) : arr
	return a.join(separator)
}
export default joinSeparator
