import appRoot from 'app-root-path'
import test from 'ava'
import slash from 'slash'
import * as babel from 'babel-core'
import DotDotSlash from '../index'

test('Should fallback to an absolute path if cwd != app root path', t => {
  let expected = `${appRoot.path}/path/to/module`
  expected = slash(expected)

  const transformedCode = babel.transform("import Module from '+/path/to/module'", {
    plugins: [DotDotSlash]
  })

  t.ok(transformedCode.code.includes(expected))
})

test('Should accept a fallbackToAbsolute config to disable the fallback', t => {
  let expected = 'path/to/module'
  expected = slash(expected)

  const transformedCode = babel.transform("import Module from '+/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        fallbackToAbsolute: 'disabled'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(expected))
})