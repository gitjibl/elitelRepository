(function($) {
    $.namespace("el.Register");
    $.el.Register.ModulesPath = "Modules/v2";
    var appUrl = GetAppUrl();
    function GetAppUrl() {
        if (appUrl != null)
            return appUrl;
        var scripts = document.scripts;
        for (var i = scripts.length; i > 0; i--) {
            var src = ('' + document.querySelector).indexOf('[native code]') === -1 ? scripts[i - 1].getAttribute('src', 4) : scripts[i - 1].src;
            var lowsrc = src.toLowerCase();
            if (lowsrc.indexOf("el.register.js") > -1) {
                if (lowsrc.indexOf("/module/") > -1) {
                    $.el.Register.ModulesPath = "module";
                }
                appUrl = src.substring((location.protocol + "//" + location.host).length, lowsrc.indexOf("module"));
                break;
            }
        }
        if (appUrl == null)
            appUrl = "/";
        return appUrl;
    }
    $.el.Register.AppUrl = appUrl;
})(jQuery);

var dojoConfig = {
    // async: true,
    parseOnLoad : true,
    packages : [ {
        name : "Map2D",
        location : $.el.Register.AppUrl + $.el.Register.ModulesPath + '/Plugin/Map2D'
    }, {
        name : "Library",
        location : $.el.Register.AppUrl + $.el.Register.ModulesPath + '/Library'
    } ]
};
