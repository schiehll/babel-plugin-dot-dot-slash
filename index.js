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
          const fallbackToAbsolute = state.opts.fallbackToAbsolute || true
          
          const importedFile = path.join(
            appRoot.path, 
            rootSuffix, 
            importDeclaration.substring(1, importDeclaration.length)
          )

          const importer = path.isAbsolute(state.file.opts.filename)
            ? state.file.opts.filename 
            : path.join(appRoot.path, state.file.opts.filename)

          const relativePath = path.relative(path.dirname(importer), importedFile)
          const finalPath = (fallbackToAbsolute === true && appRoot.path !== process.cwd()) ? importedFile : relativePath

          babelPath.node.source.value = slash(path.normalize(finalPath))
        }
      }
    }
  }
}