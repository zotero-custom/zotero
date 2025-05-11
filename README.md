Zotero
======
[![CI](https://github.com/zotero/zotero/actions/workflows/ci.yml/badge.svg)](https://github.com/zotero/zotero/actions/workflows/ci.yml)

[Zotero](https://www.zotero.org/) is a free, easy-to-use tool to help you collect, organize, cite, and share your research sources.

Please post feature requests or bug reports to the [Zotero Forums](https://forums.zotero.org/). If you're having trouble with Zotero, see [Getting Help](https://www.zotero.org/support/getting_help).

For more information on how to use this source code, see the [Zotero documentation](https://www.zotero.org/support/dev/source_code).

## Building a Custom Client

### Prerequisites

* just (optional - just run commands in the `justfile` directly if not installed.)
* direnv
* Run `app/scripts/check_requirements` to see additional requirements
  (not all of them may be needed, depending on whether you instead to publish/notarize a build.)

### Setup

The config is driven from the `resource/config.template.js` template.

1. Create a `.env` file in the root of the repo.
   See `js-build/config.js` for the available env vars that can be set.
   (Defaults to a local-hosted instance of the data API and stream servers.)

2. Modify the `.env` file as needed.

3. Run `direnv allow`

## Build and Run a Custom Client

1. Run the install script:
   ```bash
   just install
   ```

2. Run the custom client:
   ```bash
   just run
   ```

The custom Zotero client should now be running.