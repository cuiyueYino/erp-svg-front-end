import httpReqest from '../../utils/https';

const collaborativeOffice = {

	// 分页查询工作事项模版主表分类
	findWorkItemTypePage(params) {
		return httpReqest.post('/api/interfaces/workItemType/findWorkItemTypePage', params);
	},
	// 修改状态，7禁用、3有效
	updateStatus(params) {
		return httpReqest.post('/api/interfaces/workItemType/updateStatus', params);
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
	// 查询枚举
	findList(params) {
		return httpReqest.post('/api/interfaces/enumContent/findList', params);
	},
	// 修改枚举
	modify(params) {
		return httpReqest.post('/api/interfaces/enumContent/modify', params);
	},
	// 新增（type:1:枚举类别；2：枚举内容 枚举内容需要设置PID，PID为对应枚举类别的ID）
	add(params) {
		return httpReqest.post('/api/interfaces/enumContent/add', params);
	},

};

export default collaborativeOffice;