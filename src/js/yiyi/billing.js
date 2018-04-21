(function(global, $) {

	var PAY_METHOD = {
		0: 'Wechat',
		1: 'Alipay',
	}

	function appendChild(container) {
		return function(item) {
			var template = global.yemplate('billing_item');
			template.find('.date').text(item.date);
			template.find('.position').text(item.chapter);
			template.find('.type').text(item.classes_num);
			template.find('.town-place').text(item.amount);
			template.find('.method').text(PAY_METHOD[item.type]);
			container.append(template);
		}
	}

	global.yjax('my_billing', {
		phone: global.getPhone(),
	}, function(data) {
		if( data.code === 0 ) {
			var container = $('.billing-container');
			data.list.map( appendChild(container) );
		}
	});
})(window, jQuery);