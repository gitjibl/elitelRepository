dojo.ready(function () {
    dojo.declare("el.Layer.TiledServiceLayer", esri.layers.TiledMapServiceLayer, {
        constructor: function () {
            this.cornerPoint = 20037508.342787;
            this.spatialReference = new esri.SpatialReference({ wkid: 102113 });
            this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-this.cornerPoint, -this.cornerPoint, this.cornerPoint, this.cornerPoint, this.spatialReference));
            this.tileInfo = new esri.layers.TileInfo({
                "rows": 256,
                "cols": 256,
                "compressionQuality": 0,
                "origin": { "x": -this.cornerPoint, "y": this.cornerPoint },
                "spatialReference": { "wkid": 102113 },
                "lods": [
                    { "level": 0, "resolution": 156543.033928, "scale": 591657527.591555 },
                    { "level": 1, "resolution": 78271.5169639999, "scale": 295828763.795777 },
                    { "level": 2, "resolution": 39135.7584820001, "scale": 147914381.897889 },
                    { "level": 3, "resolution": 19567.8792409999, "scale": 73957190.948944 },
                    { "level": 4, "resolution": 9783.93962049996, "scale": 36978595.474472 },
                    { "level": 5, "resolution": 4891.96981024998, "scale": 18489297.737236 },
                    { "level": 6, "resolution": 2445.98490512499, "scale": 9244648.868618 },
                    { "level": 7, "resolution": 1222.99245256249, "scale": 4622324.434309 },
                    { "level": 8, "resolution": 611.49622628138, "scale": 2311162.217155 },
                    { "level": 9, "resolution": 305.748113140558, "scale": 1155581.108577 },
                    { "level": 10, "resolution": 152.874056570411, "scale": 577790.554289 },
                    { "level": 11, "resolution": 76.4370282850732, "scale": 288895.277144 },
                    { "level": 12, "resolution": 38.2185141425366, "scale": 144447.638572 },
                    { "level": 13, "resolution": 19.1092570712683, "scale": 72223.819286 },
                    { "level": 14, "resolution": 9.55462853563415, "scale": 36111.909643 },
                    { "level": 15, "resolution": 4.77731426794937, "scale": 18055.954822 },
                    { "level": 16, "resolution": 2.38865713397468, "scale": 9027.977411 },
                    { "level": 17, "resolution": 1.19432856685505, "scale": 4513.988705 },
                    { "level": 18, "resolution": 0.597164283559817, "scale": 2256.994353 },
                    { "level": 19, "resolution": 0.298582141647617, "scale": 1128.497176 }
                ]
            });
            this.loaded = true;
            this.onLoad(this);
        },
        getTileUrl: function (level, row, col, img) {
            var resolution = this.cornerPoint * 2;
            for (var i = 0; i < level; i++)
                resolution /= 2;
            var xmin, ymin, xmax, ymax;
            xmin = -this.cornerPoint + resolution * col;
            ymin = this.cornerPoint - resolution * (row + 1);
            xmax = -this.cornerPoint + resolution * (col + 1); //xmin + resolution
            ymax = this.cornerPoint - resolution * row; //ymin + resolution
            return this.url + "/export?udpi=96&transparent=true&format=png8&bbox=" + xmin + "," + ymin + "," + xmax + "," + ymax + "&bboxSR=102100&imageSR=102100&size=256,256&f=image";
        }
    });
    //CustomTiledMapServiceLayer.prototype.URL;
    //CustomTiledMapServiceLayer.prototype.CornerPoint = 20037508.342787;
});

/*
http://resources.arcgis.com/en/help/rest/apiref/
export?
///[f]：html | json | image | kmz
&f=image
///[bbox]：<xmin>, <ymin>, <xmax>, <ymax>
&bbox=2504688.5428483747,-5009377.085696749,5009377.085696749,-2504688.5428483747
///[size]：<width>, <height>
&size=256,256
&udpi=96
///[imageSR]：请求图片的坐标系统
&imageSR=102100
&bboxSR=102100
///[format]：png | png8 | png24 | jpg | pdf | bmp | gif | svg | png32
&format=png8
///[transparent]：true | false，png and gif有效
&transparent=true

没有使用
&layerDefs
&layers
&time
&layerTimeOptions
&dynamicLayers
&gdbVersion
&mapScale
*/
