(function(global, $) {

	function appendChild(container) {
		return function(item) {

			// $('.top-header-thumb img').prop('src', item.banner);
			$('.top-header-author .author-thumb img').prop('src', item.avatar);
			$('.top-header-author .author-name').text(item.name);

			var introduction = global.yemplate('teacher_introduction');
			introduction.find('.post__author>img').prop('src', item.avatar);
			introduction.find('.post__author-name').text(item.name);
			introduction.find('.teacher-introduction').text(item.introduction);

			container.append(introduction);

			for( var i = 1; i <= 3; i++ ) {
				if( item['title' + i] ) {
					var info = global.yemplate('teacher_desc');
					info.find('.video-player>img').prop('src', item['image' + i]);
					info.find('.post__author-name').text(item['title' + i]);
					info.find('.teacher-desc').text(item['desc' + i]);

					container.append(info);
				}
			}

		}
	}

	global.yjax('my_teacher', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.teacher-container');
			appendChild(container)(data);
		}
	});
})(window, jQuery);