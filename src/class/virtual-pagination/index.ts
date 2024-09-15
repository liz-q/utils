/**
 * @description 虚拟分页
 * */
class VirtualPagination {
	list: any[] = []
	pageSize: number
	pageNum = 1
	total = 0
	constructor (pageSize: number) {
		this.pageSize = pageSize || 10

		this.initData()
	}

	/**
	 * @function 初始化全部列表数据
	 * @param list 列表数据
	 * */
	initData (list: any[] = []) {
		this.list = list
		this.total = list.length
		this.pageNum = 1
	}

	/**
	 * @function 返回第几页的数据
	 * @param pageNum 第几页
	 * */
	getPageList (pageNum: number = 1) {
		this.pageNum = pageNum
		const startIndex = (pageNum - 1) * this.pageSize
		const endIndex = startIndex + this.pageSize
		return this.list.slice(startIndex, endIndex)
	}

	/**
	 * @function 返回分页数据 pageNum, pageSize, total
	 * */
	pagination () {
		return {
			pageNum: this.pageNum,
			pageSize: this.pageSize,
			total: this.total
		}
	}
}
export default VirtualPagination
