const { describe, it } = require('mocha')
const { expect } = require("chai")
import isEmail from "../../../src/validation/is-email";

describe("测试 isEmail 方法", function () {
  it("输入 1595397386@qq.com 输出 true", function () {
    expect(isEmail('1595397386@qq.com')).to.be.equal(true)
  })

	it("输入 1595397386qq.com 输出 false", function () {
		expect(isEmail('1595397386qq.com')).to.be.equal(false)
	})
})
