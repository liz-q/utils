interface paginationType {
	pageSize: number
	total?: number
	pageNum?: number
}

interface configType {
	rowKey?: string
	pagination?: paginationType
}

// 默认每页条数
export const PAGE_SIZE = 15

// 默认分页数据
const defaultPagination:paginationType = {
	pageSize: PAGE_SIZE
}

/**
 * @description 基础列表，封装了列表数据，分页数据，提供了常用的操作方法
 * */
export default class BaseList {
	rowKey: string
	pagination: paginationType
	loading: boolean
	list: Array<any>

	static defaultPagination = defaultPagination

	constructor (config: configType = {}) {
		// 列表项目唯一key
		this.rowKey = config.rowKey || 'id'
		// 分页数据
		this.pagination = config.pagination || defaultPagination
		// 加载状态
		this.loading = false
		// 列表数据
		this.list = []
	}

	/** pageSize getter */
	get pageSize () {
		return this.pagination.pageSize || PAGE_SIZE
	}

	/** pageNum getter */
	get pageNum () {
		return this.pagination.pageNum || 1
	}

	/** pageNum setter */
	set pageNum (val) {
		this.pagination.pageNum = val
	}

	/**
	 * @function 设置列表加载状态，如果不传val，loading值交替变更
	 * */
	setLoading (val: undefined | boolean) {
		if (val === void 0) {
			this.loading = !this.loading
			return
		}
		this.loading = val
	}

	/**
	 * @function 设置分页信息，如果pageNum或pageSize发生变化则会清空list。
	 * */
	setPagination (pagination: paginationType) {
		if (pagination.pageNum !== this.pagination.pageNum || pagination.pageSize !== this.pagination.pageSize) {
			this.list = []
		}
		this.pagination = pagination
	}

	/**
	 * @function 初始化list数据和分页数据
	 * */
	initData (list = [], pagination = defaultPagination) {
		this.list = list
		this.pagination = pagination
	}

	/**
	 * @function 获取行对象
	 * @param val
	 * */
	getRow (val: any) {
		return this.list.find(row => row[this.rowKey] === val)
	}

	/**
	 * @function 获取行索引
	 * @param val
	 * */
	getRowIndex (val: any) {
		return this.list.findIndex(row => row[this.rowKey] === val)
	}

	/**
	 * @function 结尾增加一行
	 * */
	addOne (options = {}) {
		this.list.push(options)
		return options
	}

	/**
	 * @function 开头增加一行
	 * */
	addOnePrev (options = {}) {
		this.list.unshift(options)
		return options
	}

	/**
	 * @function 删除一行
	 * */
	deleteRow (val: any) {
		const i = this.getRowIndex(val)
		this.list.splice(i, 1)
	}

	/**
	 * @function 添加合并单元格信息，有些表格会根据某列相同的值合并。组件中添加spanMethod方法，参考el-table
	 * 该方法只适合一列纵向合并，局限性较大
	 * @param key 合并字段名
	 * */
	formatSpanInfo ({ key = 'type' } = {}) {
		const setData = new Set()
		this.list.forEach((item, index) => {
			setData.add(item[key])
		})
		;[...setData].filter(o => o).forEach(type => {
			const arr = this.list.filter(item => item[key] === type)
			arr.forEach((item, index) => {
				item._rowspan = {
					rowspan: index === 0 ? arr.length : 0,
					colspan: index === 0 ? 1 : 0
				}
			})
		})
	}

	clear () {
		this.list = []
		this.pagination = defaultPagination
	}
}
