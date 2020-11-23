define([
    "dojo/_base/declare"
], function (
    declare
) {
    return declare("el.Module.ZoomSlider", null, {
        constructor: function (options) {
            dojo.mixin(this, options);
        },
        //上移
        ShiftUp: function () {
            if (this.Map != null) this.Map.panUp();
        },
        //下移
        ShiftDown: function () {
            if (this.Map != null) this.Map.panDown();
        },
        //左移
        ShiftLeft: function () {
            if (this.Map != null) this.Map.panLeft();
        },
        //右移
        ShiftRight: function () {
            if (this.Map != null) this.Map.panRight();
        },
        //重置
        ZoomReset: function () {
            if (this.Map != null && this.Extent != null) this.Map.setExtent(this.Extent);
        },
        //放大
        ZoomIn: function () {
            if (this.Map != null) {
                var maxLevel = this.Map.getMaxZoom();
                var level = this.Map.getZoom();
                if (level + 1 <= maxLevel) {
                    this.Map.setZoom(level + 1);
                }
            }
        },
        //缩小
        ZoomOut: function () {
            if (this.Map != null) {
                var minLevel = this.Map.getMinZoom();
                var level = this.Map.getZoom();
                if (level - 1 >= minLevel) {
                    this.Map.setZoom(level - 1);
                }
            }
        },
        //定位
        Zoom: function (level) {
            if (this.Map != null) this.Map.setZoom(level);
        }
    });
});