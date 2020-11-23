//计算水位流量
$(function () {
   /*
    *在轨迹上取某一横坐标对应的值
    *（内部调用）
    */
    Highcharts.intersectPoint = function (x, points) {
        if (x <= points[0].x) { return [points[0].x, points[0].y]; }
        if (x >= points[points.length - 1].x) { return [points[points.length - 1].x, points[points.length - 1].y]; }
        var _firstP = points[0];
        var _lastP;
        for (var i = 0; i < points.length; i++) {
            if (points[i].x >= x) { _lastP = points[i]; break; }
            _firstP = points[i];
        }

        var y = _firstP.y + (_lastP.y - _firstP.y) * (x - _firstP.x) / (_lastP.x - _firstP.x);

        return [parseFloat((x).toFixed(3)), parseFloat((y).toFixed(3))];
    }
   /*
    *在轨迹上取横坐标范围内的点。
    */
    Highcharts.inPoints = function (min, max, points) {
        var rtn = [];
        for (var i = 0; i < points.length; i++) {
            if (points[i].x > min && points[i].x < max) {
                rtn.push([points[i].x, points[i].y]);
            }
        }
        return rtn;
    }
    /*
     *获取截断线点（包括两端点）。
     */
    Highcharts.subSeries = function (min, max, points) {
        var rtn = [];
        rtn = Highcharts.inPoints(min, max, points);
        rtn.unshift(Highcharts.intersectPoint(min, points));
        rtn.push(Highcharts.intersectPoint(max, points));
        return rtn;
    }
    /*
     *计算线段投影面积。
     *descP：线段点集合。
     */
    Highcharts.calcArea = function (descP) {
        var __x = descP[0][0];
        var __y = descP[0][1];
        var sumArea = 0;
        for (var i = 1; i < descP.length; i++) {
            sumArea += ((__y + descP[i][1]) * (descP[i][0] - __x) / 2);
            __x = descP[i][0];
            __y = descP[i][1];
        }
        return sumArea;
    }

}());