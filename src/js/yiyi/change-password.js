(function(global, $) {

	$('.update-info').on('click', function() {
		if( $(this).hasClass('disabled') ) {
			return;
		}
		global.yjax('reset_password', {
			phone: global.getPhone(),
			old_password: $('#old_password').val(),
			new_password: $('#new_password').val(),
		}, function() {
			$(".alert-success").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert-success").hide();
			}, 4000);
		}, function() {
			$(".alert-danger").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert-danger").hide();
			}, 4000);
		});
	});

	function checkForm() {
		var vaild = true;
		if( $('#old_password').val().length === 0 ) {
			vaild = false;
		}
		if( $('#new_password').val().length === 0 ) {
			vaild = false;
		}
		if( $('#new_password').val() !== $('#check_new_password').val() ) {
			vaild = false;
		}
		if( vaild ) {
			$('.update-info').removeClass('disabled');
		} else {
			$('.update-info').addClass('disabled');
		}
	}

	$('#old_password').on('change', checkForm);

	$('#new_password').on('change', checkForm);

	$('#check_new_password').on('change', checkForm);
})(window, jQuery);