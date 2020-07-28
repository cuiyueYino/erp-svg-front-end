import httpReqest from '../../utils/https';

const collaborativeOffice = {

    // 分页查询工作事项模版主表分类
    findWorkItemTypePage(params) {
        return httpReqest.post('/api/interfaces/workItemType/findWorkItemTypePage', params);
    },
   
};

export default collaborativeOffice;