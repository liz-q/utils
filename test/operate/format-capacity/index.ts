const { describe, it } = require('mocha')
const { expect } = require("chai")
import formatCapacity from "../../../src/operate/format-capacity";

describe("测试 formatCapacity 方法", function () {
  it("1024 => 1.00KB", function () {
    expect(formatCapacity(1024)).to.be.equal('1.00KB')
  })

	it("1024 * 1024 => 1.00MB", function () {
		expect(formatCapacity(1024 * 1024)).to.be.equal('1.00MB')
	})

	it("1024 * 1024 => [1.00, 'MB'] 第二个参数为 true", function () {
		expect(formatCapacity(1024 * 1024, true)).to.deep.equal(['1.00', 'MB'])
	})
})
