<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>一人一表任务表（下级任务功能）开始。。。。。。。。。。</div>
       <dynamic-table
            :columns="columns"
            :table-data="tableData"
            :total="total"
            size="mini"
            :isShowPager="false"    
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
            v-loading="false"
            element-loading-text="加载中"
        ></dynamic-table>
    <div>一人一表任务表（下级任务功能）结束。。。。。。。。</div>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEachPerEachTableLowerDataObj: Object,
        rowEachPerEachTableLowertype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            ShowFinancVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            tableData:[],
            columns:[
                    {
                        key: 'key1',
                        title: '状态'
                    },
                    {
                        key: 'key2',
                        title: '任务状态'
                    },
                    {
                        key: 'key3',
                        title: '审批状态'
                    },
                    {
                        key: 'key4',
                        title: '任务类型'
                    },
                    {
                        key: 'key5',
                        title: '任务级别'
                    },
                    {
                        key: 'key6',
                        title: '工作名称'
                    },
                    {
                        key: 'key7',
                        title: '工作标准'
                    },
                    {
                        key: 'key8',
                        title: '责任人'
                    },
                    {
                        key: 'key8',
                        title: '开始时间'
                    },
                    {
                        key: 'key8',
                        title: '结束时间'
                    },
                    {
                        key: 'key8',
                        title: '完成情况'
                    },
                    {
                        key: 'key8',
                        title: '情况说明'
                    },
                    {
                        key: 'key8',
                        title: '备注'
                    },
                ], 
        }
    },
    methods: {
       
    },
    watch:{
        rowEachPerEachTableLowertype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEachPerEachTableLowertype;
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
<style lang='scss'>

</style>