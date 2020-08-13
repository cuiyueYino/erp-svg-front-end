<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="单据号：">
                        <el-input v-model="formdata.danjuhao" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.banben" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年份：">
                        <el-select v-model="formdata.years" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in yearsData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="计划部门：">
                        <el-input v-model="formdata.jihuabumen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                <el-form-item label="编制日期：" :label-width="formLabelWidth" prop="fenddate">
                    <el-date-picker
                        clearable
                        v-model="formdata.fenddate"
                        format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                        type="datetime"
                        size="small"
                        placeholder="选择日期"
                        style="width: 100%;"
                        :disabled="true"
                    ></el-date-picker>
                </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.versionnum" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="22">
                    <el-form-item label="备注：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="年计划编制" name="first">
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
                </el-tab-pane>
                <el-tab-pane label="附件" name="fourth">
                    <dynamic-table
                        :columns="attachColumns"
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
                </el-tab-pane>
            </el-tabs> 
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEACHPerEachJobDataObj: Object,
        rowDepartAnnPlanDettype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            yearsData:new proData().years,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns:[
                {
                    type: "selection"
                },
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '公司'
                },
                {
                    key: 'key3',
                    title: '部门'
                },
                {
                    key: 'key4',
                    title: '任务级别'
                },
                {
                    key: 'key5',
                    title: '周期性任务'
                },
                {
                    key: 'key6',
                    title: '跨月任务'
                },
                {
                    key: 'key7',
                    title: '工作名称'
                },
                {
                    key: 'key8',
                    title: '工作标准'
                },
            ],
            attachColumns:[
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '名称'
                },
                {
                    key: 'key3',
                    title: '操作'
                },
            ],
            tableData:[],
        }
    },
    methods: {
        handleClick() {
            
        }
    },
    watch:{
        rowDepartAnnPlanDettype(oldVal,newVal){
            this.ShowFinancVisible=this.rowDepartAnnPlanDettype;
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