//本地化
(function () {
    Highcharts.setOptions({
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c',
		    '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
        symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
        global: {
            useUTC: false,
        },
        lang: {
            loading: '加载中...',
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            shortMonths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            resetZoom: "复位",
            resetZoomTitle: "复位1:1",
            printChart: "打印图表",
            downloadJPEG: "下载JPEG图片",
            downloadPDF: "下载PDF文档",
            downloadPNG: "下载PNG图片",
            downloadSVG: "下载SVG矢量图",
            exportButtonTitle: "导出图片"
        }
    });
}());