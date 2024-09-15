const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const json = require('@rollup/plugin-json')
const clear = require('rollup-plugin-clear')
// const alias = require('@rollup/plugin-alias')
const name = 'utils'
// const path = require('path')

module.exports = {
	input: 'src/index.ts',
	output: [
		{
			file: `lib/${name}-umd.js`,
			format: 'umd',
			name: 'utils'
    },
		{
			file: `lib/${name}-es.js`,
			format: 'es'
		},
		{
			file: `lib/index.js`,
			format: 'es'
		},
		{
			file: `lib/${name}-cjs.js`,
			format: 'cjs'
		}
	],
	plugins: [
		nodeResolve(),
		clear({
			targets: ['lib'],
			watch: true
		}),
		json({
			compact: true
		}),
		commonjs(),
		typescript(),
		babel({
			exclude: 'node_modules/**'
		}),
		terser(),
		// alias({
		// 	customResolver: nodeResolve({
		// 		extensions: ['.ts', '.js', '.jsx', '.json', '.sass', '.scss']
		// 	}),
		// 	entries: [
		// 		{
		// 			find:'@foo',
		// 			replacement: path.resolve(path.resolve(__dirname), ".", "foo"),
		// 		}
		// 	]
		// })
	],
	// external: ['lodash-es']
}
