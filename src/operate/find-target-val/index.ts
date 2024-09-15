interface TargetItemType {
	[propName:string]: any
}
/**
 * @description 从数组中找到指定 key 的值等于给定值的元素。默认情况下只查找符合条件的第一项，即 find 函数机制。
 * @param val 匹配的值
 * @param arr 数据列表
 * @param key 匹配的字段名
 * @param multiple 是否查找所有符合的条目
 * */
function findTargetVal (val:any, arr:Array<TargetItemType>, key:string = 'value', multiple: boolean = false): TargetItemType|undefined|Array<TargetItemType> {
	let result
	if (multiple) {
		result = arr.filter(item => item[key] === val)
	} else {
		result = arr.find(item => item[key] === val)
	}
	return result
}
export default findTargetVal
