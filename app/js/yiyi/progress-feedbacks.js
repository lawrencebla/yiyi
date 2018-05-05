(function(global, $) {

	let month2String = {
		0: '一月',
		1: '二月',
		2: '三月',
		3: '四月',
		4: '五月',
		5: '六月',
		6: '七月',
		7: '八月',
		8: '九月',
		9: '十月',
		10: '十一月',
		11: '十二月',
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