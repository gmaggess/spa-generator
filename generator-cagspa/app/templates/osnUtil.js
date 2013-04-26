var osnUtil = {
    BASE_URL: '../../social/api/v1',
    CONTENT_TYPE: 'application/json; charset=utf-8',
    conversationId: gadgets.util.getUrlParameters().cid,
    widgetId: gadgets.util.getUrlParameters().mid,
    getRandomID: function(callback) {
        var randomID = '';
        $.ajax({
            type: 'POST',
            url: 'https://localhost/osn/social/api/v1/connections',
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                $.each(data, function(key, value) {
                    if (key == "apiRandomID") {
                        callback(value);
                    }
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                callback('');
            }
        });
    },
    getConversationTitle: function(callback) {
        var title = '';
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: osnUtil.CONTENT_TYPE,
            url: osnUtil.BASE_URL + "/conversations/" + osnUtil.conversationId,
            success: function(data) {
                callback({
                    status: 200,
                    data: data.name
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
        return title;
    },
    getUserInfo: function(callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: osnUtil.CONTENT_TYPE,
            url: osnUtil.BASE_URL + "/people/@me",
            success: function(data) {
                callback({
                    status: 200,
                    data: data
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
    },
    getUserProperties: function(callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: osnUtil.CONTENT_TYPE,
            url: osnUtil.BASE_URL + "/people/@me/properties",
            success: function(data) {
                callback({
                    status: 200,
                    data: data.items
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
    },
    setUserProperties: function(props, callback) {
        osnUtil.getRandomID(function(randomID) {
            var JSONObject = {};
            JSONObject.guid = note.guid || '';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: osnUtil.CONTENT_TYPE,
                url: osnUtil.BASE_URL + "/people/@me/properties",
                beforeSend: function(request) {
                    request.setRequestHeader("X-Waggle-RandomID", randomID);
                },
                data: JSON.stringify(props),
                success: function(data) {
                    callback({
                        status: 200,
                        data: data.items
                    });
                },
                error: function(data) {
                    callback({
                        status: data.responseText.statusCode,
                        message: data.responseText.statusMessage
                    });
                }
            });
        });
    },
    getUserWidgetProperties: function(callback) {
        var JSONObject = {};
        JSONObject.guid = note.guid || '';
        $.ajax({
            type: 'GET',
            url: osnUtil.BASE_URL + "/gadgets/" + osnUtil.widgetId + "/userProperties",
            dataType: 'json',
            contentType: osnUtil.CONTENT_TYPE,
            success: function(data) {
                callback({
                    status: 200,
                    data: data.items
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
    },
    setUserWidgetProperties: function(props, callback) {
        osnUtil.getRandomID(function(randomID) {
            var JSONObject = {};
            JSONObject.guid = note.guid || '';
            $.ajax({
                type: 'POST',
                url: osnUtil.BASE_URL + "/gadgets/" + osnUtil.widgetId + "/userProperties",
                beforeSend: function(request) {
                    request.setRequestHeader("X-Waggle-RandomID", randomID);
                },
                dataType: 'json',
                contentType: osnUtil.CONTENT_TYPE,
                data: JSON.stringify(props),
                success: function(data) {
                    callback({
                        status: 200,
                        data: data
                    });
                },
                error: function(data) {
                    callback({
                        status: data.responseText.statusCode,
                        message: data.responseText.statusMessage
                    });
                }
            });
        });
    },
    setWidgetTitle: function(title) {
        gadgets.window.setTitle(title);
    },
    removeWidget: function() {
        waggle.container.removeSelf();
    },
    getWidgetProperties: function(callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: osnUtil.CONTENT_TYPE,
            url: osnUtil.BASE_URL + "/gadgets/" + osnUtil.widgetId + "/properties",
            success: function(data) {
                callback({
                    status: 200,
                    data: data.items
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
    },
    setWidgetProperties: function(props, callback) {
        osnUtil.getRandomID(function(randomID) {
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: osnUtil.CONTENT_TYPE,
                url: osnUtil.BASE_URL + "/gadgets/" + osnUtil.widgetId + "/properties",
                beforeSend: function(request) {
                    request.setRequestHeader("X-Waggle-RandomID", randomID);
                },
                data: JSON.stringify(props),
                success: function(data) {
                    callback({
                        status: 200,
                        data: data
                    });
                },
                error: function(data) {
                    callback({
                        status: data.responseText.statusCode,
                        message: data.responseText.statusMessage
                    });
                }
            });
        });
    },
    getWidgetInfo: function(callback) {
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: osnUtil.CONTENT_TYPE,
            url: osnUtil.BASE_URL + "/gadgets/" + osnUtil.widgetId,
            success: function(data) {
                callback({
                    status: 200,
                    data: data
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
    },
    findProperty: function(propertyName, propertyArray) {
        for (var i = 0; i < propertyArray.length; i++) {
            if (propertyArray[i].name === propertyName) {
                return propertyArray[i].value;
            }
        }
    },
    publishMessage: function(message, callback) {
        osnUtil.getRandomID(function(randomID) {
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: osnUtil.CONTENT_TYPE,
                url: osnUtil.BASE_URL + "/conversations/" + osnUtil.conversationId + "/messages",
                beforeSend: function(request) {
                    request.setRequestHeader("X-Waggle-RandomID", randomID);
                },
                data:  JSON.stringify({"externalID": "", "message": message}),
                success: function(data) {
                    callback({
                        status: 200
                    });
                },
                error: function(data) {
                    callback({
                        status: data.responseText.statusCode,
                        message: data.responseText.statusMessage
                    });
                }
            });
        });
    },
    getMembers: function() {
        var result = [];
        $.ajax({
            type: "GET",
            dataType: osnUtil.CONTENT_TYPE,
            url: osnUtil.BASE_URL + "/conversations/" + osnUtil.conversationId + "/members",
            success: function(data) {
                result = [data.items.length];
                for (i = 0; i < data.items.length; i++) {
                    result[i] = data.items[i].name;
                }
                callback({
                    status: 200,
                    data: data.items
                });
            },
            error: function(data) {
                callback({
                    status: data.responseText.statusCode,
                    message: data.responseText.statusMessage
                });
            }
        });
        return result;
    },
    storeMembers: function(members) {
        osnUtil.getRandomID(function(randomID) {
            $.ajax({
                type: "POST",
                dataType: osnUtil.CONTENT_TYPE,
                url: osnUtil.BASE_URL + "/conversations/" + osnUtil.conversationId + "/members",
                data: JSON.stringify(members),
                beforeSend: function(request) {
                    request.setRequestHeader("X-Waggle-RandomID", randomID);
                },
                success: function(data) {
                    callback({
                        status: 200,
                        data: data.items
                    });
                },
                error: function(data) {
                    callback({
                        status: data.responseText.statusCode,
                        message: data.responseText.statusMessage
                    });
                }
            });
        });
    }
};