var vzDemo = vzDemo || {};

vzDemo.opensocial = {
    useOsapi: false,

    sendOsapiRequest: function(user, group, callback) {
        if (user.indexOf(':') > 0) {
            osapi.people.get({userId: user, groupId: '@' + group.toLowerCase()}).execute(function(data) {
              callback(data);
            });
        } else {
            osapi.people.get({userId: '@' + user.toLowerCase(), groupId: '@' + group.toLowerCase()}).execute(function(data) {
              callback(data);
            });
        }

    },

    osapiAppdata: function() {
        osapi.newBatch().
            add("create", osapi.appdata.update({userId: '@viewer', data: {gifts: 'a crazed monkey'}})).
            add('get', osapi.appdata.get({ userId : '@viewer', groupId : '@self', keys: ['gifts']})).
            add('delete', osapi.appdata.del({keys: ['gifts']})).
        execute(function(result) {
          console.log(result);
        });

    },

    sendRequest: function(user, group, callback) {

        if (vzDemo.opensocial.useOsapi) {
            vzDemo.opensocial.sendOsapiRequest(user, group, callback);
            return;
        }

        var req = opensocial.newDataRequest();
        var idSpec = opensocial.newIdSpec({"userId" : user, "groupId" : group});
        var opt_params = {};
        req.add(req.newFetchPeopleRequest(idSpec, opt_params), 'requestId');
        var params = {};
        params[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS ] = ['profileUrl', 'photos', 'birthday', 'gender'];
        params[opensocial.DataRequest.PeopleRequestFields.MAX] = 250;
        req.add(req.newFetchPeopleRequest(opensocial.newIdSpec({"userId" : "VIEWER", "groupId" : "ALL"}), params),'users');
        req.send(function(data) {
            callback(data.get('requestId').getData());
        });
    }
};

vzDemo.opensocial.controller = {

    showUser: function(user) {
        $('#statetab-output').html(gadgets.json.stringify(user));
    },

    bindOpenSocial: function() {
        $('#statetab-toogle-osapi').bind('click', function() {
            vzDemo.opensocial.useOsapi = !vzDemo.opensocial.useOsapi;
            if (vzDemo.opensocial.useOsapi) {
                $(this).html('new osapi');
            } else {
                $(this).html('old api');
            }
        });

        $('#statetab-appdata-button').bind('click', function() {
            vzDemo.opensocial.osapiAppdata();
        });

        $('#statetab-fetchviewer-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('VIEWER', 'SELF', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchowner-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('OWNER', 'SELF', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchviewerfriends-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('VIEWER', 'FRIENDS', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchownerfriends-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('OWNER', 'FRIENDS', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchbyid-button').bind('click', function() {
            vzDemo.opensocial.sendRequest($('#statetab-fetchbyid-input').val(), 'SELF', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchfriendsbyid-button').bind('click', function() {
            vzDemo.opensocial.sendRequest($('#statetab-fetchbyid-input').val(), 'FRIENDS', vzDemo.opensocial.controller.showUser);
        });
    }
};