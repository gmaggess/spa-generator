/** 
Add your comment here. 
**/ 
var MyViewModel = function(facade) {

    var self = this;
    self.guid = ko.observable();
    self.title = ko.observable();
    self.created = ko.observable();

    /** 
    Private callback function that is invoked by the Mediator to render the main UI section.

    @method Render UI 
    @return {Object} Describe here your parameter. 
    **/ 
    var showUI = function(note) {

        if (note.status === 200) {
            //note
            self.guid(note.data.guid);
            self.title(note.data.title);
            self.created(note.data.created);
        } else {
            if (note.status === 401 || note.status === 403) {
                gadgetUtil.displayError(self, MSG_myapplication_authentication_error);
                gadgetUtil.showAuthorizationWindow();
            } else {
                if (note.status === 404) {
                    var str = result.message;
                    title(osnUtil.getWidgetInfo(

                    function(widgetInfo) {
                        self.title(widgetInfo.data.name);
                        str = str.replace('{0}', self.title());
                        gadgetUtil.displayError(self, str);
                    }));
                } else {
                    gadgetUtil.displayError(self, MSG_myapplication_server_error);
                }
            }
        }
        if (typeof note.notification !== 'undefined') {
            gadgetUtil.showNotification(note.notification);
        }
    };

    /** 
    Initializes the View module.

    @method Subscribe to events, initialize UI compononts, etc. 
    **/ 
    self.init = function() {
        self.destroy();
        facade.listen({
            type: Core.CHANNEL_1,
            data: showUI
        });
        self.initUI();
    };

    /** 
    Helper method to initialize UI.
    **/ 
    self.initUI = function() {
        gadgetUtil.loading();
        osnUtil.getWidgetProperties(function(data) {
            if (data.status === 200) {
                //put your code here
            }
        });
    };

    /** 
    Boilerplate code.
    **/ 
    self.editUI = function() {
        gadgetUtil.loading();
        osnUtil.getWidgetProperties(function(data) {
            if (data.status === 200) {
                //put your code here
            }
        });
    };

    /** 
    Boilerplate code.
    **/ 
    self.newUI = function() {
        gadgetUtil.loading();
        //put your code here
    };

    /** 
    Boilerplate code.
    **/ 
    self.saveUI = function() {
        gadgetUtil.loading();
        //put your code here
    };

    /** 
    Helper method to initialize UI.
    **/ 
    self.destroy = function() {
        facade.ignore({
            type: Core.CHANNEL_1
        });
    };
};