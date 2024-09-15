const { describe, it } = require('mocha')
const { expect } = require("chai")
import findTargetVal from "../../../src/operate/find-target-val";

describe("测试 findTargetVal 方法", function () {
  it("从目标数组中找出指定项目：[{value:1},{value:2}...] => {value:2}", function () {
		const arr = [
			{ name: '张三', value: '1' },
			{ name: '李四', value: '2' },
			{ name: '王五', value: '3' },
		]
    expect(findTargetVal('2', arr)).to.deep.equal({name: '李四', value: '2'})
  })

	it("自定义key确定使用哪个字段的值找：[{id:1},{id:2}...] => {id:2}", function () {
		const arr = [
			{ name: '张三', id: '1' },
			{ name: '李四', id: '2' },
			{ name: '王五', id: '3' },
		]
		expect(findTargetVal('2', arr, 'id')).to.deep.equal({ name: '李四', id: '2' })
	})
})
