var vzDemo = vzDemo || {};

vzDemo.backend = {
    sendNotificationRequest: function() {
        var params = [];
        params[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.SIGNED;
        params[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.POST;
        params[gadgets.io.RequestParameters.POST_DATA] = gadgets.io.encodeValues({message: 'this is the notification'});

        gadgets.io.makeRequest('http://localhost:8062/vz_demo_gadget/backend/notification.php', function(response) {
            console.log(response);
        }, params);
    }
};

vzDemo.backend.controller = {
    bindBackend: function() {
        $('#sendBackendNotification').unbind('click').bind('click', function() {
            vzDemo.backend.sendNotificationRequest();
        });
    }
};