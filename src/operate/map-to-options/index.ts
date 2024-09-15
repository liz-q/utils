/**
 * @description 一个方法接受一个map数据结构，返回形如el-select下拉列表样的数据
 * @param map {Map}
 * @return [{label: 'xx', value: 'xx'}, ...]
 * */
function mapToOptions (map: Map<any, any>) {
	if (map instanceof Map) {
		return [...map.entries()].map(([key, value]) => ({
			label: value,
			value: key
		}))
	}
	return []
}
export default mapToOptions
