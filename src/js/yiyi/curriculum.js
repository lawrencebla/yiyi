(function(global, $) {

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('chapters');
			template.prop('id', 'chapter_item' + item.id);
			template.find('.post-thumb>img').prop('src', item.icon);
			template.find('.post-category').text(item.name)
				.prop('href', 'curriculum-overview.html?id=' + item.id);
			template.find('.post-title').text(item.short_desc);
			
			
			global.yjax('chapter_detail', {
				phone: global.getPhone(),
				chapter_id: item.id,
			}, function(data) {
				var currentItem = $('#chapter_item' + item.id);
				currentItem.find('.level-num').text(data.level);
				currentItem.find('.words-num').text(data.words);
				currentItem.find('.dialogs-num').text(data.dialogs);
			});

			container.append(template);
		}
	}

	global.yjax('chapters', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			$('.top-header-thumb>img').prop('src', data.unit_back_image);
			var container = $('.chapters-container>.row');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);