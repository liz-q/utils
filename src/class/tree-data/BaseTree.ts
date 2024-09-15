import {
	ObjectAny,
	FunctionVoid,
	FunctionBoolean
} from '@config/common-type'

interface TreePropsType {
	key?: string
	children?: string,
	isLeaf?: string
}

interface FlatListPropsType {
	key: string
	parentKey: string
}

type RequiredTreePropsType = Required<TreePropsType>
type TreeDataItemType = ObjectAny
type TreeDataType = Array<TreeDataItemType>


const DEFAULT_TREE_PROPS: TreePropsType = {
	key: 'id',
	children: 'children',
	isLeaf: 'isLeaf'
}

function getTreeProps (_props: TreePropsType = {}): RequiredTreePropsType {
	for (const key in DEFAULT_TREE_PROPS) {
		// @ts-ignore
		if (!_props[key]) {
			// @ts-ignore
			_props[key] = DEFAULT_TREE_PROPS[key]
		}
	}
	return _props as RequiredTreePropsType
}

export default class BaseTree {
	/**
	 * @function 获取指定节点
	 * @param nodes {array} 树数据
	 * @param val {any} key字段对应的值
	 * @param _props
	 * */
	static _getNode (nodes: TreeDataType = [], val: any, _props:TreePropsType) {
		const { key, children } = getTreeProps(_props)

		const fn = (nodes: TreeDataType, val: any): TreeDataItemType | undefined => {
			for (const node of nodes) {
				if (node[key] === val) {
					return node
				}
				if (node[children] && node[children].length > 0) {
					const obj = fn(node[children], val)
					if (obj) return obj
				}
			}
		}

		return fn(nodes, val)
	}

	/**
	 * @function 遍历树，满足条件的节点将会执行回调函数
	 * @param nodes {array} 树数据
	 * @param cb {(node, parentNode, index) => {}} 回调函数
	 * @param condition {(node) => boolean} 条件函数
	 * @param _props
	 * */
	static _traverseTree (nodes: TreeDataType = [], cb: FunctionVoid, condition: FunctionBoolean = () => true, _props: TreePropsType) {
		const { children } = getTreeProps(_props)

		const fn = (nodes: TreeDataType, cb: FunctionVoid, condition: FunctionBoolean, parentNode:any = null) => {
			// for (const node of nodes) {
			// 	if (condition && condition(node)) {
			// 		cb && cb(node, parentNode)
			// 	}
			// 	if (node[children] && node[children].length > 0) {
			// 		fn(node[children], cb, condition, node)
			// 	}
			// }
			for (let i = 0; i < nodes.length; i ++) {
					if (condition && condition(nodes[i])) {
						cb && cb(nodes[i], parentNode, i)
					}
					if (nodes[i][children] && nodes[i][children].length > 0) {
						fn(nodes[i][children], cb, condition, nodes[i])
					}
			}
		}

		fn(nodes, cb, condition)
	}

	/**
	 * @function 过滤树
	 * @param nodes {array} 树数据
	 * @param condition {(node)=>boolean} 条件函数
	 * @param _props
	 * */
	static _getFilterTree (nodes: TreeDataType = [], condition: FunctionBoolean, _props: TreePropsType) {
		const { children } = getTreeProps(_props)

		const fn = (nodes: TreeDataType, condition: FunctionBoolean) => {
			const newArr = []
			for (const node of nodes) {
				if (node[children] && node[children].length) {
					node[children] = fn(node[children], condition)
				}

				if (condition(node) || (node[children] && node[children].length)) {
					newArr.push(node)
				}
			}

			return newArr
		}

		return fn(nodes, condition)
	}

	/**
	 * @function 获取所有叶子节点组成的数组
	 * @param nodes {array} 树数据
	 * @param _props
	 * */
	static _getLeafs (nodes: TreeDataType = [], _props: TreePropsType) {
		const { children, isLeaf } = getTreeProps(_props)
		const leafs: Array<TreeDataItemType> = []

		const fn = (nodes: TreeDataType, leafs: Array<TreeDataItemType>) => {
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i][isLeaf]) {
					leafs.push(nodes[i])
				} else {
					if (nodes[i][children] && nodes[i][children].length) {
						fn(nodes[i][children], leafs)
					}
				}
			}
		}
		fn(nodes, leafs)

		return leafs
	}

	/**
	 * @function 获取固定层级以上的子树
	 * @param nodes {array} 树数据，最好深拷贝一棵树，避免改变原树
	 * @param level {number} 限制层级
	 * */
	static _getSubTreeByLevel (nodes: TreeDataType = [], level: number, _props: TreePropsType) {
		const { children } = getTreeProps(_props)
		const fn = (nodes: TreeDataType, level: number, count: number) => {
			for (let i = 0; i < nodes.length; i += 1) {
				if (level == count) {
					nodes[i][children] = null
				} else {
					fn(nodes[i][children] || [], level, count + 1)
				}
			}
		}

		fn(nodes, level, 1)

		return nodes
	}

	/**
	 * @function 获取树的最大层级，以及目标节点所在层级
	 * @param nodes {array} 树结构
	 * @param val {any} 目标节点key对应的值
	 * */
	static _getTreeLevel (nodes: TreeDataType = [], val: any, _props: TreePropsType) {
		const { key, children } = getTreeProps(_props)

		let targetLevel = 0
		let max = 0
		const fn = (nodes: TreeDataType, floor: number) => {
			nodes.forEach(item => {
				if (floor > max) {
					max = floor
				}
				if (val && val === item[key]) {
					targetLevel = floor
				}
				if (item[children] && item[children].length) {
					fn(item[children], floor + 1)
				}
			})
		}
		fn(nodes, 1)

		return { max, targetLevel }
	}

	/**
	 * @function 将树结构拉平，自动填充id和pid，id的值取_props中key对应的值，pid指父节点id
	 * @param nodes
	 * @param _props
	 * */
	static _getFlatTree (nodes: TreeDataType = [], _props?: TreePropsType) {
		const { key, children } = getTreeProps(_props)
		const flat: Array<object> = []

		const fn = (nodes: TreeDataType, pid: string | number | null) => {
			for (const item of nodes) {
				const { [children]: removedProperty, ...rest } = item
				const obj = {
					...rest,
					id: item[key],
					pid
				}
				flat.push(obj)

				if (item[children] && item[children].length) {
					fn(item[children], item[key])
				}
			}
		}
		fn(nodes, null)

		return flat
	}

	/**
	 * @function 将一维树数据转换成标准树结构
	 * @param flatList 一维树数据
	 * @param _props 配置信息，指定 key 字段和 parentKey 字段
	 * */
	static _getTreeFromFlat (flatList: TreeDataType = [], _props?: FlatListPropsType) {
		_props = _props || {
			key: 'id',
			parentKey: 'pid'
		}

		const { key, parentKey } = _props

		const itemMap: TreeDataItemType = {}
		const tree = []
		const rootKeys = []

		for (const item of flatList) {
			itemMap[item[key]] = item
		}

		for (const item of flatList) {
			const pid = item[parentKey]
			if (itemMap[pid]) {
				!!itemMap[pid].children || (itemMap[pid].children = [])
				itemMap[pid].children.push(item)
			} else {
				rootKeys.push(item[key])
			}
		}

		for (const id of rootKeys) {
			tree.push(itemMap[id])
		}

		return tree
	}

	/**
	 * @function 刪除节点
	 * @param node {object, string, number} 数据对象或主键值
	 * @param nodes {array} 树数据
	 * @param _props {TreePropsType}
	 * */
	static _deleteNode (node: TreeDataItemType | string | number, nodes: TreeDataType = [], _props?: TreePropsType) {
		const props = getTreeProps(_props)
		const {key, children} = props
		const val = typeof node === 'object' ? node[props.key] : node

		const fn = (nodes: TreeDataType, val: any) => {
			for (let i = 0; i < nodes.length; i++) {
				if (nodes[i][key] === val) {
					nodes.splice(i, 1)
					return
				}
				if (nodes[i][children] && nodes[i][children].length > 0) {
					fn(nodes[i][children], val)
				}
			}
		}

		fn(nodes, val)
	}

	/**
	 * @function 提供一个方法，获取节点所在数组的索引和所在数组
	 * @param nodes {array} 树数据
	 * @param val {any} key字段对应的值
	 * @param _props
	 * */
	static _getNodeInfo (nodes: TreeDataType = [], val: any, _props: TreePropsType) {
		const { key, children } = getTreeProps(_props)

		const fn = (nodes: TreeDataType, val: any): TreeDataItemType | undefined => {
			for (let i = 0; i < nodes.length; i ++) {
				if (nodes[i][key] === val) {
					return {
						index: i, // 所在数组中的索引
						nodes // 所在数组
					}
				}
				if (nodes[i][children] && nodes[i][children].length > 0) {
					const obj = fn(nodes[i][children], val)
					if (obj) return obj
				}
			}
		}

		return fn(nodes, val)
	}

	tree: TreeDataType
	treeProps: TreePropsType

	constructor (tree: TreeDataType, treeProps: TreePropsType = {}) {
		this.tree = tree || []

		this.treeProps = {
			key: treeProps.key || DEFAULT_TREE_PROPS.key,
			children: treeProps.children || DEFAULT_TREE_PROPS.children,
			isLeaf: treeProps.isLeaf || DEFAULT_TREE_PROPS.isLeaf
		}
	}
}
