const { describe, it } = require('mocha')
const { expect } = require("chai")
import phoneMask from "../../../src/operate/phone-mask";

describe("测试 phoneMask 方法", function () {
  it("13520299283 => 135****9283", function () {
    expect(phoneMask('13520299283', 'mid', 3, 7)).to.be.equal('135****9283')
  })

	it("13520299283 => 1352029****", function () {
		expect(phoneMask('13520299283', 'last', 4 )).to.be.equal('1352029****')
	})

	it("13520299283 => ***20299283", function () {
		expect(phoneMask('13520299283', 'prev', 3 )).to.be.equal('***20299283')
	})
})
