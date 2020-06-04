<template>
    <div>
        <div style="width:200px;height:40px;float:right;">
            <el-button size="small" style="margin-left:50px;magin-right:5px;" @click.prevent="addFacilityRow()">新增</el-button>
            <el-button size="small" @click.prevent="delFacilityData()">删除</el-button>
        </div>
        <div>
            <el-table
                :data="RegistrationtableData"
                ref="table"
                size="mini"
                tooltip-effect="dark"
                border
                stripe
                :show-summary="showSummary"
                style="width:100%;"
                @selection-change='selectFacilityRow'>
                <el-table-column type="selection" width="65px" align="center"></el-table-column>
                <el-table-column  label="款项名称" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.moneynameName" size="mini" style="padding:5px 1px 5px 1px" disabled></el-input>
                            </el-col>
                            <el-col :span="1" style="padding:5px 1px 5px 1px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchMNMVisible(scope.row)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column  label="款项部门" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.moneydepartmentName" size="mini" style="padding:5px 1px 5px 1px" disabled></el-input>
                            </el-col>
                            <el-col :span="1" style="padding:5px 1px 5px 1px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchTypeVisible(scope.row)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column  label="公司科目" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.companysubjectName" size="mini" style="padding:5px 1px 5px 1px" disabled></el-input>
                            </el-col>
                            <el-col :span="1" style="padding:5px 1px 5px 1px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchTypeVisible(scope.row)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column  label="项目科目" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.projectsubjectName" size="mini" style="padding:5px 1px 5px 1px" disabled></el-input>
                            </el-col>
                            <el-col :span="1" style="padding:5px 1px 5px 1px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchTypeVisible(scope.row)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column  label="项目" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.projectName" size="mini" style="padding:5px 1px 5px 1px" disabled></el-input>
                            </el-col>
                            <el-col :span="1" style="padding:5px 1px 5px 1px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchTypeVisible(scope.row)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="应收日期">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="8">
                                <el-date-picker
                                    v-model="scope.row.handledate"
                                    type="date"
                                    size="mini"
                                    style="width:100px"
                                >
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="应收金额" prop="shouldamount">
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.shouldamount" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="0.00" @change="UpdateFacilitValue(RegistrationtableData)" size="mini"  ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="已收金额" prop="haveamount">
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.haveamount" placeholder="0.00" size="mini"  disabled></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="已申请金额" prop="haveapplyamount">
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.haveapplyamount" placeholder="0.00" size="mini"  disabled></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="备注" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" size="mini" ></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <credittypeSearch :rowTypeDataObj="rowTypeDataObj" :financingTypetype="financingTypetype" @changeShow="showfinancingTypeData"/>
        <paymentnameSearch :rowPNSDataObj="rowPNSDataObj" :financingPNStype="financingPNStype" @changeShow="showPNSData"/>
    </div>
</template>
<script>
import credittypeSearch from './credit-type-search.vue';
import paymentnameSearch from './payment-name-search.vue';
export default {
    props: {
        rowNCDDataObj:Object,
        financingNCDype:Boolean,
    },
    name: 'basetable',
    components: {
        credittypeSearch,
        paymentnameSearch,
    },
    inject: ['reload'],
    data(){
        return{
            RegistrationtableData: [],
            formdata:{
                moneyname:'',
                moneydepartment:'',
                companysubject:'',
                projectsubject:'',
                project:'',
                handledate:'',
                shouldamount:0,
                haveamount:0,
                haveapplyamount:0,
                remark:'',
            },
            showSummary:true,
            titleStr:'',
            selectFacilitylistRow:[],
            financingTypeformdata:{},
            rowTypeDataObj:{},
            rowPNSDataObj:{},
            rowFacilityNum: 0,
            oprStatus:1,
            financingTypetype:false,
            financingPNStype:false,
        }
    },
    methods: {
        //获取选中的收款明细行
        selectFacilityRow(val){
            this.selectFacilitylistRow= val;
        },
        // 增加收款明细行
        addFacilityRow () {
            var list = {
                rowFacilityNum:this.rowFacilityNum,
                oprStatus:this.oprStatus,
                status:0,
                index:this.rowFacilityNum+1,
                inProcess:false,
                moneyname:this.formdata.moneyname,
                moneydepartment:this.formdata.moneydepartment,
                companysubject:this.formdata.companysubject,
                projectsubject:this.formdata.projectsubject,
                project:this.formdata.project,
                handledate:this.formdata.handledate,
                shouldamount:this.formdata.shouldamount,
                haveamount:this.formdata.haveamount,
                haveapplyamount:this.formdata.haveapplyamount,
                remark:this.formdata.remark,
            };
            this.RegistrationtableData.unshift(list)
            this.rowFacilityNum += 1;
            this.titleStr=this.rowNCDDataObj.titleStr;
        },
        // 删除选中行
        delFacilityData () {
            for (let i = 0; i < this.selectFacilitylistRow.length; i++) {
            let val = this.selectFacilitylistRow;
            val.forEach((val, index) => {
                this.RegistrationtableData.forEach((v, i) => {
                    if (val.rowFacilityNum === v.rowFacilityNum) {
                        // i 为选中的索引
                        this.RegistrationtableData.splice(i, 1)
                    }
                })
            })
            }
            // 删除完数据之后清除勾选框
            this.$refs.table.clearSelection()
        },
        //款项名称查询
        MoreSearchMNMVisible(row){
            let finandata=row;
            finandata.finanrowname="款项名称缺省查询方案";
            finandata.finanrowId="011302220911760402";
            finandata.nametitle=this.titleStr;
            this.rowPNSDataObj=finandata;
            this.financingPNStype=true;
        },
        //获取款项名称
        showPNSData(data,type){
            console.log(data)
            if(type === false){
                this.financingPNStype = false
            }else{
                this.financingPNStype = true
            }
        },
        //查询授信品种
        MoreSearchTypeVisible(row){
            let finandata=row;
            finandata.finanrowname="授信品种缺省查询方案";
            finandata.finanrowId="4F1903301337716602";
            finandata.nametitle=this.titleStr;
            this.rowTypeDataObj=finandata;
            this.financingTypetype=true;
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
            if(data.awardcreditbreed && data.awardcreditbreed!=""){
                if(RegistraData.length >1){
                    let awbreed=data.awardcreditbreed;
                    for(var i=0;i<RegistraData.length;i++){
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
                        RegistraData.splice(index,1);
                    }
                    this.RegistrationtableData=RegistraData;
                    //重新计算页面表头数据
                    
                    for(var k=0;k<RegistraData.length;k++){
                        if(RegistraData[k].lineofcredit){
                            totalValue=totalValue+Number(RegistraData[k].lineofcredit);
                        }
                        if(RegistraData[k].awardcreditbreedname){
                            FinNameS+=RegistraData[k].awardcreditbreedname+",";
                        }
                        if(RegistraData[k].awardcreditbreed){
                            FinIDS+=RegistraData[k].awardcreditbreed+",";
                        }
                        
                    }
                    if(FinNameS.indexOf(",")>-1){
                        FinNameS=FinNameS.slice(0,FinNameS.length-1);
                    }
                    if(FinIDS.indexOf(",")>-1){
                        FinIDS=FinIDS.slice(0,FinIDS.length-1);
                    }
                    if(removeflag){
                        this.$message.error('不能有两个相同的授信品种,请重新添加');
                    }
                }else{
                    if(data.awardcreditbreedname){
                        FinNameS=data.awardcreditbreedname;
                    }
                    if(data.awardcreditbreed){
                        FinIDS=data.awardcreditbreed;
                    }
                    if(data.lineofcredit){
                        totalValue=Number(data.lineofcredit);
                    }
                }
                this.rowNCDDataObj.FinNameS=FinNameS;
                this.rowNCDDataObj.FinIDS=FinIDS;
                this.rowNCDDataObj.totalValue=totalValue;
                this.rowNCDDataObj.RegistrationtableData=RegistraData;
                this.$emit('changeShow',this.rowNCDDataObj);
            }
            if(type === false){
                this.financingTypetype = false
            }else{
                this.financingTypetype = true
            }
        },
        //更改授信额度
        UpdateFacilitValue(data){
            let FormData=data;
            let totalValue=0;
            let FinNameS='';
            //var patrn = /^\d+(\.\d+)?$/;
            if(FormData.length >0){
                for(var i=0;i<FormData.length;i++){
                    let lineofcreditV =FormData[i].lineofcredit;
                    //lineofcreditV =lineofcreditV.replace(/[^0-9.]/g,'')
                    FormData[i].lineofcredit=Number(lineofcreditV);
                    FormData[i].lineofcredituse=Number(lineofcreditV);
                    FormData[i].creditbalance=Number(lineofcreditV);
                    if(FormData[i].lineofcredit){
                        totalValue=totalValue+Number(lineofcreditV);
                    }
                    if(FormData[i].creditaccount){
                        FormData[i].creditaccount=Number(FormData[i].creditaccount);
                    }else{
                        FormData[i].creditaccount=0.00;
                    }
                    if(FormData[i].lineofcreditaudit){
                        FormData[i].lineofcreditaudit=Number(FormData[i].lineofcreditaudit);
                    }else{
                        FormData[i].lineofcreditaudit=0.00;
                    }
                    if(FormData[i].awardcreditbreedname){
                        FinNameS+=FormData[i].awardcreditbreedname+",";
                    }
                }
            }
            if(FinNameS.indexOf(",")>-1){
                FinNameS=FinNameS.slice(0,FinNameS.length-1);
            }
            this.rowNCDDataObj.FinNameS=FinNameS;
            this.rowNCDDataObj.totalValue=totalValue;
            this.rowNCDDataObj.RegistrationtableData=FormData;
            this.$emit('changeShow',this.rowNCDDataObj);
        },
    },
    watch:{
        financingNCDype(oldVal,newVal){
            let DataObj = this.rowNCDDataObj;
            this.titleStr=DataObj.titleStr;
            if(DataObj.RegisType==='Edit'){
                let Registr = DataObj.RegistrationtableData;
                if(Registr && Registr != null ){
                    for(var i=0;i<Registr.length;i++){
                        Registr[i].oprStatus=2;
                    }
                }else{
                    Registr=[];
                }
                this.oprStatus=2;
                this.RegistrationtableData=Registr;
            }else{
                this.oprStatus=1;
            }
        }
    }
}
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