import test from 'ava'
import slash from 'slash'
import appRoot from 'app-root-path'
import * as babel from 'babel-core'
import DotDotSlash from '../index'

test('Should transform the import declaration to an absolute path', t => {
  let importDeclaration = `${appRoot.path}/path/to/module`
  importDeclaration = `${slash(importDeclaration)}`

  const transformedCode = babel.transform("import Module from '+/path/to/module'", {
    plugins: [DotDotSlash]
  })

  t.ok(transformedCode.code.includes(importDeclaration))
})

test('Should accept a rootSuffix config', t => {
  let importDeclaration = `${appRoot.path}/app/path/to/module`
  importDeclaration = `${slash(importDeclaration)}`

  const transformedCode = babel.transform("import Module from '+/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        rootSuffix: 'app'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(importDeclaration))
})

test('Should accept an importPrefix config', t => {
  let importDeclaration = `${appRoot.path}/path/to/module`
  importDeclaration = `${slash(importDeclaration)}`

  const transformedCode = babel.transform("import Module from '/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        importPrefix: '/'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(importDeclaration))
})

test('Should accept both config options', t => {
  let importDeclaration = `${appRoot.path}/src/path/to/module`
  importDeclaration = `${slash(importDeclaration)}`

  const transformedCode = babel.transform("import Module from '#/path/to/module'", {
    plugins: [
      [DotDotSlash, {
        rootSuffix: 'src',
        importPrefix: '#'
      }]
    ]
  })

  t.ok(transformedCode.code.includes(importDeclaration))
})