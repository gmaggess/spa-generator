// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

/*global module:false*/
module.exports = function(grunt) {
  // configurable paths
  var yeomanConfig = {
    app: 'src/main',
    test: 'src/test',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    jshint: {
      all: ['<%%= yeoman.app %>/scripts/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '<%%= yeoman.dist %>/scripts/main.min.js': ['<%%= yeoman.app %>/scripts/*.js']
        }
      }
    },
    sass: {
      dist: {
        options: { // Target options
          style: 'expanded',
          compass: true
        },
        files: {
          '<%%= yeoman.app %>/resources/css/main.css': ['<%%= yeoman.app %>/resources/css/main.scss']
        }
      }
    },
    mincss: {
      compress: {
        files: {
          "<%%= yeoman.dist %>/resources/css/main.min.css": ["<%%= yeoman.app %>/resources/css/main.css"]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: {
          '<%%= yeoman.dist %>/resources/images/loading.png': '<%%= yeoman.app %>/resources/images/loading.png'
        }
      }
    },
    clean: {
      build: ['<%%= yeoman.dist %>/**'],
      options: {
        force: true
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts/',
          src: ['*.js'],
          dest: '<%%= yeoman.dist %>/scripts/'
        }, {
          expand: true,
          cwd: '<%%= yeoman.app %>/',
          src: ['resources/images/load.gif'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    watch: {
      scripts: {
        files: 'src/main/scripts/*.js',
        tasks: ['jshint'],
      },
      css: {
        files: 'src/main/resources/css/**',
        tasks: ['sass'],
      }
    }
  });

  // Load external tasks (grunt plugins)
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register custom tasks (alias tasks)
  grunt.registerTask('build', ['clean', 'uglify', 'sass', 'mincss', 'imagemin', 'copy']);
  // Default task.
  grunt.registerTask('default', ['clean', 'uglify', 'sass', 'mincss', 'imagemin', 'copy', 'jshint']);

};