# babel-plugin-dot-dot-slash 

> Babel plugin to solve the `../../../` problem.

[![travis build](https://img.shields.io/travis/schiehll/babel-plugin-dot-dot-slash.svg?style=flat-square)](https://travis-ci.org/schiehll/babel-plugin-dot-dot-slash)
[![version](https://img.shields.io/npm/v/babel-plugin-dot-dot-slash.svg?style=flat-square)](http://npm.im/babel-plugin-dot-dot-slash)
[![MIT License](https://img.shields.io/npm/l/babel-plugin-dot-dot-slash.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## Example
```js
//before
import Module from '../../../path/to/module.js'

//after
import Module from '+/path/to/module.js'
```

## Install
```
npm install --save-dev babel-plugin-dot-dot-slash
```

Then you only need to specify it as a Babel plugin, which you would typically do in your `.babelrc` file:
```js
{
  "plugins": [
    "dot-dot-slash"
  ]
}
```

## Config
### Root suffix
If you want to add a root suffix because all your files are in a especific directory, you can set it like this:
```js
{
  "plugins": [
    ["dot-dot-slash", {
      "rootSuffix": "some/suffix"
    }]
  ]
}
```

### Custom import prefix
If you don't like the `+` syntax you can set your own prefix:
```js
{
  "plugins": [
    ["dot-dot-slash", {
      "importPrefix": "#"
    }]
  ]
}
```

Then you can do:
```js
import Module from '#/path/to/module.js'
```
### Fallback to absolute path
By default, if the `process.cwd()` is not the project root, the plugin will transform the import declaration to a absolute path. 
It will make the plugin works in cases where the process is started from other directory, like when you are running your tests with [ava](https://github.com/sindresorhus/ava/issues/32) for example.

To disable it, just set the `fallbackToAbsolute` config to disabled:

```js
{
  "plugins": [
    ["dot-dot-slash", {
      "fallbackToAbsolute": "disabled"
    }]
  ]
}
```