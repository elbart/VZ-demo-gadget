var vzDemo = vzDemo || {};

vzDemo.embedding = {
    getEmbedUrl : function(param) {
        // console.log(param);
        vz.embed.getEmbedUrl(param, function(url) {
            console.log(url);
        });
    }
};

vzDemo.embedding.controller = {
    bindEmbedding : function() {
        $('#getEmbedUrl').unbind('click').bind('click', function() {
            var param = {"img":"http://www.playstationweb.de/svz/v3/icons/motorstorm.png","msg":"Yeaha, meine Score ist 0, wer kann mich schlagen? Katrin "};
            console.log(param);
            vzDemo.embedding.getEmbedUrl(param);
        });
    }
};