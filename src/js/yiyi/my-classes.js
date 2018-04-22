(function(global, $) {

	var IMG_TYPE = 1;
	var VIDOE_TYPE = 2;
	var imgReg = /\.(jpg|jpeg|bmp|png|gif)$/;
	var videoReg = /\.(avi|mov|mpeg|mpg|qt|ram|mp4)$/;
	var upload_file_type;
	var type = 0;

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('lesson_item');
			template.prop('id', 'lesson_item' + item.id);
			template.find('.friend-avatar').attr('data-id', item.id);
			template.find('.friend-avatar').attr('data-name', item.name);
			template.find('.author-thumb>img').prop('src', item.icon);
			template.find('.author-name').text(item.name)
				.prop('href', item.lesson_link);
			template.find('.country').text(item.start + '~' + item.end);
			
			template.find('.home-link').prop('href', item.home_link);
			template.find('.lesson-link').prop('href', item.lesson_link);
			template.find('.pre-link').prop('href', item.pre_link);

			if( item.cancel === '0' ) {
				template.find('.more').css('display', 'none');
			}

			template.find('.cancel-class').click(function() {
				global.yjax('cancel', {
					phone: global.getPhone(),
					lesson_id: item.id,
				}, function() {
					$('#lesson_item' + item.id).remove();
				})
			})

			container.append(template);
		}
	}

	function loadData() {
		global.yjax('my_lesson', {
			phone: global.getPhone(),
			page: 1,
			type: type,
		}, function(data) {
			if( data.code === 0 ) {
				var container = $('.my-classes-container>.row:last-of-type').empty();
				data.list.map( appendChild(container) );
			}
		});
	}
	loadData();
	$('.upcoming-button').click(function() {
		type = 0;
		loadData();
		$('.past-button').removeClass('btn-primary').addClass('btn-border-think c-grey');
		$('.upcoming-button').addClass('btn-primary').removeClass('btn-border-think c-grey');
	});
	$('.past-button').click(function() {
		type = 1;
		loadData();
		$('.past-button').addClass('btn-primary').removeClass('btn-border-think c-grey');
		$('.upcoming-button').removeClass('btn-primary').addClass('btn-border-think c-grey');
	});

	$('.upload-file-btn').click(function() {
		var form = $('#upload-file-form');
		$('input[name="name"]').val($('input[name="name"]').val() + ext);
		global.yploadForm('upload_file', $('#upload-file-form'), function(data) {
			global.document.location.reload();
		});
	});
	var ext = '';
	$('.file-input').on('change', function(e) {
		var fileName = e.target.files[0].name;
		if( imgReg.test(fileName) ) {
			upload_file_type = IMG_TYPE;
		} else if( videoReg.test(fileName) ) {
			upload_file_type = VIDOE_TYPE;
		} else {
			upload_file_type = 0;
		}
		ext = fileName.substr(fileName.lastIndexOf('.'));
		$('.file-input-label').text(fileName);
		$('input[name="type"]').val(upload_file_type);
		$('input[name="name"]').val(fileName.substr(0, fileName.lastIndexOf('.')));
	});
	$('#upload-file-modal').on('show.bs.modal', function(e) {
		var id = $(e.relatedTarget.parentNode).attr('data-id');
		var name = $(e.relatedTarget.parentNode).attr('data-name');
		$('#upload-file-modal .ui-block-title>.title').text('File Upload to ' + name + ' lesson');
		$('input[name="lesson_id"]').val(id);
		$('input[name="name"]').val('');
		$('input[name="file"]').val('');
		$('input[name="phone"]').val(global.getPhone());
	});

})(window, jQuery);