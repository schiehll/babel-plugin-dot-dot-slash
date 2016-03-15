import path from 'path'
import slash from 'slash'
import appRoot from 'app-root-path'

export default (babel) => {
  return {
    visitor: {
      ImportDeclaration(babelPath, state) {
        const importDeclaration = babelPath.node.source.value
        if(state && importDeclaration.startsWith(state.opts.importPrefix || '+')){
          const rootSuffix = state.opts.rootSuffix || ''
          const importedFile = path.join(
            appRoot.path, 
            rootSuffix, 
            importDeclaration.substring(1, importDeclaration.length)
          )

          babelPath.node.source.value = `${slash(path.normalize(importedFile))}`
        }
      }
    }
  }
}