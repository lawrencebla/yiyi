(function(global, $) {

	$('.update-info').on('click', function() {
		if( $(this).hasClass('disabled') ) {
			return;
		}
		global.yjax('board', {
			phone: global.getPhone(),
			title: $('#title').val(),
			content: $('#content').val(),
		}, function() {
			$(".alert-success").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert-success").hide();
			}, 4000);
		});
	});

	function checkForm() {
		var vaild = true;
		if( $('#title').val().length === 0 ) {
			vaild = false;
		}
		if( $('#content').val().length === 0 ) {
			vaild = false;
		}
		if( vaild ) {
			$('.update-info').removeClass('disabled');
		} else {
			$('.update-info').addClass('disabled');
		}
	}
	$('#title').on('change', checkForm);

	$('#content').on('change', checkForm);
})(window, jQuery);