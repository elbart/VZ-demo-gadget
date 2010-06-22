var vzDemo = vzDemo || {};

vzDemo.various = {};

vzDemo.various.controller = {
    bindVarious: function() {
        console.log(gadgets.views.getParams());
        var viewParams = JSON.stringify(gadgets.views.getParams()) != '{}' ? gadgets.views.getParams() : {"name" : "tim", "age" : 23, "crazystuff" : "Äöüß€ @ §&/()/%∑€®†Ω"};
        $('#jsonParams').val(JSON.stringify(viewParams));

        $('#requestNavigateTo').unbind('click').bind('click', function() {
            var canvas = gadgets.views.getSupportedViews()["canvas"];
            var params = $('#jsonParams').val();
            gadgets.views.requestNavigateTo(canvas, params);
        });
    }
};
