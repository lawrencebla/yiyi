(function(global, $) {

	let month2String = {
		0: 'Jan',
		1: 'Feb',
		2: 'Mar',
		3: 'Apr',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'Aug',
		8: 'Sept',
		9: 'Oct',
		10: 'Nov',
		11: 'Dec',
	}

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('feedback_item');
			template.find('.author-thumb>img').prop('src', item.avatar);
			template.find('.author-name').text(item.chapter);
			template.find('.published').text(item.ymd);
			template.find('.description').text(item.content);

			template.find('.date-event .day').text(new Date(item.ymd).getDate());
			template.find('.date-event .month').text(month2String[new Date(item.ymd).getMonth()]);

			container.append(template);
		}
	}

	global.yjax('feedback', {
		phone: global.getPhone(),
		page: 1,
		type: 0,
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.feedback-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);