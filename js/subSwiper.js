//子页面轮播图初始化
var subSwiper = new Swiper('#sub-swiper', {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 4500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});