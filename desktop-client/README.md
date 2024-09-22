## problems with installing `robotjs`
- make sure node version matches supported node version(abi) by robotjs [here](https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json) [useful github comment](https://github.com/octalmage/robotjs/issues/466#issuecomment-765707671)
- make sure electron version is fixed in `package.json`
- run `npx electron-rebuild -f -t prod,optional,dev -w robotjs`

- if the error is `distutils not found`, run this: `brew install python-setuptools`