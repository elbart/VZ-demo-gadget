vzDemo.advertising = {
    getAdTag : function() {
        var adCode = 112; // custom number provided by the vz-team for embedding your ad tags
        vz.advertising.getAdTag(adCode, function(adTag) {
            // use generated adTag now (dependent on the format)
            alert('got ad tag "' + adTag + '" for ad code "' + adCode + '"');
        });
    },
    
    getPaymentInterstitial : function() {
        vz.advertising.getPaymentInterstitial(function() {
            // do payment stuff here
            alert('User clicked ok');
        });
    }
};