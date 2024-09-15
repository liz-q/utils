/**
 * @description 深度删除属性值是 null 的属性
 * @param obj {Object|Array} 需要删除的对象
 * @return 删除后的对象
 * */
const deleteNullProperties = (obj:  Object | Array<any>) => {
	const memory = new Set();
	const fn = (obj: any) => {
		if (memory.has(obj)) return obj;
		if (['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(obj))) {
			for (const [key, value] of Object.entries(obj)) {
				if (value === null) {
					delete obj[key];
				} else {
					obj[key] = fn(value);
				}
			}
		}
		obj = Object.prototype.toString.call(obj) === '[object Array]' ? obj.filter((o: any) => o) : obj
		memory.add(obj);
		return obj;
	}
	return fn(obj);
}

export default deleteNullProperties
