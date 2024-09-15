type contextType = {
	$children?: Array<any>
}

/**
 * @description 根据 vue 组件名称查找组件
 * @param context {this.$root} 根 vue 实例
 * @param componentName {string} 组件名称
 * @param cb {function} 自定义方法
 * @return vNode|null
 * */
function findVueComponent (context: contextType, componentName: string, cb = function (child: contextType) { return true }): contextType {
	const childrens = context.$children
	let children = null
	if (childrens && childrens.length) {
		for (let i = 0; i < childrens.length; i++) {
			const child = childrens[i]
			const name = child.$options.name
			if (name === componentName && cb(child)) {
				children = child
				break
			} else {
				children = findVueComponent(child, componentName, cb)
				if (children) break
			}
		}
	}
	return children
}

export default findVueComponent
