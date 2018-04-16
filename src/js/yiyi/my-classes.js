(function(global, $) {

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('media_item');
			template.prop('id', 'media_item_' + item.id);
			template.find('.post-thumb img').prop('src', item.icon);
			template.find('.post__author-name').text(item.author);
			template.find('.post-title')
				.text(item.title)
				.prop('href', 'article.html?id=' + item.id);
			template.find('.post-short_desc').text(item.short_desc);
			template.find('.post-category')
				.text(item.word)
				.css('background-color', item.color);

			container.append(template);
		}
	}

	global.yjax('my_lesson', {
		phone: 18253591067,
		page: 1,
		type: 0,
	}, function(data) {
		if( data.code === 0 ) {
			// var container = $('.container-content');
			// data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);