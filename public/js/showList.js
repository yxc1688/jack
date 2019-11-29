var num = 7,//每页显示的几条
	page = 0,//当前页
	pages = 0;

// 获取DOM节点
var oABox = $(".newsContent a"),
	oImg = $(".newsContent .content-left img"),
	oTitle = $(".newsContent .content-right span"),
	oTime = $(".newsContent .content-right time"),
	oP = $(".newsContent .content-right p"),
	pageBox = $(".page-box"),
	control = $(".turning>a");
/*
 * 获取网页路径 判断传那个参数
 */
var href = location.href,
	reg = /^matter/;
href = href.slice(href.lastIndexOf("/")+1);
if(reg.test(href)){
	getData("../public/data/Problem.json");
}else{
	getData("../public/data/news.json");
}
/*
 * 获取数据
 */
function getData(oUrl){
	$.getJSON(oUrl,function(data){
		pages = Math.ceil((data.length) / num);//计算一共有几页;
		for(var i=1; i<=pages; i++){
			pageBox.append("<a href='javascript:;'>"+ i +"</a>&nbsp;");
		}
		var pageSub = $(".page-box a");
		showContent(data,pages,pageSub);
	});
}
/*
 * 创建 页数 节点
 */
function showContent(data,temp,dom){
	page=1;
	pages = temp;//计算一共有几页;
	var len = page * num;
	dom.on('click',function(){
		page = Number($(this).text());
		len = page * num;
		if(page === pages){
			len = data.length;
		}
		createDom(data,page,num,len);
	});
	if(page === pages){
		len = data.length;
	}
	createDom(data,page,num,len);
}
/*
 * 列表数据渲染
 */
function createDom(data,page,num,len){
	var oNumber = 0;
	for(var i = (page-1)*num; i < len; i++){
		$(".newsContent li").eq(oNumber).removeClass("hide");
		// 给a链接设置title属性
		oABox[oNumber].title = data[i].title;
		// 图片设置路径添加 Alt
		oImg[oNumber].src = data[i].images;
		oImg[oNumber].alt = data[i].title;
		// 设置标题
		oTitle[oNumber].innerHTML = data[i].title;
		// 设置时间
		oTime[oNumber].innerHTML = data[i].time;
		// 设置内容
		oP[oNumber].innerHTML = data[i].paragraph;
		oNumber++;
	}
	if(oNumber < num){
		for(var j=oNumber; j<num; j++){
		console.log(oNumber);
			$(".newsContent li").eq(oNumber).addClass("hide");
			oNumber++;
		}
	}
}
/*
	oNumber是自己写的计数器
	当oNumber从从循环里出来小于7(一页显示的条数)，
	说明这一页数据没有7条了
	然后再写一个循环把oNumber续上，接着++
	这个时候++出来的数字对应的索引就是空的DOM节点
*/

