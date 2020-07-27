import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;

const documentManagement = {

    //文件类别维护接口 -- 获取文件类别组织
    getDocumentCategoryOrgArch(){
        return httpReqest.post('/api/interfaces/documentcategory/getDocumentCategoryOrgArch');
    },
};

export default documentManagement;