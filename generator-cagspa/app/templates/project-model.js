/**
Sample Model
**/
var Security = {
    COOKIE_NAME: 'osn_cookie',
    isAuthenticated: function(callback) {
        callback( !! $.cookie(Security.COOKIE_NAME));
    }
};

/**
Sample Model
**/
var MyModel = function() {

    var self = this;
    var CONTENT_TYPE = 'application/json; charset=utf-8';
    var BASE_URL = '/cag/evernote/v1';
    var getResources = function(callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: CONTENT_TYPE,
            url: BASE_URL + '/myresource',
            cache: true,
            success: function(data) {
                callback({
                    status: 200,
                    data: data
                });
            },
            error: function(data) {
                try {
                    var result = data.responseText;
                    callback({
                        status: data.status,
                        message: (data.status === 403 ? '' : result.message)
                    });
                } catch (e) {
                    callback({
                        status: data.status,
                        message: MSG_evernote_server_error
                    });
                }
            }
        });
    };

    return {
        loadResource: function(callback) {
            Security.isAuthenticated(function(auth) {
                if (auth) {
                    getNotebooks(callback);
                } else {
                    callback({
                        status: 401,
                        message: MSG_evernote_authentication_error
                    });
                }
            });
        }
    }    
};