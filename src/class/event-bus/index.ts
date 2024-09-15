type fnType = (...args: any[]) => void

interface EventBusStorageType {
	[propName: string]: Array<fnType>
}

class EventBus {
	storage: EventBusStorageType
	constructor () {
		this.storage = {}
	}

	/**
	 * @param {*} arr
	 * @param {*} x
	 */
	findIndex(arr: Array<any>, x: fnType) {
		return arr.findIndex((item) => item === x)
	};

	/**
	 * 注册一次性事件
	 * @param {*} name
	 * @param {*} fn
	 */
	once (name:string, fn:fnType) {
		const me = this
		const inner = (...args: any[]) => {
			fn.apply(me, args)
			me.off(name, inner)
		}
		this.on(name, inner)
	}

	/**
	 * 注册事件
	 * @param {*} name
	 * @param {*} fn
	 */
	on (name:string, fn:fnType) {
		if (Object.prototype.toString.call(this.storage[name]) === '[object Array]') {
			this.storage[name].push(fn)
		} else {
			this.storage[name] = [fn]
		}
	}

	/**
	 * 删除事件
	 * @param {*} name
	 * @param {*} fn
	 */
	off (name:string, fn:fnType) {
		if (this.storage[name]) {
			const i = this.findIndex(this.storage[name], fn)
			if (i !== -1) this.storage[name].splice(i, 1)
		}
	}

	/**
	 * 清空指定name的所有事件
	 * @param {*} name
	 * @return {Object}
	 */
	clear (name:string) {
		if (name) {
			this.storage[name] = []
		} else {
			this.storage = {}
		}
		return this.storage
	}

	/**
	 * 触发事件
	 * @param {*} name
	 * @param {*} payload  参数
	 * @param {*} cb      回调函数
	 */
	emit (name:string, payload:any, cb:fnType) {
		if (this.storage[name]) {
			this.storage[name].forEach((f) => f(payload, cb))
		}
	}
}


export default EventBus

