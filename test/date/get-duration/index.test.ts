const { describe, it } = require('mocha')
const { expect } = require("chai")
import getDuration from "../../../src/date/get-duration";

describe("测试 getDuration 方法", function () {
  it("输入 273920000，输出3天4时5分20秒", function () {
    expect(getDuration((3 * 24 * 60 * 60 + 4 * 60 * 60 + 5 * 60 + 20) * 1000)).to.be.equal('3天4时5分20秒')
  })

  it("输入 259520000，输出3天5分20秒", function () {
    expect(getDuration((3 * 24 * 60 * 60 + 5 * 60 + 20) * 1000)).to.be.equal('3天5分20秒')
  })

  it("输入 273920000 第二个参数为 true，输出结果正确", function () {
    const arr = [
      { num: 3, unit: 'D' },
      { num: 4, unit: 'H' },
      { num: 5, unit: 'M' },
      { num: 20, unit: 'S' }
    ]
    expect(getDuration((3 * 24 * 60 * 60 + 4 * 60 * 60 + 5 * 60 + 20) * 1000, true)).to.deep.equal(arr)
  })
})
