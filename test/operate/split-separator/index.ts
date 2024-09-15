const { describe, it } = require('mocha')
const { expect } = require("chai")
import splitSeparator from "../../../src/operate/split-separator";

describe("测试 splitSeparator 方法", function () {
  it("默认使用/分隔:a/b/c => [a,b,c]", function () {
    expect(splitSeparator('a/b/c')).to.deep.equal(['a', 'b', 'c'])
  })

	it('使用逗号分隔:a,b,c => [a,b,c]', function () {
		expect(splitSeparator('a,b,c', ',')).to.deep.equal(['a', 'b', 'c'])
	})
})
