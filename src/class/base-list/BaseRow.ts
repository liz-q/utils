interface configType {
	rowKey?: string
	listInstance?: object
}

interface optionsType {
	[key: string]: any
}

export default class BaseRow {
	[key: string]: any
	rowKey: string
	listInstance: object
	private options: object
	constructor (options: optionsType = {}, config: configType = {}) {
		// 保存 options
		this.options = options

		// row-key
		this.rowKey = config.rowKey || 'id'
		// 列表实例
		this.listInstance = config.listInstance || {}

		this.init(options)
	}

	init (options: optionsType) {
		// 行自带加载状态
		this._loading = false
		// 行自带编辑状态
		this._isEdit = false

		for (const key in options) {
			if (Object.prototype.hasOwnProperty.call(options, key)) {
				this[key] = options[key]
			}
		}
	}

	/**
	 * @function 获取行原始数据
	 * */
	getOptions () {
		return this.options
	}

	/**
	 * @function 恢复行数据
	 * */
	recoverData () {
		this.init(this.getOptions())
	}
}
