(function(global, $) {
	function yemplate(id) {
		return $($('#' + id).html());
	}
	function yuery() {
		var searchStr = global.document.location.search;
		var query = {};
		if( searchStr.indexOf('?') === 0 ) {
			searchStr = searchStr.substr(1);
			searchStr.split('&').map( function(paramStr) {
				var paramArr = paramStr.split('=');
				if(paramArr.length === 2) {
					query[paramArr[0]] = paramArr[1];
				}
			} );
		}
		return query;
	}

	function initSidebar() {

		var id2file = {
			'side-home': 'index.html|article.html',
			'side-notification': 'notifications.html',
			'side-my-classes': 'my-classes.html',
			'side-teacher-profile': 'teacher-profile.html',
			'side-curriculum': 'curriculum.html',
			'side-file-uploads': 'file-uploads.html',
			'side-purchases': 'billing.html',
			'side-settings': 'person-info.html',
		}

		var $leftMenu = $('.left-menu');
		var currentPath = global.document.location.pathname;
		var currentFile = currentPath.split('/').reverse()[0];
		for( var id in id2file ) {
			var filesName = id2file[id];
			var $link = $leftMenu.find('#' + id + '>a');
			if( 
				(currentFile && filesName.indexOf(currentFile) !== -1 )|| 
				( currentPath.indexOf('.html') === -1 && filesName.indexOf('index.html') === 0 ) ) {
				$link.addClass('actived')
			}
			$link.prop('href', filesName.split('|')[0]);
		}

	}

	initSidebar();

	global.yemplate = yemplate;
	global.yuery = yuery;
})(window, jQuery);