const { describe, it } = require('mocha')
const { expect } = require("chai")
import deleteEmptyProperties from "../../../src/others/delete-empty-properties";

describe("测试deleteEmptyProperties方法", function () {
  it("深度删除对象中空值属性", function () {
		const obj = {
			a: 1,
			b: 2,
			c: '',
			d: null,
			e: undefined,
			f: {
				g: 3,
				h: ''
			},
			i: [4, 5, null, 6]
		}

    expect(deleteEmptyProperties(obj)).to.deep.equal({
	    a: 1,
	    b: 2,
	    f: {
		    g: 3
	    },
	    i: [4, 5, 6]
    })
  })
})
