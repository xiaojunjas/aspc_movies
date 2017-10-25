var price = 100; //电影票价

$(document).ready(function(){
	
	/**
	 * 百度地图API功能
	 */ 
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(121.48,31.29), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	
	//输入框 --根据电影院名称搜索
	$("#btn-query").click(function(){
		listMovies(); 
	});
	/**
	 * 左边影院信息
	 */
	listMovies();
	
	
	/**
	 * 点击电影院信息
	 */
	$("#moviesList").on("click",".movies-left-name",function(){
		 $(".movies-left-name").css('background','none');//移除所有背景颜色
		 $(this).css("background", "#D1EEEE");//给当前添加背景颜色
		 mapOverlay($(this).attr("longitude"),$(this).attr("latitude"));//传入当前影院经纬度--地图指示到当前位置
		 var moviesId = $(this).attr("moviesId");//当前点击影院id
		 listMoviesFilm(moviesId);
	});
	
	
	/**
	 * 最右边--点击电影信息
	 */
	$("#moviesFilmList").on("click",".film-right-name",function(){
		 $(".film-right-name").css('background','none');//移除所有背景颜色
		 $(this).css("background", "#D1EEEE");//给当前添加背景颜色
		 $("#film-movies").modal("show");//打开影厅模态框
		 $("#purchase-filmName").attr("filmId",$(this).attr("filmId"));
		 listFilmSeats($(this).attr("filmId"));// 当前电影 已出售那些票
	});
	
	/**
	 * 地图上显示动画
	 */
	function mapOverlay(longitude,latitude){
		var point = new BMap.Point(longitude,latitude);
		map.centerAndZoom(point, 18);
		var marker = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker);               // 将标注添加到地图中
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	}
	
	/**
	 * 购买按钮
	 */
    $("#btn-purchase").click(function(){
   	 var sellTickets = new Array();//售票位置
   	 for(var i=0;i<$("#seats_chose").find(".sell-ticket-level").length;i++){
   		sellTickets.push($("#seats_chose").find(".sell-ticket-level").eq(i).attr("cart-seat-val"));
   	 }
   	 FilmMoviesSeats(sellTickets);//保存
    });
    
});

/**
 * 获取影院信息
 */
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
			$("#moviesTempl").tmpl({movies: data}).appendTo("#moviesList");
		},error:function(data){
			layer.alert("出现错误信息!");
		}
	});
}

/**
 * 根据影院id -- 获取电影信息
 */
function listMoviesFilm(moviesId){
	$("#moviesFilmList").empty();
	$.ajax({
		type:"get",
		url:"/movies/listMoviesFilm",
		data:{
			moviesId:moviesId
		},
		success : function(data){
			$("#moviesFilmTempl").tmpl({moviesFilms: data}).appendTo("#moviesFilmList");
		},error:function(data){
			layer.alert("出现错误信息!");
		}
	});
}

/**
 * 影院模板 --
 * @param sold_out
 */
function filmSeatsMap(sold_out){
	
	var temp = [];//已售票数组
	for(var i=0;i<sold_out.length;i++){
		temp.push(sold_out[i]);
	}
	
	var $cart = $('#seats_chose'), //座位区
    $tickects_num = $('#tickects_num'), //票数
    $total_price = $('#total_price'); //票价总额
	var sc = $('#seat_area').seatCharts({
	map: [//座位结构图 a 代表座位; 下划线 "_" 代表过道
	    'cccccccccc',
	    'cccccccccc',
	    '__________',
	    'cccccccc__',
	    'cccccccccc',             
	    'cccccccccc',
	    'cccccccccc',
	    'cccccccccc',
	    'cccccccccc',
	    'cc__cc__cc'
	],
	naming: {//设置行列等信息
	    top: false, //不显示顶部横坐标（行） 
	    getLabel: function(character, row, column) { //返回座位信息 
	        return column;
	    }
	},
	legend: {//定义图例
	    node: $('#legend'),
	    items: [
	        ['c', 'available', '可选座'],
	        ['c', 'unavailable', '已售出']
	    ]
	},
	click: function() {
	    if (this.status() == 'available') { //若为可选座状态，添加座位
	        $('<li class="sell-ticket-level">' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
	                .attr('id', 'cart-item-' + this.settings.id)
	                .attr('cart-seat-val',this.settings.id)
	                .data('seatId', this.settings.id)
	                .appendTo($cart);
	        $tickects_num.text(sc.find('selected').length + 1); //统计选票数量
	        $total_price.text(getTotalPrice(sc) + price);//计算票价总金额
	        return 'selected';
	    } else if (this.status() == 'selected') { //若为选中状态
	        $tickects_num.text(sc.find('selected').length - 1);//更新票数量
	        $total_price.text(getTotalPrice(sc) - price);//更新票价总金额
	        $('#cart-item-' + this.settings.id).remove();//删除已预订座位
	        return 'available';
	    } else if (this.status() == 'unavailable') { //若为已售出状态
	        return 'unavailable';
	    } else {
	        return this.style();
	    }
	}
	});
	//设置已售出的座位
	sc.get(temp).status('unavailable');
}

/**
 * 计算票价总额
 * @param sc
 * @returns {Number}
 */
function getTotalPrice(sc) { 
    var total = 0;
    sc.find('selected').each(function() {
        total += price;
    });
    return total;
}

/**
 * 影院购买信息
 * @param sellTickets 座位数组
 */
function FilmMoviesSeats(sellTickets){
	var filmId = $("#purchase-filmName").attr("filmId");
	$.ajax({
		type:"post",
		url:"/movies/createFilmMoviesSeats",
		data:{
			sellTickets:sellTickets,
			filmId:filmId
		},
		success : function(data){
			 layer.alert("购买成功!");
			 $("#film-movies").modal("hide");
		},error:function(data){
			layer.alert("出现错误信息!");
		}
	});
}

/**
 * 根据 电影id -- 电影场次信息
 */
function listFilmSeats(filmId){
	var sold_out = new Array();
	$.ajax({
		type:"GET",
		url:"/movies/listFilmSeatsByfilmId",
		data:{
			filmId:filmId
		},
		success : function(data){
			 for (var i = 0; i < data.length; i++) {
				 sold_out.push(data[i].sellIckets);
			}
			 filmSeatsMap(sold_out);
		},error:function(data){
			layer.alert("出现错误信息!");
		}
	});
}

