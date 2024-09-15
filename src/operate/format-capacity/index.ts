/**
 * @description 容量转换
 * @param size {number} 容量 注意：单位是B
 * @param diff {boolean} true 返回数组 false 返回字符串
 * */
export default function formatCapacity (size: number, diff?: boolean): string|[string, string] {
	if (size > 0) {
		const kb:number = 1024
		const unit: Array<string> = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] // []string
		const i:number = Math.floor(Math.log(size) / Math.log(kb))
		const num:string = (size / Math.pow(kb, i)).toPrecision(3)
		const u:string = unit[i]
		return diff ? [num, u] : num + u;
	}
	return diff ? ['0', 'B'] : '0B'
}
