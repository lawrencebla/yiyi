(function(global, $) {

	var PAY_METHOD = {
		0: 'Wechat',
		1: 'Alipay',
	}
	var pay_id;
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

	$('.pay-button').click(function() {
		global.yjax('alipay', {
			phone: global.getPhone(),
			pay_id: pay_id,
		}, function(data) {
			console.log(data);
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