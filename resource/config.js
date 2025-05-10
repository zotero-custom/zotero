var ZOTERO_CONFIG = {
	GUID: process.env.ZOTERO_GUID || 'zotero@zotero.org',
	ID: process.env.ZOTERO_ID || 'zotero', // used for db filename, etc.
	CLIENT_NAME: process.env.ZOTERO_CLIENT_NAME || 'Zotero',
	DOMAIN_NAME: process.env.ZOTERO_DOMAIN_NAME || 'zotero.org',
	PRODUCER: process.env.ZOTERO_PRODUCER || 'Digital Scholar',
	PRODUCER_URL: process.env.ZOTERO_PRODUCER_URL || 'https://digitalscholar.org',
	REPOSITORY_URL: process.env.ZOTERO_REPOSITORY_URL || 'https://repo.zotero.org/repo/',
	BASE_URI: process.env.ZOTERO_BASE_URI || 'http://zotero.org/',
	WWW_BASE_URL: process.env.ZOTERO_WWW_BASE_URL || 'https://www.zotero.org/',
	PROXY_AUTH_URL: process.env.ZOTERO_PROXY_AUTH_URL || 'https://zoteroproxycheck.s3.amazonaws.com/test',
	API_URL: process.env.ZOTERO_API_URL || 'https://api.zotero.org/',
	STREAMING_URL: process.env.ZOTERO_STREAMING_URL || 'wss://stream.zotero.org/',
	SERVICES_URL: process.env.ZOTERO_SERVICES_URL || 'https://services.zotero.org/',
	API_VERSION: process.env.ZOTERO_API_VERSION ? parseInt(process.env.ZOTERO_API_VERSION, 10) : 3,
	CONNECTOR_MIN_VERSION: process.env.ZOTERO_CONNECTOR_MIN_VERSION || '5.0.39', // show upgrade prompt for requests from below this version
	PREF_BRANCH: process.env.ZOTERO_PREF_BRANCH || 'extensions.zotero.',
	BOOKMARKLET_ORIGIN: process.env.ZOTERO_BOOKMARKLET_ORIGIN || 'https://www.zotero.org',
	BOOKMARKLET_URL: process.env.ZOTERO_BOOKMARKLET_URL || 'https://www.zotero.org/bookmarklet/',
	START_URL: process.env.ZOTERO_START_URL || "https://www.zotero.org/start",
	QUICK_START_URL: process.env.ZOTERO_QUICK_START_URL || "https://www.zotero.org/support/quick_start_guide",
	PDF_TOOLS_URL: process.env.ZOTERO_PDF_TOOLS_URL || "https://www.zotero.org/download/xpdf/",
	SUPPORT_URL: process.env.ZOTERO_SUPPORT_URL || "https://www.zotero.org/support/",
	SYNC_INFO_URL: process.env.ZOTERO_SYNC_INFO_URL || "https://www.zotero.org/support/sync",
	TROUBLESHOOTING_URL: process.env.ZOTERO_TROUBLESHOOTING_URL || "https://www.zotero.org/support/getting_help",
	FEEDBACK_URL: process.env.ZOTERO_FEEDBACK_URL || "https://forums.zotero.org/",
	CONNECTORS_URL: process.env.ZOTERO_CONNECTORS_URL || "https://www.zotero.org/download/connectors",
	CHANGELOG_URL: process.env.ZOTERO_CHANGELOG_URL || "https://www.zotero.org/support/changelog",
	CREDITS_URL: process.env.ZOTERO_CREDITS_URL || 'https://www.zotero.org/support/credits_and_acknowledgments',
	LICENSING_URL: process.env.ZOTERO_LICENSING_URL || 'https://www.zotero.org/support/licensing',
	GET_INVOLVED_URL: process.env.ZOTERO_GET_INVOLVED_URL || 'https://www.zotero.org/getinvolved',
	DICTIONARIES_URL: process.env.ZOTERO_DICTIONARIES_URL || 'https://download.zotero.org/dictionaries/',
	PLUGINS_URL: process.env.ZOTERO_PLUGINS_URL || 'https://www.zotero.org/support/plugins',
	NEW_FEATURES_URL: process.env.ZOTERO_NEW_FEATURES_URL || 'https://www.zotero.org/blog/zotero-7/'
};

if (typeof exports === 'object' && typeof module !== 'undefined') {
	module.exports = ZOTERO_CONFIG;
}
else {
	var EXPORTED_SYMBOLS = ["ZOTERO_CONFIG"];
}