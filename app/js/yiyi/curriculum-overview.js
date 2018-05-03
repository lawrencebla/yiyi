(function(global, $) {

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('chapters');
			template.find('.post__author-name').text(item.name);
			template.find('.curriculum-desc').text(item.short_desc);
			
			container.append(template);
		}
	}

	var chapterId = global.yuery().id;
	if( chapterId ) {
		global.yjax('chapter_detail', {
			phone: global.getPhone(),
			chapter_id: +chapterId,
		}, function(data) {
			if( data.code === 0 ) {
				$('.top-header-thumb>img').prop('src', data.back_image);
				$('.top-header-author .author-thumb>img').prop('src', data.icon);
				$('.top-header-author .author-name').text(data.chapter_name);
				var container = $('.curriculum-overview-container');
				data.list.map( appendChild(container) );
			}
		});
	}
})(window, jQuery);