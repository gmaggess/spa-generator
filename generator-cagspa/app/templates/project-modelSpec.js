/**
Sample Jasmine test
**/
describe("A user is", function() {

  var COOKIE_NAME = '<%= _.slugify(appname) %>_cookie';

  it("authenticated if 'cookie' is present", function() {
    $.cookie(COOKIE_NAME %>, "lWgTnnoU9hgdcPAUSjnmj71PRfz1IOKJLsiPmXhbyIbn4dO3Zl1yIqfBcTKOQEPhiQpFafmr0iGTwXvCufSUR2jX8kVx0hH468ig1U94s6");
    var security = new Security();
    security.isAuthenticated(function(data) {
      expect(data).toBe(true);
    });
  });

  it("not authenticated if 'cookie' is empty", function() {
    $.cookie(COOKIE_NAME, "");
    var security = new Security();
    security.isAuthenticated(function(data) {
      expect(data).toBe(false);
    });
  });
});

describe("MyModel", function() {

  var fakeData;

  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'http://localhost:8080/fixtures/json';
    fakeData = jasmine.getJSONFixtures().load('model.json', 'error.json');
  });

  it("loads multiple resources", function() {
    spyOn($, "ajax").andCallFake(function(options) {
      options.success(fakeData['model.json']);
    });
    var model = new MyModel();
    model.loadResources(function(data) {
      expect(data.status).toBe(200);
      expect(data.data.length).toBe(8);
    });
  });

});