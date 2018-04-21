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
	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('notification_item');
			template.find('.author-thumb>img').prop('src', item.icon);
			template.find('.notification-event').text(item.intro);
			template.find('.entry-date').text('api没有时间');

			var info = typeMap[item.type];

			template
				.find('.notification-icon')
					.prop('href', info.link)
				.find('svg')
					.addClass(info.icon)
				.find('use')
					.attr('xlink:href', 'svg-icons/sprites/icons.svg#' + info.icon);

			container.append(template);
		}
	}

	global.yjax('feed', {
		phone: global.getPhone(),
		page: 1,
		type: 0,
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.notification-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);