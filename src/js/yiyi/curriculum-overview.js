(function(global, $) {

	function appendChild(container) {
		return function(item, idx) {
			var template = global.yemplate('chapters');
			template.first().prop('id', 'headingOne-' + idx)
				.find('a').prop('href', '#collapseOne-' + idx)
				.attr('aria-controls', '#collapseOne-' + idx)
				.find('.util-name').append( item.name );


			template.last().prop('id', 'collapseOne-' + idx)
					.attr('aria-labelledby', 'headingOne-' + idx)
					.find('.desc').text(item.short_desc);
			// template.find('.curriculum-desc').text(item.short_desc);
			
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
				// $('.top-header-thumb>img').prop('src', data.back_image);
				$('.top-header-author .author-thumb>img').prop('src', data.icon);
				$('.top-header-author .author-name').text(data.chapter_name);
				var container = $('.curriculum-overview-container');

				container.find('.curriculum-desc').text(data.desc);
				container.find('.target').text(data.target);
				container.find('.tip').text(data.tip);

				data.list.map( appendChild(container.find('#accordion .card')) );

				$('.chapter-overview-desc').map( function(idx, desc) {
					var label = $(desc).find('.chapter-overview-label');
					if( idx === 0 ) {
						label.append(' ' + data.level);
					}
					if( idx === 1 ) {
						label.append(' ' + data.words);
					}
					if( idx === 2 ) {
						label.append(' ' + data.dialogs);
					}
				} )
			}
		});
	}
})(window, jQuery);