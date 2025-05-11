// list of folders from where .js files are compiled and non-js files are symlinked
const dirs = [
	'chrome',
	'components',
	'defaults',
	'test',
	'test/resource/chai',
	'test/resource/chai-as-promised',
	'test/resource/mocha'
];

// list of folders that are symlinked
const symlinkDirs = [
	'chrome/content/zotero/xpcom/rdf',
	'chrome/content/zotero/xpcom/translate/src',
	'styles',
	'translators',
];

// list of folders which are copied to the build folder
const copyDirs = [
	'test/tests/data'	// browser follows symlinks when loading test data
						// triggering false-positive test results with mismatched URIs
];

// list of files from root folder to symlink
const symlinkFiles = [
	'chrome.manifest',
	// react-virtualized needs to be patched by babel-worker.js, so symlink all files in resource/ except for
	// those. Babel transpilation is still disabled in .babelrc.
	'resource/**/*',
	'!resource/react-virtualized.js',
	// Only include dist directory of singleFile
	// Also do a little bit of manipulation similar to react-virtualized
	'!resource/SingleFile/**/*',
	'resource/SingleFile/lib/**/*',
	'!resource/SingleFile/lib/single-file.js',
	// We only need a couple Ace Editor files
	'!resource/ace/**/*',
	'resource/ace/ace.js',
	// Enable for autocomplete
	//'resource/ace/ext-language_tools.js',
	'resource/ace/ext-searchbox.js',
	'resource/ace/keybinding-emacs.js',
	'resource/ace/keybinding-vim.js',
	'resource/ace/mode-javascript.js',
	'resource/ace/theme-chrome.js',
	'resource/ace/theme-monokai.js',
	'resource/ace/worker-javascript.js',
	// Feed *.idl files are for documentation only
	'!resource/feeds/*.idl',
	'!chrome/skin/default/zotero/**/*.scss',
	'!resource/citeproc_rs_wasm.js',
	'resource/vs/**/*',
	// Patched in babel-worker.js
	'!resource/vs/language/typescript/tsWorker.js',
	'!resource/monacopilot.mjs',
	'!resource/monacopilot-core.mjs',
	'version',
];


// these files will be browserified during the build
const browserifyConfigs = [
	{
		src: 'node_modules/react-select/dist/react-select.cjs.prod.js',
		dest: 'resource/react-select.js',
		config: {
			standalone: 'react-select'
		}
	},
	{
		src: 'node_modules/url/url.js',
		dest: 'resource/url.js',
		config: {
			standalone: 'url'
		}
	},
	{
		src: 'node_modules/sinon/lib/sinon.js',
		dest: 'test/resource/sinon.js',
		config: {
			standalone: 'sinon'
		}
	},
	{
		src: 'node_modules/chai-as-promised/lib/chai-as-promised.js',
		dest: 'test/resource/chai-as-promised.js',
		config: {
			standalone: 'chaiAsPromised'
		}
	}
];

// exclude mask used for js, copy, symlink and sass tasks
const ignoreMask = [
	'**/#*',
	'resource/schema/global/README.md',
	'resource/schema/global/schema.json.gz',
	'resource/schema/global/scripts/*',
	'chrome/content/zotero/xpcom/translate/example/**/*',
	'chrome/content/zotero/xpcom/translate/README.md',
	'chrome/content/zotero/xpcom/utilities/node_modules/**/*',
	'chrome/content/zotero/xpcom/utilities/test/**/*',
];

const jsFiles = [
	`{${dirs.join(',')}}/**/*.js`,
	`{${dirs.join(',')}}/**/*.jsx`,
	`!{${symlinkDirs.concat(copyDirs).join(',')}}/**/*.js`,
	`!{${symlinkDirs.concat(copyDirs).join(',')}}/**/*.jsx`,
	// Special handling for react-virtualized and others -- see note above
	'resource/react-virtualized.js',
	'resource/SingleFile/lib/single-file.js',
	'resource/citeproc_rs_wasm.js',
	'resource/vs/language/typescript/tsWorker.js',
	'resource/monacopilot.mjs',
	'resource/monacopilot-core.mjs',
];

const scssFiles = [
	'scss/**/*.scss',
	'chrome/skin/default/zotero/**/*.scss'
];

const ftlFileBaseNames = [
	'zotero',
	'preferences',
	'scaffold',
	'reader',
	'integration',
	'note-editor'
];

const buildsURL = 'https://zotero-download.s3.amazonaws.com/ci/';


function buildZoteroConfig() {
	const fs = require('fs');
	const path = require('path');

	// Define the env vars;
	// default to a local-hosted instance of the data/stream servers.
  const envVars = {
    ZOTERO_GUID: process.env.ZOTERO_GUID || 'zotero@zotero.org',
    ZOTERO_ID: process.env.ZOTERO_ID || 'zotero',
    ZOTERO_CLIENT_NAME: process.env.ZOTERO_CLIENT_NAME || 'Zotero',
    ZOTERO_DOMAIN_NAME: process.env.ZOTERO_DOMAIN_NAME || 'zotero.org',
    ZOTERO_PRODUCER: process.env.ZOTERO_PRODUCER || 'Digital Scholar',
    ZOTERO_PRODUCER_URL: process.env.ZOTERO_PRODUCER_URL || 'https://digitalscholar.org',
    ZOTERO_REPOSITORY_URL: process.env.ZOTERO_REPOSITORY_URL || 'https://repo.zotero.org/repo/',
    ZOTERO_BASE_URI: process.env.ZOTERO_BASE_URI || 'http://zotero.org/',
    ZOTERO_WWW_BASE_URL: process.env.ZOTERO_WWW_BASE_URL || 'https://www.zotero.org/',
    ZOTERO_PROXY_AUTH_URL: process.env.ZOTERO_PROXY_AUTH_URL || '',
    ZOTERO_API_URL: process.env.ZOTERO_API_URL || 'http://dataserver/',
    ZOTERO_STREAMING_URL: process.env.ZOTERO_STREAMING_URL || 'ws://stream-server/',
    ZOTERO_SERVICES_URL: process.env.ZOTERO_SERVICES_URL || 'https://services.zotero.org/',
    ZOTERO_API_VERSION: process.env.ZOTERO_API_VERSION || '3',
    ZOTERO_CONNECTOR_MIN_VERSION: process.env.ZOTERO_CONNECTOR_MIN_VERSION || '5.0.39',
    ZOTERO_PREF_BRANCH: process.env.ZOTERO_PREF_BRANCH || 'extensions.zotero.',
    ZOTERO_BOOKMARKLET_ORIGIN: process.env.ZOTERO_BOOKMARKLET_ORIGIN || 'https://www.zotero.org',
    ZOTERO_BOOKMARKLET_URL: process.env.ZOTERO_BOOKMARKLET_URL || 'https://www.zotero.org/bookmarklet/',
    ZOTERO_START_URL: process.env.ZOTERO_START_URL || 'https://www.zotero.org/start',
    ZOTERO_QUICK_START_URL: process.env.ZOTERO_QUICK_START_URL || 'https://www.zotero.org/support/quick_start_guide',
    ZOTERO_PDF_TOOLS_URL: process.env.ZOTERO_PDF_TOOLS_URL || 'https://www.zotero.org/download/xpdf/',
    ZOTERO_SUPPORT_URL: process.env.ZOTERO_SUPPORT_URL || 'https://www.zotero.org/support/',
    ZOTERO_SYNC_INFO_URL: process.env.ZOTERO_SYNC_INFO_URL || 'https://www.zotero.org/support/sync',
    ZOTERO_TROUBLESHOOTING_URL: process.env.ZOTERO_TROUBLESHOOTING_URL || 'https://www.zotero.org/support/getting_help',
    ZOTERO_FEEDBACK_URL: process.env.ZOTERO_FEEDBACK_URL || 'https://forums.zotero.org/',
    ZOTERO_CONNECTORS_URL: process.env.ZOTERO_CONNECTORS_URL || 'https://www.zotero.org/download/connectors',
    ZOTERO_CHANGELOG_URL: process.env.ZOTERO_CHANGELOG_URL || 'https://www.zotero.org/support/changelog',
    ZOTERO_CREDITS_URL: process.env.ZOTERO_CREDITS_URL || 'https://www.zotero.org/support/credits_and_acknowledgments',
    ZOTERO_LICENSING_URL: process.env.ZOTERO_LICENSING_URL || 'https://www.zotero.org/support/licensing',
    ZOTERO_GET_INVOLVED_URL: process.env.ZOTERO_GET_INVOLVED_URL || 'https://www.zotero.org/getinvolved',
    ZOTERO_DICTIONARIES_URL: process.env.ZOTERO_DICTIONARIES_URL || 'https://download.zotero.org/dictionaries/',
    ZOTERO_PLUGINS_URL: process.env.ZOTERO_PLUGINS_URL || 'https://www.zotero.org/support/plugins',
    ZOTERO_NEW_FEATURES_URL: process.env.ZOTERO_NEW_FEATURES_URL || 'https://www.zotero.org/blog/zotero-7/'
  };

  // Read the template file
  const templatePath = path.join(__dirname, '../resource/config.template.js');
  let template;

  try {
    template = fs.readFileSync(templatePath, 'utf8');
  } catch (e) {
    console.error(`Could not read template file at ${templatePath}`);
    process.exit(1);
  }

  // Replace all placeholders
  Object.entries(envVars).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    // Special handling for API_VERSION to ensure it remains a number
    const replacementValue = key === 'ZOTERO_API_VERSION' ? value : JSON.stringify(value);
    template = template.replace(new RegExp(placeholder, 'g'), replacementValue);
  });

  // Write the output - check where the original config.js is located
  const outputPath = path.join(__dirname, '../resource/config.js');
  fs.writeFileSync(outputPath, template);

  console.log(`Zotero config built successfully at ${outputPath}`);
}

module.exports = {
	dirs,
	symlinkDirs,
	copyDirs,
	symlinkFiles,
	browserifyConfigs,
	jsFiles,
	scssFiles,
	ignoreMask,
	ftlFileBaseNames,
	buildsURL,
	buildZoteroConfig,
};
