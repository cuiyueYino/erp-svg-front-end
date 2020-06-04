<template>
    <div>
        <dynamic-table
            :columns="RegRecodecolumns"
            :table-data="RegRecodetableData"
            :total="total"
            size="mini"
            max-height="250"
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
            :isShowPager="isShowPager"
            @current-change="onCurrentChange"
            @selection-change="onSelectionChange"
            @size-change="onSizeChange"
            v-loading="false"
            element-loading-text="加载中"
        ></dynamic-table>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowPDLDataObj:Array,
        financingPDLtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data: function() {
        return{
            title:'',
            pageNum: 1,
            pageSize: 1000,
            total: 20,
            isShowPager:false,
            RegRecodecolumns:[
                {
                    key: 'paytype',
                    title: '付款类别'
                },
                {
                    key: 'chargingstandards',
                    title: '收费标准'
                },
                {
                    key: 'handledate',
                    title: '应付日期',
                },
                {
                    key: 'moneyname',
                    title: '款项名称'
                },
                {
                    key: 'moneydepartment',
                    title: '款项部门'
                },
                {
                    key: 'companysubject',
                    title: '公司科目'
                },
                {
                    key: 'project',
                    title: '项目'
                },
                {
                    key: 'projectsubject',
                    title: '项目科目'
                },
                {
                    key: 'shouldamount',
                    title: '应付金额'
                },
                {
                    key: 'haveamount',
                    title: '已付金额'
                },
                {
                    key: 'haveapplyamount',
                    title: '已申请金额'
                },
                {
                    key: 'remark',
                    title: '备注'
                },
            ],
            RegRecodetableData: [],
            labelPosition: 'left',
        }
    },
    methods: {
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {
        },
    },
    watch:{
        financingPDLtype(oldVal,newVal){
            this.RegRecodetableData=this.rowPDLDataObj;
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