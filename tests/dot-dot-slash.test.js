import appRoot from 'app-root-path'
import test from 'ava'
import slash from 'slash'
import * as babel from 'babel-core'
import DotDotSlash from '../index'

process.chdir(appRoot.path)

test('Should transform the import declaration to an relative path', t => {
  let expected = 'path/to/module'
  expected = slash(expected)

  const transformedCode = babel.transform("import Module from '+/path/to/module'", {
    plugins: [DotDotSlash]
  })

  t.ok(transformedCode.code.includes(expected))
})

test('Should accept a rootSuffix config', t => {
  let expected = 'app/path/to/module'
  expected = slash(expected)

  const transformedCode = babel.transform("import Module from '+/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        rootSuffix: 'app'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(expected))
})

test('Should accept an importPrefix config', t => {
  let expected = 'path/to/module'
  expected = slash(expected)

  const transformedCode = babel.transform("import Module from '/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        importPrefix: '/'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(expected))
})

test('Should accept both config options', t => {
  let expected = 'src/path/to/module'
  expected = slash(expected)

  const transformedCode = babel.transform("import Module from '#/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        rootSuffix: 'src',
        importPrefix: '#'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(expected))
})