(function(global, $) {
	var typeMap = {
		1: {
			icon: 'olymp-comments-post-icon',
			link: 'my-classes.html',
			color: '#0d74bc',
		},
		2: {
			icon: 'olymp-status-icon',
			link: 'progress-feedbacks.html',
			color: '#fcb040',
		},
		3: {
			icon: 'olymp-computer-icon',
			link: 'notifications.html',
			color: '#00a550',
		},
	}

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

		$('.fixed-sidebar-left .logo').css('background-color', '#565c86').find('.title-block').empty().append('<img class="" src="img/logo.png">');

		var id2file = {
			'side-home': 'index.html|article.html',
			'side-notification': 'notifications.html|progress-feedbacks.html',
			'side-my-classes': 'my-classes.html',
			'side-teacher-profile': 'teacher-profile.html',
			'side-curriculum': 'curriculum.html|curriculum-overview.html',
			'side-file-uploads': 'file-uploads.html',
			'side-purchases': 'purchase.html',
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
				( currentPath.indexOf('.html') === -1 && filesName.indexOf('index.html') === 0 ) 
			) {
				$link.addClass('actived');
			}
			if( id === 'side-teacher-profile' ) {
				$link.find('svg').css('margin-right', '22px');
			}
			$link.prop('href', filesName.split('|')[0]);
		}

	}

	function initTopbar() {

		$('#more-status').hide();

		$('#site-header>.control-block>.control-icon.more')
			.find('.label-avatar').css('display', 'none')
			.parent()
			.find('.notification-list').empty();

		var phone = global.getPhone();

		// global.yjax('user_info', {
		// 	phone: phone,
		// }, function(data) {
		// 	if( data.code === 0 ) {
		$('.author-name>.author-title>svg').before(global.yookie.get('username'));
		$('#header-account>.author-thumb>img').prop('src', global.yookie.get('avatar'));
		// 	}
		// });
		// global.yjax('status', {
		// 	phone: phone,
		// 	page: 1,
		// }, function(data) {
		// 	if( data.code === 0 ) {
		// 		if( data.list.length > 0 ) {
		// 			var more = $('#more-status');
		// 			more.find('.label-avatar')
		// 				.css('display', 'block')
		// 				.text(data.list.length);

		// 			data.list.map( function( item ) {
		// 				more.find('.notification-list')
		// 					.append(
		// 					'<li>' + 
		// 						'<div class="author-thumb">' + 
		// 							'<img style="height: 34px; width: 34px;" src="' + item.avatar + '" alt="author">' + 
		// 						'</div>' + 
		// 						'<div class="notification-event">' + 
		// 							'<div>' + item.content + '</div>' +
		// 							'<span class="notification-date">' + 
		// 								'<span>' + item.ymd + '</span>' + 
		// 						'</div>' + 
		// 					'</li>'
		// 					);
		// 			} );
		// 		}
		// 	}
		// });
		global.yjax('feedback', {
			phone: phone,
			page: 1,
		}, function(data) {
			if( data.code === 0 ) {
				if( data.list.filter(function(item){return item.flag_unread}).length > 0 ) {
					var more = $('#more-feedback');
					more.find('.label-avatar')
						.css('display', 'block')
						.text(data.list.filter(function(item){return item.flag_unread}).length);

					data.list.map( function( item ) {
						more.find('.notification-list')
							.append(
							'<li>' + 
								'<div class="author-thumb">' + 
									'<img style="height: 34px; width: 34px;" src="' + item.avatar + '" alt="author">' + 
								'</div>' + 
								'<div class="notification-event">' + 
									'<div>' + item.content + '</div>' +
									'<span class="notification-date">' + 
										'<span>' + item.ymd + '</span>' + 
								'</div>' + 
							'</li>'
							);
					} );
				}
			}
		});
		global.yjax('feed', {
			phone: phone,
			page: 1,
		}, function(data) {
			if( data.code === 0 ) {
				if( data.list.filter(function(item){return item.flag_unread}).length > 0 ) {
					var more = $('#more-feed');
					more.find('.label-avatar')
						.css('display', 'block')
						.text(data.list.filter(function(item){return item.flag_unread}).length);

					data.list.map( function( item ) {
						var info = typeMap[item.type];
						more.find('.notification-list')
							.append(
							'<li>' + 
								'<div class="author-thumb">' + 
									'<img style="height: 34px; width: 34px;" src="' + item.icon + '" alt="author">' + 
								'</div>' + 
								'<div class="notification-event">' + 
									'<div>' + item.intro + '</div>' +
									'<span class="notification-date">' + 
										// '<span>' + item.ymd + '</span>' + 
								'</div>' + 
								'<span class="notification-icon">' +
									'<a href="' + info.link + '" class="accept-request" style="border-radius: 20px; background-color: ' + info.color + '">' +
										'<span class="">' +
											'<svg class="' + info.icon + '">' +
												'<use xlink:href="svg-icons/sprites/icons.svg#' + info.icon + '"></use>' + 
											'</svg>' + 
										'</span>' +
									'</a>' +
							'</li>'
							);
					} );
				}
			}
		});
	}

	global.yemplate = yemplate;
	global.yuery = yuery;
	global.yookie = {
		get: function(key) {
			var cookies = global.document.cookie ? global.document.cookie.split('; ') : [],
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

			return (global.document.cookie = [
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
		return 15510647790 || +(global.yookie.get('phone'));
	}

	if( global.document.location.pathname.indexOf('login.html') === -1 ) {
		if( global.getPhone() ) {
			initSidebar();
			initTopbar();
		} else {
			global.document.location.href = 'login.html';
		}

	}

	$('#logout-button').click(function() {
		global.yookie.set('phone', '');
		global.document.location.href = 'login.html';
	})

})(window, jQuery);