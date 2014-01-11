/**
 * Grunt module
 */
module.exports = function(grunt) {

  /**
   * Load all npm tasks
   */
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    /**
     * Compile Sass files
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
     * Uglify (minify) JavaScript files
     */
    uglify: {
      dist: {
        files: {
          'lib/js/main.min.js': 'lib/js/main.js'
        }
      }
    },

    /**
     * Minify Jekyll output HTML
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
     * Instead of getting Jekyll to rebuild every time a file in "lib" is changed
     * (slow), replace the old "lib" with the new one via "copy". This only gets
     * run in the "watch" task becuase Jekyll does it on the inital build.
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
     * Build Jekyll site
     */
    jekyll: {
      dist: {
        options: {
        }
      }
    },

    /**
     * Start server from Jekyll output
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
     * Runs tasks against changed watched files
     */
    watch: {
      sass: {
        files: 'lib/css/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: true
        }
      },
      uglify: {
        files: 'lib/js/main.js',
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      htmlmin: {
        files: '_site/**/*.{html,php}',
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      },
      jekyll: {
        files: ['_includes/**/*', '_layouts/**/*', '_plugins/**/*', '_posts/**/*', '*.html', '_config.yml'],
        tasks: ['jekyll'],
        options: {
          spawn: false
        }
      },
      copy: {
        files: ['lib/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      }
    },

    /**
     * Upload new site files to server
     */
    ftpush: {
      build: {
        auth: {
          host: 'tomblanchard.co.uk',
          port: 21,
          authKey: 'tomblanchard.co.uk'
        },
        src: '_site',
        dest: '/public_html/root',
        exclusions: ['page*', '!**/*/page*']
      }
    },

    /**
     * Upload new site files to GitHub
     */
    shell: {
      git: {
        command: [
          'git add -A',
          'git commit -m "<%= grunt.template.today("isoDateTime") %>"',
          'git push'
        ].join('&&')
      }
    }


  });

  grunt.registerTask('default', [
    'connect',
    'sass',
    'uglify',
    'jekyll',
    'htmlmin',
    'watch'
  ]);

  grunt.registerTask('upload', [
    'ftpush',
    'shell'
  ]);

};