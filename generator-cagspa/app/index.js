'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var CagspaGenerator = module.exports = function CagspaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CagspaGenerator, yeoman.generators.NamedBase);

CagspaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
    '\n   _____          _____ '.red +
    '\n  / ____|   /\\   / ____|'.red +
    '\n | |       /  \\ | |  __ '.red +
    '\n | |      / /\\ \\| | |_ |'.red + '     Welcome to the Single Page Application generator.' +
    '\n | |____ / ____ | |__| |'.red +
    '\n  \\_____/_/    \\_\\_____|\n'.red;

  console.log(welcome);

  var prompts = [{
    name: 'projectName',
    message: 'What\'s your project name?',
    default: path.basename(__dirname)
  }];

  this.prompt(prompts, function(err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.projectName = props.projectName;
    console.log

    cb();
  }.bind(this));
};

CagspaGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/main');
  this.mkdir('src/main/scripts');
  this.mkdir('src/main/scripts/libs');
  this.mkdir('src/main/resources');
  this.mkdir('src/main/resources');
  this.mkdir('src/main/resources/css');
  this.mkdir('src/main/resources/images');
  this.mkdir('src/test');
  this.mkdir('src/test/libs');
  this.mkdir('src/test/spec');
  this.mkdir('src/test/spec/fixtures');
  this.mkdir('src/test/spec/fixtures/json');

  this.copy('_package.json', 'package.json');
  this.copy('_component.json', 'component.json');
  this.copy('README.md', 'README.md');
  /* Build */  
  this.copy('build.gradle', 'build.gradle');
  this.copy('gradle.properties', 'gradle.properties');
  this.copy('settings.gradle', 'settings.gradle');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('package.json', 'package.json');
  /* Source */  
  this.copy('project-core.js', 'src/main/scripts/' + this.projectName + '.core.js');
  this.copy('project-bindings.js', 'src/main/scripts/' + this.projectName + '.view.js');
  this.copy('project-facade.js', 'src/main/scripts/' + this.projectName + '.facade.js');
  this.copy('project-model.js', 'src/main/scripts/' + this.projectName + '.model.js');
  /* Test */  
  this.copy('node_http.js', 'node_http.js');
  this.copy('testacular.conf.js', 'src/test/testacular.conf.js');
  this.copy('project-modelSpec.js', 'src/test/spec/' + this.projectName + '.modelSpec.js');
  this.copy('error.json', 'src/test/spec/fixtures/json/error.json');
  /* Resources */
  this.copy('project.scss', 'src/main/resources/css/' + this.projectName + '.scss');
  this.copy('load.gif', 'src/main/resources/images/load.gif');

};

CagspaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};