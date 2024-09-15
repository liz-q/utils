const { describe, it } = require('mocha')
const { expect } = require("chai")
import joinSeparator from "../../../src/operate/join-separator";

describe("测试 joinSeparator 方法", function () {
  it("默认拼接", function () {
    expect(joinSeparator(['a', 'b', 'c'])).to.be.equal('a/b/c')
  })

	it('使用自定义符号拼接', function () {
		expect(joinSeparator(['a', 'b', 'c'], ',')).to.be.equal('a,b,c')
	})
})
