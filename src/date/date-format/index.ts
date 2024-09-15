import dayjs from "dayjs"

export default function dateFormat (time: string | number, format = 'YYYY-MM-DD HH:mm:ss') {
	return time ? dayjs(time).format(format) : ''
}
