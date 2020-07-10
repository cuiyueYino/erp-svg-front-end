import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const systemSet = {
    //根据条件查询菜单
    findMenuByParam(params){
        return httpReqest.post('/api/interfaces/menu/findMenuByParam', params);
    },
}
export default systemSet;