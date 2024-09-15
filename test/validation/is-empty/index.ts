const { describe, it } = require('mocha')
const { expect } = require("chai")
import isEmpty from "../../../src/validation/is-empty";

describe("测试 isEmpty 方法", function () {
  it("验证空值1", function () {
    expect(isEmpty('')).to.be.equal(true)
  })
	it("验证空值2", function () {
		expect(isEmpty(null)).to.be.equal(true)
	})
	it("验证空值3", function () {
		expect(isEmpty(undefined)).to.be.equal(true)
	})
})
