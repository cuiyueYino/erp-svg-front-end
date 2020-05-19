<template>
    <div>
        <dynamic-table
            :columns="enclosurecolumns"
            :table-data="enclosuretableData"
            :total="total"
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
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
        rowEFListDataObj:Object,
        financingCVMListtype: Boolean
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
            enclosurecolumns:[
                {
                    key: 'Cnumber',
                    title: '文件类型'
                },
                {
                    key: 'Cnumber',
                    title: '文件'
                },
                {
                    key: 'Cnumber',
                    type: 'selection',
                    title: '必须'
                },
                {
                    key: 'Cnumber',
                    title: '编制单位'
                },
                {
                    key: 'Cnumber',
                    title: '负责人'
                },
                {
                    key: 'Cnumber',
                    title: '审核单位'
                },
                {
                    key: 'Cnumber',
                    title: '审核人'
                },
                {
                    key: 'Cnumber',
                    title: '定版日期'
                },
                {
                    key: 'Cnumber',
                    title: '文档等级'
                },
                {
                    key: 'Cnumber',
                    title: '保管期限'
                },
                {
                    key: 'Cnumber',
                    title: '备注'
                },
            ],
            enclosuretableData: [],
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
        financingEFListtype(oldVal,newVal){
            this.financingEFListtype=this.financingEFListtype;
            this.enclosuretableData=this.rowEFListDataObj;
            console.log(this.rowCVMListDataObj)
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