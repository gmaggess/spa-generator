'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var CagspaGenerator = module.exports = function CagspaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

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
    default: this.appname
  }, {
    name: 'projectType',
    message: 'Is it an OSN Gadget?',
    default: 'Y/n'
  }];

  this.prompt(prompts, function(err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.appname = props.projectName;
    this.projectType = (/y/i).test(props.projectType);

    cb();
  }.bind(this));
};

CagspaGenerator.prototype.packageJSON = function packageJSON() {
  if (this.projectType) {
    this.template('_package.json.gadget', 'package.json');
  } else {
    this.template('_package.json', 'package.json');
  }
};

CagspaGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

CagspaGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

CagspaGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
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

  //this.copy('_package.json', 'package.json');
  //this.copy('_component.json', 'component.json');
  this.copy('README.md', 'README.md');
  /* Build */
  this.copy('gradle.properties', 'gradle.properties');
  this.copy('settings.gradle', 'settings.gradle');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  /* Source */
  this.template('project-core.js', 'src/main/scripts/' + this.appname + '.core.js');
  this.template('project-bindings.js', 'src/main/scripts/' + this.appname + '.view.js');
  this.template('project-facade.js', 'src/main/scripts/' + this.appname + '.facade.js');
  this.template('project-model.js', 'src/main/scripts/' + this.appname + '.model.js');
  /* Test */
  this.copy('node_http.js', 'node_http.js');
  this.copy('testacular.conf.js', 'src/test/testacular.conf.js');
  this.template('project-modelSpec.js', 'src/test/spec/' + this.appname + '.modelSpec.js');
  this.copy('error.json', 'src/test/spec/fixtures/json/error.json');
  /* Resources */
  this.copy('project.scss', 'src/main/resources/css/' + this.appname + '.scss');
  this.copy('load.gif', 'src/main/resources/images/load.gif');

  if (this.projectType) {
    this.copy('build.gradle.gadget', 'build.gradle');
    this.copy('gradle.properties.gadget', 'gradle.properties');
    this.copy('project-osnUtil.js', 'src/main/scripts/' + this.appname + '.osnUtil.js');
    this.copy('project-gadgetUtil.js', 'src/main/scripts/' + this.appname + '.gadgetUtil.js');
    this.copy('osnUtil.js', 'src/main/scripts/libs/osnUtil.js');
  } else {
    this.copy('build.gradle', 'build.gradle');
    this.copy('gradle.properties', 'gradle.properties');
  }

};

CagspaGenerator.prototype.projectfiles = function projectfiles() {
  if (this.projectType) {
    this.template('gadget.xml', 'src/gadget.xml');
  }
};