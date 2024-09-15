/**
 * @description 创建一个映射并返回一个函数，用于检查该映射中是否存在一个键
 * @param str
 * @param expectsLowerCase 是否忽略大小写
 * */
function makeMap (str: string, expectsLowerCase?: boolean) {
	const map = Object.create(null)
	const list: Array<string> = str.split(',')
	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true
	}
	return expectsLowerCase ? (val: string) => map[val.toLowerCase()] : (val: string) => map[val]
}
export default makeMap
