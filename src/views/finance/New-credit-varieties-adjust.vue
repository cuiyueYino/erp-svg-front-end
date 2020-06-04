<template>
    <div>
        <dynamic-table
            :columns="columns"
            :tableSData="RegistrationtableData"
            :total="total"
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
            :isShowPager="false"
            :rowDataObj="rowDataObj"
            :UpdCchecked="UpdCchecked"
            :oprStatus="oprStatus"
            @current-change="onCurrentChange"
            @selection-change="onSelectionChange"
            @size-change="onSizeChange"
            @More-Search="onSerachChange"
            @add-row-change="addRowChange"
            @del-row-change="delRowChange"
            @Row-input="rowInputChange"
            @Udate-Files="ChangeFileEditORNot"
            v-loading="false"
            element-loading-text="加载中"
        ></dynamic-table>
        <credittypeSearch :rowTypeDataObj="rowTypeDataObj" :financingTypetype="financingTypetype" @changeShow="showfinancingTypeData"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/edittable.vue';
import credittypeSearch from './credit-type-search.vue';
export default {
    name: 'basetable',
    components: {
        DynamicTable,
        credittypeSearch
    },
    props: {
        rowDatatestObj:Object,
        UpdCchecked:Object,
        testCVMListtype:Boolean,
    },
    inject: ['reload'],
    data: function() {   
        return {
            RegistrationtableData: [],
            columns:[
                {
                    type: 'selection',
                },
                {
                    type: 'index',
                    title: '序号'
                },
                {
                    key: 'awardcreditbreedname',
                    type: 'input-button',
                    disabled:true,
                    searchdisabled:false,
                    title: '授信品种'
                },
                {
                    key: 'lineofcredit',
                    type: 'input-change-number',
                    disabled:true,
                    title: '授信额度'
                },
                {
                    key: 'lineofcredituse',
                    type: 'input-number',
                    disabled:true,
                    title: '授信可用额度'
                },
                {
                    key: 'lineofcreditadjustthistime',
                    type: 'input-change-number',
                    disabled:false,
                    title: '授信调整额度'
                },
                {
                    key: 'creditooccupation',
                    type: 'input-number',
                    disabled:true,
                    title: '授信占用'
                },
                {
                    key: 'creditbalance',
                    type: 'input-number',
                    disabled:true,
                    title: '授信余额'
                },
                {
                    key: 'note',
                    type: 'input',
                    disabled:false,
                    title: '备注'
                },
            ],
            rowDataObj:{
                titleStr:'',
                ListData:{
                    lineofcredit:0,
                    lineofcredituse:0,
                    lineofcreditadjustthistime:0,
                    lineofcreditadjust:0,
                    lineofcredituseold:0,
                    lineofcreditadjustold:0,
                    creditooccupation:0,
                    awardcreditbreed:'',
                    awardcreditbreedname:'',
                    awardcreditbreedId:'',
                    creditbalance:0,
                    creditoccadjust:0,
                    note:'',
                    creditvariety:'',
                    flag:false
                 },
            },
            titleStr:'',
            selectFacilitylistRow:[],
            financingTypeformdata:{},
            rowTypeDataObj:{},
            rowFacilityNum: 0,
            oprStatus:1,
            financingTypetype:false,
            pageNum: 1,
            pageSize: 10,
            total: 10,
        };
    },
    methods: {
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSizeChange(val) {
            this.pageSize = val;
        },
        onCurrentChange(val) {
            this.pageNum = val;
        },
        addRowChange(val){
            this.RegistrationtableData= val;
            let List={}
            //初始化table列的值
            if(this.rowDataObj.ListData){
                let params = this.rowDataObj.ListData;
                for(var item in params){
                    if(typeof(params[item]) ==='string'){
                        List[item] ='';
                    }else if(typeof(params[item]) ==='number'){
                        List[item] =0;
                    }else{
                        List[item]=params[item];
                    }
                }
            }
            //List =this.rowDataObj.ListData;
            List.oprStatus=this.oprStatus;
            List.status=0;
            List.CreateOrSearchFlag="New";
            List.UpdateCchecked=this.UpdCchecked.checkedFlag;
            List.index=this.rowFacilityNum+1;
            List.rowFacilityNum=this.rowFacilityNum;
            List.creator=localStorage.getItem("ms_userId");
            this.RegistrationtableData.unshift(List);
            this.rowFacilityNum += 1;
        },
        delRowChange(select,val){
            let Meaasge='';
            this.RegistrationtableData= val;
            var ins='';
            for (let i = 0; i < select.length; i++) {
                let Sval = select;
                Sval.forEach((v1, index) => {
                    if(v1.CreateOrSearchFlag ==="New"){
                        this.RegistrationtableData.forEach((v, i) => {
                            if (v1.rowFacilityNum === v.rowFacilityNum) {
                                // i 为选中的索引
                                this.RegistrationtableData.splice(i, 1);
                                ins+=i+','+v1.rowFacilityNum+".";
                            }
                        })
                    }else{
                        Meaasge+=v1.awardcreditbreedname+","
                    }
                })
            }
            if(Meaasge !=''){
                this.$message.error(Meaasge+'此授信品种不可删除!');
            }
            // 删除完数据之后清除勾选框
            //this.$refs.multipleTable.clearSelection();
        },
        //监听table的值得改变
        ChangeFileEditORNot(oldVal,newVal){
            
        },
        //更改授信额度
        rowInputChange(key,row,data){
            let FormData=data;
            let Totallineofcredit=0;
            let Totalcreditbalance=0;
            let Totallineofcreditaudit=0;
            let Totalcreditaccount=0;
            let Totalcreditoccadjust=0;
            let Totallineofcredituse=0;
            //授信额度调整
            if(key === 'lineofcreditadjustthistime'){
                if(FormData.length >0){
                    for(var i=0;i<FormData.length;i++){
                        //let lineofcreditauditValue=Number(row.lineofcreditaudit);
                        //if((lineofcreditauditValue-row.creditbalance)<0){
                            //this.$message.error('本次调整额度必须大于授信余额!');
                        // row.lineofcreditaudit =0;
                        //}else{
                        let lineofcreditV =0;
                        let lineofcreditauditV=0;
                        let lineofcredituseV=0;
                        let lcreditaccountV=0;
                        let creditoccadjustV=0;
                        let creditbalanceV=0;
                        /*if(FormData[i].creditocadjust){
                            FormData[i].creditocadjust=Number(FormData[i].creditocadjust)
                        }*/
                        if(FormData[i].CreateOrSearchFlag === "New"){
                            if(this.UpdCchecked.checkedFlag ==true){
                                lineofcreditV=Number(FormData[i].lineofcreditadjustthistime);
                            }
                            lineofcreditauditV = Number(FormData[i].lineofcreditadjustthistime);
                            lineofcredituseV =  Number(FormData[i].lineofcreditadjustthistime);
                            /*if(FormData[i].creditocadjust){
                                creditbalanceV = Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation) -Number(FormData[i].creditocadjust);
                            }else{
                                creditbalanceV = Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation);
                            }*/
                            creditbalanceV = Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation);
                            FormData[i].lineofcredit=lineofcreditV;
                            FormData[i].lineofcreditadjustthistime=lineofcreditauditV;
                            FormData[i].lineofcredituse =lineofcredituseV;
                            FormData[i].creditbalance =creditbalanceV;
                        }else{
                            lineofcreditauditV = Number(FormData[i].lineofcreditadjustthistime);
                            lineofcredituseV =  Number(FormData[i].lineofcredit) + Number(FormData[i].lineofcreditadjustthistime);
                            /*if(FormData[i].creditocadjust){
                                creditbalanceV = Number(FormData[i].lineofcredit) + Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation) -Number(FormData[i].creditocadjust);
                            }else{
                                creditbalanceV = Number(FormData[i].lineofcredit) + Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation);
                            }*/
                            creditbalanceV = Number(FormData[i].lineofcredit) + Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation);
                            FormData[i].lineofcreditadjustthistime=lineofcreditauditV;
                            FormData[i].lineofcredituse=lineofcredituseV;
                            FormData[i].creditbalance =creditbalanceV;
                        }
                        Totallineofcredit+= Number(FormData[i].lineofcredit);
                        Totalcreditbalance+= Number(FormData[i].creditbalance);
                        Totallineofcreditaudit+= Number(FormData[i].lineofcreditadjustthistime);
                        Totalcreditaccount+= Number(FormData[i].creditooccupation);
                        /*if(FormData[i].creditocadjust){
                            Totalcreditoccadjust+= Number(FormData[i].creditocadjust);
                        }*/
                        Totallineofcredituse+= Number(FormData[i].lineofcredituse);
                    }
                }
                this.RegistrationtableData=FormData;
            }
            /*else if(key === 'creditocadjust'){
                if(FormData.length >0){
                    let creditbalanceV=0;
                    for(var i=0;i<FormData.length;i++){
                        if(FormData[i].creditocadjust){
                            FormData[i].creditocadjust=Number(FormData[i].creditocadjust)
                        }
                        if(FormData[i].CreateOrSearchFlag === "New"){
                            if(this.UpdCchecked.checkedFlag ==true){
                                FormData[i].lineofcredit=Number(FormData[i].lineofcreditadjustthistime);
                            }
                            if(FormData[i].creditocadjust){
                                creditbalanceV =Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation) -Number(FormData[i].creditocadjust);
                            }else{
                                creditbalanceV =Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation);
                            }
                        }else{
                            if(FormData[i].creditocadjust){
                                creditbalanceV =Number(FormData[i].lineofcredituse) + Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation) -Number(FormData[i].creditocadjust);
                            }else{
                               creditbalanceV =Number(FormData[i].lineofcredituse) + Number(FormData[i].lineofcreditadjustthistime) -Number(FormData[i].creditooccupation); 
                            }
                        }
                        FormData[i].creditbalance =creditbalanceV;
                        Totallineofcredit+= Number(FormData[i].lineofcredit);
                        Totalcreditbalance+= Number(FormData[i].creditbalance);
                        Totallineofcreditaudit+= Number(FormData[i].lineofcreditadjustthistime);
                        Totalcreditaccount+= Number(FormData[i].creditooccupation);
                        if(FormData[i].creditocadjust){
                            Totalcreditoccadjust+= Number(FormData[i].creditocadjust);
                        }
                        Totallineofcredituse+= Number(FormData[i].lineofcredituse);
                    }
                }
                this.RegistrationtableData=FormData;
            }*/
            this.rowDatatestObj.Totallineofcredit=Totallineofcredit;
            this.rowDatatestObj.Totalcreditbalance=Totalcreditbalance;
            this.rowDatatestObj.Totallineofcreditaudit=Totallineofcreditaudit;
            this.rowDatatestObj.Totalcreditaccount=Totalcreditaccount;
            this.rowDatatestObj.Totalcreditoccadjust=Totalcreditoccadjust;
            this.rowDatatestObj.Totallineofcredituse=Totallineofcredituse;
            this.rowDatatestObj.RegistrationtableData=FormData;
            this.$emit('changeShow',this.rowDatatestObj);
        },
        //按钮查询事件
        onSerachChange(key,data){
            //查询授信品种
            if(key == 'awardcreditbreedname'){
                let finandata=data;  
                if(finandata.creditooccupation === 0){
                    finandata.finanrowname="授信品种缺省查询方案";
                    finandata.finanrowId="4F1903301337716602";
                    finandata.nametitle=this.titleStr;
                    this.rowTypeDataObj=finandata;
                    this.financingTypetype=true;
                }else{
                    this.$message.error('此授信品种已被占用，不能修改授信品种!');
                }
            }
        },
        //获取授信品种
        showfinancingTypeData(data,type){
            this.financingTypeformdata=data;
            let RegistraData = this.RegistrationtableData;
            let removeflag=false;
            let index=0;
            let DoubleArr=[];
            let totalValue=0;
            let FinNameS='';
            let FinIDS='';
            let Totallineofcredit=0;
            let Totalcreditbalance=0;
            let Totallineofcreditaudit=0;
            let Totalcreditaccount=0;
            let Totalcreditoccadjust=0;
            let Totallineofcredituse=0;
            if(data.awardcreditbreed && data.awardcreditbreed!=""){
                if(RegistraData.length >1){
                    let awbreed=data.awardcreditbreed;
                    for(var i=0;i<RegistraData.length;i++){
                        RegistraData[i].creditvariety=RegistraData[i].awardcreditbreed;
                        if(RegistraData[i].awardcreditbreed === awbreed){
                            //获取相同的授信品种
                            let valueobj={};
                            valueobj.awardcreditbreed=RegistraData[i].awardcreditbreed;
                            valueobj.Ivalue=i;
                            valueobj.rowFacilityNum=RegistraData[i].rowFacilityNum;
                            DoubleArr.push(valueobj);
                        }
                    }
                    //确认要删除的数据
                    let rowNum = data.rowFacilityNum;
                    if(DoubleArr.length >1){
                        for(var j=0;j<DoubleArr.length;j++){
                            if(rowNum === DoubleArr[j].rowFacilityNum){
                                removeflag=true;
                                index=DoubleArr[j].Ivalue;
                            }
                        }
                    }
                    //删除重复的授信品种数据
                    if(removeflag){
                        if(data.CreateOrSearchFlag ==="New"){
                            RegistraData.splice(index,1);
                        }else{
                            this.$message.error('单据中已有此授信品种，请调整!');
                        }
                    }
                    this.RegistrationtableData=RegistraData;
                    //重新计算页面表头数据
                    
                    for(var k=0;k<RegistraData.length;k++){
                        if(RegistraData[k].lineofcredit){
                            Totallineofcredit+= Number(RegistraData[k].lineofcredit);
                        }
                        if(RegistraData[k].creditbalance){
                            Totalcreditbalance+= Number(RegistraData[k].creditbalance);
                        }
                        if(RegistraData[k].lineofcreditaudit){
                            Totallineofcreditaudit+= Number(RegistraData[k].lineofcreditaudit);
                        }
                        if(RegistraData[k].creditooccupation){
                            Totalcreditaccount+= Number(RegistraData[k].creditooccupation);
                        }
                        /*if(RegistraData[k].creditocadjust){
                            Totalcreditoccadjust+= Number(RegistraData[k].creditocadjust);
                        }*/
                        if(RegistraData[k].lineofcredituse){
                            Totallineofcredituse+= Number(RegistraData[k].lineofcredituse);
                        }
                    }
                   
                }else{
                    if(data.lineofcredit){
                        Totallineofcredit+= Number(data.lineofcredit);
                    }
                    if(data.creditbalance){
                        Totalcreditbalance+= Number(data.creditbalance);
                    }
                    if(data.lineofcreditaudit){
                        Totallineofcreditaudit+= Number(data.lineofcreditaudit);
                    }
                    if(data.creditooccupation){
                        Totalcreditaccount+= Number(data.creditooccupation);
                    }
                    /*if(data.creditocadjust){
                        Totalcreditoccadjust+= Number(data.creditocadjust);
                    }*/
                    if(data.lineofcredituse){
                        Totallineofcredituse+= Number(data.lineofcredituse);
                    }
                }
                this.rowDatatestObj.Totallineofcredit=Totallineofcredit;
                this.rowDatatestObj.Totalcreditbalance=Totalcreditbalance;
                this.rowDatatestObj.Totallineofcreditaudit=Totallineofcreditaudit;
                this.rowDatatestObj.Totalcreditaccount=Totalcreditaccount;
                this.rowDatatestObj.Totalcreditoccadjust=Totalcreditoccadjust;
                this.rowDatatestObj.Totallineofcredituse=Totallineofcredituse;
                this.rowDatatestObj.RegistrationtableData=FormData;
                this.$emit('changeShow',this.rowDatatestObj);
            }
            if(type === false){
                this.financingTypetype = false
            }else{
                this.financingTypetype = true
            }
        },  
    },
    watch:{
        testCVMListtype(oldVal,newVal){
            let DataObj = this.rowDatatestObj;
            this.titleStr=DataObj.titleStr;
            if(DataObj.RegisType==='Edit'){
                let Registr = DataObj.RegistrationtableData;
                if(Registr){
                    for(var i=0;i<Registr.length;i++){
                        Registr[i].oprStatus=2;
                    }
                    this.RegistrationtableData=Registr;
                }
                this.oprStatus=2;
            }else{
                this.oprStatus=1;
                let Registr = DataObj.RegistrationtableData;
                if(Registr){
                    for(var i=0;i<Registr.length;i++){
                        Registr[i].oprStatus=1;
                    }
                    this.RegistrationtableData=Registr;
                }
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.el-form-item__label {
    text-align: left;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.topinput {
    width: 100px;
}
.topselect {
    width: 242px;
}
.datatable {
    margin-top: 20px;
}
.dataForm {
    margin-top: 10px;
}
.elrowStyle {
    margin-top: 20px;
}
.elColCenter {
    text-align: center;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
}
</style>
<style lang='scss'>
.replydiag {
    .el-textarea__inner {
        min-height: 300px !important;
    }
}
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>