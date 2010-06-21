var vzDemo = vzDemo || {};

vzDemo.embedding = {
    getEmbedUrl : function(param) {
        // console.log(param);
        vz.embed.getEmbedUrl(param, function(url) {
            console.log(url);
        });
    }
};