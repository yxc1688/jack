$(function(){
	$(window).scroll(function(){
		var winTop = $(this).scrollTop();
		if(winTop > 100){
			$('.header').addClass('changeHead');
		}else{
			$('.header').removeClass('changeHead');
		}
	});
	
	
});
