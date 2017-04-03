(function($) {
	$.fn.jqzoom = function(options) {
		var _this = $(this);
		var settings = {
			wzoom: 120, //zoomed width default width
			hzoom: 120, //zoomed div default width
			offset: 10, //zoomed div default offset
		};
		if(options) {
			$.extend(settings, options);
		}

		_this.hover(function(event) {
			var src = _this.find("img").attr("src");
			var $imgBox = $("<div id='ibox'><img src='" + src + "'/></div>");
			var $cursor = $("<div id='csor'></div>");

			_this.append($cursor)
			$cursor.show();
			_this.append($imgBox)
			$imgBox.show();

			$("#ibox").css({
				"height": _this.height(),
				"width": _this.width(),
			});
			$("#csor").css({
				"width": settings.wzoom,
				"height": settings.hzoom
			})
			var x = _this.width() / $("#csor").width();
			var y = _this.height() / $("#csor").height();
			console.log(_this.width())
			console.log($("#csor").width())
			$("#ibox img").css({
				"height": _this.height() * x,
				"width": _this.width() * y,
			});
			var disX = _this.offset().left;
			var disY = _this.offset().top;
			$(document).mousemove(function(event) {
				var oleft = event.pageX - ($("#csor").width() / 2) - disX;
				var otop = event.pageY - ($("#csor").height() / 2) - disY;
				if(oleft <= 0) {
					oleft = 0
				} else if(oleft > _this.width() - $("#csor").width()) {
					oleft = _this.width() - $("#csor").width()
				}
				if(otop <= 0) {
					otop = 0
				} else if(otop > _this.height() - $("#csor").height()) {
					otop = _this.height() - $("#csor").height()
				}
				$cursor.offset({
					"left": oleft + disX,
					"top": otop + disY,
				});

				$("#ibox img").css({
					"left": -oleft * x,
					"top": -otop * y,
				});
				return false
			})
			$imgBox.offset({
				"left": disX + $(this).width() + settings.offset,
				"top": disY
			})
		}, function() {
			$("#ibox").fadeOut().remove();
			$("#csor").fadeOut().remove();
		})
	}
})(jQuery);