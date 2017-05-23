System.config({
  transpiler: 'typescript',
  typescriptOptions: {emitDecoratorMetadata: true,
    target: "ES6",
    module: "commonjs"},
  map: {
    '@angular': 'node_modules/@angular',
    'rxjs'    : 'node_modules/rxjs',
      'ngx-dropdown': 'node_modules/ngx-dropdown',
      "ngx-modal": "node_modules/ngx-modal",


  },
  paths: {
    'node_modules/@angular/*': 'node_modules/@angular/*/bundles',
      'npm:': 'node_modules/'

  },
  meta: {
    '@angular/*': {'format': 'cjs'}
  },
  packages: {
    'app'                              : {main: 'main', defaultExtension: 'ts'},
    'rxjs'                             : {main: 'Rx'},
      '@angular/http'                   : {main: 'http.umd.min.js'},
    '@angular/core'                    : {main: 'core.umd.min.js'},
    '@angular/common'                  : {main: 'common.umd.min.js'},
    '@angular/compiler'                : {main: 'compiler.umd.min.js'},
    '@angular/router'                  : {main: 'router.umd.min.js'},
    '@angular/forms'                  : {main: 'forms.umd.min.js'},
    '@angular/platform-browser'        : {main: 'platform-browser.umd.min.js'},
    '@angular/platform-browser-dynamic': {main: 'platform-browser-dynamic.umd.min.js'},
      'ngx-dropdown': { main: 'index.js', defaultExtension: 'js' },
      "ngx-modal": { "main": "index.js", "defaultExtension": "js" }



  }
});
