module.exports = function(grunt) {

  /**
   * Instead of loading each task one by one using `grunt.loadNpmTasks`, this
   * automatically loads all dependencies from the `package.json` file.
   *
   * Plugin: http://github.com/sindresorhus/load-grunt-tasks
   */
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    /**
     * Start a local server using the compiled Jekyll site directory as the base.
     *
     * Plugin: http://github.com/gruntjs/grunt-contrib-connect
     */
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 12000,
          base: '_site'
        }
      }
    },

    /**
     * Compile Sass files to CSS files.
     *
     * Plugin: http://github.com/gruntjs/grunt-contrib-sass
     */
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'lib/css',
          src: ['**/*.scss'],
          dest: 'lib/css',
          ext: '.min.css'
        }]
      }
    },

    /**
     * Uglify (minify) my `main.js` file.
     *
     * Plugin: http://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      dist: {
        files: {
          'lib/js/main.min.js': 'lib/js/main.js'
        }
      }
    },

    /**
     * Build Jekyll site.
     *
     * Plugin: http://github.com/dannygarcia/grunt-jekyll
     */
    jekyll: {
      dist: {
        options: {
        }
      }
    },

    /**
     * Minify all HTML / PHP files that Jekyll builds.
     *
     * Plugin: http://github.com/gruntjs/grunt-contrib-htmlmin
     */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '_site',
          src: ['**/*.{html,php}'],
          dest: '_site'
        }]
      }
    },

    /**
     * Instead of getting Jekyll to rebuild every time a file in `lib` is changed
     * (slow), copy replace the old `lib` with the new one in the compiled Jekyll
     * site directory. This only gets ran during the `watch` task becuase Jekyll
     * does it on the inital build.

     * Plugin: https://github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      lib : {
        files: [{
          expand: true,
          src: ['lib/**/*'],
          dest: '_site'
        }]
      }
    },

    /**
     * Runs tasks against changed watched files.
     *
     * Plugin: http://github.com/gruntjs/grunt-contrib-watch
     */
    watch: {

      /**
       * Watch any Sass files, if any are modified, recompile them to CSS.
       */
      sass: {
        files: 'lib/css/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: true
        }
      },

      /**
       * Watch any JavaScript files, if any are modified, reuglify them.
       */
      uglify: {
        files: 'lib/js/main.js',
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },

      /**
       * Watch any Jekyll related files, if any are modified, rebuild the Jekyll site.
       */
      jekyll: {
        files: ['_includes/**/*', '_layouts/**/*', '_plugins/**/*', '_posts/**/*', '*.html', '_config.yml'],
        tasks: ['jekyll'],
        options: {
          spawn: false
        }
      },

      /**
       * Watch any HTML files in the compiled Jekyll site directory, if any are modified,
       * reminify them.
       */
      htmlmin: {
        files: '_site/**/*.{html,php}',
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      },

      /**
       * Watch any files in the `lib` directory, if any are modified, copy and replace
       * that directory to the compiled Jekyll site directory (instead of getting Jekyll
       * to rebuild the entire site every time a file in `lib` is modified which is a lot
       * slower).
       */
      copy: {
        files: ['lib/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      }
    },

    /**
     * Upload (and replace the old files) the compiled Jekyll site directory to the
     * server.
     *
     * Plugin: http://github.com/inossidabile/grunt-ftpush
     */
    ftpush: {
      dist: {
        auth: {
          host: 'tomblanchard.co.uk',
          port: 21,
          authKey: 'tomblanchard.co.uk'
        },
        src: '_site',
        dest: '/public_html/root',
        exclusions: ['page*', '!**/*/page*'],
        keep: ['googlea67e882a592198c5.html', 'favicon.ico']
      }
    },

    /**
     * Run command line tools.
     *
     * Plugin: http://github.com/sindresorhus/grunt-shell
     */
    shell: {

      /**
       * Push the uncompiled Jekyll source code to GitHub.
       */
      git: {
        command: [
          'git add -A',
          'git commit -m "<%= grunt.template.today("isoDateTime") %>"',
          'git push'
        ].join('&&')
      }
    }


  });

  /**
   * This is the `default` task, it builds / compiles the site, then watches for
   * changes, then rebuilds / recompiles.
   *
   * Usage: `grunt` or `grunt default`
   */
  grunt.registerTask('default', [
    'connect',
    'sass',
    'uglify',
    'jekyll',
    'htmlmin',
    'watch'
  ]);

  /**
   * This is the `push` task, it uploads the compiled site to the server then pushes
   * the uncompiled Jekyll source code to GitHub.
   *
   * Usage: `grunt push`
   */
  grunt.registerTask('push', [
    'ftpush',
    'shell'
  ]);

};