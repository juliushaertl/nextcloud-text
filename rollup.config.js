import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { eslint } from 'rollup-plugin-eslint'
import alias from 'rollup-plugin-alias'
import terser from 'rollup-plugin-terser'
import url from 'postcss-url'
import analyze from 'rollup-plugin-analyzer'

const isProduction = process.env.NODE_ENV === 'production'
const isAnalyseEnebale = process.env.ANALYZE

export default {
	input: 'src/index.js',
	external: id => {
		const externals = [
			'vue',
			'@nextcloud/vue',
			'v-tooltip',
		]
		if (externals.includes(id)) {
			return true
		}
		if (id.startsWith('tiptap')) {
			return true
		}
		if (id.startsWith('prosemirror')) {
			return true
		}
		return false
	},
	output: {
		file: 'dist/text.js',
		format: 'esm',
	},
	plugins: [
		eslint(),
		scss(),
		vue({
			css: true,
			compileTemplate: true,
			scss: {
				indentedSyntax: true,
			},
			style: {
				postcssPlugins: [
					url({ url: 'inline' })
				],
			},
		}),
		babel({
			exclude: 'node_modules/**',
		}),
		localResolve({
			extensions: ['.js', '.vue'],
			preferBuiltins: false,
		}),
		json(),
		alias({
			resolve: ['.js', '/index.js']
		}),
		commonjs(),
		isProduction && terser.terser(),
		isAnalyseEnebale && analyze(),
	],
}
