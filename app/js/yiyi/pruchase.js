(function(global, $) {

	var PAY_METHOD = {
		0: 'Wechat',
		1: 'Alipay',
	}
	var pay_id;
	var method = 'wxpay';
	function appendChild(container) {
		return function(item) {
			pay_id = item.pay_id;
			var template = global.yemplate('purchase_item');
			template.find('.cart-product-title').text(item.title);
			template.find('.price').text(item.num);
			template.find('.total').text(item.money);
			template.attr('data-id', item.pay_id);
			container.append(template);
		}
	}

	$('.options-radios').click(function() {
		$('.options-radios').prop('checked', false);
		method = $(this).prop('checked', true).attr('data-type');
	})

	$('.pay-button').click(function() {
		global.yjax(method, {
			phone: global.getPhone(),
			pay_id: pay_id,
		}, function(data) {
			if( data.code === 0 ) {
				$('#pay-qr').modal('toggle');
				$('#pay-qr').find('img').attr('src', data.pay_url);
			} else {
				alert(data.msg);
			}
		});
	});

	global.yjax('pay_list', {
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.purchase-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);