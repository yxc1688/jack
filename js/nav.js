/*
 * 导航部分行为
 */
$(function(){
	$('.menu li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	//点击按钮显示菜单
	 
	$('.btn_icon').click(function(){
		$('nav.menu').slideToggle();
	});
});
