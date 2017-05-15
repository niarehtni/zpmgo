$(function () {
	oDefault["init"]();
});

var oDefault = {
	myChart: {},
	path: [
		"echarts",
        "echarts/chart/line",
        "echarts/chart/bar",
	],
	option: {
		title : {
	        text : "验伪月统计",
	        x: 'center',
	        textStyle : {
	            color: '#1b1b1b'
	        }
	    },
	    grid: {
			x: 50,
			x2: 20,
			y: 50,
			y2: 60,
			containLabel: true,
			borderWidth: 0
		},
	    tooltip : {
	    	trigger: 'axis',
	    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        },
	        formatter: function(param){
	        	var str = param[0]["name"];
	        	for(var i=0; i<param.length; i++){
	        		str += "<br>" + param[i]["seriesName"] + " : " + param[i]["value"] + " %";
	        	}
	        	return str;
	        }
	    },
	    legend: {
	    	show: true,
	    	y: 'bottom',
	    	data:['月环比','年同比']
	    },
	    xAxis: [{
	    	splitLine: { show: false },
	    	data : null
	    }],
	    yAxis : [{
            type : 'value',
            name: "%",
        }],
	    series: [{
            name: '月环比',
            type: 'line',
            itemStyle: {
            	normal: {
            		label : {
            			show: true
            		}
	            }
            },
            data: null
        },
        {
            name:'年同比',
            type:'line',
            itemStyle: {
            	normal: {
            		label : {
            			show: true
            		}
	            }
            },
            data: null
        }]
	},
	comList: [{
    	id:'cmbProvince',
    	default: ''
    },{
    	id:'cmbCity',
    	default: ''
    },{
    	id:'cmbArea',
    	default: ''
    }]
};

oDefault["init"] = function(){
	require.config({
		baseUrl: './',
        paths: {
           echarts: "../../plugins/echarts"
        }
	});

	window.onresize = function(){
		for(var c in oDefault["myChart"]){
			oDefault["myChart"][c].resize();
		}
	};
	var startYear = 2014;
	var nowYear = new Date().getFullYear();
	for(var i=nowYear; i>=startYear; i--){
		$("#year").append("<option value="+i+">"+i+"</option>");
	}

	$("#year").on("change", function(){
		oDefault["getData"]();
	});

	//get data
	oDefault["getData"]();

	$("#query").on("click", function(){
		oDefault["getData"]();
	});
};

oDefault["line"] = function(){
	$(".chartContainer").addClass("hasData");
	require(oDefault["path"],
		function(ec){
			oDefault["myChart"]["line"] = ec.init(document.getElementById("line"));
			oDefault["myChart"]["line"].showLoading();
			oDefault["myChart"]["line"].setOption(oDefault["option"]);
            oDefault["myChart"]["line"].hideLoading();
		}
	);
};

oDefault["table"] = function(data){
	var html = "<table>";
	var thead = "<thead><tr><th>月份</th>";
	var tmonth = "<tr><th>月环比</th>";
	var tyear = "<tr><th>月同比</th>";
	for(var i=0; i<data.length; i++){
		thead += "<td>"+data[i]["date"]+"</td>";
		tmonth += "<td>"+data[i]["hb"]+"</td>";
		tyear += "<td>"+data[i]["tb"]+"</td>";
	}
	thead += "</tr></thead>";
	tmonth += "</tr>";
	tyear += "</tr>";
	html += thead + tmonth + tyear;
	html += "</table>";
	$(".tableContainer").html(html);
};

oDefault["getData"] = function(){
	var year = $("#year").val();
	var hb = [];
	var tb = [];
	var xAxis = [];
	//success
	var data = DATA;
	for(var i=0; i<data.length; i++){
		hb.push(data[i]["hb"]);
		tb.push(data[i]["tb"]);
		xAxis.push(data[i]["date"]);
	}
	oDefault.option.xAxis[0].data = xAxis;
	oDefault.option.series[0].data = hb;
	oDefault.option.series[1].data = tb;
	oDefault["line"]();
	oDefault["table"](data);
	//error
	/*$("#line").removeClass("hasData").html("<span style='color:red'>数据获取失败</span>");
	$(".tableContainer").empty();*/
};

var DATA = [
	{	
		date: "2017年1月",
		tb: 0,
		hb: 1.74
	},
	{
		date: "2017年2月",
		tb: 0,
		hb: 4.01
	},
	{
		date: "2017年3月",
		tb: 0,
		hb: -6.64
	},
	{
		date: "2017年4月",
		tb: 0,
		hb: 6.7
	},
	{
		date: "2017年5月",
		tb: 361.11,
		hb: 1.62
	},
	{
		date: "2017年6月",
		tb: 306.9,
		hb: 0.811
	},
	{
		date: "2017年7月",
		tb: 78.72,
		hb: -26.28
	},
	{
		date: "2017年8月",
		tb: 8.27,
		hb: 11.37
	},
	{
		date: "2017年9月",
		tb: 7.61,
		hb: 10.19
	},
	{
		date: "2017年10月",
		tb: -17.33,
		hb: -17.62
	},
	{
		date: "2017年11月",
		tb: -24.79,
		hb: -6.47
	},
	{
		date: "2017年12月",
		tb: 1,
		hb: 0.01
	}
];