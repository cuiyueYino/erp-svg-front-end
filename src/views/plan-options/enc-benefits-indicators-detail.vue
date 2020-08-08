<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>经济效益指标开始。。。。。。。。。。</div>
        <el-form
            label-width="110px"
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
                        <el-input v-model="formdata.code" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度：">
                        <el-select v-model="formdata.text" value-key="value" :disabled="true">
                            <el-option
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份：">
                        <el-select v-model="formdata.text" value-key="value" :disabled="true">
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
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办部门：">
                        <el-input v-model="formdata.nianfen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经经办日期：">
                        <el-input v-model="formdata.nianfen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="formdata.remark" :rows="3" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="经济指标得分：" name="first">
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
                <el-tab-pane label="附件" name="second">
                    <dynamic-table
                        :columns="attachmentColumns"
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
    <div>经济效益指标结束。。。。。。。。</div>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEncBenefitsIndDetailDataObj: Object,
        rowEncBenefitsIndDetailtype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            columns:[
                {
                    type: 'selection'
                },
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
                    title: '人员'
                },
                {
                    key: 'key4',
                    title: '初始计划值'
                },
                {
                    key: 'key5',
                    title: '计划值'
                },
                {
                    key: 'key6',
                    title: '实际值'
                },
                {
                    key: 'key7',
                    title: '比例(%)'
                },
                {
                    key: 'key7',
                    title: '修改原因'
                },
            ],
            attachmentColumns:[
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
    },
    watch:{
        rowEncBenefitsIndDetailtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEncBenefitsIndDetailtype;
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
