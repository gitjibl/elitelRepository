define([
    "dojo/Evented",
    "dojo/parser",
    "dojo/on",
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/dom-style",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/fx",
    "dojo/Deferred",
    "esri/domUtils",
    "esri/InfoWindowBase"
],
function (
    Evented,
    parser,
    on,
    declare,
    domConstruct,
    array,
    domStyle,
    lang,
    domClass,
    coreFx,
    Deferred,
    domUtils,
    InfoWindowBase
) {
    var infoWidth, infoHeight;
    var initMapCenter, initScreenCenter;
    var showMapPoint, showScreenPoint = null;
    return declare("el.Module.InfoWindow", [InfoWindowBase, Evented],
    {
        constructor: function (options) {
            lang.mixin(this, options);
            domClass.add(this.domNode, "elInfoWindow");
            this._closeButton = domConstruct.create("div", { "class": "close", "title": "关闭" }, this.domNode);
            this._title = domConstruct.create("div", { "class": "title" }, this.domNode);
            this._content = domConstruct.create("div", { "class": "content" }, this.domNode);
            this._arrow = domConstruct.create("div", { "class": "arrow" }, this.domNode);
            on(this._closeButton, "click", lang.hitch(this, function () {
                //hide the content when the info window is toggled close.
                this.hide();
            }));
            //hide initial display 
            domUtils.hide(this.domNode);
            this.isShowing = false;
        },
        setMap: function (map) {
            this.inherited(arguments);
            map.on("pan", lang.hitch(this, function (pan) {
                var movePoint = pan.delta;
                if (this.isShowing) {
                    if (showScreenPoint != null) {
                        this._showInfoWindow(showScreenPoint.x + movePoint.x, showScreenPoint.y + movePoint.y);
                    }
                }
            }));
            map.on("pan-end", lang.hitch(this, function (panend) {
                var movedelta = panend.delta;
                if (this.isShowing) {
                    showScreenPoint.x = showScreenPoint.x + movedelta.x;
                    showScreenPoint.y = showScreenPoint.y + movedelta.y;
                }
            }));
            map.on("zoom-start", lang.hitch(this, function () {
                if (this._showInfoWindowOnZoomEnd(this)) {
                    domUtils.hide(this.domNode);
                    this.onHide();
                } else {
                    //20151206 add by zhangtao cluster point's position is not fixed
                    this.hide();
                }
            }));
            map.on("zoom-end", lang.hitch(this, function () {
                if (this.isShowing) {
                    showScreenPoint = this.map.toScreen(showMapPoint);
                    this._showInfoWindow(showScreenPoint.x, showScreenPoint.y);
                }
            }));
        },
        _showInfoWindowOnZoomEnd: function () {
            //if ($("#" + this.map.id).data("el_infoWindow_clusterType") == "cluster")
            return false;
        },
        setTitle: function (title) {
            this.place(title, this._title);
        },
        setContent: function (content) {
            this.place(content, this._content);
        },
        _showInfoWindow: function (x, y) {
            //Position 10x10 pixels away from the specified location
            domStyle.set(this.domNode, {
                "left": x - infoWidth / 2 + 15 + "px", //this.向右偏移15px
                "top": y - infoHeight - 75 + "px" //this.向上偏移75px
            });
            //display the info window
            domUtils.show(this.domNode);
        },
        show: function (location) {
            showMapPoint = location;

            initMapCenter = this.map.extent.getCenter();
            initScreenCenter = this.map.toScreen(initMapCenter);

            //infoHeight = $(".elInfoWindow").height();
            //infoWidth = $(".elInfoWindow").width();
            infoHeight = $(this.domNode).height();
            infoWidth = $(this.domNode).width();

            if (location.spatialReference) {
                location = this.map.toScreen(location);
            }

            var left = location.x - infoWidth / 2;
            var top = location.y - (infoHeight + 75);
            var right = $(window).width() - (location.x + infoWidth / 2);
            showScreenPoint = location;

            if (top < 10) { //this.marginTop
                initScreenCenter.y = initScreenCenter.y + top - 10;
            }
            var moveX = false;
            if (left < 10) { //this.marginLeft
                initScreenCenter.x = initScreenCenter.x + left - (10 - 15);
                moveX = true;
            }
            if (!moveX && right < 10) { //this.marginRight
                initScreenCenter.x = initScreenCenter.x - right + (10 + 15);
            }
            this._showInfoWindow(showScreenPoint.x, showScreenPoint.y);
            initMapCenter = this.map.toMap(initScreenCenter);
            this.map.centerAt(initMapCenter);
            this.isShowing = true;
            this.onShow();
        },
        hide: function () {
            domUtils.hide(this.domNode);
            this.isShowing = false;
            this.onHide();
        },
        resize: function (width, height) {
            domStyle.set(this._content, {
                "width": width + "px",
                "height": (height - 60) + "px" //this.arrowBottom
            });
            domStyle.set(this._title, {
                "width": width + "px"
            });
        },
        destroy: function () {
            domConstruct.destroy(this.domNode);
            this._closeButton = this._title = this._content = null;
        }
    });
    //return InfoWindow; //20151230 zhangtao
});