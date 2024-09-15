const { describe, it } = require('mocha')
const { expect } = require("chai")
import toFixed from "../../../src/date/to-fixed";

describe("测试 toFixed 方法", function () {
  it("13.5665四舍五入保留3位小数后为13.567", function () {
    expect(toFixed(13.5665, 3)).to.be.equal(13.567)
  })

	it("13.5665银行家四舍五入保留3位小数后为13.566", function () {
		expect(toFixed(13.5665, 3, true)).to.be.equal(13.566)
	})
})
