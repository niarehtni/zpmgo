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
	        text : "验伪走势图",
	        x: 'center',
	        textStyle : {
	            color: '#1b1b1b'
	        }
	    },
	    grid: {
			x: 50,
			x2: 100,
			y: 50,
			y2: 50,
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
	        	str += "<br>" + param[0]["seriesName"] + " : " + param[0]["value"] + " %";
	        	for(var i=1; i<param.length; i++){
	        		str += "<br>" + param[i]["seriesName"] + " : " + param[i]["value"];
	        	}
	        	return str;
	        }
	    },
	    legend: {
	    	show: true,
	    	y: 'bottom',
	    	data:['验伪率','总量','验伪量', '增量']
	    },
	    xAxis: [{
	    	splitLine: { show: false },
	    	data : null
	    }],
	    yAxis : [{
            type : 'value',
            name: "验伪率(%)",
        },{
        	type : 'value'
        }],
	    series: [{
            name: '验伪率',
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
            name:'总量',
            type:'line',
            yAxisIndex: 1,
            data: null
        },
        {
            name:'验伪量',
            type:'line',
            yAxisIndex: 1,
            data: null
        },
        {
            name:'增量',
            type:'line',
            yAxisIndex: 1,
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
	var rate = "<tr><th>验伪率(%)</th>";
	var total = "<tr><th>总量</th>";
	var check = "<tr><th>验伪量</th>";
	var increment = "<tr><th>增量</th>";
	for(var i=0; i<data.length; i++){
		thead += "<td>"+data[i]["date"]+"</td>";
		rate += "<td>"+data[i]["rate"]+"</td>";
		total += "<td>"+data[i]["total"]+"</td>";
		check += "<td>"+data[i]["check"]+"</td>";
		increment += "<td>"+data[i]["increment"]+"</td>";
	}
	thead += "</tr></thead>";
	rate += "</tr>";
	total += "</tr>";
	check += "</tr>";
	increment += "</tr>";
	html += thead + rate + total + check + increment;
	html += "</table>";
	$(".tableContainer").html(html);
};

oDefault["getData"] = function(){
	var year = $("#year").val();
	var rate = [];
	var total = [];
	var increment = [];
	var check = [];
	var xAxis = [];
	//success
	var data = DATA;
	for(var i=0; i<data.length; i++){
		rate.push(data[i]["rate"]);
		total.push(data[i]["total"]);
		check.push(data[i]["check"]);
		increment.push(data[i]["increment"]);
		xAxis.push(data[i]["date"]);
	}
	oDefault.option.xAxis[0].data = xAxis;
	oDefault.option.series[0].data = rate;
	oDefault.option.series[1].data = total;
	oDefault.option.series[2].data = check;
	oDefault.option.series[3].data = increment;
	oDefault["line"]();
	oDefault["table"](data);
	//error
	/*$("# line").removeClass("hasData").html("<span style='color:red'>数据获取失败</span>");
	$(".tableContainer").empty();*/
};

var DATA = [
	{	
		date: "2017年1月",
		rate: 2.03,
		total: 60895,
		check: 1237,
		increment: 6255
	},
	{
		date: "2017年2月",
		rate: 2.11,
		total: 62193,
		check: 1314,
		increment: 1298
	},
	{
		date: "2017年3月",
		rate: 1.97,
		total: 78381,
		check: 1546,
		increment: 16188
	},
	{
		date: "2017年4月",
		rate: 2.1,
		total: 85858,
		check: 1807,
		increment: 7477
	},
	{
		date: "2017年5月",
		rate: 2.14,
		total: 96878,
		check: 2072,
		increment: 11020
	},
	{
		date: "2017年6月",
		rate: 2.16,
		total: 115391,
		check: 2488,
		increment: 18513
	},
	{
		date: "2017年7月",
		rate: 1.59,
		total: 200766,
		check: 3191,
		increment: 85375
	},
	{
		date: "2017年8月",
		rate: 1.77,
		total: 266479,
		check: 4717,
		increment: 65713
	},
	{
		date: "2017年9月",
		rate: 1.95,
		total: 382817,
		check: 7467,
		increment: 116338
	},
	{
		date: "2017年10月",
		rate: 1.61,
		total: 672831,
		check: 10811,
		increment: 290014
	},
	{
		date: "2017年11月",
		rate: 1.5,
		total: 805181,
		check: 12101,
		increment: 132350
	},
	{
		date: "2017年12月",
		rate: 1.5,
		total: 805206,
		check: 12102,
		increment: 25
	}
];