/** 
Add your comment here. 
**/ 
Core = {
    CHANNEL_1: 'NAMESPACE:LOAD-RESOURCEA',
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
        var myModel = new MyModel();
        //start facade
        var facade = new Facade(mediator, {
            model: myModel
        });
        //start modules
        var module = new MyViewModel(facade);
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