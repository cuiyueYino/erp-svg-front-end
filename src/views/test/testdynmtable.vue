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
            :oprStatus="oprStatus"
            :UpdCchecked="UpdCchecked"
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
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dynmtable.vue';
export default {
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data() {   
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
                    change:'lineofcredituse',
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
                ListData:{},
            },
            UpdCchecked:{
                checkedFlag:false,
                filedname:'lineofcredit'
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
        rowInputChange(column,key,row,data){
            console.log(column)
            console.log(key)
            console.log(row)
            row[column.change]=111;
            console.log(row[key])
            data[0][column.change]=2222;
            console.log(data[0][key])
            console.log(data)
            this.RegistrationtableData=data;
        }, 
        //按钮查询事件
        onSerachChange(key,data){
           console.log(key)
           console.log(data) 
        },
        //获取授信品种
        showfinancingTypeData(data,type){
        },  
    },
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