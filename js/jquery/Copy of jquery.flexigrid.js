/*
 * Flexigrid for jQuery -  v1.1
 *
 * Copyright (c) 2008 Paulo P. Marinas (code.google.com/p/flexigrid/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 */


(function($) {
	$.addFlex = function(t, p) {
		if (t.grid)
			return false; // return if already exist
		//frame高度
		var documentHeight=$(window.parent.document).find(".content.selected").height();
		if(!documentHeight){
			documentHeight=$(document).height();
		}
		//frame宽度
		var documentWidth=$(window.parent.document).find(".content.selected").width();
		if(!documentWidth){
			documentWidth=$(document).width();
		}
		//页面间距
		var documentPadding=20;
		//标题高度
		var titleHeight=0;
		if (p.title) {
			titleHeight=32;
		}
		//按钮工具高度
		var toolHeight=29;
		//查询输入框高度
		var searchInputHeight=0;
		if(p.form){
			searchInputHeight=p.form.find("table").height();
		}
		//表头高度
		var theadHeight=26;
		//分页工具条高度
		var pageHeight=28;
		if (p.usepager==false) {
			pageHeight=0;
		}
		
		//每行高度
		var rowHeight=24;
		//表格内容高度
		var height=documentHeight-documentPadding-titleHeight-toolHeight-searchInputHeight-theadHeight-pageHeight;
		//alert(documentHeight+","+height);
		var width = documentWidth - documentPadding;
		var rp = Math.round(height / rowHeight);
		if(p.colModel){
			var w=0;
			for(var i=0;i<p.colModel.length;i++){
				w=w+p.colModel[i].width;
			}
			if(w>width){
				rp=rp-1;
			}
		}
		p = $.extend( { // apply default properties
					height : height, // default height
					width : width, // auto width
					striped : true, // apply odd even stripes
					novstripe : false,
					minwidth : 30, // min width of columns
					minheight : 80, // min height of columns
					resizable : false, // allow table resizing
					url : false, // URL if using data from AJAX
					form : false,//自定义查询表单
					add : false,// 添加
					detail : false,//详情
					edit : false,// 编辑
					deletes : false,// 删除
					exportExcel : false,// 导出 Excel
					likeValueSearch:false,//全局模糊查询
					viewConfig : false,//表格定制
					method : 'POST', // data sending method
					dataType : 'json', // type of data for AJAX, either xml or
										// json
					errormsg : '网络连接错误',
					usepager : true,
					nowrap : true,
					page : 1, // current page
					total : 0, // total pages
					useRp : true, // use the results per page select box
					rp : rp, // results per page
					rpOptions : [ rp, 10, 20, 40, 80, 10000 ], // allowed per-page
															// values
					title : false,
					pagestat : '共{total}条记录,显示第{from}条至{to}条',
					pagetext : '第',
					outof : '共',
					findtext : '查',
					procmsg : '正在查询数据,请稍等......',
					query : '',
					qtype : '',
					nomsg : '没有符合条件的记录存在',
					minColToggle : 1, // minimum allowed column to be hidden
					showToggleBtn : false, // show or hide column toggle popup
					hideOnSubmit : true,
					autoload : true,
					blockOpacity : 0.5,
					preProcess : false,
					showCheckBox : true,
					onDragCol : false,
					onToggleCol : false,
					onChangeSort : false,
					onSuccess : false,
					onError : false,
					onSubmit : false
				// using a custom populate function
				}, p);
		if(p.form){
			p.url=p.form.attr("action");
		}
		$(t).show() // show if hidden
				.attr( {
					cellPadding : 0,
					cellSpacing : 0,
					border : 0
				}) // remove padding and spacing
				.removeAttr('width'); // remove width properties
		// create grid class
		var g = {
			hset : {},
			rePosDrag : function() {
				var cdleft = 0 - this.hDiv.scrollLeft;
				if (this.hDiv.scrollLeft > 0)
					cdleft -= Math.floor(p.cgwidth / 2);
				$(g.cDrag).css( {
					top : g.hDiv.offsetTop + 1
				});
				var cdpad = this.cdpad;
				$('div', g.cDrag).hide();
				$('thead tr:first th:visible', this.hDiv).each(function() {
					var n = $('thead tr:first th:visible', g.hDiv).index(this);
					var cdpos = parseInt($('div', this).width());
					if (cdleft == 0)
						cdleft -= Math.floor(p.cgwidth / 2);
					cdpos = cdpos + cdleft + cdpad;
					if (isNaN(cdpos)) {
						cdpos = 0;
					}
					$('div:eq(' + n + ')', g.cDrag).css( {
						'left' : cdpos + 'px'
					}).show();
					cdleft = cdpos;
				});
			},
			fixHeight : function(newH) {
				newH = false;
				if (!newH)
					newH = $(g.bDiv).height();
				var hdHeight = $(this.hDiv).height();
				$('div', this.cDrag).each(function() {
					$(this).height(newH + hdHeight);
				});
				var nd = parseInt($(g.nDiv).height());
				if (nd > newH)
					$(g.nDiv).height(newH).width(200);
				else
					$(g.nDiv).height('auto').width('auto');
				$(g.block).css( {
					height : newH,
					marginBottom : (newH * -1)
				});
				var hrH = g.bDiv.offsetTop + newH;
				if (p.height != 'auto' && p.resizable)
					hrH = g.vDiv.offsetTop;
				$(g.rDiv).css( {
					height : hrH
				});
			},
			dragStart : function(dragtype, e, obj) { // default drag function
														// start
				if (dragtype == 'colresize') {// column resize
					$(g.nDiv).hide();
					$(g.nBtn).hide();
					var n = $('div', this.cDrag).index(obj);
					var ow = $('th:visible div:eq(' + n + ')', this.hDiv)
							.width();
					$(obj).addClass('dragging').siblings().hide();
					$(obj).prev().addClass('dragging').show();
					this.colresize = {
						startX : e.pageX,
						ol : parseInt(obj.style.left),
						ow : ow,
						n : n
					};
					$('body').css('cursor', 'col-resize');
				} else if (dragtype == 'vresize') {// table resize
					var hgo = false;
					$('body').css('cursor', 'row-resize');
					if (obj) {
						hgo = true;
						$('body').css('cursor', 'col-resize');
					}
					this.vresize = {
						h : p.height,
						sy : e.pageY,
						w : p.width,
						sx : e.pageX,
						hgo : hgo
					};
				} else if (dragtype == 'colMove') {// column header drag
					$(g.nDiv).hide();
					$(g.nBtn).hide();
					this.hset = $(this.hDiv).offset();
					this.hset.right = this.hset.left
							+ $('table', this.hDiv).width();
					this.hset.bottom = this.hset.top
							+ $('table', this.hDiv).height();
					this.dcol = obj;
					this.dcoln = $('th', this.hDiv).index(obj);
					this.colCopy = document.createElement("div");
					this.colCopy.className = "colCopy";
					this.colCopy.innerHTML = obj.innerHTML;
					if ($.browser.msie) {
						this.colCopy.className = "colCopy ie";
					}
					$(this.colCopy).css( {
						position : 'absolute',
						float : 'left',
						display : 'none',
						textAlign : obj.align
					});
					$('body').append(this.colCopy);
					$(this.cDrag).hide();
				}
				$('body').noSelect();
			},
			dragMove : function(e) {
				if (this.colresize) {// column resize
					var n = this.colresize.n;
					var diff = e.pageX - this.colresize.startX;
					var nleft = this.colresize.ol + diff;
					var nw = this.colresize.ow + diff;
					if (nw > p.minwidth) {
						$('div:eq(' + n + ')', this.cDrag).css('left', nleft);
						this.colresize.nw = nw;
					}
				} else if (this.vresize) {// table resize
					var v = this.vresize;
					var y = e.pageY;
					var diff = y - v.sy;
					if (!p.defwidth)
						p.defwidth = p.width;
					if (p.width != 'auto' && !p.nohresize && v.hgo) {
						var x = e.pageX;
						var xdiff = x - v.sx;
						var newW = v.w + xdiff;
						if (newW > p.defwidth) {
							this.gDiv.style.width = newW + 'px';
							p.width = newW;
						}
					}
					var newH = v.h + diff;
					if ((newH > p.minheight || p.height < p.minheight)
							&& !v.hgo) {
						this.bDiv.style.height = newH + 'px';
						p.height = newH;
						this.fixHeight(newH);
					}
					v = null;
				} else if (this.colCopy) {
					$(this.dcol).addClass('thMove').removeClass('thOver');
					if (e.pageX > this.hset.right || e.pageX < this.hset.left
							|| e.pageY > this.hset.bottom
							|| e.pageY < this.hset.top) {
						// this.dragEnd();
						$('body').css('cursor', 'move');
					} else {
						$('body').css('cursor', 'pointer');
					}
					$(this.colCopy).css( {
						top : e.pageY + 10,
						left : e.pageX + 20,
						display : 'block'
					});
				}
			},
			dragEnd : function() {
				if (this.colresize) {
					var n = this.colresize.n;
					var nw = this.colresize.nw;
					$('th:visible div:eq(' + n + ')', this.hDiv).css('width',
							nw);
					$('tr', this.bDiv).each(
							function() {
								$('td:visible div:eq(' + n + ')', this).css(
										'width', nw);
							});
					this.hDiv.scrollLeft = this.bDiv.scrollLeft;
					$('div:eq(' + n + ')', this.cDrag).siblings().show();
					$('.dragging', this.cDrag).removeClass('dragging');
					this.rePosDrag();
					this.fixHeight();
					this.colresize = false;
				} else if (this.vresize) {
					this.vresize = false;
				} else if (this.colCopy) {
					$(this.colCopy).remove();
					if (this.dcolt != null) {
						if (this.dcoln > this.dcolt)
							$('th:eq(' + this.dcolt + ')', this.hDiv).before(
									this.dcol);
						else
							$('th:eq(' + this.dcolt + ')', this.hDiv).after(
									this.dcol);
						this.switchCol(this.dcoln, this.dcolt);
						$(this.cdropleft).remove();
						$(this.cdropright).remove();
						this.rePosDrag();
						if (p.onDragCol) {
							p.onDragCol(this.dcoln, this.dcolt);
						}
					}
					this.dcol = null;
					this.hset = null;
					this.dcoln = null;
					this.dcolt = null;
					this.colCopy = null;
					$('.thMove', this.hDiv).removeClass('thMove');
					$(this.cDrag).show();
				}
				$('body').css('cursor', 'default');
				$('body').noSelect(false);
			},
			toggleCol : function(cid, visible) {
				var ncol = $("th[axis='col" + cid + "']", this.hDiv)[0];
				var n = $('thead th', g.hDiv).index(ncol);
				var cb = $('input[value=' + cid + ']', g.nDiv)[0];
				if (visible == null) {
					visible = ncol.hidden;
				}
				if ($('input:checked', g.nDiv).length < p.minColToggle
						&& !visible) {
					return false;
				}
				if (visible) {
					ncol.hidden = false;
					$(ncol).show();
					cb.checked = true;
				} else {
					ncol.hidden = true;
					$(ncol).hide();
					cb.checked = false;
				}
				$('tbody tr', t).each(function() {
					if (visible) {
						$('td:eq(' + n + ')', this).show();
					} else {
						$('td:eq(' + n + ')', this).hide();
					}
				});
				this.rePosDrag();
				if (p.onToggleCol) {
					p.onToggleCol(cid, visible);
				}
				return visible;
			},
			switchCol : function(cdrag, cdrop) { // switch columns
				$('tbody tr', t).each(
						function() {
							if (cdrag > cdrop)
								$('td:eq(' + cdrop + ')', this).before(
										$('td:eq(' + cdrag + ')', this));
							else
								$('td:eq(' + cdrop + ')', this).after(
										$('td:eq(' + cdrag + ')', this));
						});
				// switch order in nDiv
				if (cdrag > cdrop) {
					$('tr:eq(' + cdrop + ')', this.nDiv).before(
							$('tr:eq(' + cdrag + ')', this.nDiv));
				} else {
					$('tr:eq(' + cdrop + ')', this.nDiv).after(
							$('tr:eq(' + cdrag + ')', this.nDiv));
				}
				if ($.browser.msie && $.browser.version < 7.0) {
					$('tr:eq(' + cdrop + ') input', this.nDiv)[0].checked = true;
				}
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
			},
			scroll : function() {
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				this.rePosDrag();
			},
			addData : function(data) { // parse data
				if (p.dataType == 'json') {
					data = $.extend( {
						rows : [],
						pageNum : 0,
						dataSize : 0
					}, data);
				}
				if (p.preProcess) {
					data = p.preProcess(data);
				}
				$('.pReload', this.pDiv).removeClass('loading');
				this.loading = false;
				if (!data) {
					$('.pPageStat', this.pDiv).html(p.errormsg);
					return false;
				}
				if (p.dataType == 'xml') {
					p.total = +$('rows total', data).text();
				} else {
					p.total = data.dataSize;
				}
				if (p.total == 0) {
					$('tr, a, td, div', t).unbind();
					$(t).empty();
					p.pages = 1;
					p.page = 1;
					this.buildpager();
					$('.pPageStat', this.pDiv).html(p.nomsg);
					return false;
				}
				p.pages = Math.ceil(p.total / p.rp);
				if (p.dataType == 'xml') {
					p.page = +$('rows page', data).text();
				} else {
					p.page = data.pageNum;
				}
				this.buildpager();
				// build new body
				var tbody = document.createElement('tbody');
				if (p.dataType == 'json') {
					$
							.each(
									data.rows,
									function(i, row) {
										var tr = document.createElement('tr');
										var primaryKey=row.PRIMARYKEY;
										if(primaryKey==null){
												primaryKey=row.primaryKey;
										}
										$(tr)
												.attr("PRIMARYKEY",
														primaryKey);
										if (i % 2 && p.striped) {
											tr.className = 'erow';
										}
										if (row.id) {
											tr.id = 'row' + row.id;
										}

										$('thead tr:first th', g.hDiv)
												.each( // add cell
														function() {
															var td = document
																	.createElement('td');
															if($(this).attr("initHidden")){
																$(td).attr("initHidden",true);
															}
															var idx = $(this)
																	.attr(
																			'axis')
																	.substr(3);
															if (p.showCheckBox) {
																if (idx == 0) {
																	var cth = $('<td/>');
																	var cthch = $("<input type='checkbox' onclick='checkAllOrNot(this)' style='margin:0px;padding:0px;'/>");
																	cth
																			.attr(
																					{
																						axis : "col0",
																						width : "13",
																						isch : true
																					})
																			.append(
																					cthch);
																	$(tr)
																			.append(
																					cth);
																}
																idx--;
															}
															if (idx >= 0) {
																try {
																	var value;
																	eval("value = row."
																			+ p.colModel[idx].name);
																	if (value == null
																			|| value == 'null') {
																		value = '';
																	}
																	var param = $.extend({
																		name:false,
																		display:false,
																		width:false,
																		sortable:false,
																		doubleFormat:false,
																		dataFormat:false,
																		tdClass:false
																	},p.colModel[idx]);
																	if(param.doubleFormat){
																		value=doubleFormat(value,param.doubleFormat);
																	}
																	if(param.dataFormat){
																		value=param.dataFormat(value,td,row);
																	}
																	if(param.tdClass){
																		$(td).addClass(param.tdClass);
																	}
																	if(value){
																		td.innerHTML = value;
																	}
																	if(p.viewConfig){
																		if(!p.colModel[idx].viewConfig){
																			$(td).hide();
																		}
																	}
																} catch (e) {

																}
																td.align = this.align;
																// If the json
																// elements
																// aren't named
																// (which is
																// typical), use
																// numeric order
																// if (typeof
																// row.cell[idx]
																// !=
																// "undefined")
																// {
																// td.innerHTML
																// =
																// (row.cell[idx]
																// != null) ?
																// row.cell[idx]
																// :
																// '';//null-check
																// for
																// Opera-browser
																// } else {
																// td.innerHTML
																// =
																// row.cell[p.colModel[idx].name];
																// }
																$(td)
																		.attr(
																				'abbr',
																				$(
																						this)
																						.attr(
																								'abbr'));
																$(tr)
																		.append(
																				td);
																td = null;
															}
														});
										if ($('thead', this.gDiv).length < 1) {// handle
																				// if
																				// grid
																				// has
																				// no
																				// headers
											for (idx = 0; idx < cell.length; idx++) {
												var td = document
														.createElement('td');
												// If the json elements aren't
												// named (which is typical), use
												// numeric order
												if (typeof row.cell[idx] != "undefined") {
													td.innerHTML = (row.cell[idx] != null) ? row.cell[idx]
															: '';// null-check
																	// for
																	// Opera-browser
												} else {
													td.innerHTML = row.cell[p.colModel[idx].name];
												}
												$(tr).append(td);
												td = null;
											}
										}
										$(tbody).append(tr);
										tr = null;
									});
				} else if (p.dataType == 'xml') {
					var i = 1;
					$("rows row", data).each(
							function() {
								i++;
								var tr = document.createElement('tr');
								if (i % 2 && p.striped) {
									tr.className = 'erow';
								}
								var nid = $(this).attr('id');
								if (nid) {
									tr.id = 'row' + nid;
								}
								nid = null;
								var robj = this;
								$('thead tr:first th', g.hDiv).each(
										function() {
											var td = document
													.createElement('td');
											var idx = $(this).attr('axis')
													.substr(3);
											td.align = this.align;
											td.innerHTML = $(
													"cell:eq(" + idx + ")",
													robj).text();
											$(td).attr('abbr',
													$(this).attr('abbr'));
											$(tr).append(td);
											td = null;
										});
								if ($('thead', this.gDiv).length < 1) {// handle
																		// if
																		// grid
																		// has
																		// no
																		// headers
									$('cell', this).each(function() {
										var td = document.createElement('td');
										td.innerHTML = $(this).text();
										$(tr).append(td);
										td = null;
									});
								}
								$(tbody).append(tr);
								tr = null;
								robj = null;
							});
				}
				$('tr', t).unbind();
				$(t).empty();
				$(t).append(tbody);
				this.addCellProp();
				this.addRowProp();
				this.rePosDrag();
				tbody = null;
				data = null;
				i = null;
				if (p.onSuccess) {
					p.onSuccess(this);
				}
				if (p.hideOnSubmit) {
					$(g.block).remove();
				}
				this.hDiv.scrollLeft = this.bDiv.scrollLeft;
				if ($.browser.opera) {
					$(t).css('visibility', 'visible');
				}
			},
			changeSort : function(th) { // change sortorder
				if (this.loading) {
					return true;
				}
				$(g.nDiv).hide();
				$(g.nBtn).hide();
				if (p.sortname == $(th).attr('abbr')) {
					if (p.sortorder == 'asc') {
						p.sortorder = 'desc';
					} else {
						p.sortorder = 'asc';
					}
				}
				$(th).addClass('sorted').siblings().removeClass('sorted');
				$('.sdesc', this.hDiv).removeClass('sdesc');
				$('.sasc', this.hDiv).removeClass('sasc');
				$('div', th).addClass('s' + p.sortorder);
				p.sortname = $(th).attr('abbr');
				if (p.onChangeSort) {
					p.onChangeSort(p.sortname, p.sortorder);
				} else {
					this.populate();
				}
			},
			buildpager : function() { // rebuild pager based on new properties
				$('.pcontrol input', this.pDiv).val(p.page);
				$('.pcontrol span', this.pDiv).html(p.pages);
				var r1 = (p.page - 1) * p.rp + 1;
				var r2 = r1 + p.rp - 1;
				if (p.total < r2) {
					r2 = p.total;
				}
				var stat = p.pagestat;
				stat = stat.replace(/{from}/, r1);
				stat = stat.replace(/{to}/, r2);
				stat = stat.replace(/{total}/, p.total);
				$('.pPageStat', this.pDiv).html(stat);
			},
			populate : function() { // get latest data
				if (this.loading) {
					return true;
				}
				if (p.onSubmit) {
					var gh = p.onSubmit();
					if (!gh) {
						return false;
					}
				}
				this.loading = true;
				if (!p.url) {
					return false;
				}
				$('.pPageStat', this.pDiv).html(p.procmsg);
				$('.pReload', this.pDiv).addClass('loading');
				$(g.block).css( {
					top : g.bDiv.offsetTop
				});
				if (p.hideOnSubmit) {
					$(this.gDiv).prepend(g.block);
				}
				if ($.browser.opera) {
					$(t).css('visibility', 'hidden');
				}
				if (!p.newp) {
					p.newp = 1;
				}
				if (p.page > p.pages) {
					p.page = p.pages;
				}
				var param = [ {
					name : 'pageBean.pageNum',
					value : p.newp
				}, {
					name : 'pageBean.pageSize',
					value : p.rp
				}, {
					name : 'pageBean.sortName',
					value : p.sortname
				}, {
					name : 'pageBean.sortOrder',
					value : p.sortorder
				}, {
					name : 'pageBean.query',
					value : p.query
				}, {
					name : 'pageBean.qtype',
					value : p.qtype
				} ];
				if (p.params) {
					for ( var pi = 0; pi < p.params.length; pi++) {
						param[param.length] = p.params[pi];
					}
				}
				var url = p.url;
				var method = p.method;
				if (p.form) {
					url = $(p.form).attr("action");
					method = $(p.form).attr("method");
					var formStr = decodeURI($(p.form).serialize());
					var formParams = formStr.split("&");
					for ( var pi = 0; pi < formParams.length; pi++) {
						var formParam = formParams[pi].split("=");
						param[param.length] = {
							name : formParam[0],
							value : formParam[1]
						};
					}
					for(pc =0;pc<p.colModel.length;pc++){
						if(p.colModel[pc]!=null&&p.colModel[pc].name!=null){
							param[param.length] = {
									name : "pageBean.fields",
									value : p.colModel[pc].name
								};
						}
					}
					param[param.length] = {
							name : "pageBean.fields",
							value : "PRIMARYKEY"
						};
				}
				if (url.indexOf("?") > 0) {
					url = url + "&" + "&time=" + new Date().getTime();
				} else {
					url = url + "?" + "&time=" + new Date().getTime();
				}
				$.ajax( {
					type : method,
					url : url,
					data : param,
					dataType : p.dataType,
					success : function(data) {
						g.addData(data);
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert("网络异常");
						//alert(XMLHttpRequest.responseText);
						// $("body").html(XMLHttpRequest.responseText);
					try {
						if (p.onError)
							p.onError(XMLHttpRequest, textStatus, errorThrown);
					} catch (e) {
					}
				}
				});
			},
			doSearch : function() {
				p.query = $('input[name=q]', g.sDiv).val();
				p.qtype = $('select[name=qtype]', g.sDiv).val();
				p.newp = 1;
				this.populate();
			},
			changePage : function(ctype) { // change page
				if (this.loading) {
					return true;
				}
				switch (ctype) {
				case 'first':
					p.newp = 1;
					break;
				case 'prev':
					if (p.page > 1) {
						p.newp = parseInt(p.page) - 1;
					}
					break;
				case 'next':
					if (p.page < p.pages) {
						p.newp = parseInt(p.page) + 1;
					}
					break;
				case 'last':
					p.newp = p.pages;
					break;
				case 'input':
					var nv = parseInt($('.pcontrol input', this.pDiv).val());
					if (isNaN(nv)) {
						nv = 1;
					}
					if (nv < 1) {
						nv = 1;
					} else if (nv > p.pages) {
						nv = p.pages;
					}
					$('.pcontrol input', this.pDiv).val(nv);
					p.newp = nv;
					break;
				}
				if (p.newp == p.page) {
					return false;
				}
				if (p.onChangePage) {
					p.onChangePage(p.newp);
				} else {
					this.populate();
				}
			},
			addCellProp : function() {
				$('tbody tr td', g.bDiv).each(function() {
					var tdDiv = document.createElement('div');
					var n = $('td', $(this).parent()).index(this);
					var pth = $('th:eq(' + n + ')', g.hDiv).get(0);
					if (pth != null) {
						if (p.sortname == $(pth).attr('abbr') && p.sortname) {
							$(this).addClass("sorted");
							//this.className = 'sorted';
						}
						$(tdDiv).css( {
							textAlign : pth.align,
							width : $('div:first', pth)[0].style.width
						});
						if (pth.hidden) {
							$(this).css('display', 'none');
						}
					}
					if (p.nowrap == false) {
						$(tdDiv).css('white-space', 'normal');
					}
					if (this.innerHTML == '') {
						this.innerHTML = '&nbsp;';
					}
					tdDiv.innerHTML = this.innerHTML;
					var prnt = $(this).parent()[0];
					var pid = false;
					if (prnt.id) {
						pid = prnt.id.substr(3);
					}
					if (pth != null) {
						if (pth.process)
							pth.process(tdDiv, pid);
					}
					$(this).empty().append(tdDiv).removeAttr('width'); // wrap
																		// content
					});
			},
			getCellDim : function(obj) {// get cell prop for editable event
				var ht = parseInt($(obj).height());
				var pht = parseInt($(obj).parent().height());
				var wt = parseInt(obj.style.width);
				var pwt = parseInt($(obj).parent().width());
				var top = obj.offsetParent.offsetTop;
				var left = obj.offsetParent.offsetLeft;
				var pdl = parseInt($(obj).css('paddingLeft'));
				var pdt = parseInt($(obj).css('paddingTop'));
				return {
					ht : ht,
					wt : wt,
					top : top,
					left : left,
					pdl : pdl,
					pdt : pdt,
					pht : pht,
					pwt : pwt
				};
			},
			addRowProp : function() {
				$('tbody tr', g.bDiv).each(
						function() {
							$(this).click(
									function(e) {
										var obj = (e.target || e.srcElement);
										if (obj.href || obj.type)
											return true;
										$(this).toggleClass('trSelected');
										var checked = $(this).find(":checkbox")
												.attr("checked");
										$(this).find(":checkbox").attr(
												"checked", !checked);
										if (p.singleSelect)
											$(this).siblings().removeClass(
													'trSelected');
									}).mousedown(function(e) {
								if (e.shiftKey) {
									$(this).toggleClass('trSelected');
									g.multisel = true;
									this.focus();
									$(g.gDiv).noSelect();
								}
							}).mouseup(function() {
								if (g.multisel) {
									g.multisel = false;
									$(g.gDiv).noSelect(false);
								}
							}).hover(function(e) {
								if (g.multisel) {
									$(this).toggleClass('trSelected');
								}
							}, function() {
							});
							if ($.browser.msie && $.browser.version < 7.0) {
								$(this).hover(function() {
									$(this).addClass('trOver');
								}, function() {
									$(this).removeClass('trOver');
								});
							}
						});
			},
			init : function(){
				if (p.colModel) { // create model if any
					thead = document.createElement('thead');
					var tr = document.createElement('tr');
					if (p.showCheckBox) {
						var th = document.createElement('th');
						var cth = $(th);
						var cthch = $('<input type="checkbox" alt="all" onclick="checkAllOrNot(this)" style="margin:0px;padding:0px;"/>');
						cth.attr( {
							axis : "col0",
							width : "13",
							isch : true
						}).append(cthch);
						$(tr).append(cth);
					}
					for ( var i = 0; i < p.colModel.length; i++) {
						//var cm = p.colModel[i];
						var cm = $.extend({
							name:false,
							display:false,
							width:false,
							sortable:false,
							doubleFormat:false,
							hide:false,
							tdClass:false
						},p.colModel[i]);
						var th = document.createElement('th');
						
						if(p.viewConfig){
							cm.width=parseFloat(cm.width)+20;
							var input=$("<input type='checkbox' class='viewConfig' checked='checked' value='"+cm.name+"' />");
							var label=$("<span>"+cm.display+"</span>");
							$(th).append(input);
							$(th).append(label);
							input.hide();
							if(!cm.viewConfig){
								input.removeAttr("checked");
								$(th).hide();
							}
						}else{
							th.innerHTML = cm.display;
						}
						
						if(cm.tdClass){
							$(th).addClass(cm.tdClass);
						}
						if (cm.name && cm.sortable) {
							$(th).attr('abbr', cm.name);
						}
						$(th).attr('axis', 'col' + (i + 1));
						if (cm.align) {
							th.align = cm.align;
						}
						if (cm.width) {
							$(th).attr('width', cm.width);
						}
						if (cm.hide) {
							th.hidden = true;
							$(th).attr('initHidden', true);
						}
						if (cm.process) {
							th.process = cm.process;
						}
						$(tr).append(th);
					}
					$(thead).append(tr);
					$(t).prepend(thead);
				} // end if p.colmodel
				// init divs
				g.gDiv = document.createElement('div'); // create global container
				g.mDiv = document.createElement('div'); // create title container
				g.hDiv = document.createElement('div'); // create header container
				g.bDiv = document.createElement('div'); // create body container
				g.vDiv = document.createElement('div'); // create grip
				g.rDiv = document.createElement('div'); // create horizontal resizer
				g.cDrag = document.createElement('div'); // create column drag
				g.block = document.createElement('div'); // creat blocker
				g.nDiv = document.createElement('div'); // create column show/hide popup
				g.nBtn = document.createElement('div'); // create column show/hide
														// button
				g.iDiv = document.createElement('div'); // create editable layer
				g.tDiv = document.createElement('div'); // create toolbar
				g.sDiv = document.createElement('div');
				g.pDiv = document.createElement('div'); // create pager container
				if (!p.usepager) {
					g.pDiv.style.display = 'none';
				}
				g.hTable = document.createElement('table');
				g.gDiv.className = 'flexigrid';
				if (p.width != 'auto') {
					try{
					g.gDiv.style.width = p.width + 'px';
					}catch(e){}
				}
				// add conditional classes
				if ($.browser.msie) {
					$(g.gDiv).addClass('ie');
				}
				if (p.novstripe) {
					$(g.gDiv).addClass('novstripe');
				}
				$(t).before(g.gDiv);
				$(g.gDiv).append(t);
				// set toolbar

				if (p.buttons || p.add || p.detail || p.edit || p.deletes ||p.exportExcel||p.form||p.likeValueSearch||p.viewConfig) {
					g.tDiv.className = 'tDiv';
					var tDiv2 = document.createElement('div');
					tDiv2.className = 'tDiv2';
					var btnArrays = new Array();
					if (p.form) {
						btnArrays[btnArrays.length] = {
							name : "查找",
							bclass : 'searchBtn',
							onpress : function() {
								p.newp=1;
								g.populate();
							}
						};
					}
					if (p.add) {
						if (p.add.name == null) {
							p.add.name = "添加";
						}
						if (p.add.bclass == null) {
							p.add.bclass = "addBtn";
						}
						btnArrays[btnArrays.length] = {
							name : p.add.name,
							bclass : p.add.bclass,
							onpress : function() {
								add(p.add, g);
							}
						};
					}
					if (p.detail) {
						if (p.detail.name == null) {
							p.detail.name = "详情";
						}
						if (p.detail.bclass == null) {
							p.detail.bclass = "detailBtn";
						}
						btnArrays[btnArrays.length] = {
							name : p.detail.name,
							bclass : p.detail.bclass,
							onpress : function() {
								detail(p.detail, g);
							}
						};
					}
					if (p.edit) {
						if (p.edit.name == null) {
							p.edit.name = "编辑";
						}
						if (p.edit.bclass == null) {
							p.edit.bclass = "editBtn";
						}
						btnArrays[btnArrays.length] = {
							name : p.edit.name,
							bclass : p.edit.bclass,
							onpress : function() {
								edit(p.edit, g);
							}
						};
					}
					if (p.deletes) {
						if (p.deletes.name == null) {
							p.deletes.name = "删除";
						}
						if (p.deletes.bclass == null) {
							p.deletes.bclass = "deletesBtn";
						}
						btnArrays[btnArrays.length] = {
							name : p.deletes.name,
							bclass : p.deletes.bclass,
							onpress : function() {
								deletes(p.deletes, g);
							}
						};
					}
					
					if (p.exportExcel) {
						if (p.exportExcel.name == null) {
							p.exportExcel.name = "导出";
						}
						if (p.exportExcel.bclass == null) {
							p.exportExcel.bclass = "exportExcelBtn";
						}
						btnArrays[btnArrays.length] = {
							name : p.exportExcel.name,
							bclass : p.exportExcel.bclass,
							onpress : function() {
								exportExcel(p.exportExcel, g);
							}
						};
					}
				
					if (p.viewConfig) {
						if (p.viewConfig.name == null) {
							p.viewConfig.name = "表格定制";
						}
						btnArrays[btnArrays.length] = {
							name : p.viewConfig.name,
							bclass : 'viewConfigBtn',
							onpress : function() {
								if($(this).find("span").text()=='表格定制'){
									$(this).find("span").text('定制完成');
									$("div.hDiv table thead tr th div input.viewConfig").show();
									$("div.hDiv table thead tr th").not("[initHidden]").show();
									$("div.bDiv table tbody tr td").not("[initHidden]").show();
								}else{
									var param=[
									           {name:"time",value:new Date().getTime()},
									           {name:"page",value:p.viewConfig.page}
									           ];
									var input=$("div.hDiv table thead tr th div input.viewConfig:checked");
									for(var i=0;i<input.length;i++){
										param[param.length] = {
												name : "fields",
												value : input.eq(i).val()
											};
									}
									$.ajax( {
										type : 'post',
										url : p.viewConfig.updateUrl,
										data : param,
										dataType : 'json',
										success : function(json) {
										},
										error : function(XMLHttpRequest, json) {
										}
									});
									
									
									$(this).find("span").text('表格定制');
									$("div.hDiv table thead tr th").show();
									$("div.bDiv table tbody tr td").show();
									$("div.hDiv table thead tr th div input.viewConfig").not(":checked").each(function(){
										$("div.hDiv table thead tr th[abbr='"+$(this).val()+"']").hide();
										$("div.bDiv table tbody tr td[abbr='"+$(this).val()+"']").hide();
									});
									$("div.hDiv table thead tr th div input.viewConfig").hide();
									
								}
							}
						};
					}

					for ( var i = 0; p.buttons != null && i < p.buttons.length; i++) {
						if(!p.buttons[i].hide){
							btnArrays[btnArrays.length] = p.buttons[i];
						}
					}
					for ( var i = 0; i < btnArrays.length; i++) {
						var btn = btnArrays[i];
						if (!btn.separator) {
							var btnDiv = document.createElement('div');
							btnDiv.className = 'fbutton';
							btnDiv.innerHTML = "<div><span>" + btn.name
									+ "</span></div>";
							if (btn.bclass)
								$('span', btnDiv).addClass(btn.bclass).css( {
									paddingLeft : 20
								});
							btnDiv.onpress = btn.onpress;
							btnDiv.name = btn.name;
							if (btn.onpress) {
								$(btnDiv).click(function() {
									//this.onpress(this.name, g.gDiv);
									this.onpress(g);
								});
							}
							$(tDiv2).append(btnDiv);
							if ($.browser.msie && $.browser.version < 7.0) {
								$(btnDiv).hover(function() {
									$(this).addClass('fbOver');
								}, function() {
									$(this).removeClass('fbOver');
								});
							}
						} else {
							$(tDiv2).append("<div class='btnseparator'></div>");
						}
					}
					$(g.tDiv).append(tDiv2);
					if(p.likeValueSearch){
						if($(g.tDiv).find("input[name='pageBean.likeValue']").length==0){
							var likeValueInput=$("<input name='pageBean.likeValue' />");
							$(g.tDiv).append(likeValueInput);
							likeValueInput.keydown(function(e) {
								if (e.keyCode == 13) {
									g.doSearch();
								}
							});
						}
					}
					
					$(g.tDiv).append("<div style='clear:both'></div>");
					$(g.gDiv).prepend(g.tDiv);
				}
				g.hDiv.className = 'hDiv';
				$(t).before(g.hDiv);
				g.hTable.cellPadding = 0;
				g.hTable.cellSpacing = 0;
				$(g.hDiv).append('<div class="hDivBox"></div>');
				$('div', g.hDiv).append(g.hTable);
				var thead = $("thead:first", t).get(0);
				if (thead)
					$(g.hTable).append(thead);
				thead = null;
				if (!p.colmodel)
					var ci = 0;
				$('thead tr:first th', g.hDiv)
						.each(
								function() {
									var thdiv = document.createElement('div');
									if ($(this).attr('abbr')) {
										$(this).click(function(e) {
											if (!$(this).hasClass('thOver'))
												return false;
											var obj = (e.target || e.srcElement);
											if (obj.href || obj.type)
												return true;
											g.changeSort(this);
										});
										if ($(this).attr('abbr') == p.sortname) {
											this.className = 'sorted';
											thdiv.className = 's' + p.sortorder;
										}
									}
									if (this.hidden) {
										$(this).hide();
									}
									if (!p.colmodel) {
										$(this).attr('axis', 'col' + ci++);
									}
									$(thdiv).css( {
										textAlign : this.align,
										width : this.width + 'px'
									});
									thdiv.innerHTML = this.innerHTML;
									$(this)
											.empty()
											.append(thdiv)
											.removeAttr('width')
											.mousedown(function(e) {
												g.dragStart('colMove', e, this);
											})
											.hover(
													function() {
														if (!g.colresize
																&& !$(this).hasClass(
																		'thMove')
																&& !g.colCopy) {
															$(this).addClass('thOver');
														}
														if ($(this).attr('abbr') != p.sortname
																&& !g.colCopy
																&& !g.colresize
																&& $(this).attr('abbr')) {
															$('div', this).addClass(
																	's' + p.sortorder);
														} else if ($(this).attr('abbr') == p.sortname
																&& !g.colCopy
																&& !g.colresize
																&& $(this).attr('abbr')) {
															var no = (p.sortorder == 'asc') ? 'desc'
																	: 'asc';
															$('div', this).removeClass(
																	's' + p.sortorder)
																	.addClass('s' + no);
														}
														if (g.colCopy) {
															var n = $('th', g.hDiv)
																	.index(this);
															if (n == g.dcoln) {
																return false;
															}
															if (n < g.dcoln) {
																$(this).append(
																		g.cdropleft);
															} else {
																$(this).append(
																		g.cdropright);
															}
															g.dcolt = n;
														} else if (!g.colresize) {
															var nv = $('th:visible',
																	g.hDiv).index(this);
															var onl = parseInt($(
																	'div:eq(' + nv + ')',
																	g.cDrag)
																	.css('left'));
															var nw = jQuery(g.nBtn)
																	.outerWidth();
															var nl = onl
																	- nw
																	+ Math
																			.floor(p.cgwidth / 2);
															$(g.nDiv).hide();
															$(g.nBtn).hide();
															$(g.nBtn).css( {
																'left' : nl,
																top : g.hDiv.offsetTop
															}).show();
															var ndw = parseInt($(g.nDiv)
																	.width());
															$(g.nDiv).css( {
																top : g.bDiv.offsetTop
															});
															if ((nl + ndw) > $(g.gDiv)
																	.width()) {
																$(g.nDiv).css('left',
																		onl - ndw + 1);
															} else {
																$(g.nDiv).css('left',
																		nl);
															}
															if ($(this).hasClass(
																	'sorted')) {
																$(g.nBtn).addClass(
																		'srtd');
															} else {
																$(g.nBtn).removeClass(
																		'srtd');
															}
														}
													},
													function() {
														$(this).removeClass('thOver');
														if ($(this).attr('abbr') != p.sortname) {
															$('div', this).removeClass(
																	's' + p.sortorder);
														} else if ($(this).attr('abbr') == p.sortname) {
															var no = (p.sortorder == 'asc') ? 'desc'
																	: 'asc';
															$('div', this).addClass(
																	's' + p.sortorder)
																	.removeClass(
																			's' + no);
														}
														if (g.colCopy) {
															$(g.cdropleft).remove();
															$(g.cdropright).remove();
															g.dcolt = null;
														}
													}); // wrap content
								});
				// set bDiv
				g.bDiv.className = 'bDiv';
				$(t).before(g.bDiv);
				$(g.bDiv).css( {
					height : (p.height == 'auto') ? 'auto' : p.height + "px"
				}).scroll(function(e) {
					g.scroll()
				}).append(t);
				if (p.height == 'auto') {
					$('table', g.bDiv).addClass('autoht');
				}
				// add td & row properties
				g.addCellProp();
				g.addRowProp();
				// set cDrag
				var cdcol = $('thead tr:first th:first', g.hDiv).get(0);
				if (cdcol != null) {
					g.cDrag.className = 'cDrag';
					g.cdpad = 0;
					g.cdpad += (isNaN(parseInt($('div', cdcol).css('borderLeftWidth'))) ? 0
							: parseInt($('div', cdcol).css('borderLeftWidth')));
					g.cdpad += (isNaN(parseInt($('div', cdcol).css('borderRightWidth'))) ? 0
							: parseInt($('div', cdcol).css('borderRightWidth')));
					g.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingLeft'))) ? 0
							: parseInt($('div', cdcol).css('paddingLeft')));
					g.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingRight'))) ? 0
							: parseInt($('div', cdcol).css('paddingRight')));
					g.cdpad += (isNaN(parseInt($(cdcol).css('borderLeftWidth'))) ? 0
							: parseInt($(cdcol).css('borderLeftWidth')));
					g.cdpad += (isNaN(parseInt($(cdcol).css('borderRightWidth'))) ? 0
							: parseInt($(cdcol).css('borderRightWidth')));
					g.cdpad += (isNaN(parseInt($(cdcol).css('paddingLeft'))) ? 0
							: parseInt($(cdcol).css('paddingLeft')));
					g.cdpad += (isNaN(parseInt($(cdcol).css('paddingRight'))) ? 0
							: parseInt($(cdcol).css('paddingRight')));
					$(g.bDiv).before(g.cDrag);
					var cdheight = $(g.bDiv).height();
					var hdheight = $(g.hDiv).height();
					$(g.cDrag).css( {
						top : -hdheight + 'px'
					});
					$('thead tr:first th', g.hDiv).each(function() {
						var cgDiv = document.createElement('div');
						$(g.cDrag).append(cgDiv);
						if (!p.cgwidth) {
							p.cgwidth = $(cgDiv).width();
						}
						$(cgDiv).css( {
							height : cdheight + hdheight
						}).mousedown(function(e) {
							g.dragStart('colresize', e, this);
						});
						if ($.browser.msie && $.browser.version < 7.0) {
							g.fixHeight($(g.gDiv).height());
							$(cgDiv).hover(function() {
								g.fixHeight();
								$(this).addClass('dragging')
							}, function() {
								if (!g.colresize)
									$(this).removeClass('dragging')
							});
						}
					});
				}
				// add strip
				if (p.striped) {
					$('tbody tr:odd', g.bDiv).addClass('erow');
				}
				if (p.resizable && p.height != 'auto') {
					g.vDiv.className = 'vGrip';
					$(g.vDiv).mousedown(function(e) {
						g.dragStart('vresize', e)
					}).html('<span></span>');
					$(g.bDiv).after(g.vDiv);
				}
				if (p.resizable && p.width != 'auto' && !p.nohresize) {
					g.rDiv.className = 'hGrip';
					$(g.rDiv).mousedown(function(e) {
						g.dragStart('vresize', e, true);
					}).html('<span></span>').css('height', $(g.gDiv).height());
					if ($.browser.msie && $.browser.version < 7.0) {
						$(g.rDiv).hover(function() {
							$(this).addClass('hgOver');
						}, function() {
							$(this).removeClass('hgOver');
						});
					}
					$(g.gDiv).append(g.rDiv);
				}

				if (p.form) {

					// add search box
					g.sDiv.className = 'sDiv';
					$(g.sDiv).append(p.form);
					p.form.show();
					// Split into separate selectors because of bug in jQuery 1.3.2
					$('input', g.sDiv).keydown(function(e) {
						if (e.keyCode == 13) {
							p.newp=1;
							g.populate();
						}
					});
					$('select,:checkbox', g.sDiv).change(function(e) {
						p.newp=1;
						g.populate();
					});
					$(g.tDiv).after(g.sDiv);
				}
				// add pager
				if (p.usepager) {
					g.pDiv.className = 'pDiv';
					g.pDiv.innerHTML = '<div class="pDiv2"></div>';
					$(g.bDiv).after(g.pDiv);
					var html = ' <div class="pGroup"> <div class="pFirst pButton"><span></span></div><div class="pPrev pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pcontrol">'
							+ p.pagetext
							+ ' <input type="text" size="1" value="1" />页 '
							+ p.outof
							+ ' <span> 1 </span>页</span></div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pNext pButton"><span></span></div><div class="pLast pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>';
					$('div', g.pDiv).html(html);
					$('.pReload', g.pDiv).click(function() {
						g.populate()
					});
					$('.pFirst', g.pDiv).click(function() {
						g.changePage('first')
					});
					$('.pPrev', g.pDiv).click(function() {
						g.changePage('prev')
					});
					$('.pNext', g.pDiv).click(function() {
						g.changePage('next')
					});
					$('.pLast', g.pDiv).click(function() {
						g.changePage('last')
					});
					$('.pcontrol input', g.pDiv).keydown(function(e) {
						if (e.keyCode == 13)
							g.changePage('input')
					});
					if ($.browser.msie && $.browser.version < 7)
						$('.pButton', g.pDiv).hover(function() {
							$(this).addClass('pBtnOver');
						}, function() {
							$(this).removeClass('pBtnOver');
						});
					if (p.useRp) {
						var opt = '', sel = '';
						for ( var nx = 0; nx < p.rpOptions.length; nx++) {
							if (p.rp == p.rpOptions[nx])
								sel = 'selected="selected"';
							else
								sel = '';
							opt += "<option value='" + p.rpOptions[nx] + "' " + sel
									+ " >" + p.rpOptions[nx] + "&nbsp;&nbsp;</option>";
						}
						$('.pDiv2', g.pDiv)
								.prepend(
										"<div class='pGroup'>每页<select name='rp'>"
												+ opt
												+ "</select>条</div> <div class='btnseparator'></div>");
						$('select', g.pDiv).change(function() {
							if (p.onRpChange) {
								p.onRpChange(+this.value);
							} else {
								p.newp = 1;
								p.rp = +this.value;
								g.populate();
							}
						});
					}
				}
				$(g.pDiv, g.sDiv).append("<div style='clear:both'></div>");
				$(g.sDiv).width(p.width-2);
				$(g.sDiv).show();
				// add title
				if (p.title) {
					g.mDiv.className = 'mDiv';
					g.mDiv.innerHTML = '<div class="ftitle">' + p.title + '</div>';
					$(g.gDiv).prepend(g.mDiv);
					if (p.showTableToggleBtn) {
						$(g.mDiv)
								.append(
										'<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');
						$('div.ptogtitle', g.mDiv).click(function() {
							$(g.gDiv).toggleClass('hideBody');
							$(this).toggleClass('vsble');
						});
					}
				}
				// setup cdrops
				g.cdropleft = document.createElement('span');
				g.cdropleft.className = 'cdropleft';
				g.cdropright = document.createElement('span');
				g.cdropright.className = 'cdropright';
				// add block
				g.block.className = 'gBlock';
				var gh = $(g.bDiv).height();
				var gtop = g.bDiv.offsetTop;
				$(g.block).css( {
					width : g.bDiv.style.width,
					height : gh,
					background : 'white',
					position : 'relative',
					marginBottom : (gh * -1),
					zIndex : 0,
					top : gtop,
					left : '0px'
				});
				$(g.block).fadeTo(0, p.blockOpacity);
				// add column control
				if ($('th', g.hDiv).length) {
					g.nDiv.className = 'nDiv';
					g.nDiv.innerHTML = "<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";
					$(g.nDiv).css( {
						marginBottom : (gh * -1),
						display : 'none',
						top : gtop
					}).noSelect();
					var cn = 0;
					$('th div', g.hDiv).each(
							function() {
								var kcol = $("th[axis='col" + cn + "']", g.hDiv)[0];
								var chk = 'checked="checked"';
								if (kcol.style.display == 'none') {
									chk = '';
								}
								$('tbody', g.nDiv).append(
										'<tr><td class="ndcol1"><input type="checkbox" '
												+ chk + ' class="togCol" value="' + cn
												+ '" /></td><td class="ndcol2">'
												+ this.innerHTML + '</td></tr>');
								cn++;
							});
					if ($.browser.msie && $.browser.version < 7.0)
						$('tr', g.nDiv).hover(function() {
							$(this).addClass('ndcolover');
						}, function() {
							$(this).removeClass('ndcolover');
						});
					$('td.ndcol2', g.nDiv).click(
							function() {
								if ($('input:checked', g.nDiv).length <= p.minColToggle
										&& $(this).prev().find('input')[0].checked)
									return false;
								return g.toggleCol($(this).prev().find('input').val());
							});
					$('input.togCol', g.nDiv).click(
							function() {
								if ($('input:checked', g.nDiv).length < p.minColToggle
										&& this.checked == false)
									return false;
								$(this).parent().next().trigger('click');
							});
					$(g.gDiv).prepend(g.nDiv);
					$(g.nBtn).addClass('nBtn').html('<div></div>').attr('title',
							'Hide/Show Columns').click(function() {
						$(g.nDiv).toggle();
						return true;
					});
					if (p.showToggleBtn) {
						$(g.gDiv).prepend(g.nBtn);
					}
				}
				// add date edit layer
				$(g.iDiv).addClass('iDiv').css( {
					display : 'none'
				});
				$(g.bDiv).append(g.iDiv);
				// add flexigrid events
				$(g.bDiv).hover(function() {
					$(g.nDiv).hide();
					$(g.nBtn).hide();
				}, function() {
					if (g.multisel) {
						g.multisel = false;
					}
				});
				$(g.gDiv).hover(function() {
				}, function() {
					$(g.nDiv).hide();
					$(g.nBtn).hide();
				});
				// add document events
				$(document).mousemove(function(e) {
					g.dragMove(e)
				}).mouseup(function(e) {
					g.dragEnd()
				}).hover(function() {
				}, function() {
					g.dragEnd()
				});
				// browser adjustments
				if ($.browser.msie && $.browser.version < 7.0) {
					$('.hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv', g.gDiv).css( {
						width : '100%'
					});
					$(g.gDiv).addClass('ie6');
					if (p.width != 'auto') {
						$(g.gDiv).addClass('ie6fullwidthbug');
					}
				}
				g.rePosDrag();
				g.fixHeight();
				// make grid functions accessible
				t.p = p;
				t.grid = g;
				// load data
				if (p.url && p.autoload) {
					g.populate();
				}
//				alert(documentHeight+","+$(".mDiv").height()+","+$(".tDiv").height()+","+$(".sDiv").height()+","+$(".hDiv").height()+","+$(".bDiv").height()+","+$(".pDiv").height());
				return t;
			},
			loadView : function(callBack){
				var param=[{name:"time",value:new Date().getTime()},{name:"page",value:p.viewConfig.page}];
				$.ajax( {
					type : 'post',
					url : p.viewConfig.loadUrl,
					data : param,
					dataType : 'json',
					success : function(json) {
						if(json.rows.length==0){
							for(var j=0;j<p.colModel.length;j++){
								p.colModel[j].viewConfig=true;
							}
						}
						for(var i=0;i<json.rows.length;i++){
							for(var j=0;j<p.colModel.length;j++){
								if(p.colModel[j].name==json.rows[i].field){
									p.colModel[j].viewConfig=true;
								}
							}
						}
						callBack();
					},
					error : function(XMLHttpRequest, json) {
						callBack();
					}
				});
			},
			pager : 0
		};
		

		if(p.viewConfig){
			g.loadView(function(){
				g.init();
			});
		}else{
			g.init();
		}
		
		
	};
	var docloaded = false;
	$(document).ready(function() {
		docloaded = true
	});
	$.fn.flexigrid = function(p) {
		return this.each(function() {
			if (!docloaded) {
				$(this).hide();
				var t = this;
				$(document).ready(function() {
					$.addFlex(t, p);
				});
			} else {
				$.addFlex(this, p);
			}
		});
	}; // end flexigrid
	$.fn.flexReload = function(p) { // function to reload grid
		return this.each(function() {
			if (this.grid && this.p.url)
				this.grid.populate();
		});
	}; // end flexReload
	$.fn.flexOptions = function(p) { // function to update general options
		return this.each(function() {
			if (this.grid)
				$.extend(this.p, p);
		});
	}; // end flexOptions
	$.fn.flexToggleCol = function(cid, visible) { // function to reload grid
		return this.each(function() {
			if (this.grid)
				this.grid.toggleCol(cid, visible);
		});
	}; // end flexToggleCol
	$.fn.flexAddData = function(data) { // function to add data to grid
		return this.each(function() {
			if (this.grid)
				this.grid.addData(data);
		});
	};
	$.fn.noSelect = function(p) { // no select plugin by me :-)
		var prevent = (p == null) ? true : p;
		if (prevent) {
			return this.each(function() {
				if ($.browser.msie || $.browser.safari)
					$(this).bind('selectstart', function() {
						return false;
					});
				else if ($.browser.mozilla) {
					$(this).css('MozUserSelect', 'none');
					$('body').trigger('focus');
				} else if ($.browser.opera)
					$(this).bind('mousedown', function() {
						return false;
					});
				else
					$(this).attr('unselectable', 'on');
			});
		} else {
			return this.each(function() {
				if ($.browser.msie || $.browser.safari)
					$(this).unbind('selectstart');
				else if ($.browser.mozilla)
					$(this).css('MozUserSelect', 'inherit');
				else if ($.browser.opera)
					$(this).unbind('mousedown');
				else
					$(this).removeAttr('unselectable', 'on');
			});
		}
	}; // end noSelect
})(jQuery);







$(document).ready(function(){
	$("form").filter(function(){
		if($(this).attr("class")!="notJson"){
			$(this).attr("method","post");
			return true;
		}
		return false;
	}).submit(function(){
		return false;
	});
});
/**
 * 新增
 * @param jsonObj
 * @param g
 * @return
 */
function add(jsonObj, g) {
	jsonObj = $.extend( {
		dialogName:false,
		url : false,
		width : false,
		height : false,
		primaryKey : false,
		before : function() {
			return true
		},
		success : function(json){
			return true;
		},
		error : function(json){
			return false;
		}
	}, jsonObj);
	if (!jsonObj.before.apply(this,[jsonObj])) {
		return false;
	}
	var url = jsonObj.url;
	if (url.indexOf("?") > 0) {
		url = url + "&time=" + new Date().getTime();
	} else {
		url = url + "?time=" + new Date().getTime();
	}
	window.dialogName=window.parent.addTab({href:url,title:(jsonObj.dialogName?jsonObj.dialogName:jsonObj.name),closeCallBack:function(param){
		if(param&&param.result=="true"){
			jsonObj.success();
			$(".listTable").flexReload( {});
		}else{
			jsonObj.error();
		}
	}});
//	window.parent.removeTab({name:window.dialogName,callBackParam:true});
//	var result = window.showModalDialog(url, window, "dialogWidth="+ jsonObj.width + "px;dialogHeight=" + jsonObj.height + "px");
//	if(result=='none'){
//		result=window.returnValue;
//	}
//	if (result == 'none') {
//
//	} else if (result == 'error') {
//		jsonObj.error();
//	} else {
//		jsonObj.success();
//		$(".listTable").flexReload( {});
//	}
}
function detail(jsonObj, g) {
	var tr = $(g.bDiv).find("tr.trSelected");
	jsonObj = $.extend( {
		dialogName:false,
		url : false,
		width : false,
		height : false,
		primaryKey : false,
		before : function() {
			return true
		},
		success : function(json){
			return true;
		},
		error : function(json){
			return false;
		}
	}, jsonObj);
	if (!jsonObj.before.apply(tr,[jsonObj])) {
		return false;
	}
	if (tr.length == 1) {
		var url = jsonObj.url;
		if (url.indexOf("?") > 0) {
			url = url + "&" + jsonObj.primaryKey + "=" + tr.attr("PRIMARYKEY")
					+ "&time=" + new Date().getTime();
		} else {
			url = url + "?" + jsonObj.primaryKey + "=" + tr.attr("PRIMARYKEY")
					+ "&time=" + new Date().getTime();
		}

		window.dialogName=window.parent.addTab({href:url,title:(jsonObj.dialogName?jsonObj.dialogName:jsonObj.name),closeCallBack:function(param){
			if(param&&param.result=="true"){
				jsonObj.success();
				$(".listTable").flexReload( {});
			}else{
				jsonObj.error();
			}
		}});
		
//		var result = window.showModalDialog(url, window, "dialogWidth="
//				+ jsonObj.width + "px;dialogHeight=" + jsonObj.height + "px");
//		if(result=='none'){
//			result=window.returnValue;
//		}
//		if (result == 'none') {
//
//		} else if (result == 'error') {
//			jsonObj.error();
//		} else {
//			jsonObj.success();
//			$(".listTable").flexReload( {});
//		}
	} else if (tr.length > 1) {
		jAlert("暂不支持多行详情,请选择单行查看!");
	} else {
		jAlert("请选择你要操作的记录!");
	}

}
function edit(jsonObj, g) {
	var tr = $(g.bDiv).find("tr.trSelected");
	jsonObj = $.extend( {
		dialogName:false,
		url : false,
		width : false,
		height : false,
		primaryKey : false,
		before : function() {
			return true
		},
		success : function(json){
			return true;
		},
		error : function(json){
			return false;
		}
	}, jsonObj);
	if (!jsonObj.before.apply(tr,[jsonObj])) {
		return false;
	}
	if (tr.length == 1) {
		var url = jsonObj.url;
		if (url.indexOf("?") > 0) {
			url = url + "&" + jsonObj.primaryKey + "=" + tr.attr("PRIMARYKEY")
					+ "&time=" + new Date().getTime();
		} else {
			url = url + "?" + jsonObj.primaryKey + "=" + tr.attr("PRIMARYKEY")
					+ "&time=" + new Date().getTime();
		}
		
		window.dialogName=window.parent.addTab({href:url,title:(jsonObj.dialogName?jsonObj.dialogName:jsonObj.name),closeCallBack:function(param){
			if(param&&param.result=="true"){
				jsonObj.success();
				$(".listTable").flexReload( {});
			}else{
				jsonObj.error();
			}
		}});
//		var result = window.showModalDialog(url, window, "dialogWidth="
//				+ jsonObj.width + "px;dialogHeight=" + jsonObj.height + "px");
//		if(result=='none'){
//			result=window.returnValue;
//		}
//		if (result == 'none') {
//
//		} else if (result == 'error') {
//			jsonObj.error();
//		} else {
//			jsonObj.success();
//			$(".listTable").flexReload( {});
//		}
	} else if (tr.length > 1) {
		jAlert("暂不支持编辑多行,请选择单行编辑!");
	} else {
		jAlert("请选择你要操作的记录!");
	}

}
function deletes(jsonObj, g) {
	var tr = $(g.bDiv).find("tr.trSelected");
	jsonObj = $.extend( {
		url : false,
		width : false,
		height : false,
		primaryKey : false,
		before : function() {
			return true
		},
		success : function(json){
			return true;
		},
		error : function(json){
			return false;
		}
	}, jsonObj);
	if (!jsonObj.before.apply(tr,[jsonObj])) {
		return false;
	}
	if (tr.length > 0) {
		jConfirm("是否确定删除条" + tr.length + "记录", "警告信息", function(r) {
			if (r) {
				var url = jsonObj.url;
				if (url.indexOf("?") > 0) {
					url += "&time=" + new Date().getTime();
				} else {
					url += "?time=" + new Date().getTime();
				}
				$(g.bDiv).find("tr.trSelected").each(
						function() {
							url += "&" + jsonObj.primaryKey + "="
									+ $(this).attr("PRIMARYKEY");
						});
				$.ajax( {
					type : 'post',
					url : url,
					dataType : 'json',
					success : function(json) {
	
						jsonObj.success(json);
						$(".listTable").flexReload( {});
					},
					error : function(XMLHttpRequest, json) {
						jsonObj.error(json);
						$(".listTable").flexReload( {});
					}
				});
			}
		});
	}else{
		jAlert("请选择你要操作的记录!");
	}
}
function exportExcel(jsonObj, g) {
	var oXL = new ActiveXObject("Excel.Application");
	// 创建AX对象excel
	var oWB = oXL.Workbooks.Add();
	// 获取workbook对象
	var oSheet = oWB.ActiveSheet;
	// 激活当前sheet
	$(g.hDiv).find("tr").each(function(rowIndex){
		$(this).find("th div").each(function(cellIndex){
			oSheet.Cells(rowIndex + 1, cellIndex + 1).value = $(this).text()+"";
		});
	});
	$(g.bDiv).find("tr.trSelected").each(function(rowIndex){
		$(this).find("td div").each(function(cellIndex){
			oSheet.Cells(rowIndex + 2, cellIndex + 1).FormulaR1C1="常规";
			oSheet.Cells(rowIndex + 2, cellIndex + 1).value = $(this).text()+"";
		});
	});
	oXL.Visible = true;
	// 设置excel可见属性
}
function executeRow(jsonObj,g) {
	var tr = $("tr.trSelected");
	jsonObj = $.extend( {
		dialogName:false,
		url : false,
		width : false,
		height : false,
		primaryKey : false,
		ajax:false,
		before : function() {
			return true
		},
		success : function(json){
			alert(json.resultBean.message);
			return true;
		},
		error : function(json){
			alert(json.resultBean.message);
			return false;
		}
	}, jsonObj);
	if (!jsonObj.before.apply(tr,[jsonObj])) {
		return false;
	}
	if (tr.length == 1) {
		var url = jsonObj.url;
		if (url.indexOf("?") > 0) {
			url = url + "&" + jsonObj.primaryKey + "=" + tr.attr("PRIMARYKEY")
					+ "&time=" + new Date().getTime();
		} else {
			url = url + "?" + jsonObj.primaryKey + "=" + tr.attr("PRIMARYKEY")
					+ "&time=" + new Date().getTime();
		}
		if(jsonObj.ajax){
			$.get(url,{},function(json){
				//if(){}else{}
				$(".listTable").flexReload({});
			},"json");
		}else{
			
			window.dialogName=window.parent.addTab({href:url,title:(jsonObj.dialogName?jsonObj.dialogName:jsonObj.name),closeCallBack:function(param){
				if(param&&param.result=="true"){
					jsonObj.success();
					$(".listTable").flexReload( {});
				}else{
					jsonObj.error();
				}
			}});
			
//			var result = window.showModalDialog(url, window, "dialogWidth="
//					+ jsonObj.width + "px;dialogHeight=" + jsonObj.height + "px");
//			if(result=='none'){
//				result=window.returnValue;
//			}
//			if (result == 'none') {
//	
//			} else if (result == 'error') {
//				jsonObj.error();
//			} else {
//				jsonObj.success();
//				$(".listTable").flexReload( {});
//			}
		}
	} else if (tr.length > 1) {
		jAlert("该操作暂不支持操作多行,请选择单行操作!");
	} else {
		jAlert("请选择你要操作的记录!");
	}

}
function executeRows(jsonObj) {
	var tr = $("tr.trSelected");
	jsonObj = $.extend( {
		dialogName:false,
		url : false,
		width : false,
		height : false,
		primaryKey : false,
		ajax:false,
		before : function() {
			return true
		},
		success : function(json){
			alert(json.resultBean.message);
			return true;
		},
		error : function(json){
			alert(json.resultBean.message);
			return false;
		}
	}, jsonObj);
	if (!jsonObj.before.apply(tr,[jsonObj])) {
		return false;
	}
	if (tr.length > 0) {
		var url = jsonObj.url;
		if (url.indexOf("?") > 0) {
			url += "&time=" + new Date().getTime();
		} else {
			url += "?time=" + new Date().getTime();
		}
		tr.each(function() {
			url += "&" + jsonObj.primaryKey + "=" + $(this).attr("PRIMARYKEY");
		});
		if(jsonObj.ajax){
			$.get(url,{},function(json){
				//if(){}else{}
				$(".listTable").flexReload({});
			},"json");
		}else{
			
			window.dialogName=window.parent.addTab({href:url,title:(jsonObj.dialogName?jsonObj.dialogName:jsonObj.name),closeCallBack:function(param){
				if(param&&param.result=="true"){
					jsonObj.success();
					$(".listTable").flexReload( {});
				}else{
					jsonObj.error();
				}
			}});
			
//			var result = window.showModalDialog(url, window, "dialogWidth="
//					+ jsonObj.width + "px;dialogHeight=" + jsonObj.height + "px");
//			if(result=='none'){
//				result=window.returnValue;
//			}
//			if (result == 'none') {
//
//			} else if (result == 'error') {
//				jsonObj.error();
//			} else {
//				jsonObj.success();
//				$(".listTable").flexReload( {});
//			}
		}
	} else {
		jAlert("请选择你要操作的记录!");
	}

}
function checkAllOrNot(obj) {

	var isAll = $(obj).attr("alt") == "all";
	var ischeck = $(obj).attr("checked");
	var tr = $(obj).parent().parent().parent();
	if (isAll) {
		if(ischeck){
			$(obj).parent().parent().parent().parent().parent().parent().parent().parent().find(":checkbox").attr("checked", ischeck);
		}else{
			$(obj).parent().parent().parent().parent().parent().parent().parent().parent().find(":checkbox").removeAttr("checked");
		}
		tr = $(obj).parent().parent().parent().parent().parent().parent()
				.parent().parent().find("div.bDiv table tbody tr");
	}
	if (ischeck) {
		tr.addClass("trSelected");
	} else {
		tr.removeClass("trSelected");
	}

}
/**
 * 转换为浮点数
 * @param str 待转换的数据
 * @param size 保留的小数位
 * @return
 */
function parseDoubleStr(str,size){
	var value=parseFloat(str);
	var count=1;
	if(size==null){
		size=3;
	}
	for(var i=0;i<size;i++){
		count=count*10;
	}
	return Math.round(value * count) / count;
//	return value.toPrecision(size);
}

/**
 * 浮点数格式化
 * @param str 待转换的数据
 * @param size 保留的小数位
 * @return
 */
function doubleFormat(str,length){
	if(length==null){
		length=3;
	}
	var value=parseFloat(str);
	if(value==null||value+""=="NaN"){
		return str;
	}
	var count=1;
	for(var i=0;i<length;i++){
		count=count*10;
	}
	var val=Math.round(value * count) / count+"";
	if(val!="NaN"&&length>0){
		if(val.indexOf('.')<0){
			val+=".";
		}
		while(val.substring(val.indexOf('.')).length<=length){
			val+="0";
		}
	}
	return val;
}