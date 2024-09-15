/*
  对手机号 13520299283 进行任意位数的掩码！
  例如：
  对前三位掩码：***20299283
  对后四位掩码：1352029****
  对后中间四掩码：135****9283

  当然，对于手机号中间四位掩码比较常见！！！
* */

type positionType = 'prev' | 'mid' | 'last'

/**
 * @param phone 原字符串
 * @param type 前中后
 * @param position type是prev，last时代表位数 type是mid时代表开始位
 * @param endPosition 结束位
 * */
export default function phoneMask (phone: string, type: positionType, position: number, endPosition?: number): string {
	const len = phone.length
	switch (type) {
		// 前
		case 'prev':
			return maskCodeFn(phone, 0, position)
		// 中
		case 'mid':
			return maskCodeFn(phone, position, endPosition || position)
		// 后
		case 'last':
			return maskCodeFn(phone, len - position, phone.length)
	}
}

/**
 * @param str 原字符串
 * @param start 开始位
 * @param end 结束位
 * */
function maskCodeFn (str: string, start: number, end: number): string {
	const arr = str.split('')
	for (let i = start; i < end; i += 1) {
		arr[i] = '*'
	}
	return arr.join('')
}
