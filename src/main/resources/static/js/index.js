$(document).ready(function(){
	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(121.48,31.29), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	//左边影院信息
	listMovies();
	
	//根据名称搜索
	$("#btn-query").click(function(){
		listMovies(); 
	});
	
	
	//点击影院信息
	$("#moviesList").on("click",".movies-left-name",function(){
		 $(".movies-left-name").css('background','none');//移除所有背景颜色
		 $(this).css("background", "#D1EEEE");//给当前添加背景颜色
		 mapOverlay($(this).attr("longitude"),$(this).attr("latitude"));//传入当前影院经纬度
	});
	
	//地图上显示动画
	function mapOverlay(longitude,latitude){
		var point = new BMap.Point(longitude,latitude);
		map.centerAndZoom(point, 18);
		var marker = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker);               // 将标注添加到地图中
		marker.removeAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	}
	
});

//获取影院信息
function listMovies(){
	var query = $("#query").val();
	$("#moviesList").empty();
	$.ajax({
		type:"get",
		url:"/movies/listMovies",
		data:{
			query:query
		},
		success : function(data){
			console.log(data)
			$("#moviesTempl").tmpl({movies: data}).appendTo("#moviesList");
		},error:function(data){
			layer.alert("出现错误信息!");
		}
	});
}
