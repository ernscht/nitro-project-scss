# Your Project

Introduction …

## do / issues

* build contains too much code (e.g. "./molecules/example/css/modifier/example-blue.scss") -> alternative import loader
* enable hot module reloading with `mini-css-extract-plugin` when ready
* test with big project
* check stylelint config (works unreliable & lintDirtyModulesOnly does not work as expected)
* test error handling on file actions (delete/add src files/folder)
* cleanup (_app, examples, ... )

### prio 2

* how to handle eslint error concerning `module` not defined
* outsource loading of assets and hot in entry files
* lerna compatibility of babel-loader with excludes
* check [devtool performance](https://webpack.js.org/configuration/devtool/)
* better console output
* cleanup config folder (maybe move gulp to config)
* documentation

### prio 3

* eslint should lint only changed files
* use "gondel"
* rename `app` to `server` or move to package
* split into subparts (lerna packages)

## Nitro

For information on how to use Nitro, please refer to [nitro.md](project/docs/nitro.md) .

## Possible Structure

If you have writer's block – a possible structure for your project readme could look like [README.md](https://github.com/namics/frontend-defaults/blob/master/doc/README.md).
