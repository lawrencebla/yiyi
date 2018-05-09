(function(global, $) {

	$('.update-info').on('click', function() {
		// global.yjax('parent_modify', {"address":"my_address","birthday":"1961-01-03","email":"3434343@qq.com","parent_phone":"13345677654","relation":"mother","pca":"", "phone": 18253591067,"username":"Mam","wx":"zzzdd"}, function() {
		global.yploadForm('parent_modify', $('#family_info_form'), function() {
			$(".alert").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert").hide();
			}, 4000);
		});
	});

	global.yjax('parent', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			data = data.parent;
			var container = $('#family_info_form');
			if( data.username ) {
				container.find('input[name="username"]').val(global.unescape(data.username));
				container.find('input[name="username"]').parent().removeClass('is-empty');
			}
			if( data.relation ) {
				container.find('input[name="relation"]').val(global.unescape(data.relation));
				container.find('input[name="relation"]').parent().removeClass('is-empty');
			}
			container.find('input[name="birthday"]')
				.daterangepicker({
					startDate: data.birthday || undefined,
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
			container.find('input[name="phone"]').val(global.getPhone());
			if( data.phone ) {
				container.find('input[name="parent_phone"]').val(data.phone);
				container.find('input[name="parent_phone"]').parent().removeClass('is-empty');
			}
			if( data.wx ) {
				container.find('input[name="wx"]').val(data.wx);
				container.find('input[name="wx"]').parent().removeClass('is-empty');
			}
			if( data.email ) {
				container.find('input[name="email"]').val(data.email);
				container.find('input[name="email"]').parent().removeClass('is-empty');
			}
			if( data.address ) {
				container.find('input[name="address"]').val(global.unescape(data.address));
				container.find('input[name="address"]').parent().removeClass('is-empty');
			}
			if( data.pca ) {
				container.find('input[name="pca"]').val(global.unescape(data.pca));
				container.find('input[name="pca"]').parent().removeClass('is-empty');
			}
		}
	});
})(window, jQuery);