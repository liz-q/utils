const { describe, it } = require('mocha')
const { expect } = require("chai")
import formatMoney from "../../../src/operate/format-money";

describe("测试 formatMoney 方法", function () {
  it("12121313.55555 => 12,121,313.56", function () {
    expect(formatMoney(12121313.55555)).to.be.equal('12,121,313.56')
  })
  it("12121313.55555 => 12#121#313.56", function () {
    expect(formatMoney(12121313.55555, 2, '#')).to.be.equal('12#121#313.56')
  })
})
