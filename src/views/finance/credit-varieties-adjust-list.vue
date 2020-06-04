<template>
    <div>
        <dynamic-table
            :columns="RegRecodecolumns"
            :table-data="RegRecodetableData"
            :total="total"
            size="mini"
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
        rowCVAListDataObj:Array,
        financingCVAListtype: Boolean
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
                    key: 'creditvarietyname',
                    title: '授信品种'
                },
                {
                    key: 'lineofcredit',
                    title: '授信额度'
                },
                {
                    key: 'lineofcredituse',
                    title: '授信可用额度',
                },
                {
                    key: 'lineofcreditaudit',
                    title: '授信调整额度'
                },
                {
                    key: 'creditooccupation',
                    title: '授信占用'
                },
                {
                    key: 'creditbalance',
                    title: '授信余额'
                },
                {
                    key: 'note',
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
        financingCVAListtype(oldVal,newVal){
            this.financingCVAListtype=this.financingCVAListtype;
            this.RegRecodetableData=this.rowCVAListDataObj;
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