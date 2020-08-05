import httpReqest from '../../utils/https';

const collaborativeOffice = {

	// 分页查询工作事项模版主表分类
	findWorkItemTypePage(params) {
		return httpReqest.post('/api/interfaces/workItemType/findWorkItemTypePage', params);
	},
	// 修改状态主表分类，7禁用、3有效
	updateStatus(params) {
		return httpReqest.post('/api/interfaces/workItemType/updateStatus', params);
	},
	// 修改状态主表，7禁用、3有效
	updateStatusTemp(params) {
		return httpReqest.post('/api/interfaces/workItemTemp/updateStatus', params);
	},
	// 根据ID查询工作事项模版主表分类
	getWorkItemTypeModel(params) {
		var valueS = '?';
		for(var item in params) {
			valueS += item + "=" + params[item] + "&";
		}
		if(valueS.slice(valueS.length - 1, valueS.length) === "&") {
			valueS = valueS.slice(0, valueS.length - 1);
		}
		return httpReqest.get('/api/interfaces/workItemType/getWorkItemTypeModel' + valueS);
	},
	// 根据ID查询工作事项模版子表分类
	getWorkItemTypeSubModel(params) {
		var valueS = '?';
		for(var item in params) {
			valueS += item + "=" + params[item] + "&";
		}
		if(valueS.slice(valueS.length - 1, valueS.length) === "&") {
			valueS = valueS.slice(0, valueS.length - 1);
		}
		return httpReqest.get('/api/interfaces/workItemTypeSub/getWorkItemTypeSubModel' + valueS);
	},
	// 获取工作事项字段类型长度
	getFieldLength(params) {
		return httpReqest.get('/api/interfaces/workItemField/getFieldLength');
	},
	// 获取工作事项浏览框内容
	getFieldBrowse(params) {
		return httpReqest.get('/api/interfaces/workItemField/getFieldBrowse');
	},
	// 枚举查询
	findList(params) {
		return httpReqest.post('/api/interfaces/enumContent/findList', {});
	},
	// 分页查询工作事项模版主表
	findWorkItemTempPage(params) {
		return httpReqest.post('/api/interfaces/workItemTemp/findWorkItemTempPage', params);
	},
	// 按条件获取服务
	findTServiceByParams(params) {
		return httpReqest.post('/api/interfaces/tservice/findTServiceByParams', params);
	},
	// 按ID获取服务
	findTServiceItemByParams(params) {
		return httpReqest.post('/api/interfaces/tservice/findTServiceItemByParams', params);
	},
	// 新增工作事项模版主表分类
	insertWorkItemTypeModel(params) {
		return httpReqest.post('/api/interfaces/workItemType/insertWorkItemTypeModel', params);
	},
	// 查询公司
	getCompanyData() {
		return httpReqest.get('/api/interfaces/organization/getCompanyData');
	},
	// 修改工作事项模版主表分类
	updateWorkItemTypeModel(params) {
		return httpReqest.post('/api/interfaces/workItemType/updateWorkItemTypeModel', params);
	},
	// 修改枚举
	modify(params) {
		return httpReqest.post('/api/interfaces/enumContent/modify', params);
	},
	// 新增（type:1:枚举类别；2：枚举内容 枚举内容需要设置PID，PID为对应枚举类别的ID）
	add(params) {
		return httpReqest.post('/api/interfaces/enumContent/add', params);
	},
	//人员/用户/职务-列表查询
	findConList(url, params) {
		return httpReqest.post('/api/interfaces/' + url, params);
	},
	// 新增（type:1:枚举类别；2：枚举内容 枚举内容需要设置PID，PID为对应枚举类别的ID）
	dynamicinterface(params, item) {
		if(item.requestMethod == "get") {
			var valueS = '?';
			for(var item in params) {
				valueS += item + "=" + params[item] + "&";
			}
			if(valueS.slice(valueS.length - 1, valueS.length) === "&") {
				valueS = valueS.slice(0, valueS.length - 1);
			}
			return httpReqest.get('/api/interfaces/' + item.interfacePath + valueS);
		} else {
			return httpReqest.post('/api/interfaces/' + item.interfacePath, params);
		}
	},
	//新增工作事项模版主表
	insertWorkItemTempModel(params) {
		return httpReqest.post('/api/interfaces/workItemTemp/insertWorkItemTempModel', params);
	},
	//修改工作事项模版主表
	updateWorkItemTempModel(params) {
		return httpReqest.post('/api/interfaces/workItemTemp/updateWorkItemTempModel', params);
	},
	//修改工作事项模版子表
	updateWorkItemTempSubModel(params) {
		return httpReqest.post('/api/interfaces/workItemTempSub/updateWorkItemTempSubModel', params);
	},
	//分页查询工作事项，必填参数creator
	findPage(params) {
		return httpReqest.post('/api/interfaces/workItem/findPage', params);
	},
	//根据ID查询工作事项模版主表
	getWorkItemTempModel(params) {
		var valueS = '?';
		for(var item in params) {
			valueS += item + "=" + params[item] + "&";
		}
		if(valueS.slice(valueS.length - 1, valueS.length) === "&") {
			valueS = valueS.slice(0, valueS.length - 1);
		}
		return httpReqest.get('/api/interfaces/workItemTemp/getWorkItemTempModel' + valueS);
	},
	//根据ID查询工作事项模版子表
	getWorkItemTempSubModel(params) {
		var valueS = '?';
		for(var item in params) {
			valueS += item + "=" + params[item] + "&";
		}
		if(valueS.slice(valueS.length - 1, valueS.length) === "&") {
			valueS = valueS.slice(0, valueS.length - 1);
		}
		return httpReqest.get('/api/interfaces/workItemTempSub/getWorkItemTempSubModel' + valueS);
	},
	//根据ID查询工作事项模版
	findById(params) {
		var valueS = '?';
		for(var item in params) {
			valueS += item + "=" + params[item] + "&";
		}
		if(valueS.slice(valueS.length - 1, valueS.length) === "&") {
			valueS = valueS.slice(0, valueS.length - 1);
		}
		return httpReqest.get('/api/interfaces/workItem/findById' + valueS);
	},
	//api手动输入接口名称
	apiUrl(url, params) {
		return httpReqest.post('/api/interfaces/' + url, params);
	},

};

export default collaborativeOffice;