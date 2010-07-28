var vzDemo = vzDemo || {};

vzDemo.views = {
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

vzDemo.views.controller = {
    bindViews: function() {

        var viewParams = JSON.stringify(gadgets.views.getParams()) != '{}' ? gadgets.views.getParams() : {"name" : "tim", "age" : 23, "crazystuff" : "Äöüß€ @ §&/()/%∑€®†Ω"};
        $('#jsonParams').val(JSON.stringify(viewParams));

        $('#requestNavigateTo').bind('click', function() {
            var canvas = gadgets.views.getSupportedViews()["canvas"];
            var params = $('#jsonParams').val();
            gadgets.views.requestNavigateTo(canvas, params);
        });

        $('#requestNavigateToIntegration').bind('click', function() {
            var params = $('#jsonParams').val();
            gadgets.views.requestNavigateTo('integration', params);
        });

        $('#openPopup').bind('click', function() {
            gadgets.views.requestNavigateTo('popup', null, null, {width: 800, height: 800});
        });

        $('#getViewParams').bind('click', function() {
           $('#text_output').html(gadgets.json.stringify(gadgets.views.getParams()));
        });

        $('#getCurrentView').bind('click', function() {
           $('#text_output').html(gadgets.json.stringify(gadgets.views.getCurrentView()));
        });

        $('#getSupportedViews').bind('click', function() {
           $('#text_output').html(gadgets.json.stringify(gadgets.views.getSupportedViews()));
        });

    }
};
