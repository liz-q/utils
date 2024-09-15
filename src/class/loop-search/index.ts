import {
	FunctionVoid,
	FunctionBoolean
} from '@config/common-type'
interface OptionType {
	delay?: number // 间隔多长时间发起下次请求
	loopFn: FunctionVoid // 循环请求的方法
	whenFn: FunctionBoolean // 条件判断 返回true再次执行
}

enum State {
	'init',
	'pending',
	'done'
}

/**
 * @description 循环查询类
 * */
class LoopSearch {
	delay: number
	stopFlag: boolean
	loopFn: FunctionVoid
	whenFn: FunctionBoolean
	state: State
	constructor (options: OptionType) {
		this.delay = options.delay || 3 * 1000
		this.stopFlag = false
		this.loopFn = options.loopFn
		this.whenFn = options.whenFn

		this.state = State.init // init pending done
	}

	async loop () {
		if (this.stopFlag) return
		this.state = State.pending
		const res = await this.loopFn()
		if (this.whenFn(res)) {
			setTimeout(() => {
				this.loop()
			}, this.delay)
		} else {
			this.state = State.done
		}
	}

	/**
	 * @function 启动定时查询
	 * */
	start () {
		if (typeof this.loopFn !== 'function' || typeof this.whenFn !== 'function') {
			throw new Error('缺少请求方法或条件方法！')
		}
		if (this.state === State.pending) return
		this.stopFlag = false
		this.loop()
	}

	/**
	 * @function 停止定时查询
	 * */
	stop () {
		this.stopFlag = true
		this.state = State.init
	}
}

export default LoopSearch
