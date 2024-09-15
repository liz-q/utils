const { describe, it } = require('mocha')
const { expect } = require("chai")
import mapToOptions from "../../../src/operate/map-to-options";

describe("测试 mapToOptions 方法", function () {
  it("map 对象数据转数组", function () {
	  const map = new Map([
		  [1, '苹果'],
		  [2, '香蕉'],
		  [3, '葡萄']
	  ])
	  const options = [
		  { label: '苹果', value: 1 },
		  { label: '香蕉', value: 2 },
		  { label: '葡萄', value: 3 },
	  ]
    expect(mapToOptions(map)).to.deep.equal(options)
  })
})
