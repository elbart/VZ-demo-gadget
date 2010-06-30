var vzDemo = vzDemo || {};

vzDemo.embedding = {
    getEmbedUrl : function(param) {
        vz.embed.getEmbedUrl(param, function(url) {
            console.log(url);
        });
    },
    getStaticUrl : function(key, params) {
        vz.embed.getStaticContentUrl(key, function (url) {
            console.log(url);
        }, params);
    }
};

vzDemo.embedding.controller = {
    bindEmbedding : function() {
        $('#getEmbedUrl').unbind('click').bind('click', function() {
            var param = {"img":"http://www.playstationweb.de/svz/v3/icons/motorstorm.png","msg":"Yeaha, meine Score ist 0, wer kann mich schlagen? Katrin "};
            console.log(param);
            vzDemo.embedding.getEmbedUrl(param);
        });
        $('#getStaticUrl').unbind('click').bind('click', function() {
            vzDemo.embedding.getStaticUrl('key_resource_rich', {q: 'studivz'});
        });
    }
};