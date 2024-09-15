const { describe, it } = require('mocha')
const { expect } = require("chai")
import deleteNullProperties from "../../../src/others/delete-null-properties";

describe("测试 deleteNullProperties 方法",function () {
	const obj = {
		name: '张三',
		age: null,
		a: {
			b: "b",
			c: null,
			d: [
				{
					f: 'f',
					g: null
				}
			],
			e: [1, 2, null, 3]
		}
	}
	const expectObj = {
		name: '张三',
		a: {
			b: "b",
			d: [
				{
					f: 'f',
				}
			],
			e: [1, 2, 3]
		}
	}
	it('深度删除了对象中值为null的属性', function () {
		expect(JSON.stringify(deleteNullProperties(obj))).to.be.equal(JSON.stringify(expectObj))
	});

	const arr = [obj, obj]
	const expectArr = [expectObj, expectObj]
	it('深度删除了数组中值为null的属性', function () {
		expect(JSON.stringify(deleteNullProperties(arr))).to.be.equal(JSON.stringify(expectArr))
	});
})
