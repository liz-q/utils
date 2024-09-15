type itemType = {
	num: number,
	unit: string
}

/**
 * @description 传入时间戳，返回时长字符串
 * @param stamp {Number} 时间戳
 * @param isArray {boolean} 返回结果是数组，默认是字符串
 * */
function getDuration (stamp:number = 0, isArray:boolean = false):string|itemType[] {
	if (typeof stamp !== 'number') return ''
	if (stamp < 0) return ''

	const arr = []

	// days
	const days = stamp / 1000 / 60 / 60 / 24
	const daysRound = Math.floor(days)
	const daysStr = `${daysRound > 0 ? `${daysRound}天` : ''}`
	daysRound > 0 && arr.push({ num: daysRound, unit: 'D' })
	// hours
	const hours = stamp / 1000 / 60 / 60 - (24 * daysRound)
	const hoursRound = Math.floor(hours)
	const hoursStr = `${hoursRound > 0 ? `${hoursRound}时` : ''}`
	hoursRound > 0 && arr.push({ num: hoursRound, unit: 'H' })
	// minutes
	const minutes = stamp / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
	const minutesRound = Math.floor(minutes)
	const minutesStr = `${minutesRound > 0 ? `${minutesRound}分` : ''}`
	minutesRound > 0 && arr.push({ num: minutesRound, unit: 'M' })
	// seconds
	const seconds = stamp / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)
	const secondsRound = Math.floor(seconds)
	const secondsStr = `${secondsRound > 0 ? `${secondsRound}秒` : ''}`
	secondsRound > 0 && arr.push({ num: secondsRound, unit: 'S' })
	// ms
	const _ms = stamp - (24 * 60 * 60 * 1000 * daysRound) - (60 * 60 * 1000 * hoursRound) - (60 * 1000 * minutesRound) - (secondsRound * 1000)
	const msStr = `${_ms > 0 ? `${_ms}毫秒` : ''}`
	_ms > 0 && arr.push({ num: _ms, unit: 'MS' })

	const str = `${daysStr}${hoursStr}${minutesStr}${secondsStr}${msStr}`

	return isArray ? arr : str
}
export default getDuration
