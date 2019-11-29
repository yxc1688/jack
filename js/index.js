/*
 * 新闻滚动
 */
$(function(){
	var oUl = $('.news > ul');
	var oLi = oUl.find('li');
	var sum = 0;
	var len = $('.news  li').length;
	var lineHeight = parseInt(getComputedStyle(oLi[0]).height);
	var total = len * lineHeight;
	function scrollNews(){
		oUl.css('transform','translateY(-'+ sum +'px)');
	}
	var scrollTimer = setInterval(function(){
		sum += lineHeight;
		if(sum >= total){
			sum = 0;
		}
		scrollNews();
	},2000);
	$('.news').hover(function(){
		clearInterval(scrollTimer);
	},function(){
		scrollTimer = setInterval(function(){
			sum += lineHeight;
			if(sum >= total){
				sum = 0;
			}
			scrollNews();
		},2000);
	});
});

/*
 * 侧边栏显示隐藏
 */
$(function(){
	var boo = true;
	$('a.switch').on('click',function(){
		if(boo){
			$(this).addClass('off');
			$('.icons').css('right','-100%');
			boo = false;
		}else{
			$(this).removeClass('off');
			$('.icons').css('right','0');
				boo = true;
			}
		});
});

/*
 * 客户鼠标跟随效果
 */
$(function(){
	$('#customer .items li').mouseenter(function(){
		var winLeft = $(this).offset().left;
		var winTop = $(this).offset().top - ($(window).scrollTop() + this.offsetHeight);
		$('#customer .follow').css({
			display: 'block',
			left: winLeft + 'px',
			top: winTop + 'px'
		})
	});
	$('#customer .items').mouseleave(function(){
		$('#customer .follow').css('display','none')
	})
});

/*
 * 导航部分行为
 */
var local = Number(localStorage.getItem('thatOne'));
$(function(){
	$('.menu li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	//下划线跟随效果
	$('.menu').on('mouseover','.menu li',function(){
		lastLen($(this));
		var winLeft = $(this).offset().left;
		$('.underline').css('left',winLeft + 'px');
	}).on('mouseleave ',function(){
		lastLen($(this));
		var activeLeft = $('.menu li.active').offset().left;
		$('.underline').css('left',activeLeft + 'px');
	});
	
	
	//判断是否hover最后一个
	 
	function lastLen(that){
		var len = $('.menu li').length;
		var index = that.index();
		if((len -1) === index){
			$('.underline').css('width','98px');
		}else{
			$('.underline').css('width','54px');
		}
	}
	
	
	//点击按钮显示菜单
	 
	$('.btn_icon').click(function(){
		$('nav.menu').slideToggle();
	});
});

/*
 * 滚屏效果行为
 */
$(function(){
	var arrDom = ["#home","#business","#case","#customer","#excellent","#marketing","#about","#news","#contact"];
	
	if(local){
		animater(arrDom[local]);
		$('.menu li').eq(local).addClass('active').siblings().removeClass('active');
		var defaultMove = $('.menu .active').offset().left;
		$('.underline').css('left',defaultMove + 'px');
	}
	//切换整屏动画效果
	function animater(oNode,callback){
		$(oNode).addClass('thisPage');
		for(var i=0; i<arrDom.length; i++){
			if(oNode === arrDom[i]){
				localStorage.setItem('thatOne',i);
			}
		}
		$('html,body').animate({
			scrollTop:$(oNode).offset().top
		},300,callback);
		if(oNode !== arrDom[0]){
			if(!$('.header').hasClass('changeHead')){
				$('.header').addClass('changeHead');
			}
		}else{
			if($('.header').hasClass('changeHead')){
				$('.header').removeClass('changeHead');
			}
		}
		return false;
	}
	
	function under(current){
		setTimeout(function(){
			var winLeft = current.offset().left;
			$('.underline').css('left',winLeft + 'px');
		},150);
	}
	
	//鼠标按下切屏
	function roll(){
		var startY,endY;
		var len = $('.menu li').length;
		len = len-2;
		$('.wrapped').on('mousedown',function(e){
			startY = e.pageY;
		}).on('mouseup',function(e){
			endY = e.pageY;
			var the = $('.menu .active').index();
			if((startY - endY) > 100){
				the++;
				if(the > len){
					the = len;
				}
			}
			if((endY - startY) > 100){
				the--;
				if(the < 0){
					the = 0;
				}
			}
			var oNode = $('.menu li').eq(the);
			oNode.addClass('active').siblings().removeClass('active');
			animater(arrDom[the]);
			under(oNode);
			return false;
		});
	}
	roll();
	
	//鼠标滑轮切换整屏
	var boo = true;
	$('.wrapped').on('wheel',function(e){
		var index = $('.menu .active').index();
		if(boo){
			boo = false;
			if(e.originalEvent.deltaY > 0){
				index++;
				if(index > 8){
					index = 8;
				}
			}else{
				index--;
				if(index < 0){
					index = 0;
				}
			}
			var Position = arrDom[index];
			$('.menu li').eq(index).addClass('active').siblings().removeClass('active');
			animater(Position,function(){
				boo = true;
			});
			under($('.menu .active'));
		}
		return false;
	});
	
	//点击切换下一屏
	$('.goToDown,.movedown').on('click',function(){
		toggleScreen(true);
	});
	$('.goToUp').on('click',function(){
		toggleScreen();
	});
	
	function toggleScreen(boo){
		var index = $('.menu li.active').index();
		boo ? index++ : index--;
		
		if(index > 8){
			index = 8;
		}else if(index < 0){
			index = 0;
		}
		$('.menu li').eq(index).addClass('active').siblings().removeClass('active');
		under($('.menu .active'));
		animater(arrDom[index]);
	}
	
	
	//点击导航进行滚屏
	$(function(){
		$('.menu').on('click','a',function(){
			var url = $(this).attr('href');
			if(url.slice(0,1) === '#'){
				animater(url);
			}
		});
	});
});

