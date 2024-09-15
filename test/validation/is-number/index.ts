const { describe, it } = require('mocha')
const { expect } = require("chai")
import isNumber from "../../../src/validation/is-number";

describe("测试 isNumber 方法", function () {
  it("测试空字符串", function () {
    expect(isNumber('')).to.be.equal(false)
  })
  it("测试非空字符串", function () {
    expect(isNumber('aa')).to.be.equal(false)
  })
  it("测试对象", function () {
    expect(isNumber({ a: 1 })).to.be.equal(false)
  })
  it("测试undefined", function () {
    expect(isNumber(undefined)).to.be.equal(false)
  })
  it("测试数字123", function () {
    expect(isNumber(123)).to.be.equal(true)
  })
  it("测试数字0", function () {
    expect(isNumber(0)).to.be.equal(true)
  })
  it("测试数字-123", function () {
    expect(isNumber(-123)).to.be.equal(true)
  })
})
