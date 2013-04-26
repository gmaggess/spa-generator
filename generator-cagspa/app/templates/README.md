# <%= _.slugify(appname) %> Gadget

_Describe your gadget here._

## Introduction

_Explain the gadget project structure._

* '<%= _.slugify(appname) %>-gadget' contains all client side code: gadget.xml plus static resources.
* '<%= _.slugify(appname) %>-service' holds the server side code. Grails is the framework used to restify <%= _.slugify(appname) %>'s Java SDK API.
* '<%= _.slugify(appname) %>-integration-test' tests all REST interfaces using Spock framework.
* '<%= _.slugify(appname) %>-selenium' as the name suggests, contains all UI tests.

## <%= _.slugify(appname) %>-gadget

### Architecture

Myproject Gadget follows the JavaScript architecture described [here](https://orahub.oraclecorp.com/docs/tree/master/javascript/architecture).

### Build

_Describe main tasks on the project._

### Deploy

_Describe deployment architecture and process._

### Test

_Describe which test tools were used and how to run the test on the gadget layer._
  
## <%= _.slugify(appname) %>-service

### Documentation

Base URL: http://_server_:_port_/cag/<%= _.slugify(appname) %>

### API Reference

#### Resource1

```
Method | URI                          | Description
GET    | /v1/resource1/_{resourceId}_ | Retrieves a resource from <%= _.slugify(appname) %>
POST   | /v1/resource1                | Adds a resource to <%= _.slugify(appname) %>. _guid_, _created_, and _update_ attributes are not necessary in the JSON
PUT    | /v1/resource1                | Updates a resource. _created_, and _update_ attributes are not necessary in the JSON
```
##### Resource Representation

```javascript
{
	"guid": {guid},
	"title": {title},
	"tags":[
		{
			"guid":{tagGuid},
			"name":{tagName}
		}
	],
	"created": {note_created_date},
	"updated": {last_update_date}
}
```

## Release History
* 2012/12/06 - draft0.1 - All features implemented, but no unit tests have been done.


