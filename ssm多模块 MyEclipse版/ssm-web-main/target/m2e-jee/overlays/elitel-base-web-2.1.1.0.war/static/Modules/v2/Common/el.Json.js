///call el.Date.js
(function ($) {
    $.namespace("el.Json");
    $.el.Json.ToJson = function (object) {
        if (object == null)
            return null;
        var type = typeof object;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else if (Date == object.constructor) type = 'date';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, '\\$1').replace(/\n|\r|\t/g, function (str) {
                    return (str == '\n') ? '\\n' : (str == '\r') ? '\\r' : (str == '\t') ? '\\t' : ''
                }) + '"';
                break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = $.el.Json.ToJson(object[property]);
                    if (value !== undefined) results.push($.el.Json.ToJson(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = $.el.Json.ToJson(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
            case 'date':
                return '"' + $.el.Date.ToString(object, 'yyyy-MM-dd HH:mm:ss.fff') + '"';
                break;
        }
    };
    $.el.Json.ToObject = function (json) {
        return eval('(' + json + ')');
    };
})(jQuery);
