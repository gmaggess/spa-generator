osnUtil.ownerProperty = '<%= _.slugify(appname) %>_owner';
osnUtil.titleProperty = '<%= _.slugify(appname) %>_title';
osnUtil.oauthTokenProperty = '<%= _.slugify(appname) %>_oauthtoken.password';

osnUtil.getOAuthToken = function() {
    return osnUtil.getUserProperties(

    function(result) {
        return osnUtil.findProperty(osnUtil.oauthTokenProperty, result);
    });
};

osnUtil.storeOAuthToken = function(token) {
    var props = [];
    props[0] = {
        name: osnUtil.oauthTokenProperty,
        value: token.toString()
    };
    osnUtil.setUserWidgetProperties(props, function(data) {
        if (data.status !== 200) {
            gadgetUtil.showNotification(MSG_error_access_properties);
        }
    });
};