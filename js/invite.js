var vzDemo = vzDemo || {};

vzDemo.invite = {
    inviteFriends : function() {
        vz.invite.getUniqueToken(function(token) {
            vz.invite.create(token, 'blaxx\' du alter hund');
        });
    }
};

vzDemo.invite.controller = {
    bindInvite : function() {
        $('#inviteFriends').unbind('click').bind('click', function() {
            vzDemo.invite.inviteFriends();
        });
    }
};