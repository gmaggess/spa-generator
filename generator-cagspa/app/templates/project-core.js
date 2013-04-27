/** 
Add your comment here. 
**/ 
Core = {
    CHANNEL_1: '<%= appname %>:LOAD-RESOURCEA',
    /** 
    Start UI components.
    **/ 
    startComponents: function() {
        // Start UI components
    },
    /** 
    Start application. Invoked on 'gadget.util.registerOnLoadHandler()' when called from a gadget.
    **/ 
    startAll: function() {

        'use strict';

        this.startComponents();
        //start models
        var <%= _.slugify(appname) %>Model = new <%= appname %>Model();
        //start facade
        var facade = new Facade(mediator, {
            model: <%= _.slugify(appname) %>Model
        });
        //start modules
        var module = new <%= appname %>ViewModel(facade);
        ko.applyBindings(module);
        module.init();
    },
    /** 
    Called when unloading the application to release resources.
    **/ 
    stopAll: function() {
        module.destroy();
    }
};