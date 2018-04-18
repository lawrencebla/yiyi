(function(global, $) {
	$('.upload-file-btn').click(function() {
		global.yploadForm('upload_file', $('#upload-file-form'), function(data) {
			console.log(data);
		});
	});
})(window, jQuery);