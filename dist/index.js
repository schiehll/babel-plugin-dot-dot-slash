'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (babel) {
  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(babelPath, state) {
        var importDeclaration = babelPath.node.source.value;
        if (state && importDeclaration.startsWith(state.opts.importPrefix || '+')) {
          var rootSuffix = state.opts.rootSuffix || '';
          var fallbackToAbsolute = state.opts.fallbackToAbsolute || true;

          var importedFile = _path2.default.join(_appRootPath2.default.path, rootSuffix, importDeclaration.substring(1, importDeclaration.length));

          var importer = _path2.default.isAbsolute(state.file.opts.filename) ? state.file.opts.filename : _path2.default.join(_appRootPath2.default.path, state.file.opts.filename);

          var relativePath = _path2.default.relative(_path2.default.dirname(importer), importedFile);
          var finalPath = fallbackToAbsolute === true && _appRootPath2.default.path !== process.cwd() ? importedFile : relativePath;

          finalPath = finalPath.includes('../') || _path2.default.isAbsolute(finalPath) ? _path2.default.normalize(finalPath) : './' + _path2.default.normalize(finalPath);

          babelPath.node.source.value = (0, _slash2.default)(finalPath);
        }
      }
    }
  };
};