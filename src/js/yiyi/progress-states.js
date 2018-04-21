(function(global, $) {

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('state_item');
			template.find('.author-thumb>img').prop('src', item.avatar);
			template.find('.author-name').text(item.chapter);
			template.find('.birthday-date').text(item.content);

			container.append(template);
		}
	}

	global.yjax('status', {
		phone: global.getPhone(),
		page: 1,
		type: 0,
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.states-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);