(function(undefined){
	angular
		.module("lmApp", ["ngMaterial", "ngMessages", "checkModule", "photoModule"])
	    
	    .config(["$httpProvider", "$mdDateLocaleProvider", function($httpProvider, $mdDateLocaleProvider){
	    	//HTTP请求拦截器
	    	$httpProvider.interceptors.push("httpInterceptor");

	    	//时间面板参数设置
	    	$mdDateLocaleProvider.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	        $mdDateLocaleProvider.shortMonths = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	        $mdDateLocaleProvider.days = ["星期日", "星期一", "星期二", "星期三", "星期三", "星期四", "星期五", "星期六"];
	        $mdDateLocaleProvider.shortDays = ["日", "一", "二", "三", "四", "五", "六"];
	        $mdDateLocaleProvider.firstDayOfWeek = 1;
		    $mdDateLocaleProvider.formatDate = function(date) {
		    	var m = moment(date);
		    	return m.isValid() ? m.format('L') : '';
		    };
	    }])

	    .run(["$rootScope", "getRequest", "pageService", function ($rootScope, getRequest, pageService) {
	    	var type = getRequest.param("type");
	    	$rootScope.id = getRequest.param("id");

	    	pageService.init(type);
	    	$rootScope.pageType = pageService.getType();
	    	$rootScope.pageTitle = pageService.getTitle();
	    	$rootScope.isDetail = pageService.isDetail();

	    }])

		.constant("REQUEST_CNT", 0)

		.factory("httpInterceptor", ["$rootScope", "$q", "REQUEST_CNT", "loadingService", 
			function($rootScope, $q, REQUEST_CNT, loadingService){
			    function _requestReduce(param){
			        if(!/.*\.(html|css|js)$/ig.test(param.config.url)){
			            REQUEST_CNT--;
			            if(0 == REQUEST_CNT){
			                loadingService.hide();
			            }
			        }
			    }
			    
			    return {
			        request: function(config){
			        //do something on request success
			            if(!/.*\.(html|css|js)$/ig.test(config.url)){
			                config.url = encodeURI(config.url);//兼容ieurl不转码，导致传入后台带中文参数的url乱码
			                REQUEST_CNT++;
			                if(config.url.indexOf("?") != -1){
			                    config.url += "&_=" + new Date().getTime();
			                }else{
			                    config.url += "?_=" + new Date().getTime();
			                }
			                loadingService.show();
			            }
			            return config;
			        },
			        requestError: function(rejection){
			        //do something on request error
			            _requestReduce(rejection);
			            return $q.reject(rejection);
			        },
			        response: function(response){
			        //do something on response success
			            _requestReduce(response);
			            return response;
			        },
			        responseError: function(rejection){
			        //do something on response error
			            _requestReduce(rejection);
			            return $q.reject(rejection);
			        }
			    };
			}
		])

		.factory("httpService", ["$http", "$q", "$log",
		    function($http, $q, $log){
		        function HttpService(){}

		        HttpService.prototype.request = function(configs){
		            var deferred = $q.defer();

	                $http(configs).then(function(response){
	                    if("200" == response.data.code){
	                        deferred.resolve(response.data);
	                    }else{
	                        response.data.message = response.data.message || "系统错误, 请稍后重试...";
	                        $log.error(response.status+":"+response.statusText+" "+response.data.message);
	                        deferred.reject(response.data);
	                    }
	                }, function(response){
	                    response.message = "系统错误，请稍后重试...";
	                    $log.error(response.status+":"+response.statusText+" "+response.message);
	                    deferred.reject(response);
	                });

		            return deferred.promise;
		        };

		        HttpService.prototype.get = function(url, queryParams, configs){
		            return this.request(angular.extend({}, {
		                url: url,
		                method: "GET",
		                params: queryParams
		            }, configs));
		        };

		        HttpService.prototype.post = function(url, data, configs){
		            return this.request(angular.extend({}, {
		                url: url,
		                method: "POST",
		                data: data
		            }, configs));
		        };

		        return new HttpService();
		    }
		])

		.factory("loadingService", function(){
			function LoadingService(){};

			LoadingService.prototype.show = function() {
				angular.element(window.parent.document.querySelector(".fillDiv")).attr("display","block");
			};

			LoadingService.prototype.hide = function(){
				angular.element(window.parent.document.querySelector(".fillDiv")).attr("display","none");
			};

			return new LoadingService();
		})

		.factory("lmToastHelper", ["$mdToast", function ($mdToast) {
	        function ToastHelper () {}

	        // Toast方式展示提示信息
	        ToastHelper.prototype.alert = function (text, position, duration) {
	            position = position ? position : 'top right'; // 默认在右上角显示
	            duration = duration ? duration : 2000; // 默认显示2秒
	            return $mdToast.show(                
	            	$mdToast.simple()
	                .toastClass("fixed")
	                .textContent(text)
	                .position(position)
	                .hideDelay(duration)
	            );
	        };

	        return new ToastHelper();
	    }])

	    .factory("trustService", ["$sce", function ($sce) {
	        function TrustService () {}

	        TrustService.prototype.html = function (value) {
	        	return $sce.trustAsHtml(value);	 
	        };

	        TrustService.prototype.url = function (value) {
	        	return $sce.trustAsUrl(value);	 
	        };

	        TrustService.prototype.resourceUrl = function (value) {
	        	return $sce.trustAsResourceUrl(value);	 
	        };

	        TrustService.prototype.js = function (value) {
	        	return $sce.trustAsJs(value);	 
	        };

	        return new TrustService();
	    }])

		.factory("pageService", function(){
			function PageService(){
				this.pageType = null;
				this.pageTitle = "添加";
				this.detailFlag = false;
			}

			PageService.prototype.init = function (type) {
				this.pageType = type;
				this.detailFlag = false;
				switch(type){
					case "detail":
						this.pageTitle = "详情";
						this.detailFlag = true;
						break;
					case "edit":
						this.pageTitle = "编辑";
						break;
					default:
						this.pageTitle = "添加";
				}
			};

			PageService.prototype.getType = function () {
				return this.pageType;	
			};

			PageService.prototype.getTitle = function() {
				return this.pageTitle;
			};

			PageService.prototype.isDetail = function() {
				return this.detailFlag;
			};

			return new PageService();
		})

		.factory("removeTab", function(){
			function RemoveTab(){}

			RemoveTab.prototype.do = function(json){
				window.top.removeTab({
					index: document.body.attributes["framework"].nodeValue,
					callBackParam: json
				});
			};

			return new RemoveTab();
		})

		.factory("getRequest", function(){
			function GetRequest(){}

			GetRequest.prototype.param = function (name) {
				var url = window.location.search;
				if(url.indexOf("?") != -1){
					url = url.substr(1);
					var strs = url.split("&");
					for(var i=0; i<strs.length; i++) {
						if(name == strs[i].split("=")[0]){
							return strs[i].split("=")[1];
						}
				    }
				}
				return null;
			};

			return new GetRequest();
		})

	    .factory("uploadCheck", ["lmToastHelper", function(lmToastHelper){
	    	function UploadCheck(){}

	    	UploadCheck.prototype.image = function(fileList){
	    		for(var i=0; i<fileList.length; i++){
	    			if(-1 == fileList[i].type.indexOf("image")){
	                   lmToastHelper.alert("请选择一张图片");
	                    return false;
	                }
	                if(fileList[i].size>500*1024){
	                    lmToastHelper.alert("请你选择一张小于500K的图片");
	                    return false;
	                }
	    		}
				return true;
	    	};

	    	UploadCheck.prototype.video = function(fileList){
	    		for(var i=0; i<fileList.length; i++){
	    			if(-1 == fileList[i].type.indexOf("video")){
	                   lmToastHelper.alert("请选择一个视频");
	                    return false;
	                }
	                if(fileList[i].size>200*1024*1024){
	                    lmToastHelper.alert("请你选择一张小于200M的视频");
	                    return false;
	                }
	    		}
				return true;
	    	};

	    	return new UploadCheck();
	    }])

	    .factory("shiftLoading", function(){
	    	function ShiftLoading(){}

	    	ShiftLoading.prototype.shift = function(id){
	    		var select  = document.getElementById(id);
	            var content = document.querySelector("md-progress-linear");
	            angular.element(select).after(content);
	    	};

	    	return new ShiftLoading();
	    })

	    .factory("computedStyle", function(){
	    	function ComputedStyle(){}

	    	ComputedStyle.prototype.get = function(oElem, attr){
			    attr = attr.replace(/([A-Z])/g, "-$1").toLowerCase();
				if(oElem.currentStyle){
				//IE、Opera
					return oElem.currentStyle[attr];
				}else if(document.defaultView && document.defaultView.getComputedStyle){
				//FireFox、Chrome、Safari
					return document.defaultView.getComputedStyle(oElem, null)[attr];
				}
	    	};

	    	return new ComputedStyle();
	    })

		.filter("to_trusted", ["$sce", function($sce){
		    return function(text){
		        return $sce.trustAsHtml(text);
		    }
		}])

		.directive("uploadSection", function(){
			return {
	            restrict: "AE",
	            scope: {
	                name: "@wsName",
	                size: "@wsSize",
	                text: "@wsText",
	                multiple: "=wsMultiple",
	                disabled: "=upDisabled",
	                options: "=wsOptions",
	                icon: "@wsIcon",
	                id: "@wsId"
	            },
	            template:
	                '<md-button type="button" class="md-primary md-raised" ng-disabled="disabled">\
	                    <i class="material-icons">{{icon}}</i>\
	                    {{text}}\
	                    <input type="file" size="{{size}}" _name="{{name}}" _text="{{text}}" id="{{id}}" ng-disabled="disabled">\
	                </md-button>',
	            link: function (scope, element, attrs) {
	                var fileInput = angular.element(element).find("input");
	                scope.text = scope.text ? scope.text : "上传";
	                scope.icon = scope.icon ? scope.icon : "backup";
	                if(scope.multiple){
	                    fileInput.attr("multiple", "multiple");
	                }
	                scope.options.fileInput = fileInput[0];

	                init();

	                function init(){
	                	var _param = {
			        		url: "",  //上传接口
			        		dataType: "json",  //数据类型【返回的数据】
			        		fileInput: null,  //file input
			        		before: function(fileList){ return true; },  //文件上传前，一般用用来处理验证
			        		uploading: function(progress){},
			        		callBack: function(result){}
			        	};
			        	angular.forEach(_param, function(value, key){
			        		if("undefined" == typeof scope.options[key]){
			        			scope.options[key] = value;
			        		}
			        	});
			            angular.element(scope.options.fileInput).bind("change", function(){
			                if(scope.options.before && scope.options.before.call(scope.options.fileInput, scope.options.fileInput.files)){
			                    xhr();
			                }
			            });
	                }

	                function xhr(){
			           	angular.element(scope.options.fileInput).attr("disabled", "disabled");
			            angular.element(scope.options.fileInput).parent().attr("disabled", "disabled");

			            if(typeof XDomainRequest != "undefined"){
			                var xhr = new XDomainRequest();
			            }else{
			                var xhr = new XMLHttpRequest();
			            }

			            xhr.onreadystatechange = function(){
			                if (4 == xhr.readyState) {
			                //成功处理
			                    scope.options.fileInput.value = null; // 清除文件框的值，使重复上传
			                    var result = xhr.responseText;
			                    if(200 == xhr.status){
			                        if(scope.options.dataType && "json" == scope.options.dataType){
			                            result = JSON.parse(result);
			                        }
			                    }

			                    angular.element(scope.options.fileInput).removeAttr("disabled");
			                    angular.element(scope.options.fileInput).parent().removeAttr("disabled");

			                    if(scope.options.callBack){
			                        scope.options.callBack.call(scope.options.fileInput, result);
			                    }
			                }
			            };

			            xhr.upload.onprogress = function(event){
			                var progressValue = Math.floor(100 * event.loaded / event.total); 
			                if(scope.options.uploading){
			                    scope.options.uploading.call(scope.options.fileInput, progressValue);
			                }
			            };

			            var formData = new FormData();
			            angular.forEach(scope.options.fileInput.files, function(value){
			                formData.append(scope.options.fileInput.getAttribute("_name"), value);
			            });

			            xhr.open("POST", scope.options.url, true);
			            xhr.send(formData);
			        }

	                scope.$on("$destroy", function(){
	                    delete scope.name;
	                    delete scope.size;
	                    delete scope.multiple;
	                    delete scope.options;
	                    delete scope.upDisabled;
	                });
	            }
	        };
		})

		.directive("numberTrust", function(){
			return {
	            restrict: "A",
	            require: "ngModel",
		        link: function(scope, element, attrs, ngModel){
		            if(!ngModel) { return false };
		            ngModel.$formatters.push(function(value) {
		            	return Number(value);
			     	});
		        }
	        };
		})

		.directive("imgResponsive", ["computedStyle", function(computedStyle){
			return {
				restrict: "A",
				link: function(scope, element, attrs){
					angular.element(element).bind("load", function(){
						var pNode = this.parentNode,
							nature = {
								width: this.naturalWidth,
								height: this.naturalHeight
							},
						    refer = {
								width: parseFloat(computedStyle.get(pNode, "width")),
								height: parseFloat(computedStyle.get(pNode, "height")),
							},
							width = null,
							height = null,
							x_per = null,
							y_per = null,
							per = null;

						x_per = nature.width/refer.width;
						y_per = nature.height/refer.height;

						if(x_per > 1 || y_per > 1){
						//原图尺寸大于屏幕，需要缩小
							per = x_per > y_per ? x_per : y_per;
							width = nature.width/per;
							height = nature.height/per;
						}else{
							width = nature.width;
							height = nature.height;
						}
						this.style.width = (width/refer.width*100).toFixed(5)+"%";
					});
				}
			}
		}])

		.constant("baseParam", {
			basePathB: "https://g.zpmgo.com/",
			basePathC: "https://c.zpmgo.com/",
			uploadBase: "https://file.zpmgo.com/api/upload/lm",
			downloadBase: "https://file.zpmgo.com/api/download/lm/",
			uploadBaseC: "https://c.zpmgo.com/api/security/upload/"
		})
	;


	/* ========================================================================
	 * 校验
	 * 
	 * ======================================================================== */
	angular
		.module("checkModule", [])
		.directive("telphone", function(){
		    return {
		        require: "ngModel",
		        link: function(scope, element, attrs, ngModel){
		            if(!ngModel) { return false };
		            ngModel.$parsers.push(function(viewValue){
		                /*----------------------------------------------
		                    手机：11位手机号码
		                    电话：3-4位区号，7-8位直拨号码，1-4位分机号
		                ------------------------------------------------*/
		                var rePattern = /^1\d{10}$|^(\d{3,4}-{0,1})?\d{7,8}(-\d{1,4})?$/;
		                if(rePattern.test(viewValue)){
		                    ngModel.$setValidity("telphone", true);
		                    return viewValue;
		                }else{
		                    ngModel.$setValidity("telphone", false);
		                    return undefined;
		                }
		            });
		        }
		    };
		})
		.directive("cellphone", function () {
		    return {
		        require: "ngModel",
		        link: function (scope, element, attrs, ngModel) {
		            if (!ngModel) {
		                return false;
		            }
		            ngModel.$parsers.push(function (viewValue) {
		                if (/^1\d{10}$/.test(viewValue)) {
		                    ngModel.$setValidity("cellphone", true);
		                    return viewValue;
		                } else {
		                    ngModel.$setValidity("cellphone", false);
		                    return undefined;
		                }
		            });
		        }
		    };
		})
		.directive("email", function () {
		    return {
		        require: "ngModel",
		        link: function (scope, element, attrs, ngModel) {
		            if (!ngModel) {
		                return false;
		            }
		            ngModel.$parsers.push(function (viewValue) {
		                if (/^.+@.+\..+/.test(viewValue)) {
		                    ngModel.$setValidity("email", true);
		                    return viewValue;
		                } else {
		                    ngModel.$setValidity("email", false);
		                    return undefined;
		                }
		            });
		        }
		    };
		})
		.directive("integer", function(){
		    return {
		        require: "ngModel",
		        link: function(scope, element, attrs, ngModel){
		            if(!ngModel) { return false };
		            ngModel.$parsers.push(function(viewValue){
		                if(/^\-?\d+$/.test(viewValue)){
		                    ngModel.$setValidity('integer', true);
		                    return viewValue;
		                }else{
		                    ngModel.$setValidity('integer', false);
		                    return undefined;
		                }
		            });
		        }
		    };
		})
		.directive("plus", function () {
		    return {
		        require: "ngModel",
		        link: function (scope, element, attrs, ngModel) {
		            if (!ngModel) {
		                return false;
		            }
		            ngModel.$parsers.push(function (viewValue) {
		                viewValue = Number(viewValue);
		                if(isNaN(viewValue) || viewValue < 0){
		                    ngModel.$setValidity("plus", false);
		                    return undefined;
		                }else{
		                    ngModel.$setValidity("plus", true);
		                    return viewValue;
		                }
		            });
		        }
		    };
		})
		.directive("nochinese", function(){
		    return {
		        require: "ngModel",
		        link: function(scope, element, attrs, ngModel){
		            if(!ngModel) { return false; }
		            ngModel.$parsers.push(function(viewValue){
		                if(/[\u4E00-\u9FA5]/.test(viewValue)){
		                    ngModel.$setValidity("nochinese", false);
		                    return undefined;
		                }else{
		                    ngModel.$setValidity("nochinese", true);
		                    return viewValue;
		                }
		            });
		        }
		    };
		})
		.directive("theSame", function(){
		    return {
		        require: "ngModel",
		        scope: {
		        	rValue: "=theSame"
		        },
		        link: function(scope, element, attrs, ngModel){
		            if(!ngModel) { return false; }
		            ngModel.$parsers.push(function(viewValue){
		            	if(typeof scope.rValue != "undefined" && scope.rValue === viewValue){
		            		ngModel.$setValidity("theSame", true);
		                    return viewValue;
		            	}else{
		            		ngModel.$setValidity("theSame", false);
		                    return undefined;
		            	}
		            });
		        }
		    };
		})
	;


	/* ========================================================================
	 * 照片放大缩小
	 * 
	 * ======================================================================== */
	angular
		.module("photoModule", ["ngMaterial"])
		.controller("photoViewController", ["$mdDialog", function($mdDialog) {
	        "use strict";
	        var _this = this;
	        
	        // 初始化照片原始大小以及位置
	        var rotateDeg = 0;
	        var scaleX = 1;
	        var matrixDegX = 1;
	        var matrixDegY = 1;

	        // 关闭窗口
	        this.hide = function () {
	            $mdDialog.hide();
	        };

	        this.picSty = {
	            "transform": "rotate(" + rotateDeg + "deg) scale(" + scaleX + ") matrix(" + matrixDegX + "," + 0 + "," + 0 + "," + matrixDegY + "," + 0 + "," + 0 + ")",
	            "transition": "all 0.2s ease"
	        }
	        // 图片旋转
	        this.rotateRight = function () {
	            rotateDeg = rotateDeg + 90;
	            _this.picSty = {
	                "transform": "rotate(" + rotateDeg + "deg) scale(" + scaleX + ") matrix(" + matrixDegX + "," + 0 + "," + 0 + "," + matrixDegY + "," + 0 + "," + 0 + ")",
	                "transition": "all 0.2s ease"
	            }
	        };
	        // 放大
	        this.BoostBig = function () {
	            scaleX = scaleX + 0.2;
	            _this.picSty = {
	                "transform": "rotate(" + rotateDeg + "deg) scale(" + scaleX + ") matrix(" + matrixDegX + "," + 0 + "," + 0 + "," + matrixDegY + "," + 0 + "," + 0 + ")",
	                "transition": "all 0.2s ease"
	            }
	        }
	        // 缩小
	        this.BoostSamll = function () {
	            if (scaleX < 0.6) {
	                return;
	            }
	            scaleX = scaleX - 0.2;
	            _this.picSty = {
	                "transform": "rotate(" + rotateDeg + "deg) scale(" + scaleX + ") matrix(" + matrixDegX + "," + 0 + "," + 0 + "," + matrixDegY + "," + 0 + "," + 0 + ")",
	                "transition": "all 0.2s ease"
	            }
	        }
	        // 左右镜像
	        this.mirrorThePicX = function () {
	            if (matrixDegX == 1) {
	                matrixDegX = -1;
	            } else {
	                matrixDegX = 1;
	            }
	            _this.picSty = {
	                "transform": "rotate(" + rotateDeg + "deg) scale(" + scaleX + ") matrix(" + matrixDegX + "," + 0 + "," + 0 + "," + matrixDegY + "," + 0 + "," + 0 + ")",
	                "transition": "all 0.2s ease"
	            }
	        }
	        // 上下镜像
	        this.mirrorThePicY = function () {
	            if (matrixDegY == 1) {
	                matrixDegY = -1;
	            } else {
	                matrixDegY = 1;
	            }
	            _this.picSty = {
	                "transform": "rotate(" + rotateDeg + "deg) scale(" + scaleX + ") matrix(" + matrixDegX + "," + 0 + "," + 0 + "," + matrixDegY + "," + 0 + "," + 0 + ")",
	                "transition": "all 0.2s ease"
	            }
	        }
	    }])
	    .factory("potoView", ["$mdDialog", function($mdDialog){
	    	function PotoView(){}

	    	PotoView.prototype.show = function(ev, title, url){
	    		$mdDialog.show({
	                templateUrl: "../../html/_common/photoview_dialog.tpl.html",
	                parent: angular.element(document.body),
	                clickOutsideToClose: true,
	                escapeToClose: true,
	                fullscreen: true,
	                targetEvent: ev,
	                locals: {
	                    title: title,
	                    url: url
	                },
	                controller: "photoViewController",
	                controllerAs: "vm",
	                bindToController: true
	            });
	    	};

	    	return new PotoView();
	    }])
	;
})();