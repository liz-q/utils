const { describe, it } = require('mocha')
const { expect } = require("chai")
import TreeData from "../../../src/class/tree-data";

describe("测试 TreeData 类", function () {
  it("测试 _getFlatTree 方法", function () {
		// @ts-ignore
	  const treeData = new TreeData();
		const tree = [
			{
				id: '1',
				name: '1',
				children: [
					{
						id: '1-1',
						name: '1-1'
					}
				]
			}
		]
	  const expectRst = [
		  { id: '1', pid: null, name: '1' },
		  { id: '1-1', pid: '1', name: '1-1' },
	  ]
    expect(TreeData._getFlatTree(tree)).to.deep.equal(expectRst)
  })
})

