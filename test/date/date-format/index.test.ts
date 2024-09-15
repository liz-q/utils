const { describe, it } = require('mocha')
const { expect } = require("chai")
import dateFormat from '../../../src/date/date-format'

describe("测试 dateFormat 方法", function () {
	it("输入 2023-1-3 12:23:45 结果应为 2023-01-03 12:23:45", function () {
		expect(dateFormat('2023-1-3 12:23:45')).to.be.equal('2023-01-03 12:23:45');
	});

	it('输入时间戳，可以格式化', function () {
		expect(dateFormat(1672899618000)).to.be.equal('2023-01-05 14:20:18')
	});
});
