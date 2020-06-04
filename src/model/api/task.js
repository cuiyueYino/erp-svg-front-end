import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const task = {
    test() {
        return httpReqest.get(`${v}/taskStructure/init`, { userCode: '001' });
    },
    test1() {
        return httpReqest.post(`${v}/taskStructure/init`, { userCode: '001' });
    },
    //融资管理/基础数据
    //查询多条授信品种
    findAwardCreditBreedPage(params) {
        //return post(`${testV}/User/login`, QS.stringify(params));
        return httpReqest.post('/api/interfaces/awardCreditBreed/findAwardCreditBreedPage', params);
    },
    //查询一条授信品种
    getAwardCreditBreedVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/awardCreditBreed/getAwardCreditBreedVO'+valueS);
    },
    //新增授信品种
    saveAwardCreditBreedVO(params){
        return httpReqest.post('/api/interfaces/awardCreditBreed/save', params);
    },
    //删除授信品种
    deleteAwardCreditBreedVO(params){
        return httpReqest.post('/api/interfaces/awardCreditBreed/deleteAwardCreditBreedVO', params);
    },
    //查询多条用信品种
    findUserCreditBreedPage(params) {
        return httpReqest.post('/api/interfaces/userCreditBreed/findUserCreditBreedPage', params);
    },
    //查询一条用信品种
    getUserCreditBreedVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/userCreditBreed/getUserCreditBreedVO'+valueS);
    },
    //新增查询一条用信品种
    saveUserCreditBreedVO(params){
        return httpReqest.post('/api/interfaces/userCreditBreed/save', params);
    },
    //删除用信品种
    deleteUserCreditBreedVO(params){
        return httpReqest.post('/api/interfaces/userCreditBreed/deleteUserCreditBreedVO', params);
    },
    //查询多条付息方式
    findPayInterestMethodPage(params) {
        return httpReqest.post('/api/interfaces/payInterestMethod/findPayInterestMethodPage', params);
    },
    //查询一条付息方式
    getPayInterestMethodVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/payInterestMethod/getPayInterestMethodVO'+valueS);
    },
    //新增查询一条付息方式
    savePayInterestMethodVO(params){
        return httpReqest.post('/api/interfaces/payInterestMethod/save', params);
    },
    //删除付息方式
    deletePayInterestMethodVO(params){
        return httpReqest.post('/api/interfaces/payInterestMethod/deletePayInterestMethodVO', params);
    },
    //查询多条质押物类型
    findPledgeTypePage(params) {
        return httpReqest.post('/api/interfaces/pledgeType/findPledgeTypePage', params);
    },
    //查询一条质押物类型
    getPledgeTypeVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/pledgeType/getPledgeTypeVO'+valueS);
    },
    //新增查询一条质押物类型
    savepledgeTypeVO(params){
        return httpReqest.post('/api/interfaces/pledgeType/save', params);
    },
    //删除质押物类型
    deletePledgeTypeVO(params){
        return httpReqest.post('/api/interfaces/pledgeType/deletePledgeTypeVO', params);
    },
    //融资合同 - 查询多条综合授信合同登记
    findComplexCreditContractRegisterPage(params) {
        return httpReqest.post('/api/interfaces/complexCreditContractRegister/findComplexCreditContractRegisterPage', params);
    },
    //查询一条综合授信合同登记
    getComplexCreditContractRegisterVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/complexCreditContractRegister/getComplexCreditContractRegisterVO'+valueS);
    },
    //删除综合授信合同登记
    delComplexCreditContractRegisterVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/complexCreditContractRegister/delComplexCreditContractRegisterVO'+valueS);
    },
    //综合授信合同提交和修改
    insertComplexCreditContractRegisterVO(params) {
        return httpReqest.post('/api/interfaces/complexCreditContractRegister/insertComplexCreditContractRegisterVO', params);
    },
    //综合授信合同暂存和修改
    insertZCComplexCreditContractRegisterVO(params) {
        return httpReqest.post('/api/interfaces/complexCreditContractRegister/insertZCComplexCreditContractRegisterVO', params);
    },
    
    //授信银行查询列表
    findFundCustomerPage(params){
        return httpReqest.post('/api/interfaces/fundCustomer/findFundCustomerPage', params);
    },
    //授信主体查询
    findProjectPartnerPage(params){
        return httpReqest.post('/api/interfaces/financial/projectPartner/findProjectPartnerPage', params);
    },
    //综合授信调整
    //查询多条综合授信调整
    findComplexCreditContractAdjustPage(params) {
        return httpReqest.post('/api/interfaces/complexCreditContractAdjust/findComplexCreditContractAdjustPage', params);
    },
    //查询一条综合授信调整
    getComplexCreditContractAdjustVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/complexCreditContractAdjust/getComplexCreditContractAdjustVO'+valueS);
    },
    //删除综合授信合同调整
    delComplexCreditContractAdjustVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/complexCreditContractAdjust/delComplexCreditContractAdjustVO'+valueS);
    },
    //综合授信合同调整提交和修改
    insertComplexCreditContractAdjustVO(params) {
        return httpReqest.post('/api/interfaces/complexCreditContractAdjust/insertComplexCreditContractAdjustVO', params);
    },
    //综合授信合同调整暂存和修改
    insertZCComplexCreditContractAdjustVO(params) {
        return httpReqest.post('/api/interfaces/complexCreditContractAdjust/insertZCComplexCreditContractAdjustVO', params);
    },
    //综合授信合同查询下拉框接口
    findSearchList(){
        return httpReqest.get('/api/interfaces/complexCreditContractRegister/findSearchList');
    },
    //授信主体查询下拉框接口
    findprojectPartnerSearchList(){
        return httpReqest.get('/api/interfaces/financial/projectPartner/findSearchList');
    },
    //授信银行查询下拉框接口
    findBlankSearchList(){
        return httpReqest.get('/api/interfaces/fundCustomer/findSearchList');
    },
    //授信品种查询下拉框接口
    findCreditBreedSearchList(){
        return httpReqest.get('/api/interfaces/awardCreditBreed/getSearchList');
    },
    //用信合同登记 查询多条用信合同
    findUserCreditContractRegisterPage(params) {
        return httpReqest.post('/api/interfaces/userCreditContractRegister/findUserCreditContractRegisterPage', params);
    },
    //查询一条用信合同登记
    getUserCreditContractRegisterVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/userCreditContractRegister/getUserCreditContractRegisterVO'+valueS);
    },
    //业务币种查询
    findCurrencyPageList(params) {
        return httpReqest.post('/api/interfaces/financial/currency/findCurrencyPageList', params);
    },
    //删除用信合同登记
    delUserCreditContractRegisterVO(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/userCreditContractRegister/delUserCreditContractRegisterVO'+valueS);
    },
    //用信合同登记提交和修改
    insertUserCreditContractRegisterVO(params) {
        return httpReqest.post('/api/interfaces/userCreditContractRegister/insertUserCreditContractRegisterVO', params);
    },
    //用信合同登记暂存和修改
    insertZCUserCreditContractRegisterVO(params) {
        return httpReqest.post('/api/interfaces/userCreditContractRegister/insertZCUserCreditContractRegisterVO', params);
    },
    //款项名称列表查询
    findMoneyNamePage(params){
        return httpReqest.post('/api/interfaces/financial/moneyName/findMoneyNamePage', params);
    },
};

export default task;