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
        var viewerFriends = opensocial.newIdSpec({ "userId" : "OWNER", "groupId" : "FRIENDS" });
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
            callback : vzDemo.controller.bindMessaging
        });
        tabs.addTab('Embedding', {
            contentContainer: document.getElementById('embedding'),
            callback : vzDemo.controller.bindEmbedding
        });
        tabs.addTab('Invite', {
            contentContainer: document.getElementById('invite'),
            callback : vzDemo.controller.bindInvite
        });
        tabs.addTab('Advertising', {
            contentContainer: document.getElementById('advertising'),
            callback : vzDemo.controller.bindAdvertising
        });
        tabs.addTab('Various', {
            contentContainer: document.getElementById('various'),
            callback : vzDemo.controller.bindVarious
        });
    },
    
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
    },
    
    bindEmbedding : function() {
        $('#getEmbedUrl').unbind('click').bind('click', function() {
            var param = {"img":"http://www.playstationweb.de/svz/v3/icons/motorstorm.png","msg":"Yeaha, meine Score ist 0, wer kann mich schlagen? Katrin "};
            console.log(param);
            vzDemo.embedding.getEmbedUrl(param);
        });
    },

    bindInvite : function() {
        $('#inviteFriends').unbind('click').bind('click', function() {
            vzDemo.invite.inviteFriends();
        });
    },
    
    bindAdvertising : function() {
        $('#adTag').unbind('click').bind('click', function() {
            vzDemo.advertising.getAdTag();
        });
        
        $('#paymentInterstitial').unbind('click').bind('click', function() {
            vzDemo.advertising.getPaymentInterstitial();
        });
    },
    
    bindVarious: function() {
        console.log(gadgets.views.getParams());
        var viewParams = JSON.stringify(gadgets.views.getParams()) != '{}' ? gadgets.views.getParams() : {"name" : "tim", "age" : 23, "crazystuff" : "Äöüß€ @ §&/()/%∑€®†Ω"};
        $('#jsonParams').val(JSON.stringify(viewParams));
        
        $('#requestNavigateTo').unbind('click').bind('click', function() {
            var canvas = gadgets.views.getSupportedViews()["canvas"];
            var params = $('#jsonParams').val();
            gadgets.views.requestNavigateTo(canvas, params);
        });
    },
};





