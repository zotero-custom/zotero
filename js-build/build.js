const colors = require('colors/safe');

const getBrowserify = require('./browserify');
const getCopy = require('./copy');
const getJS = require('./js');
const getSass = require('./sass');
const getSymlinks = require('./symlinks');
const getReader = require('./reader');
const getPDFWorker = require('./pdf-worker');
const getZoteroNoteEditor = require('./note-editor');
const { formatDirsForMatcher, getSignatures, writeSignatures, cleanUp, onSuccess, onError} = require('./utils');
const { dirs, symlinkDirs, copyDirs, symlinkFiles, jsFiles, scssFiles, ignoreMask, buildZoteroConfig } = require('./config');

if (require.main === module) {
	(async () => {
		try {
			const t1 = Date.now();
			global.isError = false; // used to prevent further output to avoid concealing errors
			
			// Build Zotero config from environment variables
			console.log(colors.green('Building Zotero config...'));
			buildZoteroConfig();
			
			const symlinks = symlinkFiles
				.concat(dirs.map(d => `${d}/**`))
				.concat([`!${formatDirsForMatcher(dirs)}/**/*.js`])
				.concat([`!${formatDirsForMatcher(dirs)}/**/*.jsx`])
				.concat([`!${formatDirsForMatcher(dirs)}/**/*.scss`])
				.concat([`!${formatDirsForMatcher(copyDirs)}/**`]);

			const signatures = await getSignatures();

			// Check if all files in signatures are still present in src; Needed to avoid a problem
			// where what was a symlink before, now is compiled, resulting in polluting source files
			onSuccess(await cleanUp(signatures));
			
			const results = await Promise.all([
				getBrowserify(signatures),
				getCopy(copyDirs.map(d => `${d}/**`), { ignore: ignoreMask }, signatures),
				getJS(jsFiles, { ignore: ignoreMask }, signatures),
				...scssFiles.map(scf => getSass(scf, { ignore: ignoreMask }, signatures)),
				getSymlinks(symlinks, { nodir: true, ignore: ignoreMask }, signatures),
				getSymlinks(symlinkDirs, { ignore: ignoreMask }, signatures),
				getReader(signatures),
				getPDFWorker(signatures),
				getZoteroNoteEditor(signatures)
			]);

			await writeSignatures(signatures);
			for (const result of results) {
				onSuccess(result);
			}
			const t2 = Date.now();
			console.log(colors.yellow(`Total build time ${t2 - t1}ms`));
		} catch (err) {
			process.exitCode = 1;
			global.isError = true;
			onError(err);
		}
	})();
}