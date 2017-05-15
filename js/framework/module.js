jQuery.Hashtable = function () {
    this.items = new Array();
    this.itemsCount = 0;
    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            this.items[key] = value;
            this.itemsCount++;
        }
        else {
            //throw "key '" + key + "' allready exists."
            this.items[key] = value;
        }
    }

    this.get = function (key) {
        if (this.containsKey(key))
            return this.items[key];
        else
            return null;
    }

    this.remove = function (key) {
        if (this.containsKey(key)) {
            delete this.items[key];
            this.itemsCount--;
        }
        else
            throw "key '" + key + "' does not exists."

    }

    this.containsKey = function (key) {
        return typeof (this.items[key]) != "undefined";
    }

    this.containsValue = function containsValue(value) {
        for (var item in this.items) {
            if (this.items[item] == value)
                return true;
        }

        return false;
    }

    this.contains = function (keyOrValue) {
        return this.containsKey(keyOrValue) || this.containsValue(keyOrValue);
    }

    this.clear = function () {
        this.items = new Array();
        itemsCount = 0;
    }

    this.size = function () {
        return this.itemsCount;
    }

    this.isEmpty = function () {
        return this.size() == 0;
    }
};
var hashtable = new jQuery.Hashtable();
$(document).ready(function(){
	$(".module .content").each(function(){
		if($(this).css("display")=="none"){
			
			$(this).parent().find(".title .info").append("<div class='bottomBtn'>&nbsp;</div>");
		}else
		{
			$(this).parent().find(".title .info").append("<div class='topBtn'>&nbsp;</div>");
		}
	});
	/**
	$(".module .title").dblclick(function(){
		if($(this).parent().find(".content").css("display")=="none")
		{
			$(this).parent().find(".content").show();
			$(this).find(".info .bottomBtn").remove();
			$(this).find(".info").append("<div class='topBtn'>&nbsp;</div>");
		}else{
			
			$(this).parent().find(".content").hide();
			$(this).find(".info .topBtn").remove();
			$(this).find(".info").append("<div class='bottomBtn'>&nbsp;</div>");
		}
	});
	**/
	
	$(".module .title .info").dblclick(function(){
		if($(this).parent().parent().find(".content").css("display")=="none")
		{
			$(this).parent().parent().find(".content").show();
			$(this).find(".bottomBtn").remove();
			$(this).append("<div class='topBtn'>&nbsp;</div>");
		}else{
			$(this).parent().parent().find(".content").hide();
			$(this).find(".topBtn").remove();
			$(this).append("<div class='bottomBtn'>&nbsp;</div>");
		}
	});
	
	$("thead").find(":checkbox").click(function(){
		$(this).parent().parent().parent().parent().find("tbody").find(":checkbox").attr("checked",$(this).attr("checked"));
	});
	/**表格的增、删、复制功能**/
	$("table").each(function(index){
		$(this).attr("index",index);
		var tr=$(this).find(".hideTr");
		hashtable.add(index+"",tr.clone(true));
		tr.remove();
	});
	$("span.addBtn").click(function(){
		var table=$(this).parent().parent().parent().find(".content table");
		var tr=hashtable.get(table.attr("index")).clone(true);
		tr.show();
		table.find("tbody").append(tr);
		init(tr);
	});
	
	$("span.copyBtn").click(function(){
		var tbody=$(this).parent().parent().parent().find(".content table tbody");
		if(tbody.find("input:checked").length==0){
			alert("请至少选择一条记录");
			return false;
		}
		var tr=tbody.find("input:checked").parent().parent().clone();
		tr.find(".notCopy").val("");
		tr.find(".notCopy").remove();
		tr.find(".setCopyValue").each(function(){
			var setCopyValue=$(this).attr("setCopyValue");
			if(setCopyValue==null){
				setCopyValue="";
			}
			$(this).val(setCopyValue);
		});
		tbody.append(tr);
		init(tr);
	});
	
	$("span.deleteBtn").click(function(){
		var tbody=$(this).parent().parent().parent().find(".content table tbody");
		if(tbody.find("input:checked").length==0){
			alert("请至少选择一条记录");
			return false;
		}
		tbody.find("input:checked").parent().parent().remove();
	});
	
	$("span.exportExcelBtn").click(function(){
		//var table=$(this).parent().parent().parent().find(".content table.exportTable");

		exportExcelByElement($(this).parent().parent().parent().find(".content").get(0));
	});
	/**表格的增、删、复制功能**/
	
	/**选项卡切换功能**/
	$(".module .title .item").each(function(index){
		$(this).attr("index",index);
	});
	$(".module .content .item").each(function(index){
		$(this).attr("index",index);
	});
	$(".module .title .item").click(function(){
		$(".module .title .item").removeClass("selected");
		$(this).addClass("selected");
		$(".module .content .item").css({"display":"none"});
		$(".module .content .item[index='"+$(this).attr("index")+"']").css({"display":"block"});
		var iframe=$(".module .content .item[index='"+$(this).attr("index")+"'] iframe");
		if(iframe!=null&&iframe.length>0){
			iframe.each(function(){
				if($(this).attr("lazyLoadSrc")!=null&&$(this).attr("src")==null){
					$(this).attr("src",$(this).attr("lazyLoadSrc"));
				}
			});
		}
	});
	$(".module .content").find("iframe[fullScreen='true']").height($(document).height()-50);
	$(".module .title .item:first").click();
	/**选项卡切换功能**/
});

function init(tr){
	try{
//		$("input.date").attr("readonly","readonly");
		$("input.date").focus(function(){
			setday(this);
		});
	tr.find("input.date").each(function(){
		var a=$(this);
		if(a.val()==''&&a.readonly!='readonly'&&a.disabled!='disabled'){
			var now=new Date();
			//a.val(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate());
		}
		a.DatePicker({
			format:'Y-m-d',
			date: a.val(),
			current: a.val(),
			starts: 1000,
			position: 'r',
			eventName:'focus',
			onBeforeShow: function(){
				a.DatePickerSetDate(a.val(), true);
			},
			onChange: function(formated, dates){
				a.val(formated);
				$(this).hide();
			}
		});
	})
	}catch(exception){
		
	}
	try{
	tr.find("input.month").each(function(){
		var b=$(this);
		if(b.val()==''&&b.readonly!='readonly'&&b.disabled!='disabled'){
			var datetime=new Date();
			var now=datetime.getFullYear()+"-"+(datetime.getMonth()-1);
			//a.val(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate());
		}
		b.DatePicker({
			format:'Y-m',
			date: b.val(),
			current: b.val(),
			starts: 1000,
			position: 'r',
			onBeforeShow: function(){
				b.DatePickerSetDate(b.val(), true);
			},
			onChange: function(formated, dates){
				b.val(formated);
				$(this).hide();
			}
		})
	});
	}catch(exception){
		
	}
	try{
	tr.find("input.address").PCCCascade({county:true,onChange:function(value){$(this).val(value)}});
	}catch(exception){
		
	}
	try{
	autoFillInit();
	}catch(exception){
		
	}
}

var allParam={
	initRow:function(tr){
		
	}
}
function exportExcel(tabObj){
	var oXL = new ActiveXObject("Excel.Application");
	var oWB = oXL.Workbooks.Add(); 
    //获取workbook对象 
    var oSheet = oWB.ActiveSheet; 
    //激活当前sheet 
    var sel = document.body.createTextRange(); 
    sel.moveToElementText(tabObj); 
    //把表格中的内容移到TextRange中 
    sel.select(); 
    //全选TextRange中内容 
    sel.execCommand("Copy"); 
    //复制TextRange中内容 
    oSheet.Paste(); 
    //粘贴到活动的EXCEL中       
    oXL.Visible = true; 
    //设置excel可见属性 
}

function exportExcelByElement(element) {
	var oXL = new ActiveXObject("Excel.Application");
	// 创建AX对象excel
	var oWB = oXL.Workbooks.Add();
	// 获取workbook对象
	var oSheet = oWB.ActiveSheet;
	// 激活当前sheet
	var rowTemp=new Array();
	for(var i=0;i<$(element).find("tr").length;i++){
		rowTemp[i]=new Array();
		for(var j=0;j<100;j++){
			rowTemp[i][j]=0;
		}
	}
	$(element).find("tr").each(function(rowIndex){
		var cellTemp=0;
		$(this).find("th,td").each(function(cellIndex){
			var td=$(this).clone();
			td.find("input[type!='hidden'],textarea").each(function(){
				var span=$("<span>"+$(this).val()+"</span>");
				span.insertBefore($(this));
				$(this).remove();
			});
			td.find("select").each(function(){
				var span=$("<span>"+$(this).find("option:selected").text()+"</span>");
				span.insertBefore($(this));
				$(this).remove();
			});
			var value=td.text();
			td.remove();
			
			
			
			
			var colspan=1;
			try{
				colspan=parseInt($(this).attr("colspan"));
			}catch(e){}
			if(!colspan){
				colspan=1;
			}
			var rowspan=1;
			try{
			rowspan=parseInt($(this).attr("rowspan"));
			}catch(e){}

			if(!rowspan){
				rowspan=1;
			}
			for(var i=1;i<rowspan;i++){
				rowTemp[rowIndex+i][cellIndex]=1;
			}
			cellRowTemp=0;
			for(var i=0;i<=100;i++){
				if(rowTemp[rowIndex][i]==1){
					cellRowTemp++;
				}else{
					break;
				}
			}

			try{
				oSheet.Range(oSheet.Cells(rowIndex + 1, cellRowTemp+cellTemp + 1),oSheet.Cells(rowIndex + rowspan, cellRowTemp+cellTemp + colspan)).Select();
				oXL.Selection.MergeCells = true;
			}catch(e){}
			oXL.Selection.HorizontalAlignment = 3;                          //居中

			try{
				oSheet.Cells(rowIndex + 1, cellRowTemp+cellTemp + 1).value = value+"";
			}catch(e){}
			cellTemp+=colspan;
		});
	});
	oXL.Visible = true;
	// 设置excel可见属性
}







