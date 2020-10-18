$(function () {

	let todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + 1);
	var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
	let str =  todayDate.getDate() +' ' +strArray[todayDate.getMonth()]+ ' ' + todayDate.getFullYear();
	$('#date').html(`🔥 Promotion until ${str} 🔥`);

	let stock = 2411;
	let wallet = {
		BTC: '1P6ZsS3HBavdQ2uYsHGLcDiHJ4Ch2n9y8Q',
		ETH: '0x40B00aac75B5Af89FA5A5f9113fBAA4AAB63EF6a',
		BCH: 'qrexqj87urqsps2talnc3plxduvpkk76jshejushwh',
		XLM: 'GCDFAC5RCIEZFVVQ6ZKYG3ZEW6ZJCB5M33JYGPF6UGAYSY3QUKLC35AI',
		USDT: '0x40B00aac75B5Af89FA5A5f9113fBAA4AAB63EF6a',

	};
	let price = 0.15;
	let name, amount, server, cc, inusd, incc;
	$('#amount').keypress((eventObject) => {
		if (event.keyCode < 48 || event.keyCode > 57)
    		event.returnValue= false;
	});

	$('#calc').click(() => {
		amount = $('#amount').val();
		cc = $('select[name=crypto]').val();
		if(amount > 0 && amount <= stock) {
			$.ajax({
				type: 'GET',
			  url: "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,BCH,XLM,USDT",
				  success: function(r){
				  	inusd = amount*price;
				  	incc = inusd * r[cc];
				  	$('#result').html("Get <strong>"+ amount + " coins </strong> for <strong>" + incc.toFixed(7) + " " + cc + "</strong> ($" + inusd + ")");
			  }
			});    
		}
		
	});



	$('#buy').click(() => {
		name = $('#name').val().trim();
		server = $('select[name=server]').val();
		cc = $('select[name=crypto]').val();
		amount = $('#amount').val();
		if(name && amount > 0 && amount <= stock) {
			$.ajax({
			type: 'GET',
			url: "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,BCH,XLM,USDT",
			success: function(r){
			inusd = amount*price;
			incc = inusd * r[cc];
			$('#result').html("Get <strong>"+ amount + " coins </strong> for <strong>" + incc.toFixed(7) + " " + cc + "</strong> ($" + inusd + ")");
			$('#result2').html("For payment, send the amount of <strong>" + incc.toFixed(7) + " " + cc + "</strong> to the address <strong>" + wallet[cc] +"</strong>");
			}
			});    
			
		}
		else{
			alert('Incorrect character name / amount');
		}
		
	});
  
});
