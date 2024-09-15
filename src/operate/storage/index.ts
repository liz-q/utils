type sessionStorage = 'sessionStorage'

type localStorage = 'localStorage'

interface categoryInterface {
	session?: sessionStorage;
	sessionStorage?: sessionStorage;
	local?: localStorage;
	localStorage?: localStorage;
}

type storageType = sessionStorage | localStorage

type categoryType = keyof categoryInterface

type valueType = any

type keyType = any

const categoryMap:categoryInterface = {
	session: 'sessionStorage',
	sessionStorage: 'sessionStorage',
	local: 'localStorage',
	localStorage: 'localStorage'
}

const getStorage = (category:any): storageType => {
	const key:categoryType = Object.keys(categoryMap).includes(category) ? category: 'sessionStorage'
	return <storageType>categoryMap[key]
}

const storageManager = {
	set: function (key:keyType, value:valueType, storage:storageType) {
		try {
			window[storage].setItem(key, JSON.stringify(value))
		} catch (e) {
			console.error(e)
		}
	},
	get: function (key:keyType, storage:storageType) {
		try {
			const val = window[storage].getItem(key)
			if (val) {
				// 不规范JSON字符串直接返回
				try {
					return JSON.parse(val)
				} catch (e) {
					return val
				}
			} else {
				return val
			}
		} catch (e) {
			console.error(e, key)
		}
	},
	clear: function (storage:storageType) {
		window[storage].clear()
	},
	remove: function (key:keyType, storage:storageType) {
		window[storage].removeItem(key)
	}
}

/**
 * @description 操作浏览器本地存储
 * */
export default {
	set: function (key:keyType, value:valueType, category?:any) {
		const storage = getStorage(category)
		storageManager.set(key, value, storage)
	},
	get: function (key:keyType, category?:any) {
		const storage = getStorage(category)
		return storageManager.get(key, storage)
	},
	clear: function (category?:any) {
		const storage = getStorage(category)
		storageManager.clear(storage)
	},
	remove: function (key:keyType, category?:any) {
		const storage = getStorage(category)
		storageManager.remove(key, storage)
	}
}
