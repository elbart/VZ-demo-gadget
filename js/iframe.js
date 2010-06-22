var vzDemo = vzDemo || {};

vzDemo.iframe = {
    fillIframe: function() {
        var rpcToken = gadgets.util.getUrlParameters()['rpctoken'];
        console.log('load iframe with rpc token ' + rpcToken);
        var url = 'http://localhost:8062/vz_demo_gadget/backend/iframe.html?rpctoken=' + rpcToken;
        url += '&env=' + encodeURIComponent(location.host);
        var iframe = document.getElementById('myiframe');
        iframe.src = url;
    },

    callback: function(args) {
        console.log('received callback from iframe');
        console.log(args);
        $('#iframe_response').html(args);
    }
};

vzDemo.iframe.controller = {
    bindIframe: function() {
        $('#fillIframe').unbind('click').bind('click', function() {
            vzDemo.iframe.fillIframe();
        });
    }
};

gadgets.rpc.register('frameCallback', vzDemo.iframe.callback);

