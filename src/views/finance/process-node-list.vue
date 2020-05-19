<template>
    <div>
        <dynamic-table
            :columns="processcolumns"
            :table-data="processtableData"
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
        <div><el-button @click="EditFileVisible()">查看流程图</el-button></div>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowDataprocessObj:Object
    },
    name: 'basetable',
    components: {
        DynamicTable
    },
    inject: ['reload'],
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 20,
            processcolumns:[
                {
                    key: 'Cnumber',
                    title: '流程节点'
                },
                {
                    key: 'Cnumber',
                    title: '审批人'
                },
                {
                    key: 'Cnumber',
                    title: '审批结论'
                },
                {
                    key: 'Cnumber',
                    title: '审批说明'
                },
                {
                    key: 'Cnumber',
                    title: '审批时间'
                },
                {
                    key: 'Cnumber',
                    title: '标准时间'
                },
                {
                    key: 'Cnumber',
                    title: '耗时'
                },
                {
                    key: 'Cnumber',
                    title: '回复'
                },
                {
                    key: 'Cnumber',
                    title: '纸质签收日期'
                },
            ],
            processtableData: [],
        };
    },
    mounted() {
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
        onCurrentChange(val) {},
        EditFileVisible(){
            this.$emit('changeShow',this.rowDataprocessObj);
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