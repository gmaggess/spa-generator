# Project Scaffolding

## Requirements

Before you proceed, make sure you have [Python 2.7.4](http://www.python.org/download/), [Ruby 1.9.3](http://www.ruby-lang.org/en/downloads/), [Compass](http://compass-style.org/install/), [Node.js](http://nodejs.org/download/) and [Git](http://git-scm.com/downloads). For Compass, make sure you have ruby in your path.

The next step would be to run the following commands:

```
npm install -g grunt-cli
npm install -g yo
```

This will install the recommended tools globally. For scaffolding, CAG Single Page Application generator is published in the ``npm registry``. To install the cag spa generator, you need to issue the command:

```
npm install -g generator-cagspa
```

## Creating a Project

Creating a project is as simple as invoking ``yo cagspa`` under the directory where you want to create you project. This yeoman generator allows developers to create single page application projects as well as OSN gadget projects. 

```
~/Developer/myprojects/scratch/myproject
$ yo cagspa

   _____          _____
  / ____|   /\   / ____|
 | |       /  \ | |  __
 | |      / /\ \| | |_ |     Welcome to the Single Page Application generator.
 | |____ / ____ | |__| |
  \_____/_/    \_\_____|

What's your project name? (Myproject) MySample
Is it an OSN Gadget? (Y/n)
```

The generator will scaffold out the standard project structure, a basic grunt configuration and testacular setup.
 
For more information

