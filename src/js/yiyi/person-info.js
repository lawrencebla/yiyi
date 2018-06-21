(function(global, $) {
	var FILE_TYPE_IMAGE_REG = /(image\/png|image\/jpe?g|image\/bmp|image\/gif)/;
	var SEX_MAP_TEXT = {
		0: '男',
		1: '女',
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

	function done(count) {
		if( count === 2 ) {
			$(".alert").show();
			$(document).scrollTop(0);
			setTimeout(function() {
				$(".alert").hide();
			}, 4000);
		}
	}
	$('.update-info').on('click', function() {
		// global.yjax('account_modify', {"address":"My address","birthday":"1986-10-22","e_name":"","email":"278989447@qq.com","pca":"","phone":"18253591067","sex":"0","wx":""}, function() {
		var doneCount = 0;
		$('#person_info_basic_form')
			.find('input[name="phone"]')
			.val(
				$('#person_info_form')
					.find('input[name="phone"]')
					.val()
			)
		global.yploadForm('modify_user', $('#person_info_basic_form'), function() {
			done(++doneCount);
		});
		global.yploadForm('account_modify', $('#person_info_form'), function() {
			done(++doneCount);
		});
	});

	global.yjax('account', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			data = data.account;
			var basicContainer = $('#person_info_basic_form');
			var container = $('#person_info_form');
			basicContainer.find('.post__author>img').prop('src', data.avatar);
			if( data.username ) {
				basicContainer.find('input[name="username"]').val(global.unescape(data.username));
				basicContainer.find('input[name="username"]').parent().removeClass('is-empty');
			}
			if( data.e_name ) {
				container.find('input[name="english_name"]').val(global.unescape(data.e_name));
				container.find('input[name="english_name"]').parent().removeClass('is-empty');
			}
			if( data.sex !== null && data.sex !== undefined ) {
				container.find('input[name="sex"]').val(global.unescape(data.sex));
				container.find('.filter-option.pull-left').text(SEX_MAP_TEXT[data.sex]);
				container.find('.selectpicker.form-control').val(global.unescape(data.sex))
					.on('change', function(e) {
						container.find('input[name="sex"]').val($(this).val());
					});
			}
			var birthday = data.birthday;
			if( isNaN(new Date(birthday).getDay()) ) {
				birthday = undefined;
			}
			container.find('input[name="birthday"]')
				.daterangepicker({
					startDate: birthday || undefined,
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
				.val(birthday);
			if( data.phone ) {
				container.find('input[name="phone"]').val(data.phone);
				container.find('input[name="phone"]').parent().removeClass('is-empty');
			}
			if( data.wx ) {
				container.find('input[name="wechat"]').val(data.wx);
				container.find('input[name="wechat"]').parent().removeClass('is-empty');
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
			// container.find('input[name="state"]').val(global.unescape(data.state));
			// container.find('input[name="country"]').val(global.unescape(data.country));
		}
	});
})(window, jQuery);