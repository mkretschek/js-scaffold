/**
 * RequireJS' main file for test files based on tips from Karma's page.
 *
 * @see http://karma-runner.github.io/0.12/plus/requirejs.html
 */

(function () {
  var
    // Matches paths ending with '.spec.js'
    TEST_FILE_REGEXP = /\.spec\.js$/i,

    // Matches paths starting with '/base'
    BASE_PATH_REGEXP = /^\/base\//,

    // Matches paths ending with '.js'
    JS_FILE_REGEXP = /\.js$/;


  /**
   * Gets the module name for our test modules from their filepath.
   * @param {string} path Path for the module's file.
   * @return {string} Test's module.
   */
  function getModuleFromPath(path) {
    return path
      .replace(BASE_PATH_REGEXP, '')
      .replace(JS_FILE_REGEXP, '');
  }


  /**
   * Gets all test modules from our test files.
   * @return {Array.<string>} An array containing all modules defined in the
   *  test files.
   */
  function getTestModules() {
    var modules = [];

    Object.keys(window.__karma__.files).forEach(function (file) {
      if (TEST_FILE_REGEXP.test(file)) {
        modules.push(getModuleFromPath(file));
      }
    });

    return modules;
  }


  // Config RequireJS...
  require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths : {
      'lib' : './lib',
      'src' : './src',
      'test' : './test'
    },

    /* <<< NON-AMD LIBRARIES SHIM  START *************************************
     * Example of using shim to load non-AMD libraries. This is not
     * required for the current project yet, but will leave it here as it
     * might be required later and I'm not sure how easy it is to find
     * this info.
     *
     *  paths: {
     *    'jquery' : '../lib/jquery',
     *    'underscore' : '../lib/underscore'
     *  },
     *
     *  shim : {
     *    'unserscore' : {
     *      exports : '_'
     *    }
     *  },
     * ***************************************** NON-AMD LIBRARIES SHIM END >>>
     */

    // Add all test modules as dependencies
    deps: getTestModules(),

    // Kickoff Jasmine, as it is asynchronous
    callback: window.__karma__.start
  });
})();

