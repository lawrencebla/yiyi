(function(global, $) {
	function yemplate(id) {
		return $($('#' + id).html());
	}
	function yuery() {
		var searchStr = global.document.location.search;
		var query = {};
		if( searchStr.indexOf('?') === 0 ) {
			searchStr = searchStr.substr(1);
			searchStr.split('&').map( function(paramStr) {
				var paramArr = paramStr.split('=');
				if(paramArr.length === 2) {
					query[paramArr[0]] = paramArr[1];
				}
			} );
		}
		return query;
	}

	function initSidebar() {

		var id2file = {
			'side-home': 'index.html|article.html',
			'side-notification': 'notifications.html',
			'side-my-classes': 'my-classes.html',
			'side-teacher-profile': 'teacher-profile.html',
			'side-curriculum': 'curriculum.html|curriculum-overview.html',
			'side-file-uploads': 'file-uploads.html',
			'side-purchases': '',
			'side-settings': 'person-info.html|family-info.html|change-password.html|billing.html|contact-us.html',
		}

		var $leftMenu = $('.left-menu');
		var currentPath = global.document.location.pathname;
		var currentFile = currentPath.split('/').reverse()[0];
		for( var id in id2file ) {
			var filesName = id2file[id];
			var $link = $leftMenu.find('#' + id + '>a');
			if( 
				(currentFile && filesName.indexOf(currentFile) !== -1 )|| 
				( currentPath.indexOf('.html') === -1 && filesName.indexOf('index.html') === 0 ) ) {
				$link.addClass('actived');
			}
			$link.prop('href', filesName.split('|')[0]);
		}

	}

	initSidebar();

	global.yemplate = yemplate;
	global.yuery = yuery;
	global.yookie = {
		get: function(key) {
			var cookies = global.cookie ? global.cookie.split('; ') : [],
				i = 0,
				l = cookies.length;
				for (; i < l; i++) {
					var parts = cookies[i].split('='),
						name = parts.shift(),
						cookie = parts.join('=');

					if (key === name) {
						return cookie;
					}
				}
			return '';
		},
		set: function(key, value, options) {
			options = options || {};
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (global.cookie = [
				key, '=', value,
				options.expires ? '; expires=' + options.expires.toUTCString() : '',
				"; path=",
				options.path    ? options.path : '/',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		},
	}
	global.getPhone = function() {
		return +(global.yookie.get('phone') || 18253591067);
	}
})(window, jQuery);