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
                style="width:100%;"
                @selection-change='selectFacilityRow'>
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
                <el-table-column  label="授信品种" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="scope.row.awardcreditbreedname" size="mini" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchTypeVisible(scope.row)"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="授信额度" >
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.lineofcredit" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="0.00" @change="UpdateFacilitValue(RegistrationtableData)" size="mini"  ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="授信可用额度" >
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.lineofcredituse" placeholder="0.00" size="mini"  disabled></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="授信调整额度" >
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.lineofcreditaudit" placeholder="0.00" size="mini"  disabled></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="授信占用" >
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.creditaccount" placeholder="0.00" size="mini"  disabled></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="授信余额" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.creditbalance" placeholder="0.00" size="mini"  disabled></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="备注" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.note" size="mini" ></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <credittypeSearch :rowTypeDataObj="rowTypeDataObj" :financingTypetype="financingTypetype" @changeShow="showfinancingTypeData"/>
    </div>
</template>
<script>
import credittypeSearch from './credit-type-search.vue';
export default {
    props: {
        rowDatavarietObj:Object,
        financingCVMListtype:Boolean,
    },
    name: 'basetable',
    components: {
        credittypeSearch,
    },
    inject: ['reload'],
    data(){
        return{
            RegistrationtableData: [],
            selectFacilitylistRow:[],
            financingTypeformdata:{},
            rowTypeDataObj:{},
            rowFacilityNum: 0,
            oprStatus:1,
            financingTypetype:false,
        }
    },
    methods: {
        //获取选中的授信行
        selectFacilityRow(val){
            this.selectFacilitylistRow= val;
        },
        // 增加授信行
        addFacilityRow () {
            var list = {
                rowFacilityNum:this.rowFacilityNum,
                oprStatus:this.oprStatus,
                status:0,
                index:this.rowFacilityNum+1,
                inProcess:false,
                creator:localStorage.getItem("ms_userId"),
                lineofcredit:this.RegistrationtableData.lineofcredit,
                lineofcredituse:this.RegistrationtableData.lineofcredituse,
                lineofcreditaudit:this.RegistrationtableData.lineofcreditaudit,
                creditaccount:this.RegistrationtableData.creditaccount,
                awardcreditbreed:this.RegistrationtableData.awardcreditbreed,
                awardcreditbreedname:this.RegistrationtableData.awardcreditbreedname,
                awardcreditbreedId:this.RegistrationtableData.awardcreditbreedId,
                creditbalance:this.RegistrationtableData.creditbalance,
                note:this.RegistrationtableData.note,
            };
            this.RegistrationtableData.unshift(list)
            this.rowFacilityNum += 1;
        },
        // 删除选中行
        delFacilityData () {
            for (let i = 0; i < this.selectFacilitylistRow.length; i++) {
            let val = this.selectFacilitylistRow
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
        //查询授信品种
        MoreSearchTypeVisible(row){
            let finandata=row;
            finandata.finanrowname="授信品种缺省查询方案";
            finandata.finanrowId="4F1903301337716602";
            finandata.nametitle="综合授信合同登记";
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
                this.rowDatavarietObj.FinNameS=FinNameS;
                this.rowDatavarietObj.FinIDS=FinIDS;
                this.rowDatavarietObj.totalValue=totalValue;
                this.rowDatavarietObj.RegistrationtableData=RegistraData;
                this.$emit('changeShow',this.rowDatavarietObj);
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
            this.rowDatavarietObj.FinNameS=FinNameS;
            this.rowDatavarietObj.totalValue=totalValue;
            this.rowDatavarietObj.RegistrationtableData=FormData;
            this.$emit('changeShow',this.rowDatavarietObj);
        },
    },
    watch:{
        financingCVMListtype(oldVal,newVal){
            let DataObj = this.rowDatavarietObj;
            if(DataObj.RegisType==='Edit'){
                let Registr = DataObj.RegistrationtableData;
                for(var i=0;i<Registr.length;i++){
                    Registr[i].oprStatus=2;
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