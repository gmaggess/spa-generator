/** 
Private callback function that is invoked by the Mediator to render the main UI section.

@method Render UI 
@return {Object} Describe here your parameter. 
**/ 
var Facade = function(mediator, model) {
    var _private = {
        model: model.<%= _.slugify(appname) %>Model,
        publish: function(evt) {
            mediator.publish(evt.type, (typeof evt.data === 'undefined'?'':evt.data));
        },
        /**
        Notice that the data is published back to Mediator in the model callback function. 
        **/
        loadResources: function(evt) {
            _private.model.loadResources(function(data) {
                evt.data = data;
                _private.publish(evt);
            });
        }
    };

    return {
        notify: function(evt) {
            if (evt.type === Core.CHANNEL_1) {
                _private.loadResources(evt);
            }
        },
        listen: function(evt) {
            mediator.subscribe(evt.type, evt.data);
        },
        ignore: function (evt) {
            mediator.remove(evt.type);
        }
    };
};