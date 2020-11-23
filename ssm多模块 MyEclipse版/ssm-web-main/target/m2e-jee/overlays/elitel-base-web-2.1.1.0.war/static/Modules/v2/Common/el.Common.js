//临时分类 20151221 zhangtao
(function ($) {
    $.namespace("el.Common");
    $.el.Common.IsEmpty = function (object) {
        if (typeof (object) == "string") {
            return object == '' || object == null;
        }
        return $.isEmptyObject(object);
    };
})(jQuery);
