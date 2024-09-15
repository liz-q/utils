const { describe, it } = require('mocha')
const { expect } = require("chai")
import getValueByPath from "../../../src/others/get-value-by-path";

describe("测试 getValueByPath 方法", function () {
	const obj = {
		a: {
			b: {
				c: 1
			}
		},
		d: 2
	}


  it("根据属性字符串从对象中取值1", function () {
    expect(getValueByPath(obj, 'd')).to.be.equal(2)
  })

	it("根据属性字符串从对象中取值2", function () {
		expect(getValueByPath(obj, 'a.b.c')).to.be.equal(1)
	})

	it("根据属性字符串从对象中取值3", function () {
		expect(getValueByPath(obj, 'a.b')).to.deep.equal({
			c: 1
		})
	})
})
