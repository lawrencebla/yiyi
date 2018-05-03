(function(global, $) {

	var PAY_METHOD = {
		0: 'Wechat',
		1: 'Alipay',
	}

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('billing_item');
			template.find('.date').text(item.ymd);
			template.find('.position').text(item.title);
			template.find('.type').text(item.num);
			template.find('.town-place').text(item.money);
			template.find('.method').text(PAY_METHOD[item.channel]);
			container.append(template);
		}
	}

	global.yjax('pay_record', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.billing-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);