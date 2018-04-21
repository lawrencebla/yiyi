(function(global, $) {
	var FILE_TYPE_IMAGE_REG = /(image\/png|image\/jpe?g|image\/bmp|image\/gif)/;
	var SEX_MAP_TEXT = {
		0: 'Male',
		1: 'Female',
	};
	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('notification_item');
			template.find('.author-thumb>img').prop('src', item.icon);
			template.find('.notification-event').text(item.intro);
			template.find('.entry-date').text('api没有时间');

			var info = typeMap[item.type];

			template
				.find('.notification-icon')
					.prop('href', info.link)
				.find('svg')
					.addClass(info.icon)
				.find('use')
					.attr('xlink:href', 'svg-icons/sprites/icons.svg#' + info.icon);

			container.append(template);
		}
	}

	$('.avatar-input').on('change', function(e) {
		var parent = $(this).parent();
    	var file = e.target.files[0];
    	if (!FILE_TYPE_IMAGE_REG.test(file.type)) {
    		alert('Please select image file.');
    		return;
    	}

		var render = new FileReader();
		render.readAsDataURL(file);

		render.onload = function() {
			parent.find('img').prop('src', this.result);
			parent.find('.avatar-input').prop('name', 'avatar');
		}
	});

	$('.update-info').on('click', function() {
		global.yploadForm('modify_user', $('#person_info_form'), function() {
			$(".alert").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert").hide();
			}, 4000);
		});
	});

	global.yjax('person_info', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('#person_info_form');
			container.find('.post__author>img').prop('src', data.avatar);
			container.find('input[name="username"]').val(data.username);
			container.find('input[name="english_name"]').val(data.english_name);
			container.find('input[name="sex"]').val(data.sex);
			container.find('.filter-option.pull-left').text(SEX_MAP_TEXT[data.sex]);
			container.find('.selectpicker.form-control').val(data.sex)
				.on('change', function(e) {
					container.find('input[name="sex"]').val($(this).val());
				});
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