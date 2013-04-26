/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    build: {
      name: 'evernote-gadget',
      dest: 'dist'
    },
    jshint: {
      all: ['src/main/js/evernote*.js', 'src/main/js/osnUtil.js'],
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
          '<%= build.dest %>/js/<%= build.name %>.min.js': ['src/main/js/evernote*.js', 'src/main/js/osnUtil.js']
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
          'src/main/resources/css/evernote-gadget.css': ['src/main/resources/css/evernote-gadget.scss']
        }
      }  
    },
    mincss: {
      compress: {
        files: {
          "<%= build.dest %>/resources/css/<%= build.name %>.min.css": ["src/main/resources/css/*.css"]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: {                         
          '<%= build.dest %>/resources/images/button-outer.png': 'src/main/resources/images/button-outer.png',
          '<%= build.dest %>/resources/images/jHtmlArea_Toolbar_Group__Btn_Select_BG.png': 'src/main/resources/images/jHtmlArea_Toolbar_Group__Btn_Select_BG.png',
          '<%= build.dest %>/resources/images/jHtmlArea_Toolbar_Group_BG.png': 'src/main/resources/images/jHtmlArea_Toolbar_Group_BG.png',
          '<%= build.dest %>/resources/images/jHtmlArea.png': 'src/main/resources/images/jHtmlArea.png',
          '<%= build.dest %>/resources/images/notebook.png': 'src/main/resources/images/notebook.png',
          '<%= build.dest %>/resources/images/tag.png': 'src/main/resources/images/tag.png'
        }
      }
    },
    clean: {
      build: ['<%= build.dest %>/**'],
      options: {
        force: true
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/main/js/', src: ['jHtmlArea-0.7.5.min.js', 'jquery.cookie.min.js', 'jquery.tagsinput.min.js', 'knockout-2.2.0.js', 'moment.min.js', 'mediator.js'], dest: '<%= build.dest %>/js/'},
          {expand: true, cwd: 'src/main/', src: ['resources/images/load.gif'], dest: '<%= build.dest %>'}
        ]
      }
    },
    watch: {
      scripts: {
        files: 'src/main/js/*.js',
        tasks: ['jshint', 'uglify'],
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
