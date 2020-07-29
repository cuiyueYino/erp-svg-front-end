import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;

const baseURI = '/api/';

const documentManagement = {

    //---------------------------------文件类别维护接口-begin--------------------------------------------------------- 
    //获取文件类别组织
    getDocumentCategoryOrgArch(){
        return httpReqest.get(baseURI + 'documentcategory/getDocumentCategoryOrgArch');
    },
    //查询文件类别:分页
    findDocumentCategoryByPage(params){
        return httpReqest.post(baseURI + 'documentcategory/findDocumentCategoryByPage',params);
    },

    //---------------------------------文件类别维护接口-end----------------------------------------------------------- 
};

export default documentManagement;