var vzDemo = vzDemo || {};

vzDemo.various = {
    getRandom: function( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
    }
};

vzDemo.various.controller = {
    bindLocal: function() {
        var prefs = new gadgets.Prefs();
        $('#prefsCountry').html('country ' + prefs.getCountry());
        $('#prefsLang').html('lang ' + prefs.getLang());
    },
    bindVarious: function() {
        console.log(gadgets.views.getParams());
        var viewParams = JSON.stringify(gadgets.views.getParams()) != '{}' ? gadgets.views.getParams() : {"name" : "tim", "age" : 23, "crazystuff" : "Äöüß€ @ §&/()/%∑€®†Ω"};
        $('#jsonParams').val(JSON.stringify(viewParams));
        
        $('#getAndSetPrefs').bind('click', function() {
            var prefs = new gadgets.Prefs();
            var name = prefs.getString("name");
            console.log('got value: ' + name);
            var newName = 'new name' + vzDemo.various.getRandom(1, 99);
            prefs.set('name', newName);
            console.log('set to: ' + newName);
        });

        var staticMsg;
        var msg = new gadgets.MiniMessage();

        $('#createStaticMessage').bind('click', function() {
            staticMsg = msg.createStaticMessage('this is a static message');
        });

        $('#dismissMessage').bind('click', function() {
            if (staticMsg) {
                msg.dismissMessage(staticMsg);
            }
        });

        $('#createTimerMessage').bind('click', function() {
            var timerMsg = msg.createTimerMessage('this is a timable message', 3, function() {
                console.log('callback called');
                msg.dismissMessage(timerMsg);
            });
        });

        $('#createDismissibleMessage').bind('click', function() {
            var dismissableMsg = msg.createDismissibleMessage('this is a dismissalbe message', function() {
                console.log('callback called');
                msg.dismissMessage(dismissableMsg);
            });
        });

        
        $('#requestNavigateTo').bind('click', function() {
            var canvas = gadgets.views.getSupportedViews()["canvas"];
            var params = $('#jsonParams').val();
            gadgets.views.requestNavigateTo(canvas, params);
        });

        $('#openPopup').bind('click', function() {
            gadgets.views.requestNavigateTo('popup', null, null, {width: 800, height: 800});
        });

        $('#adjustHeight').bind('click', function() {
           gadgets.window.adjustHeight(800);
        });

        $('#setTitle').bind('click', function() {
            gadgets.window.setTitle('new title ' + vzDemo.various.getRandom(1, 99));
        });
    }
};
