(function(global, $) {

	function appendChild(container) {
		return function(media) {
			var template = global.yemplate('media_detail');
			template.find('.post__author img').prop('src', media.icon);
			template.find('.post__author-name').text(media.author);
			template.find('.post-title').text(media.title);
			template.find('.post-content').html(media.content);
			template.find('.post-category')
				.text(media.word)
				.css('background-color', media.color);

			template.find('#clip_text')
				.val(global.document.location.href);
			template.find('.clip-button').click(function() {
					alert('已复制到剪切板，可粘贴分享。');
				});

			container.append(template);
			new ClipboardJS('.clip-button');
		}
	}

	var articleId = global.yuery().id;

	if( articleId ) {
		global.yjax('media_detail', {
			media_id: articleId
		}, function(data) {
			if( data.code === 0 ) {
				$('.top-header-thumb>img').prop('src', data.media.icon)
				var container = $('.container-content');
				appendChild(container)(data.media);
			}
		});
	} 

})(window, jQuery);