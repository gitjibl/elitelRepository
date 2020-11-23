define([
    "dojo/_base/declare"
], function (
        declare
        ) {
    return declare("el.Module.WindowBase", null, {
        constructor: function (options) {
            dojo.mixin(this, options);
            this.ContentSelector = "#" + this.Id + ".WindowBase > .Content";
            CreateUI(this);
            RegEvent(this);
        },
        //模板
        Template: "<div id=\"${WindowBaseId}\" class=\"WindowBase\"><div class=\"Header\"><div class=\"Title\">${WindowBaseTitle}</div><div class=\"Close\"></div></div><div class=\"Content\"></div></div>",
        //设置窗口
        SetContent: function (content) {
            $(this.ContentSelector).html("").append(content.join(""));
        },
        //向窗口追加内容
        AppendContent: function (content) {
            $(content.join("")).appendTo(this.ContentSelector);
        },
        //显示窗口
        Show: function (speed, callback) {
            WindowShow(this, speed, callback);
        },
        //关闭窗口
        Hide: function (speed, callback) {
            WindowHide(this, speed, callback);
        },
        //销毁元素
        Distory: function () {
            WindowDistory(this);
        }
    });
    //界面初始化
    function CreateUI(sender) {
        var template = sender.Template;
        if (template.indexOf("${WindowBaseId}") >= 0 && template.indexOf("${WindowBaseTitle}") >= 0) {
            var title = sender.Title == undefined ? "" : sender.Title;
            template = template.replace("${WindowBaseId}", sender.Id).replace("${WindowBaseTitle}", title);
        }
        var windowBase = $(template);
        windowBase.appendTo("#" + sender.ParentId);
        windowBase.hide();

        if (sender.Content != null && sender.Content != undefined && sender.Content != "") {
            var content = null;
            if (sender.Content.constructor == String)
                content = $(sender.Content);
            else
                content = sender.Content;
            $(sender.ContentSelector).html("").append(content);
        }
        if (sender.Callback != undefined) sender.Callback(sender.ContentSelector);
    }
    //注册事件
    function RegEvent(sender) {
        BindingCloseButton(sender);
        if (sender.Dragging) AddDragging(sender);
    }
    //绑定关闭按钮事件
    function BindingCloseButton(sender) {
        $("#" + sender.Id + ".WindowBase > .Header > .Close").bind("click", function (e) {
            //待解决问题，关闭按钮触发关闭事件无法传递speed和callback参数
            WindowHide(sender);
        });
    }
    //添加拖拽功能
    function AddDragging(sender) {
        if (!CheckChildDomLessThanParent($("#" + sender.Id), $("#" + sender.ParentId))) return;
        var referenceTarget = $("#" + sender.ParentId);
        var _x, _y, draggingTarget;
        $("#" + sender.Id + ".WindowBase > .Header")
            .mousedown(function (e) {
                draggingTarget = $(this).parent();
                _x = e.clientX - draggingTarget.offset().left;
                _y = e.clientY - draggingTarget.offset().top;
                this.setCapture && this.setCapture();
                return false;
            })
            .mouseup(function (e) {
                draggingTarget = undefined;
                $(this).css('cursor', 'default');
                this.releaseCapture && this.releaseCapture();
                return false;
            })
            .mousemove(function (e) {
                if (draggingTarget != null) {
                    $(this).css('cursor', 'move');
                }
            });
        $(document).mousemove(function (e) {
            if (draggingTarget != undefined) {
                var e = e || window.event;
                var oX = e.clientX - referenceTarget.offset().left - _x;
                var oY = e.clientY - referenceTarget.offset().top - _y;

                //窗口位移限制
                //左上
                var minLeft = 5;
                var minTop = 5;
                if (oX <= minLeft) oX = minLeft;
                if (oY <= minTop) oY = minTop;
                //右下
                //debugger;
                var maxLeft = referenceTarget.width() - draggingTarget.width() - 8;
                var maxTop = referenceTarget.height() - draggingTarget.height() - 8;
                if (oX >= maxLeft) oX = maxLeft;
                if (oY >= maxTop) oY = maxTop;

                draggingTarget.css({ "left": oX + "px", "top": oY + "px" });
                return false;
            }
        });
    }
    //验证子元素大小不大于父元素
    function CheckChildDomLessThanParent(sender, parent) {
        return parent.height() >= sender.height() && parent.width() >= sender.width();
    }
    //移除拖拽功能
    function RemoveDragging(sender) {
        $("#" + sender.Id + ".WindowBase > .Header")
            .unbind("mousedown")
            .unbind("mouseup")
            .unbind("mousemove");
    }
    //显示窗口
    function WindowShow(sender, speed, callback) {
        if (sender.OnShow) sender.OnShow();
        $("#" + sender.Id).show(speed, callback);
    }
    //隐藏窗口
    function WindowHide(sender, speed, callback) {
        if (sender.OnHide) sender.OnHide();
        $("#" + sender.Id).hide(speed, callback);
    }
    //销毁窗口
    function WindowDistory(sender) {
        if (sender.WindowDistoryEvent) sender.WindowDistoryEvent();
        $("#" + sender.Id).remove();
    }
});