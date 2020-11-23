///call el.Json.js
(function ($) {
    $.fn.datagrid.defaults.method = 'post';
    $.fn.datagrid.defaults.striped = true;
    $.fn.datagrid.defaults.loader = function (param, success, error) {
        var $opts = $(this).datagrid('options');
        if (!$opts.url) { return false; }
        $.ajax({
            async: true,
            contentType: 'application/json',
            type: $opts.method,
            url: $opts.url,
            data: $.el.Json.ToJson(param),
            dataType: 'json',
            success: function (data) { success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };
    $.fn.datagrid.defaults.loadFilter = function (data) {
        if (typeof data.d != 'undefined') data = data.d; //WebService
        if (typeof data == "string") data = eval('(' + data + ')'); //JSON
        var resultType = 0;
        if (typeof data.ResultType != 'undefined' && typeof data.Value != 'undefined') { //SvrResult
            resultType = data.ResultType;
            if (resultType == 0) data = data.Value;
            else {
                $(this).datagrid('options').onLoadError(data);
                return { total: 0, rows: [], ResultType: resultType };
            }
        }
        if (typeof data.length == "number" && typeof data.splice == "function") { //[]
            return { total: data.length, rows: data };
        } else if (typeof data.RecordCount != 'undefined' && typeof data.PageList != 'undefined') { //PageResult
            return {
                total: data.RecordCount, rows: data.PageList, ResultType: resultType,
                PageCount: data.PageCount, RecordFrom: data.RecordFrom, RecordTo: data.RecordTo,
                PageIndex: data.PageIndex, PageSize: data.PageSize, footer: data.FooterList,
                FileUrl: data.FileUrl, FileName: data.FileName
            };
        } else { return data; } //{ total: 0, rows: [] }
    };
    $.extend($.fn.datagrid.methods, {
        resizeRownumber: function (jq) {
            return jq.each(function () {
                var $panel = $(this).datagrid("getPanel");
                var $last = $(".datagrid-cell-rownumber", $panel).last();
                var width = $last.width();
                var should = $last[0].innerText.length * 10;
                if (should > width) width = should;
                $(".datagrid-header-rownumber,.datagrid-cell-rownumber", $panel).width(width);
                $(this).datagrid("resize");
            });
        },
        autoMergeCells: function (jq, fields) {
            return jq.each(function () {
                var target = $(this);
                if (!fields) {
                    fields = target.datagrid("getColumnFields");
                }
                var rows = target.datagrid("getRows");
                var i = 0,
                j = 0,
                temp = {};
                for (i; i < rows.length; i++) {
                    var row = rows[i];
                    j = 0;
                    for (j; j < fields.length; j++) {
                        var field = fields[j];
                        var tf = temp[field];
                        if (!tf) {
                            tf = temp[field] = {};
                            tf[row[field]] = [i];
                        } else {
                            var tfv = tf[row[field]];
                            if (tfv) {
                                tfv.push(i);
                            } else {
                                tfv = tf[row[field]] = [i];
                            }
                        }
                    }
                }
                $.each(temp, function (field, colunm) {
                    $.each(colunm, function () {
                        var group = this;

                        if (group.length > 1) {
                            var before,
                            after,
                            megerIndex = group[0];
                            for (var i = 0; i < group.length; i++) {
                                before = group[i];
                                after = group[i + 1];
                                if (after && (after - before) == 1) {
                                    continue;
                                }
                                var rowspan = before - megerIndex + 1;
                                if (rowspan > 1) {
                                    target.datagrid('mergeCells', {
                                        index: megerIndex,
                                        field: field,
                                        rowspan: rowspan
                                    });
                                }
                                if (after && (after - before) != 1) {
                                    megerIndex = after;
                                }
                            }
                        }
                    });
                });
            });
        }
    });
})(jQuery);
