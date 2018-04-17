(function(global, $) {

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('lesson_item');
			template.prop('id', 'lesson_item' + item.id);
			template.find('.author-thumb>img').prop('src', item.icon);
			template.find('.author-name').text(item.name)
				.prop('href', item.lesson_link);
			template.find('.country').text(item.start + '~' + item.end);
			
			template.find('.home-link').prop('href', item.home_link);
			template.find('.lesson-link').prop('href', item.lesson_link);
			template.find('.pre-link').prop('href', item.pre_link);

			if( item.cancel === '0' ) {
				template.find('.more').css('display', 'none');
			}

			template.find('.cancel-class').click(function() {
				global.yjax('cancel', {
					phone: global.getPhone(),
					lesson_id: item.id,
				}, function() {
					$('#lesson_item' + item.id).remove();
				})
			})

			container.append(template);
		}
	}

	global.yjax('my_lesson', {
		phone: global.getPhone(),
		page: 1,
		type: 0,
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.container-content>.row');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);