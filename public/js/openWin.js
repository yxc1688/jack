var item = JSON.parse(localStorage.getItem('item'));
function dataUrl(oUrl){
	$.getJSON(oUrl,function(data){
		//openList(data);
		$(".newsContent").on("click","li",function(){
			var oTitle = $(this).find("span").text();
			$.each(data, function(index,item) {
				if(item.title === oTitle){
					localStorage.setItem("item",JSON.stringify(item));
				}
			});
			
		});
	});
}



/*
 * 渲染详情页
 */
var href = location.href;
var reg = /^subContent/;
href = href.slice(href.lastIndexOf("/")+1);
if(reg.test(href)){
	$("title,.page-main>h2").text(item.title);
	$(".page-main>time").text("时间：" + item.time);
	$("#page-content").html(item.content);
}
$.getJSON("../public/data/news.json",function(data){
	$("#asidsNews").on("click","a",function(){
		var dataId = $(this).attr("dataId");
		$.each(data, function(index,item) {
			if(item.id === dataId){
				localStorage.setItem("item",JSON.stringify(item));
			}
		});
	});
});
$.getJSON("../public/data/Problem.json",function(data){
	$("#asidsProblem").on("click","a",function(){
		var dataId = $(this).attr("dataId");
		$.each(data, function(index,item) {
			if(item.id === dataId){
				localStorage.setItem("item",JSON.stringify(item));
			}
		});
	});
});


