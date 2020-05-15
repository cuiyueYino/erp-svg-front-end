const Utils = {
	'formatDateTime' : function(timestamp) {
		if (timestamp == null || timestamp == '')
			return '';
		var date = new Date();
		date.setTime(timestamp);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute+':' +second;
	},

	'formatDate' : function(timestamp) {
		if (timestamp == null || timestamp == '')
			return '';
		var date = new Date();
		date.setTime(timestamp);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d;
	},

	'formatMinutes' : function(minutes, overdueMinutes) {
		if (minutes == null)
			return '';
		var totalMinutes = parseInt(minutes) + parseInt(overdueMinutes);
		var hours = Math.floor(totalMinutes / 60);
		var left = totalMinutes % 60;
		return hours + '小时' + left + '分钟';
	},

	'formatDateT' : function(dateV) {
		if (dateV == null) {
			return dateV;
		}
		return dateV.replace("T", " ");
	},
	'formatLocalDate' : function(dateV) {
		da = new Date(dateV);
	    var year = da.getFullYear();
	    var month = da.getMonth() + 1;
	    var date = da.getDate();
	    return [year, month, date].join('-');
	},

	'getChargeAmount' : function(status, amount, overdue) {
		if (status != 1) {
			if (overdue > 0) {
				return overdue;
			} else {
				return amount;
			}
		} else {
			return 0.0
		}
	},

	'formatStatus' : function(status) {
		if (status == 1) {
			return '保存';
		} else if (status == 2) {
			return '提交';
		} else if (status == 3) {
			return '有效';
		} else if (status == 7) {
			return '作废';
		}
	},

	'formatBoolean' : function(bool) {
		if (bool) {
			return '是';
		} else {
			return '否';
		}
	},

	'formatTime' : function(date) {
		if (date != null && date.length > 1) {
			var arr = date.split("T");
			if(arr.length == 1){
				return date
			}
			
			var d = arr[0];
			var darr = d.split('-');
			if(darr.length != 3){
				return date
			}
			
			var t = arr[1];
			var tarr = t.split('.');
			if(tarr.length == 1){
				return date
			}
			
			var marr = tarr[0].split(':');
			if(marr.length != 3){
				return date
			}
			
			var dd = parseInt(darr[0]) + "-"
			+ Utils.addZero(parseInt(darr[1])) + "-"
			+ Utils.addZero(parseInt(darr[2])) + " "
			+ Utils.addZero(parseInt(marr[0])) + ":"
			+ Utils.addZero(parseInt(marr[1])) + ":"
			+ Utils.addZero(parseInt(marr[2]));
			return dd;
		} else {
			return date;
		}
	},
	
	//格式化日期为yyyy-MM-dd
	'formatyyyymmDD': function(date){
		if (date != null && date.length > 1) {
			var arr = date.split("T");
			if(arr.length == 1){
				return date
			}
			
			var d = arr[0];
			var darr = d.split('-');
			if(darr.length != 3){
				return date
			}
			
			var t = arr[1];
			var tarr = t.split('.');
			if(tarr.length == 1){
				return date
			}

			var dd = parseInt(darr[0]) + "-"
			+ Utils.addZero(parseInt(darr[1])) + "-"
			+ Utils.addZero(parseInt(darr[2]));
			return dd;
		} else {
			return date;
		}
	},
	DateDiff : function(Date_end, Date_start){        
		let  aDate, bDate, oDate1,  oDate2,  iDays;        
		Date_end = Date_end.split(" "); //将时间以空格划分为两个数组  第一个数组是 2019-05-20 第二个数组是 00：00：00        
		aDate   =  Date_end[0].split("-"); //获取第一个数组的值        
		oDate1 = new Date(aDate[0] , aDate[1] ,aDate[2]);  //将前半个数组以-拆分，每一个是一个数值        
		Date_start = Date_start.split(" ");        
		bDate   =  Date_start[0].split("-");        
		oDate2 = new Date(bDate[0] , bDate[1] , bDate[2]);        
		iDays   =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数        
		return  iDays;      
	},
	compareDate:function (checkStartDate, checkEndDate) { 
		//判断日期大小，不包含时间 开始时间大于结束时间返回false     
		var arys1= new Array();      
		var arys2= new Array();      
		if(checkStartDate != null && checkEndDate != null) {      
			arys1=checkStartDate.split('-');      
			var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);      
			arys2=checkEndDate.split('-');      
			var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);      
			if(sdate > edate) {             
				return false;         
			}  else {   
				return true;      
			} 
		}  
	}, 
	compareTime:function (startDate, endDate) {
		//判断日期大小，包含时间 开始时间大于结束时间返回false
		if (startDate.length > 0 && endDate.length > 0) {   
			var startDateTemp = startDate.split(" ");   
			var endDateTemp = endDate.split(" ");   

			var arrStartDate = startDateTemp[0].split("-");   
			var arrEndDate = endDateTemp[0].split("-");   

			var arrStartTime = startDateTemp[1].split(":");   
			var arrEndTime = endDateTemp[1].split(":");   

			var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);   
			var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   

			if (allStartDate.getTime() >= allEndDate.getTime()) {   
				return false;   
			} else {   
				return true;   
			}
		} else {
			return false;   
		}   
	},
	getFormData : function(formId, isNotChecked) {//formId form的id;isNotChecked form中如果存在checkbox是否选定时再往后台赋值，默认不选定不赋值
		var unindexed_array = $("#" + formId).serializeArray();
		var indexed_array = {};
		var arr = {};
		$("#" + formId + " input[type=checkbox]").each(function() {
			if(isNotChecked!=null){
				// 判断该复选框是否被选中
				if ($(this).prop("checked")) {
					// 把该复选框的属性value的值放入arr数组
					arr[this.name] = 1;
				}else{
					arr[this.name] = 0;
				}
			}else{
				// 判断该复选框是否被选中
				if ($(this).prop("checked")) {
					// 把该复选框的属性value的值放入arr数组
					arr[this.name] = 1;
				}
			}
		});
		$(unindexed_array).each(function() {
			// 判断该数组元素是否为复选框
			// if(this.name==$("#"+formId+" input[type=checkbox]").attr("name")){
			if (arr[this.name] && arr[this.name] != null) {
				// 遇到复选框把arr数组给他，多次赋值同一个this.name会覆盖前一个
				indexed_array[this.name] = arr[this.name];
			} else {
				// 其他元素直接把属性value的值给他
				if (this.value != null && this.value != "") {
					indexed_array[this.name] = this.value;
				}
			}

			// $.map(unindexed_array, function (n, i) {
			// indexed_array[n['name']] = n['value'];
			// });
		});
		return indexed_array;
	},
	'formatTaskStatus' : function(status) {
		if (status == 1) {
			return '可执行';
		} else if (status == 2) {
			return '已完成';
		} else if (status == 3) {
			return '未完成';
		} else if (status == 4) {
			return '延期';
		} else if (status == 5) {
			return '作废';
		} else if (status == 0) {
			return '未发生';
		} else if (status == 10) {
			return '已报待批';
		}
	},

	'formatOptionStatus' : function(status) {
		if (status == 1) {
			return '自评';
		} else if (status == 2) {
			return '延期';
		} else if (status == 3) {
			return '作废';
		} else if (status == 4) {
			return '任务调整';
		} else if (status == 5) {
			return '人员变更';
		} else if (status == 6) {
			return '任务委托';
		}
	},
	addZero : function(num) {
		return num < 10 ? '0' + num : num;
	},
	formData:function(formId) {
	    var unindexed_array = $("#"+formId).serializeArray();
	    var indexed_array = {};
	    var arr={};
	    $("#"+formId+" input[type=checkbox]").each(function(){
			  //判断该复选框是否被选中
			 if($(this).prop("checked")){
				 //把该复选框的属性value的值放入arr数组
				  arr[this.name] = 1;
			  }else{
				  arr[this.name] = 0;
			  }
		  });
	    delete arr[""];
	    $(unindexed_array).each(function(){  
	    	//判断该数组元素是否为复选框
	    	if($("#"+this.name).attr("type") == "checkbox"){
	    		indexed_array[this.name]=arr[this.name];
	    		delete arr[this.name];
	    	}else{
	    		indexed_array[this.name]=this.value;
	    	}
	    });
	    $.each(arr, function(key){
	    	indexed_array[key] = arr[key];
	    });
	    
	    return indexed_array;
	},
	/**
	 * 多个checkbox，只能选一个
	 * 自定义checkbox属性，box="xxxx"
	 */
	changePoint : function(obj){
		var str = $(obj).attr("box");
		$("input[box='"+str+"']").attr("checked", false);
		$(obj).prop("checked",true);
	},
	/**
	 * 公司查询条件
	 * 查询页id="query_company"
	 * 编辑页id="company"
	 */
	companyInfoInit:function(){
		$("#query_company").empty();
		$("#company").empty();
		$.ajax({
			type : "GET",
			url : ctx + "/uaa/findRoleCompanyDataVoByMactivity",
			data:{fmactivity:$("#fmactivity").val()},
			beforeSend: function(request) {
                request.setRequestHeader('Authorization', 'bearer ' + User.getAccessToken());		                   
            },
			success : function(infos) {
				if(infos!=null&&infos.length>0){
					$("#query_company").append("<option></option>");
//					$("#company").append("<option></option>");
					for(var i=0;i<infos.length;i++){
						var item = infos[i];
						var html = "<option value=\""+item.id+"\">"+item.name+"</option>";
						if(i==0){
							$("#company").append("<option value=\""+item.id+"\" selected=\"selected\" >"+item.name+"</option>");
						}else{
							$("#company").append(html);
						}
						$("#query_company").append(html);
					}
				}else{
					bootbox.alert("当前用户没有公司数据权限！");	
				}
			},
            error:function(){
            	bootbox.alert("服务器异常，请稍后再试！");
            }
		});
	},
	setInputData : function(formId,jsonObj){
		var checkboxArray={};
		var radioArray={};
		$("#" + formId + " input[type=checkbox]").each(function() {
			checkboxArray[this.id]=this.id;
		});
		$("#" + formId + " input[type=radio]").each(function() {
			radioArray[this.id]=this.value;
		});
		$.each(jsonObj,function(key,value) {
//			var obj = $("#" + formId + " [name='"+key+"']");
			var obj = $("#" + key);

			if(value instanceof Object){
				var i=0;
				$.each(value,function() {
					var item = value[i];
					if(item instanceof Object){
						$.each(item,function(key1,value1) {
							var idObj = $("#"+key1+"s");
							var idVal = value1;
							if(idObj.length>0){
								var v = "";
								if(idObj.val()!=""){
									v = idObj.val()+","+idVal;
								}else{
									v = idVal;
								}
								idObj.val(v);
							}
						});
					}
					i++;
				});
			}else{
				if(obj.length>0){
					if(checkboxArray[key]){
						if(value=="1"){
							obj.prop("checked",true);
						}else{
							obj.prop("checked",false);
						}
					}else if(radioArray[key]){
						obj.each(function(){
							if(this.value==radioArray[key]){
								obj.prop("checked",true);
							}
						});
					}else{
						if(key.toUpperCase().indexOf("TIME")>-1||key.toUpperCase().indexOf("DATE")>-1){
							var v =Utils.formatyyyymmDD(value);
							obj.val(v);
						}else{
							obj.val(value);
						}
					}
				}
			}
		});
	},
	setInputEmpty:function(formId){
		$("#"+formId)[0].reset();
//		$("#"+formId).find("textarea,select").each(function(){
//			this.val("");
//		});
//		$("#" + formId + " input[type=checkbox]").each(function() {
//			this.prop("checked",false);
//		});
//		$("#" + formId + " input[type='text']").each(function() {
//			this.val("");
//		});
////		$("#" + formId + " input[type='select']").each(function() {
////			this.val("");
////		});
////		$("#" + formId + " textarea").each(function() {
////			this.val("");
////		});
//		$("#" + formId + " input[type=radio]").each(function() {
//			radioArray[this.id]=this.value;
//		});
//		$("#" + formId + " input[type=hidden]").each(function() {
//			radioArray[this.id]=this.value;
//		});
	},
	/**
	 * 状态查询条件，id="query_status"
	 */
	statusInfoInit : function(){
		$("#query_status").empty();
		var str = "<option></option>"
			+ "<option value='1'>保存</option>"
			+ "<option value='2'>提交</option>"
			+ "<option value='3'>有效</option>"
			+ "<option value='4'>回收</option>"
			+ "<option value='7'>作废</option>"
			+ "<option value='8'>关闭/结清</option>"
		$("#query_status").append(str);
	},
	/**
	 * 根据公司查询部门查询条件，id="query_department"
	 */
	deptInfoInit : function(){
		$("#query_department").empty();
		$("#query_company").change(function(){
			var companyOid = $("#query_company").val();
			if(companyOid == null || companyOid == ""){
				$("#query_department").empty();
				return;
			}
			$.ajax({
				type : "GET",
				url : ctx + "/uaa/findDepartmentInfosByCompanyoid",
				data:{companyOid:companyOid},
				beforeSend: function(request) {
	                request.setRequestHeader('Authorization', 'bearer ' + User.getAccessToken());		                   
	            },
				success : function(infos) {
					if(infos!=null&&infos.length>0){
						$("#query_department").html("");
						$("#query_department").append("<option></option>");
						for(var i=0;i<infos.length;i++){
							var item = infos[i];
							var html ="<option value=\""+item.foid+"\">"+item.fname+"</option>";
							$("#query_department").append(html);
						}
					}else{
						bootbox.alert("当前用户没有公司数据权限！");	
					}
				},
	            error:function(){
	            	bootbox.alert("服务器异常，请稍后再试！");
	            }
			});
		});
	},
	registCheckbox: function($element) {
        var options = $element.bootstrapTable('getOptions')
        if (!options.singleSelect) {
            //全选
            $('.fixed-table-header-columns').on('click', 'input[name="btSelectAll"]', function () {
                if ($(this).is(':checked')) {
                    $('input[name="btSelectItem"]').prop('checked', true);
                } else {
                    $('input[name="btSelectItem"]').prop('checked', false);
                }
                $('.fixed-table-header').find('input[name="btSelectAll"]').click();
            });

        }

        $('.fixed-table-container').on('click', 'input[name="btSelectItem"]', function () {
            var inputs = $(this).parents('.fixed-table-body-columns').find('input[name="btSelectItem"]');

            //true为单选   false为多选
            if (options.singleSelect) {
                var checked = $(this).is(":checked");//记录点击的状态
                inputs.each(function () {
                    if ($(this).is(':checked')) {
                        $(this).prop('checked', false);//将之前的全部取消
                    }
                });
                $(this).prop('checked', checked);
            } else {
                var num = 0;
                inputs.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == inputs.length) {
                    $('input[name="btSelectAll"]').prop('checked', true);
                } else {
                    $('input[name="btSelectAll"]').prop('checked', false);
                }
            }
            var index = $(this).parents('tr').index();
            $element.find('input[name="btSelectItem"]').eq(index).click();
        });

    },
	/**
	 * id: 存放人员ID的input的ID
	 * flag: true单选，false多选
	 * type: 1人员，2部门, 3秘书
	 * title:弹窗标题
	 * table:明细行表名
	 * index:表行
	 * field:表字段
	 * callback:回调函数
	 * orgUnitId: 组织结构ID
	 * popId: 弹出页div id属性
	 */
	treePopBox : function(id, flag, type, title, table, index, field, callback, orgUnitId, queryKey, popId){
		var pop = "twoPop";
		if (popId != undefined && popId != null && popId != '') {
			pop = popId;
		}
		$("#"+pop+"Title").html("");
		$("#"+pop+"Title").html(title);
		$("#popQuery").hide();
		if(type == 2){
			$(".jt-people").addClass("jt-bumen");
		}else{
			$(".jt-people").removeClass("jt-bumen");
		}
		Utils.popmethod(pop);
		$("#"+pop+"Bg").show();
		$("#"+pop).show();
		$.fn.zTree.destroy("treeBox");
		var zNodes = [];
		var url = "";
		var dataParam = {};
		dataParam.orgUnitId = orgUnitId;
		if(type == 1){
			url = ctx + '/uaa/findCompanyDeptStaffInfoByOrgUnitId';
			$("#popQuery").show();
			if(!Utils.isNullObj(queryKey)){
				dataParam.queryKey = queryKey;
			}
		}else if(type == 2){
			url = ctx + '/uaa/findCompanyDeptmentInfoByOrgUnitId';
		}else if(type == 3){
			url = ctx + '/uaa/findSecretaryInfos';
		}else if(type == 4){
			url = ctx + '/uaa/findDepartmentInfosByCompanyoid';
		}else if(type == 5){
			url = ctx + '/uaa/findAllCompanyDeptmentInfoByOrgUnitId';
		}else if(type == 6){
			url = ctx + '/uaa/findAllCompanyDeptStaffInfoByOrgUnitId';
			$("#popQuery").show();
			if(!Utils.isNullObj(queryKey)){
				dataParam.queryKey = queryKey;
			}
		}
		
		$.ajax({
			type : "GET",
			url : url,
			data:dataParam,
			beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'bearer ' + User.getAccessToken());		                   
			},
			success : function(info) {
				if(type == 3){//因为秘书的sql文格式不同，所以特殊处理
					zNodes.push({"id" : "BFPID000000LRS0007", "pId" : 0, "name" : "集团总裁办"});
					$.each(info, function(i,item){
						zNodes.push({
							"id" : info[i].foid,
							"pId" : info[i].pid,
							"name" : info[i].fname});  
					});
				}else if(type == 4){
					$.each(info, function(i,item){
						zNodes.push({
							"id" : info[i].foid,
							"pId" : info[i].fcompanyoid,
							"name" : info[i].fname});  
					});
				}else{
					$.each(info, function(i,item){
						if(info[i].pid == null || info[i].pid == ""){
							var fname = info[i].fname;
							var positionName = info[i].positionName;
							if(!Utils.isNullObj(positionName)){
								fname = fname + "("+positionName+")";
							}
							zNodes.push({
								"id" : info[i].foid,
								"pId" : 0,
								"name" : fname,
								"tname" : info[i].fname,
								"type": info[i].types});
						}else{
							var fname = info[i].fname;
							var positionName = info[i].positionName;
							if(!Utils.isNullObj(positionName)){
								fname = fname + "("+positionName+")";
							}
							zNodes.push({
								"id" : info[i].foid,
								"pId" : info[i].pid,
								"name" : fname,
								"tname" : info[i].fname,
								"type": info[i].types});  
						}
					});
				}
				
				var treeObject = $.fn.zTree.init($("#treeBox"), setting, zNodes);
				if(!Utils.isNullObj(queryKey)&&info.length<=30){
					treeObject.expandAll(true);
				}
				Utils.checkMaterial(id);//初始化被选中
			},
			error:function(){
				bootbox.alert("服务器异常，请稍后再试！");
			}
		});
		var chkStyle = "";
		if(flag){
			chkStyle = "radio";
		}else{
			chkStyle = "checkbox";
		}
		var setting = {
				check: {  
					enable: true ,//显示复选框  
					chkStyle : chkStyle,
					radioType: "all"
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
//					onCheck: onCheck
				}
				
		};
		
		$("#tree_submit").unbind("click").one("click",function () {
			var zTreeObj = $.fn.zTree.getZTreeObj("treeBox");
			var checkedNodes = zTreeObj.getCheckedNodes();
			var ids = "";
			var names = "";
			var tname = "";
			for(var i = 0; i < checkedNodes.length; i++){
				if(!checkedNodes[i].isParent){
					var type= checkedNodes[i].type;
					if(type){
						if(type!="1"){
							ids += (checkedNodes[i].id + ",");
							tname = checkedNodes[i].tname;
							if(tname==null||tname==""){
								tname = checkedNodes[i].name;
							}
							names += (tname + ",");
						}
					}else{
						ids += (checkedNodes[i].id + ",");
						names += (checkedNodes[i].name + ",");
					}
				}
			}
				if(ids != ""){
					ids=ids.substring(0, ids.length-1);
				}			
				if(table != "" && table != undefined){
					var info=field.replace('Name', '');
					if (table == 'deptMonthPlanLineTable') {
						if(info=='examiner' || info=='glResponsible'){
							 $('#'+table).bootstrapTable('updateCell', {
						            index: index,       //行索引
						            field: info,       //列名
						            value: ids       //cell值
						        })
						}else{
							$('#'+table).bootstrapTable('updateCell', {
					            index: index,       //行索引
					            field: info,       //列名
					            value: ids       //cell值
					        })
						}
					}else{
						if(info=='examiner' || info=='responsible'){
							 $('#'+table).bootstrapTable('updateCell', {
						            index: index,       //行索引
						            field: info+"Id",       //列名
						            value: ids       //cell值
						        })
						}else{
							$('#'+table).bootstrapTable('updateCell', {
					            index: index,       //行索引
					            field: info,       //列名
					            value: ids       //cell值
					        })
						}
				        //把状态改成修改
				        $('#'+table).bootstrapTable('updateCell', {
				            index: index,       //行索引
				            field: 'deleteStatus',       //列名
				            value: 2        //cell值
				        })
					}
				}
				$("#" + id).trigger("input");
				$("#" + id).val(ids);
			
			if(names != ""){
				var names=names.substring(0, names.length-1);
				$("#" + id + "Name").val(names);
				
				if(table != "" && table != undefined){
					$('#'+table).bootstrapTable('updateCell', {
			            index: index,       //行索引
			            field: field,       //列名
			            value: names        //cell值
			        })
			        //把状态改成修改
			        $('#'+table).bootstrapTable('updateCell', {
			            index: index,       //行索引
			            field: 'deleteStatus',       //列名
			            value: 2        //cell值
			        })
				}
			}else{
				$("#" + id + "Name").val("");
				if(table != "" && table != undefined){
					$('#'+table).bootstrapTable('updateCell', {
			            index: index,       //行索引
			            field: field,       //列名
			            value: ""       //cell值
			        })
				}
			}
			if(callback != "" && callback != null && callback != undefined){
				callback(ids);
			}
			$("#popQueryKey").val("");
			$("#"+pop+"Bg").hide();
			$("#"+pop).hide();
		});
		$("#tree_close").unbind("click").one("click",function () {
			$("#popQueryKey").val("");
			$("#"+pop+"Bg").hide();
			$("#"+pop).hide();
		});
		$("#popQueryKeyBut").unbind("click").one("click",function(){
	    	Utils.treePopBox(id, flag,type, title, table, index, field, callback, orgUnitId,$("#popQueryKey").val());
//			$.fn.zTree.destroy("treeBox");
		});
		
//		function onCheck(event, treeId, treeNode){
//			var classCodes = $("#treeId").val();
//			 var classNames = $("#treeName").val();
//			 //获取所有树节点
//			 var treeObj = $.fn.zTree.getZTreeObj("treeBox");
//			 if(treeNode.checked){//如果是选中节点
//				 if(treeNode.isParent){//如果选中的是父节点(有子节点的节点)
//					 //获取选中的父节点的所有子节点
//					 var childrenNodes = [];
//					 childrenNodes = getAllChildrenNodes(treeNode,childrenNodes);
//					 for (var i = 0; i < childrenNodes.length; i++) {
//						 classCodes += (childrenNodes[i].id + ",");
//						 classNames += (childrenNodes[i].name + ",");
//		             } 
//				 }else{//如果是子节点(无子节点的节点)
//					 classCodes += (treeNode.id + ",");
//					 classNames += (treeNode.name + ",");
//				 }
//			 }else{//如果是取消选中
//				 if(treeNode.isParent){//如果取消的是父节点(有子节点的节点)
//					 //获取消的父节点的所有子节点
//					 var childrenNodes = treeNode.children;
//					 for (var i = 0; i < childrenNodes.length; i++) {
//						 var classCode = (childrenNodes[i].id + ",");
//						 var className = (childrenNodes[i].name + ",");
//						 //删除取消的节点对应的数据
//						 classCodes=classCodes.replace(classCode, "");
//						 classNames=classNames.replace(className, "");
//		             }
//				 }else{//如果是子节点(无子节点的节点)
//					 classCode = treeNode.id + ",";
//					 className = treeNode.name + ",";
//					 //删除取消的节点对应的数据
//					 classCodes=classCodes.replace(classCode, "");
//					 classNames=classNames.replace(className, "");
//				 }
//			 }
//			 //保存选中的值()
//			 $("#treeId").val(classCodes);
//			 $("#treeName").val(classNames);
//		}
//		//递归，得到叶子节点的数据
//		function getAllChildrenNodes(treeNode, result) {
//			if (treeNode.isParent) {
//				var childrenNodes = treeNode.children;
//				if (childrenNodes) {
//					for (var i = 0; i < childrenNodes.length; i++) {
//						if (childrenNodes[i].isParent) {
//							getAllChildrenNodes(childrenNodes[i], result);
//						} else {
//							result.push(childrenNodes[i]);
//						}
//					}
//				}
//			}
//			return result;
//		}
	},
	checkMaterial : function(id){
		var classCodes = $("#" + id).val();
		 var datalist = classCodes.split(",");
		 //获取所有树节点
		 var treeObj = $.fn.zTree.getZTreeObj("treeBox");
		 if(datalist!='' &&datalist.length>0){
			 var nodes=treeObj.getNodes();//获取所有子节点
			 for(var i=0;i<datalist.length;i++){
				 //通过id查找节点
				 var node = treeObj.getNodeByParam("id",datalist[i],null);
				 //选中该节点
				 if(node!=null){//先判断节点是否为空
					 //选中该节点
					 treeObj.checkNode(node,true,true);
				     //获取该节点父节点
					 var parent = node.getParentNode();
		             if(!parent.open){//如果父节点没有展开则展开父节点
		            	 treeObj.expandNode(parent,true,true);
		             }
				 }
			 }
		 }
	},
	changeLT :function(objId){
		var popW=$("#"+objId).width();
		var popH=$("#"+objId).height();
		var winW=$(window).width();
		var winH=$(window).height();
		//alert(popW);
		var popL=Math.floor((winW-popW)/2);
		var popT=Math.floor((winH-popH)/2);
		if(popT<10){
			popT=10;
		}
		$("#"+objId).css({ "left": popL, "top": popT });
	},
	popmethod : function(objId) {
		var mouseOffx = 0;
		var mouseOffy = 0;
		var isDrag = false;
		var popEle=$("#"+objId+" .pop-title");
		Utils.changeLT(objId);
//		$(window).resize(function(){
//			Utils.changeLT(objId);
//		});
		
		popEle.unbind(".click").on("mousedown", function (ev) {
		mouseOffx = ev.clientX - popEle.offset().left;
		mouseOffy = ev.clientY - popEle.offset().top;
		isDrag = true;
		})
		$(document).unbind(".click").on("mousemove", function (ev) {
		var mourseX = ev.clientX, mourseY = ev.clientY;
		var moveX = 0, moveY = 0;
		if (isDrag === true) {
		moveX = mourseX - mouseOffx;
		moveY = mourseY - mouseOffy;
		var maxX = $(window).outerWidth(false) - $("#"+objId).outerWidth(false);
		var maxY = $(window).outerHeight(false) - $("#"+objId).outerHeight(false);
		moveX = Math.min(maxX, Math.max(0, moveX));
		moveY = Math.min(maxY, Math.max(0, moveY));
		if(moveY<10){
			moveY=10;
		}
		$("#"+objId).css({ "left": moveX, "top": moveY });
		}
		});
		$(document).unbind(".click").on("mouseup", function () {
		isDrag = false;
		});
		
	},
	ckEditorsInit: function(id){
		let localEditor=CKEDITOR.replace(id,{ toolbar: 'Full' });
	},
	initYearMonthDayFormat:function(){
		$('.form_date').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm-dd'
		});
	},
	initYearMonthFormat:function(){
		$('.form_year_month').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 0,
			autoclose : 1,
			todayHighlight : 1,
			startView : 3,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm'
		});
	},
	initYearFormat:function(){
		$('.form_year').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 0,
			autoclose : 1,
			todayHighlight : 1,
			startView: 4,  
	        minView: 4,
			forceParse : 0,
			format : 'yyyy'
		});
	},
	initManyYearFormat:function(num){
		$('.form_manyyear').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 0,
			autoclose : 1,
			todayHighlight : 1,
			startView: 4,  
	        minView: 4,
	        startDate: ((new Date()).getFullYear()) - num,
	        endDate: (new Date()).getFullYear(),
			forceParse : 0,
			format : 'yyyy'
		});
	},
	initMonthFormat:function(){
		$('.form_month').datetimepicker({
			language: 'zh-CN',
			startView: 3,  
		    endView: 3,
		    maxView: 3,  
		    minView: 3,  
		    format: 'mm',  
		    autoclose: true,
		    todayHighlight: true
		});
	},
	setReadOnly:function(ids,boolean){
		var idarr = ids.split(',');
		if (idarr.length > 0) {
			$.each(idarr,function(index,value){
				$('#'+value).attr("disabled",boolean);
			});	
		}
	},
	yearInfoInit : function(){
		$("#year").empty();
		$("#year").append("<option></option>");
		var myDate = new Date();
		var tYear = myDate.getFullYear();
		var html ="<option value=\""+(tYear-1)+"\">"+(tYear-1)+"</option>";
		html+="<option value=\""+(tYear)+"\">"+(tYear)+"</option>";
		html+="<option value=\""+(tYear+1)+"\">"+(tYear+1)+"</option>";
		$("#year").append(html);
		
	},
	uploadFile:function(formId,menuCode,voucherId){
		if(formId==""||formId===undefined||formId==null){
			layer.alert("请填写formId");
			return;
		}
		if(menuCode==""||menuCode===undefined||menuCode==null){
			layer.alert("请填写menuCode");
			return;
		}
		if(voucherId==""||voucherId===undefined||voucherId==null){
			layer.alert("请填写voucherId");
			return;
		}
		var formData = new FormData($("#"+formId)[0]);
		formData.append("menuCode",menuCode);
	    formData.append("userCode", User.getUser().username);
	    formData.append("voucherId", voucherId);
	    $.ajax({
	        url: webSubHost+"/attachment/uploadFile",
	        type: "post",
	        beforeSend : function(request) {
				request.setRequestHeader('Authorization', 'bearer '
						+ User.getAccessToken());
			},
	        data: formData,
	        dataType: "json",
	        cache: false,//上传文件无需缓存
	        processData: false,//用于对data参数进行序列化处理 这里必须false
	        contentType: false, //必须*/
	        success: function (data) {
	        }
	    });
	},
	uploadFileBatch:function(formId,menuCode,voucherId){
		if(formId==""||formId===undefined||formId==null){
			layer.alert("请填写formId");
			return;
		}
		if(menuCode==""||menuCode===undefined||menuCode==null){
			layer.alert("请填写menuCode");
			return;
		}
		if(voucherId==""||voucherId===undefined||voucherId==null){
			layer.alert("请填写voucherId");
			return;
		}
		var formData = new FormData($("#"+formId)[0]);
	    formData.append("userCode", User.getUser().username);
	    formData.append("menuCode",menuCode);
	    formData.append("voucherId", voucherId);
	    $.ajax({
	        url: webSubHost+"/attachment/uploadFileBatch",
	        type: "post",
	        beforeSend : function(request) {
				request.setRequestHeader('Authorization', 'bearer '
						+ User.getAccessToken());
			},
	        data: formData,
	        dataType: "json",
	        cache: false,//上传文件无需缓存
	        processData: false,//用于对data参数进行序列化处理 这里必须false
	        contentType: false, //必须*/
	        success: function (data) {
	        }
	    });
	},
//	downloadFileById:function(attachmentId){
//		if(attachmentId==""||attachmentId===undefined||attachmentId==null){
//			layer.alert("请选定要下载的数据");
//			return;
//		}
//		$.ajax({
//	        url: webSubHost+"/attachment/findInfoById",
//	        type: "POST",
//	        beforeSend : function(request) {
//				request.setRequestHeader('Authorization', 'bearer '
//						+ User.getAccessToken());
//			},
//	        data: {id:attachmentId},
//	        success: function (info) {
//	        	var fullPath = info.fullPath;
//	        	var filePath = fullPath.substring(0,fullPath.lastIndexOf("/"));
//	        	var fileName = info.fileName;
//	        	var ftpFileName = info.newFileName
//	        	$("#filePath").prop("disabled",false);
//	        	$("#fileName").prop("disabled",false);
//	        	$("#ftpFileName").prop("disabled",false);
//	        	$("#filePath").val(filePath);
//	        	$("#fileName").val(fileName);
//	        	$("#ftpFileName").val(ftpFileName);
//	        	$("#downloadForm").attr("action",webSubHost+"/attachment/downloadFile");//改变表单的提交地址为下载的地址
//	            $("#downloadForm").submit();//提交表单
//	        }
//	    });
////		$("#attachmentId").val(attachmentId);
////		$("#downloadForm").attr("action",webSubHost+"/attachment/downloadFile");//改变表单的提交地址为下载的地址
////        $("#downloadForm").submit();//提交表单
//	},
	downloadFileById:function(attachmentId){
		if(attachmentId==""||attachmentId===undefined||attachmentId==null){
			layer.alert("请选定要下载的数据");
			return;
		}
//		$("#attachmentId").val(attachmentId);
		$("#downloadForm").attr("action",webSubHost+"/attachment/downloadFilen?attachmentId="+attachmentId);//改变表单的提交地址为下载的地址
        $("#downloadForm").submit();//提交表单
	},
	deleteInfo: function(id){
		$.ajax({
	        url: webSubHost+"/attachment/deleteInfo",
	        type: "POST",
	        beforeSend : function(request) {
				request.setRequestHeader('Authorization', 'bearer '
						+ User.getAccessToken());
			},
	        data: {id:id},
	        success: function (info){
	        	if(info!=null){
	        		if(info.code==0){
	        			layer.alert("删除成功！");
	        			
		        	}else{
		        		layer.alert("删除失败！");
		        	}
	        	}
	        },
	        error:function(){
	        	
	        }
	    });
	},
	changeAttachmentFile:function(attchDataTableId,fileId){
		$('#'+attchDataTableId).bootstrapTable('remove', {
			field:'id',
			values:['']
		});
	    var t_files = $("#"+fileId).prop("files");
		var str = '';
	    for (var i = 0 ; i < t_files.length; i++) {
	    	var rowDatas = $('#'+attchDataTableId).bootstrapTable('getData');
	    	var index = 0;
	    	if(rowDatas.length==0){
	    		index = 1;
	    	}else{
	    		var m = rowDatas.length-1;
	    		index = parseInt(rowDatas[m].indexNo)+1;
	    	}
	    	var rowData= new Object();
	    	rowData.id="";
	    	rowData.indexNo=index;
	    	rowData.num=index;
	    	rowData.name=t_files[i].name;
	    	$('#'+attchDataTableId).bootstrapTable('insertRow',{index:index,row:rowData});
	    	$('#'+attchDataTableId).bootstrapTable('updateRow',{index:index,row:rowData});
//	        str += '<li>名称：' + t_files[i].name + '大小' + t_files[i].size / 1024 + 'KB</li>';
	    }
	},
	exportExcel:function(params){
		debugger;
		var form = $('<form></form>');
	    // 设置属性
	    form.attr("action",webSubHost+"/excelOption/exportExcelFile");
	    form.attr('method','post');
//	    if (params != 'undefined' ) {
	    for(var key in params){
    		var opt = document.createElement("input");
            opt.name = key;        
            opt.value = params[key];
            opt.style.display="none";
            form.append(opt);	    	
		}
	    $(document.body).append(form);
	    // 提交表单
	    form.submit();
	},
	tableTdTitle:function(value) {
	    var span=document.createElement('span');
	    span.setAttribute('title',value);
	    span.innerHTML = value;
	    return span.outerHTML;
	},
	changeNumberToBigChinese : function(num) {
		if (num == 1) {
			return '一';
		} else if (num == 2) {
			return '二';
		} else if (num == 3) {
			return '三';
		} else if (num == 4) {
			return '四';
		} else if (num == 5) {
			return '五';
		} else if (num == 6) {
			return '六';
		} else if (num == 7) {
			return '七';
		}else if (num == 8) {
			return '八';
		}else if (num == 9) {
			return '九';
		}else if (num == 10) {
			return '十';
		}
	},
	isNullObj: function(objValue){
		if(objValue==null){
			return true;
		}else if(objValue.replace(/\s*/g,"")==""){
			return true;
		}else{
			return false;
		}
	},
	baseDataRepetition: function(name,code,companId,tableName){
		var formData = new FormData();
		formData.append("name",name);
	    formData.append("code", code);
	    formData.append("companId", companId);
	    formData.append("tableName", tableName);
		$.ajax({
	        url: webSubHost+"/baseDataParams/isRepetition",
	        type: "POST",
	        contentType : 'application/json',
			dataType: "json" ,
			data:formData,
	        beforeSend : function(request) {
				request.setRequestHeader('Authorization', 'bearer '
						+ User.getAccessToken());
			},
	        data: {id:attachmentId},
	        success: function (info) {
	        	if(info!=null){
	        		if(info.code==0&&info.data==0){
	        			return true;
	        		}else{
	        			return false;
	        		}
	        	}else{
	        		return false;
	        	}
	        },
	        error:function(){
	        	return false;
	        }
	    });
	}
};
export default Utils;