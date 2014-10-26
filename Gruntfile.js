module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'svg-sprites': {
      'icons': {
        options: {
          spriteElementPath: 'svg',
          spritePath: 'output/icon-sprite.svg',
          cssPath: 'output/_icon-sprite.css',
          prefix: 'icon',
          layout: 'alt-diagonal',
          cssUnit: "rem",

          // custom template to allow less parent syntax
          template: 'templates/stylesheet.hbs'
        }
      }
    },

    svgmin: {
      dist: {
        options: {
          plugins: [
            {
              removeViewBox: false
            }, {
              removeUselessStrokeAndFill: false
            }
          ]
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      svg: {
        files: ['svg/**/*.svg'],
        tasks: ['svg-sprites']
      },

      optim: {
        files: ['svg/**/*.svg'],
        tasks: ['svgmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dr-svg-sprites');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.registerTask('default', ['watch', 'build']);
  grunt.registerTask('svg', ['svg-sprites']);
  grunt.registerTask('optim', ['svgmin']);

  grunt.util.linefeed = '\n';

};
