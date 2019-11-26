
import {terser} from 'rollup-plugin-terser'
// import {uglify} from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
// import babel from 'rollup-plugin-babel';


export default {
	input:'src/tape.js',
	output:{
		file:'dist/video-tape.js',
		format:'es'
	},
	plugins:[
		// babel({exclude: 'node_modules/**'}),
		terser(),
		filesize(),
	]
}