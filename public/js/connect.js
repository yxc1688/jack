function include(selecter, callback) {
   if($('#' + selecter).length) {
      $('#' + selecter).load("../public/asids.html", callback);
   }
}
include('asids',fn);


function fn(){
	showTitle($("#asidsProblem a"),"../public/data/Problem.json");
	showTitle($("#asidsNews a"),"../public/data/news.json");
}

/*
 * 渲染侧边栏
 * oDom --> 被渲染的节点
 * oData --> 数据的路径
 * arr看符合条件的有几个
 */

function showTitle(oDom,oData){
	var oA = oDom;
	var len = oA.length;
	var arr = [],
		oNum = 0;
	$.getJSON(oData,function(data){
		$.each(data,function(index,item) {
			if(item.boo){
				arr.push(index);
				var idx = arr.length;
				idx <= len ? oA[idx-=1].innerHTML = this.title : '';
				oA[oNum].setAttribute("dataId",this.id);
				oNum++;
			}
		});
		
	});
}


