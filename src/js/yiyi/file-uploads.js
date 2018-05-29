(function(global, $) {
	var type2icon = {
		PDF: {
			color: '#2e85ef',
			class: 'file-pdf',
		},
		Word: {
			color: '#2e85ef',
			class: 'file-word',
		},
		Image: {
			color: '#3b9946',
			class: 'file-image',
		},
		Video: {
			color: '#be1e2e',
			class: 'file-video',
		},
		PowerPoint: {
			color: '#f26521',
			class: 'file-powerpoint',
		},
		HTML: {
			color: '#f9a83b',
			class: 'file-code',
		},
		Other: {
			color: '#d7d9e6',
			class: 'file',
		}
	}
	var file_list = [];
	var IMG_TYPE = 1;
	var VIDOE_TYPE = 2;
	var imgReg = /\.(jpg|jpeg|bmp|png|gif)$/;
	var videoReg = /\.(avi|mov|mpeg|mpg|qt|ram|mp4)$/;
	var upload_file_type;
	function getTypeByExt(ext) {
		if( imgReg.test(ext) ) {
			return 'Image';
		}
		if( videoReg.test(ext) ) {
			return 'Video';
		}
		if( ext === '.doc' || ext === '.docx' ) {
			return 'Word';
		}
		if( ext === '.pdf' ) {
			return 'PDF';
		}
		if( ext === '.ppt' || ext === '.pptx' ) {
			return 'PowerPoint';
		}
		if( ext === '.html' ) {
			return 'HTML';
		}
		return 'Other';
	}
	$('.upload-file-btn').click(function() {
		var form = $('#upload-file-form');
		$('input[name="name"]').val($('input[name="name"]').val() + ext);
		global.yploadForm('upload_file', $('#upload-file-form'), function(data) {
			global.document.location.reload();
		});
	});

	$(document).on('click', '.delete-file-upload', function() {
		global.yjax('file_drop', {
			phone: global.getPhone(),
			file_id: $(this).parent().attr('data-id'),
		}, function() {
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

	$('#upload-file-form').on('click', '.dropdown-menu.inner>li', function() {
		$('input[name="lesson_id"]').val($(this).find('.inline-items').attr('data-id'));
	});

	$('#upload-file-modal').on('show.bs.modal', function(e) {
		var id = $(e.relatedTarget.parentNode).attr('data-id');
		var name = '';
		var lesson_id = '';
		if( id ) {
			file_list.map( function(file) {
				if( id == file.id ) {
					lesson_id = file.lesson_id;
					name = file.name.substr(0, file.name.lastIndexOf('.'));
					ext = file.name.substr(file.name.lastIndexOf('.'));
					$('.file-input-label').text(file.name);
				}
			} );
		} else {
			lesson_id = $('.lesson-select>option')[0].dataset.id;
		}
		$('.lesson-select .inline-items').map( function(idx, option) {
			if( option.dataset.id == lesson_id ) {
				$(option).parent().parent().addClass('selected')
					.parents('.lesson-select').find('.filter-option').text($(option).find('.author-title').text());
			} else {
				$(option).parent().parent().removeClass('selected');
			}
		} );
		$('input[name="lesson_id"]').val(lesson_id);
		$('input[name="name"]').val(name);
		$('input[name="file"]').val('');
		$('input[name="phone"]').val(global.getPhone());
	});



	function appendChild(container) {
		return function(item) {
			var filename = item.name.substr(0, item.name.lastIndexOf('.'));
			var type = getTypeByExt(item.name.substr(item.name.lastIndexOf('.')));
			var template = global.yemplate('file_upload_item');
			template.prop('id', 'file_upload_item' + item.file_id);
			template.find('.control-block-button').attr('data-id', item.file_id);
			template.find('.post-thumb>img').prop('src', item.user_icon);
			template.find('.file-uploads-user img').prop('src', item.user_icon);
			template.find('.file-uploads-user-name').text(item.user_name);
			template.find('.file-name').text(filename);
			template.find('.file-type').text(type);
			template.find('.friend-avatar>.author-thumb').prop('href', item.url).css('background-color', type2icon[type].color)
				.find('.file-icon').addClass('fa fa-' + type2icon[type].class);
			
			container.append(template);
		}
	}
	global.yjax('file_list', {
		phone: global.getPhone()
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.file-upload-container>.row');
			file_list = data.list;
			data.list.map( appendChild(container) );
		}
	});
	// global.yjax('my_lesson', {
	// 	phone: global.getPhone(),
	// 	page: 1,
	// 	type: 0,
	// }, function(data) {
	// 	if( data.code === 0 ) {
	// 		var container = $('.lesson-select');
	// 		data.list.map( function(item) {
	// 			container.append(
	// 				'<option data-id="' + item.id + '" title="' + item.name + '" data-content=' + 
	// 					'\'<div class="inline-items" data-id="' + item.id + '">' +
	// 						'<div class="h6 author-title">' + item.name + '</div>' +
	// 					'</div>\'>' +
	// 				'</option>'
	// 			);
	// 		} );
	// 	}
	// });

})(window, jQuery);