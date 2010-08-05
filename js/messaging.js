var vzDemo = vzDemo || {};

vzDemo.messaging = {
    
    sendPrivateMessage : function(text) {
        var params = [];
        params[opensocial.Message.Field.TITLE] = 'VZ-Demo private message title!';
        params[opensocial.Message.Field.TYPE] = opensocial.Message.Type.PRIVATE_MESSAGE;

        var message = opensocial.newMessage(text, params);
        var recipient = "VIEWER";
        opensocial.requestSendMessage(recipient, message, function(response) {
            console.log(response.hadError());
        });
    },
    
    postToWall : function(text) {
        var param = {"img":"http://www.playstationweb.de/svz/v3/icons/motorstorm.png","msg":"Yeaha, meine Score ist 0, wer kann mich schlagen? Katrin "};
        // console.log(param);
        vz.embed.getStaticContentUrl('key_resource_rich', function(staticUrl) {
            vz.embed.getEmbedUrl(param, function(url) {
                var params = [];
                params[opensocial.Message.Field.TYPE] = opensocial.Message.Type.PUBLIC_MESSAGE;
                console.log(staticUrl);
                var message = opensocial.newMessage(url + '  bla blub bla    ' + staticUrl, params);
                var recipient = "OWNER";
                opensocial.requestSendMessage(recipient, message, function(response) {
                    console.log(response.get('recipients'));
                });
            });
        });
        
    },
    
    sendNotification : function(text) {
        var params = [];
        params[opensocial.Message.Field.TITLE] = 'VZ-Demo notification!';
        params[opensocial.Message.Field.TYPE] = opensocial.Message.Type.NOTIFICATION;
        params[opensocial.Message.Field.OPT_PARAMS] = {param1: 'abc', param2: 'def'};

        var message = opensocial.newMessage('', params);
        var recipient = "OWNER";
        opensocial.requestSendMessage(recipient, message, function(response) {
            console.log(response);
        });
    },
    
    sendStatusUpdate : function(text) {
        var params = [];
        params[opensocial.Activity.Field.BODY ] = text;
        
        var activity = opensocial.newActivity(params);
        console.log(activity);
        
        opensocial.requestCreateActivity(activity, null, function(submitted) {
            console.log('submitted :', submitted);
        })
    }
};

vzDemo.messaging.controller = {
    bindMessaging : function() {
        $('#privMessage').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.sendPrivateMessage(text);
        });

        $('#wallpost').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.postToWall(text);
        });
  
        $('#notification').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.sendNotification(text);
        });

        $('#statusUpdate').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.sendStatusUpdate(text);
        });
    }
};