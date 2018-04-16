(function(global, $) {

	function appendChild(container) {
		return function(media) {
			var template = global.yemplate('media_detail');
			template.find('.post-thumb img').prop('src', media.icon);
			template.find('.post__author-name').text(media.author);
			template.find('.post-title').text(media.title);
			template.find('.post-content').html(media.content);
			// template.find('.post-category')
			// 	.text(media.word)
			// 	.css('background-color', media.color);

			container.append(template);
		}
	}

	var articleId = global.yuery().id;

	if( articleId ) {
		global.yjax('media_detail', {
			media_id: articleId
		}, function(data) {
			if( data.code === 0 ) {
				var container = $('.container-content');
				appendChild(container)(data.media);
			}
		});
	} 

})(window, jQuery);