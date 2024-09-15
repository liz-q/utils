import BaseTree from './BaseTree'
import cloneDeep from 'lodash/cloneDeep'
import {
	ObjectAny,
	FunctionVoid,
	FunctionBoolean
} from '@config/common-type'
/**
 * @description
 * */
class TreeData extends BaseTree {
	/* 获取节点 */
	getNode (val: any) {
		return BaseTree._getNode(this.tree, val, this.treeProps)
	}

	/* 深拷贝一棵树 */
	cloneDeepTree () {
		return cloneDeep(this.tree)
		// return this.tree
	}

	/* 遍历树 */
	traverseTree (cb: FunctionVoid, condition: FunctionBoolean) {
		BaseTree._traverseTree(this.tree, cb, condition, this.treeProps)
	}

	/* 过滤树 */
	filterTree (condition: FunctionBoolean, newTree = true) {
		if (!condition) return
		const nodes = newTree ? this.cloneDeepTree() : this.tree
		return BaseTree._getFilterTree(nodes, condition, this.treeProps)
	}

	/* 获取叶子节点 */
	getLeafs () {
		return BaseTree._getLeafs(this.tree, this.treeProps)
	}

	/* 获取 1 到 level 级子树 */
	getSubTreeByLevel (level: number) {
		const newTree = this.cloneDeepTree()
		return BaseTree._getSubTreeByLevel(newTree, level, this.treeProps)
	}

	/* 获取树最大层级数或节点所在层级数 */
	getTreeLevel (id: any) {
		return BaseTree._getTreeLevel(this.tree, id, this.treeProps)
	}

	/**
	 * @function 添加子节点
	 * @param parentId 父节点id
	 * @param child 子节点对象
	 * */
	addChild (parentId: any, child: ObjectAny) {
		const node = this.getNode(parentId)
		if (!node) throw new Error('没有父节点！')
		const children = <string>this.treeProps.children
		if (node && node[children] && Array.isArray(node[children])) {
			node[children].push(child)
		} else {
			node[children] = [child]
		}
	}

	/**
	 * @function 删除所有子节点
	 * @param parentId 父节点id
	 * */
	removeChild (parentId: any) {
		const node = this.getNode(parentId)
		if (!node) throw new Error('没有父节点！')
		const children = <string>this.treeProps.children
		node[children] = []
	}

	/**
	 * @function 根据id删除节点
	 * */
	removeNode (id: any) {
		const info = BaseTree._getNodeInfo(this.tree, id, this.treeProps)
		if (info) {
			info.nodes.splice(info.index, 1)
		}
	}
}

export default TreeData
