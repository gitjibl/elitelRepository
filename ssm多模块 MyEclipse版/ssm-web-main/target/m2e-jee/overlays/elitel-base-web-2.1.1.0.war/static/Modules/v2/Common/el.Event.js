(function ($) {
    $.namespace("el.Event");
    $.el.Event.Init = function (obj) {
        if (obj == undefined)
            obj = {};
        obj.add = function (eventId, fun, enableMult) {
            if (obj.eventPool == undefined)
                obj.eventPool = {};
            if (enableMult == undefined)
                enableMult = true;
            var funs = obj.eventPool[eventId];
            if (enableMult) {
                if (!funs) {
                    funs = [];
                }
            } else {
                funs = [];
            }
            funs.push(fun);
            obj.eventPool[eventId] = funs;
        };
        obj.fire = function (eventId, args) {
            var fired = false;
            var funs = obj.eventPool[eventId];
            if (typeof funs == "undefined")
                return fired;
            for (var i = 0; i < funs.length; i++) {
                funs[i](args);
                if (!fired)
                    fired = true;
            }
            return fired;
        };
        obj.contains = function (eventId) {
            return typeof obj.eventPool[eventId] != "undefined";
        };
        obj.remove = function (eventId) {
            delete obj.eventPool[eventId];
        };
        return obj;
    };
})(jQuery);
