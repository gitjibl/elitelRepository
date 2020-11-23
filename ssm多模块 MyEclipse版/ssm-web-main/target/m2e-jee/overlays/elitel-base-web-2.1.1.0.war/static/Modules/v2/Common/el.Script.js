(function ($) {
    $.namespace("el.Script");
    $.el.Script.Get = function (urls, fun, options) {
        if (urls.constructor != Array)
            urls = [urls];
        var load = 0;
        for (var i = 0; i < urls.length; i++) {
            GetOne(urls[i], function () {
                load += 1;
                if (urls.length == load) {
                    fun();
                }
            }, options);
        }
        function GetOne(url, fun, options) {
            var key = "el-cache-head-scripts";
            var scripts = $("head").data(key);
            if (typeof scripts == "undefined")
                scripts = [];
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i] == url) {
                    return fun();
                }
            }
            options = $.extend(options || {}, {
                url: url,
                dataType: "script",
                cache: true
            });
            scripts.push(url);
            $("head").data(key, scripts);
            $.ajax(options).done(function () {
                fun();
            });
        }
    };
})(jQuery);
