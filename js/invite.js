var vzDemo = vzDemo || {};

vzDemo.invite = {
    inviteFriends : function() {
        vz.invite.create('bal', 'blaxx\' du alter hund');
        return;
        vz.invite.getUniqueToken(function(token) {
            vz.invite.create(token, 'blaxx\' du alter hund');
        });
    },
    
    suggest : function() {
        vz.invite.suggest('My custom suggest title', ['OWNER']);
    }
};

vzDemo.invite.controller = {
    bindInvite : function() {
        $('#inviteFriends').unbind('click').bind('click', function() {
            vzDemo.invite.inviteFriends();
        });
        
        $('#suggest').unbind('click').bind('click', function() {
            vzDemo.invite.suggest();
        });
    }
};