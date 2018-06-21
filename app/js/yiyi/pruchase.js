(function(global, $) {

	var PAY_METHOD = {
		0: 'Wechat',
		1: 'Alipay',
	}
	var pay_id;
	var method = 'wxpay';
	var pay_list = [];
	function appendChild(container) {
		return function(item) {
			pay_id = item.pay_id;
			var template = global.yemplate('purchase_item');
			template.find('.cart-product-title').text(item.title);
			template.find('.price').text(item.num);
			template.find('.total').text(item.money);
			template.attr('data-id', item.pay_id);
			template.find('.class-checkbox').click(function() {
				var _payId = item.pay_id;
				if( ~pay_list.indexOf(_payId) ) {
					pay_list = pay_list.filter( function(payid) {
						return payid !== _payId
					} )
				} else {
					pay_list.push(_payId);
				}
				if( pay_list.length > 0 && $('.pay-button').hasClass('disabled') ) {
					$('.pay-button').removeClass('disabled')
				}
				if( pay_list.length === 0 && ~$('.pay-button').hasClass('disabled') ) {
					$('.pay-button').addClass('disabled')
				}

			})
			container.append(template);
		}
	}

	$('.options-radios').click(function() {
		$('.options-radios').prop('checked', false);
		method = $(this).prop('checked', true).attr('data-type');
	})

	$('.pay-button').click(function() {
		if( !$('.pay-button').hasClass('disabled') ) {
			global.yjax(method, {
				phone: global.getPhone(),
				// pay_id: pay_list,
				pay_ids: pay_list,
			}, function(data) {
				if( data.code === 0 ) {
					$('#pay-qr').modal('toggle');
					$('#pay-qr').find('img').attr('src', data.pay_url);
				} else {
					alert(data.msg);
				}
			});
		}
	});

	global.yjax('pay_list', {
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.purchase-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);