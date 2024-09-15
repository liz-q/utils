/**
 * @description 将字符串用指定分隔符分割开
 * @param arr
 * @param separator 默认值为 “/"
 * @param filterEmpty 是否过滤结果中的空值 默认true
 * */
function splitSeparator (str: string, separator: string = '/', filterEmpty = true) {
	if (!str || !str.split) return str
	const arr = str.split(separator)
	return filterEmpty ? arr.filter(o => o) : arr
}
export default splitSeparator
