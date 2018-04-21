(function(global, $) {

	$('.update-info').on('click', function() {
		global.yploadForm('modify_family', $('#family_info_form'), function() {
			$(".alert").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert").hide();
			}, 4000);
		});
	});

	global.yjax('family_info', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('#family_info_form');
			container.find('input[name="username"]').val(data.username);
			container.find('input[name="relationship"]').val(data.relationship);
			container.find('input[name="birthday"]')
				.daterangepicker({
					startDate: data.birthday,
					autoUpdateInput: false,
					singleDatePicker: true,
					showDropdowns: true,
					locale: {
						format: 'YYYY-MM-DD'
					}
				})
				.on('focus', function () {
					$(this).closest('.form-group').addClass('is-focused');
				})
				.on('apply.daterangepicker', function (ev, picker) {
					$(this).val(picker.startDate.format('YYYY-MM-DD'));
					$(this).closest('.form-group').addClass('is-focused');
				})
				.on('hide.daterangepicker', function () {
					if ('' === $(this).val()){
						$(this).closest('.form-group').removeClass('is-focused');
					}
				})
				.val(data.birthday);
			container.find('input[name="phone"]').val(data.phone);
			container.find('input[name="wechat"]').val(data.wechat);
			container.find('input[name="email"]').val(data.email);
			container.find('input[name="address"]').val(data.address);
			container.find('input[name="city"]').val(data.city);
			container.find('input[name="state"]').val(data.state);
			container.find('input[name="country"]').val(data.country);
		}
	});
})(window, jQuery);