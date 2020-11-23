(function ($) {
    $.fn.combobox.defaults.filter = function (q, row) {
        var opts = $(this).combobox("options");
        return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) > -1;
    };
})(jQuery);