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

        $('#preloadRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;

            gadgets.io.makeRequest('http://localhost:8062/vz_demo_gadget/backend/preload.php', function(response) {
                $('#text_output_various').html(gadgets.json.stringify(response));
            }, params );
        });

        $('#getRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;
            params[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.GET;
            params[gadgets.io.RequestParameters.REFRESH_INTERVAL]=60;

            gadgets.io.makeRequest('http://localhost:8062/vz_demo_gadget/backend/getRequest.php', function(response) {
                $('#text_output_various').html(gadgets.json.stringify(response));
            }, params );
        });

         $('#postRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;
            params[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.POST;
            params[gadgets.io.RequestParameters.POST_DATA]=gadgets.io.encodeValues({a: 'blub', b: 'abc'});

            gadgets.io.makeRequest('http://localhost:8062/vz_demo_gadget/backend/postRequest.php', function(response) {
                $('#text_output_various').html(gadgets.json.stringify(response));
            }, params );
        });

        $('#adjustHeight').bind('click', function() {
           gadgets.window.adjustHeight(800);
        });

        $('#setTitle').bind('click', function() {
            gadgets.window.setTitle('new title ' + vzDemo.various.getRandom(1, 99));
        });

        $('#encodeValues').bind('click', function() {
            $('#text_output_various').html(gadgets.io.encodeValues({a: 'blub', b: 'abc'}));
        });

        $('#getProxyUrl').bind('click', function() {
            $('#text_output_various').html(gadgets.io.getProxyUrl('http://www.google.de', {a: 'blub', b: 'abc'}));
        });
    }
};
