# zimmed-downloader-governor

## Web service that manages tasks downloader instances.

This is the central service that hosts the web client and manages user activity, download clusters, and file/link
metadata. Designed to be used in conjunction with one or more [zimmed-downloader](https://github.com/zimmed/zimmed-downloader)
server instances.

### Setup

To deploy, first install all the CLI requirements:
- plowshare - This is the utility that parses filesharing links into useful download links. It can be installed through
            most package managers. e.g., sudo yum install plowshare
- plowshare modules - Plowshare requires external modules for specific file sharing sites you intend to use.
            This has only been tested for rapidgator.net and uploaded.net. Use of other shares may require modifications
            to the core code. See: https://github.com/mcrapet/plowshare-modules-legacy

Test the following commands to make sure all packages were properly installed (you can use `$ which <cmd>`):
- plowprobe

Next, add [custom node package repo](https://repo.fury.io/zimmed/) to NPM source. Recommended to use proxy which passes
through package requests to global npm repo: `$ npm config set registry https://npm-proxy.fury.io/zimmed/ && npm config
set ca ""`

Then install javascript dependencies: `zimmed-downloader-governor$ npm i`

Update configuration in `src/config.js` and `src/test-config.js`

[Optional] Run unit tests: `zimmed-downloader-governor$ npm test`

Test server from CLI: `zimmed-downloader-governor$ npm start`

_Or if you have previously installed bunyan globally `$ npm i -g bunyan` you can use `zimmed-downloader-governor$ npm
run pretty`._

It is recommended to use a utility for managing the node service, like [pm2](https://github.com/Unitech/pm2 "pm2"), for
deployment stability.

### Legal

This code is licensed under the MIT Software License, and may be re-used freely, at your own risk. I am not liable for
any damages that come from using this software, nor am I responsible for any mis-use of this software to download
copyrighted material. This service is designed to only be compatible with legitimate file-sharing hosts that comply
with DMCA regulations.

If an individual decides to ignore my public advice and use this software in conjunction with a warez community that
abuses these hosts to share copyrighted material (such as warez-bb.org or tehparadox.com), they are doing so at their
own will and risk, and such actions are not condoned by myself, or any contributor to this project.
