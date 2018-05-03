(function(global, $) {

	function loginSuccess(phone, username, avatar) {
		global.yookie.set('phone', phone);
		global.yookie.set('username', username);
		global.yookie.set('avatar', avatar);
		global.document.location = '/';
	}

	$('.login-btn').on('click', function() {
		if( checkLogin() ) {
			global.yjax('login', {
				phone: $('#login_phone').val(),
				password: $('#login_password').val(),
			}, function(data) {
				if( data.code === 0 ) {
					loginSuccess(+$('#login_phone').val(), data.info.username, data.info.avatar);	
				} else {
					alert(data.msg);
				}
			}, function() {
				alert('Phone or password error.');
			});
		} else {
			alert('Please accomplish field.');
		}
	});
	$('.reg-btn').on('click', function() {
		if( checkReg() ) {
			global.yjax('reg', {
				phone: $('#reg_phone').val(),
				password: $('#reg_password').val(),
				username: $('#reg_username').val(),
				code: $('#reg_code').val(),
			}, function(data) {
				if( data.code === 0 ) {
					loginSuccess(+$('#reg_phone').val(), data.info.username, data.info.avatar);
				} else {
					alert(data.msg);
				}
			}, function() {
				alert('Register error.');
			});
		} else {
			alert('Please accomplish field.');
		}
	});
	$('.reg-send-code').on('click', function() {
		if( !$(this).hasClass('disabled') && $('#reg_phone').val() ) {
			global.yjax('send_sms', {
				phone: $('#reg_phone').val(),
				send: 1,
			}, function() {
				$('.reg-send-code').addClass('disabled');
				var backSecond = 60;
				var interval_id = setInterval(function() {
					$('.reg-send-code').text(backSecond-- + 'S');
					if( !backSecond ) {
						$('.reg-send-code')
							.removeClass('disabled')
							.text('Send Verfication Code');
						clearInterval(interval_id);
					}
				}, 1000);
			}, function() {
				alert('Register error.');
			});
		} else {
			alert('Please accomplish field.');
		}
	});
	$('.send-code').on('click', function() {
		if( !$(this).hasClass('disabled') && $('#fgt_phone').val() ) {
			global.yjax('send_sms', {
				phone: $('#fgt_phone').val(),
				send: 1,
			}, function() {
				$('.send-code').addClass('disabled');
				var backSecond = 60;
				var interval_id = setInterval(function() {
					$('.send-code').text(backSecond-- + 'S');
					if( !backSecond ) {
						$('.send-code')
							.removeClass('disabled')
							.text('Send Verfication Code');
						clearInterval(interval_id);
					}
				}, 1000);
			}, function() {
				alert('Register error.');
			});
		} else {
			alert('Please accomplish field.');
		}
	});

	$('.reset-password').on('click', function() {
		if( $('#fgt_phone').val() && $('#fgt_code').val() && $('#fgt_password').val() ) {
			global.yjax('check_code', {
				phone: $('#fgt_phone').val(),
				code: $('#fgt_code').val(),
			}, function(data) {
				if( data.code === 0 ) {
					global.yjax('set_password', {
						phone: $('#fgt_phone').val(),
						password: $('#fgt_password').val(),
					}, function(data) {
						if( data.code === 0 ) {
							global.yjax('login', {
								phone: $('#fgt_phone').val(),
								password: $('#fgt_password').val(),
							}, function(data) {
								if( data.code === 0 ) {
									loginSuccess(+$('#fgt_phone').val(), data.info.username, data.info.avatar);
								} else {
									alert(data.msg);
								}
							});
						} else {
							alert(data.msg);
						}
					});
				} else {
					alert(data.msg);
				}
				// loginSuccess($('#fgt_phone').val());
			}, function() {
				alert('Reset password error.');
			});
		} else {
			alert('Please accomplish field.');
		}
	});

	function checkLogin() {
		var vaild = true;
		if( $('#login_phone').val().length === 0 ) {
			vaild = false;
		}
		if( $('#login_password').val().length === 0 ) {
			vaild = false;
		}
		return vaild;
	}
	function checkReg() {
		var vaild = true;
		if( $('#reg_username').val().length === 0 ) {
			vaild = false;
		}
		if( $('#reg_code').val().length === 0 ) {
			vaild = false;
		}
		if( $('#reg_phone').val().length === 0 ) {
			vaild = false;
		}
		if( $('#reg_password').val().length === 0 ) {
			vaild = false;
		}
		if( $('#reg_password').val() !== $('#reg_confrim_password').val() ) {
			vaild = false;
		}
		return vaild;
	}

	$('.login-to-register').click(function() {
		$('.registration-login-form .nav-link[href="#profile"]').trigger('click');
	});
})(window, jQuery);