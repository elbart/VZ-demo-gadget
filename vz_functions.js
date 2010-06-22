var tabs = new gadgets.TabSet(gadgetId, 'Messaging');
var vzDemo = vzDemo || {};
var viewer;
var friends;
var friendsIds = new Array();

vzDemo.controller = {
    init : function() {
        // load friends before anything else to do
        var req = opensocial.newDataRequest();
        req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER), 'viewer');
        var viewerFriends = opensocial.newIdSpec({"userId" : "OWNER", "groupId" : "FRIENDS"});
        var opt_params = {};
        req.add(req.newFetchPeopleRequest(viewerFriends, opt_params), 'viewerFriends');
        req.send(function(data) {
            viewer  = data.get('viewer').getData();
            friends = data.get('viewerFriends').getData();

            friends.each(function(person) {
                if (person.getId()) {
                    friendsIds.push(person.getId());
                }
            });

            vzDemo.controller.initTabs();
            $('#content').show();
        });
    },
    
    initTabs : function() {
        tabs.addTab('Messaging', {
            contentContainer: document.getElementById('messaging'),
            callback : vzDemo.messaging.controller.bindMessaging
        });
        tabs.addTab('Embedding', {
            contentContainer: document.getElementById('embedding'),
            callback : vzDemo.embedding.controller.bindEmbedding
        });
        tabs.addTab('Invite', {
            contentContainer: document.getElementById('invite'),
            callback : vzDemo.invite.controller.bindInvite
        });
        tabs.addTab('Advertising', {
            contentContainer: document.getElementById('advertising'),
            callback : vzDemo.advertising.controller.bindAdvertising
        });
        tabs.addTab('Iframe', {
            contentContainer: document.getElementById('iframe'),
            callback : vzDemo.iframe.controller.bindIframe
        });
        tabs.addTab('Various', {
            contentContainer: document.getElementById('various'),
            callback : vzDemo.various.controller.bindVarious
        });
    }
    
};





