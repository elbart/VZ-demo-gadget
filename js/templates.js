var vzDemo = vzDemo || {};

vzDemo.templates = {

};

vzDemo.templates.controller = {
    bindTemplates: function() {
        $('#updateViewerTemplate').bind('click', function() {
            var newUser = {
                displayName: 'New User'
            };
            console.log(newUser);
            opensocial.data.DataContext.putDataSet("Viewer", newUser);
        });
    }
};

