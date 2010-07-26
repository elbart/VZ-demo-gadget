var tabs = new gadgets.TabSet(gadgetId, 'Messaging');
var vzDemo = vzDemo || {};
var viewer;
var friends;
var friendsIds = new Array();

vzDemo.controller = {
    init : function() {
        vzDemo.controller.initTabs();
        $('#content').show();
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
        tabs.addTab('profile image', {
            contentContainer: document.getElementById('profile_image'),
            callback: vzDemo.profile_image.controller.bindProfileImage()
        });
        tabs.addTab('Backend', {
            contentContainer: document.getElementById('backend'),
            callback: vzDemo.backend.controller.bindBackend()
        });
        tabs.addTab('Various', {
            contentContainer: document.getElementById('various'),
            callback : vzDemo.various.controller.bindVarious
        });
        tabs.addTab('Views', {
            contentContainer: document.getElementById('views'),
            callback : vzDemo.views.controller.bindViews
        });
        tabs.addTab('Substitutions', {
            contentContainer: document.getElementById('substitutions'),
            callback : vzDemo.various.controller.bindLocal
        });
        tabs.addTab('OS Templates', {
            contentContainer: document.getElementById('os-template'),
            callback: vzDemo.templates.controller.bindTemplates
        });
        tabs.addTab("Data Viewer",{
            contentContainer:document.getElementById("statetab"),
            callback: vzDemo.opensocial.controller.bindOpenSocial,
            tooltip:"State viewer"
        });
    }
    
};





