define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/layers/TileInfo",
    "esri/layers/TiledMapServiceLayer"
], function (
    declare,
    lang,
    SpatialReference,
    Extent,
    TileInfo,
    TiledMapServiceLayer
) {
    var circle = 20037508.342787;
    return declare("el.Layer.GoogleLayer", [TiledMapServiceLayer], {
        constructor: function (options) {
            lang.mixin(this, options);
            if ((this.url == null || this.url == undefined) && this.category != null) this.url = GetLayerUrl(this.category);
            this.spatialReference = new SpatialReference({
                wkid: 102113
            });
            this.initialExtent = new Extent(-circle, -circle, circle, circle, this.spatialReference);
            this.fullExtent = new Extent(-circle, -circle, circle, circle, this.spatialReference);
            this.tileInfo = new TileInfo({
                dpi: 90.71428571427429,
                format: "image/png",
                compressionQuality: 0,
                spatialReference: {
                    wkid: 102113
                },
                rows: 256,
                cols: 256,
                origin: {
                    x: -circle,
                    y: circle
                },
                lods: (function () {
                    var zooms = new Array();
                    for (var i = 0; i < 20; i++) {
                        zooms.push({ level: i, resolution: circle * Math.pow(2, -7 - i), scale: 591657527.591555 * Math.pow(2, -i) });
                    }
                    return zooms;
                })()
            });
            this.loaded = true;
            this.onLoad(this);
        },
        getTileUrl: function (level, row, col) {
            var url = this.url;
            url = url.replace("{X}", col);
            url = url.replace("{Y}", row);
            url = url.replace("{Z}", level);
            url = url.replace("{D}", ((row + col) & 3));
            //url = url.replace("{G}", "Galileo".substring(0, ((3 * col + row) & 7)));
            return url;
        }
    });
    //根据图层类型返回图层url
    function GetLayerUrl(category) {
        switch (category) {
            case "topographic"://地形图
                //自动查询Google图版本
                return "http://mt{D}.google.cn/vt/lyrs=t@129,r@186000000&hl=zh-CN&gl=cn&x={X}&y={Y}&z={Z}";
                //case "satellitegraphic"://卫星图
                //    return "";
                //case "mixgraphic"://混合图
                //    return "";
                //case "territorygraphic"://混合图
                //    return "";
        }
    }
});
