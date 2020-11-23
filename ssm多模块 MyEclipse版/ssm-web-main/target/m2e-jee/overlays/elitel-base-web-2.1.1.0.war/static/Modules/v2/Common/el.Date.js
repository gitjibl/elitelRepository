(function ($) {
    $.namespace("el.Date");
    $.el.Date.ToString = function (date, fmt) {
        var o = {
            'Q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            'H+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'f+': date.getMilliseconds() //毫秒
        };
        var week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        if (/(E+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
        for (var k in o) {
            if (k == 'f+') {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    var regExp0 = '000000000' + o[k];
                    fmt = fmt.replace(RegExp.$1, regExp0.substr(regExp0.length - RegExp.$1.length));
                }
            } else {
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    };

    Date.prototype.AddSecond = function (s) {
        this.setSeconds(this.getSeconds() + parseInt(s));
        return this;
    };
    Date.prototype.AddMinute = function (m) {
        this.setMinutes(this.getMinutes() + parseInt(m));
        return this;
    };
    Date.prototype.AddHours = function (h) {
        this.setHours(this.getHours() + parseInt(h));
        return this;
    };
    Date.prototype.AddDays = function (d) {
        this.setDate(this.getDate() + parseInt(d));
        return this;
    };
    Date.prototype.AddWeeks = function (w) {
        this.addDays(parseInt(w) * 7);
        return this;
    };
    Date.prototype.AddMonths = function (m) {
        var d = this.getDate();
        this.setMonth(this.getMonth() + m);
        if (this.getDate() < d) {
            this.setDate(0);
        }
        return this;
    };
    Date.prototype.AddYears = function (y) {
        var m = this.getMonth();
        this.setFullYear(this.getFullYear() + y);
        if (m < this.getMonth()) {
            this.setDate(0);
        }
        return this;
    };
    Date.prototype.ToString = function (fmt) {
        return $.el.Date.ToString(this, fmt);
    };

    String.prototype.ToDate = function () {
        return new Date(Date.parse(this.replace(/-/g, "/")));
    };
})(jQuery);
