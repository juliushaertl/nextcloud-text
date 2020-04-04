import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { eslint } from 'rollup-plugin-eslint'
import alias from 'rollup-plugin-alias'
import terser from 'rollup-plugin-terser'
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
			// not used at the moment
			'prosemirror-tables',
		]
		if (externals.includes(id)) {
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
			css: true, // Dynamically inject css as a <style> tag
			compileTemplate: true, // Explicitly convert template to render function
			scss: {
				indentedSyntax: true,
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
