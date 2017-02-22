var Config = (function(url, callback) {
	// var API_URL = "http://192.168.100.200:30003";
	var API_URL = window.location.origin + window.location.pathname.replace(/\/index\.html/, '');

	function getConfig(url, callback){
		$.ajax({
			url: API_URL + url,
			type: 'GET',
			success: function(res) {
				callback(true, res);
			},
			error: function(res) {
				callback(false);
			}
		})
	}

	function setConfig(url, data, callback) {
		$.ajax({
			contentType: 'application/json; charset=UTF-8',
			type: 'POST',
			url: API_URL + url,
			data: JSON.stringify(data),
			dataType: 'json',
			success: function(res) {
				callback(true, res);
			},
			error: function(res) {
				callback(false);
			}
		})
	}

	return {
		getConfig: getConfig,
		setConfig: setConfig
	}
})();
// 检查 url 是否 https
function checkHttps(url) {
	if (url.includes('https://')) {
		return true;
	} else {
		return false;
	}
}
// 插件 https insecure
function pluginInsecure(url, callback) {
	$.ajax({
		url: url,
		success: function() {
			callback(true);
		},
		error: function(res) {
			if (res.status === 0) {
				callback(false);
			} else {
				callback(true);
			}
		}
	})
}
// 倒计时
function countDown(el, callback) {
	var count = 2;
	var timer = setInterval(function() {
		$(el).html(count)
		count --;
		if (count === -1) {
			clearInterval(timer);
			callback();
		}
	}, 1000);
}

// 跳转
function changeUrl(url) {
	if (checkHttps(url)) {
		pluginInsecure(url, function(res) {
			if (res) {
				window.location.href = url;
			} else {
				$("#myModal").modal('hide');
				var tips = $('<div style="text-align: center;font-size: 30px;font-weight: 400;" id="count">3</div>\
					<div>如果无法显示，可以<a class="url" href="' + url + '" target="_blank">打开此页面</a>，接受 SSL 证书来解决。</div>');

				$('#tips').append(tips);
				countDown($("#count"), function(){
					window.location.href = url;
				});
			}
		})
	} else {
		if (checkHttps(window.location.origin)) {
			$('#tips').html('<p>无法打开该页面，因为违法了浏览器安全规则。你的浏览器现在正在使用 HTTPS，该插件使用了 HTTP。</p>\
				<p>请使用 HTTP 操作 DCE，可以在“设置 -> SSL”将系统调整为不强制使用 SSL。</p>');
		} else {
			window.location.href = url;
		}
	}
}

$().ready(function() {

	Config.getConfig('/plugin.config', function(success, res) {
		if (success && res.WebUrl) {
			changeUrl(res.WebUrl);
		} else {
			$('#myModal').modal('show');
		}
	});

	$('#submit').on('click', function() {
		var webUrl = $('#url').val();
		Config.setConfig('/plugin.config', {
			WebUrl: webUrl
		}, function(success, res) {
			if (success && res.WebUrl) {
				changeUrl(res.WebUrl);
			}
		})
	})
})
