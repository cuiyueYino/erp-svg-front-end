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
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.bumen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="岗位：">
                        <el-input v-model="formdata.gangwei"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.gangwei"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.jingbanren" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间：">
                        <el-input v-model="formdata.jinagbanshijian"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本号：">
                        <el-input v-model="formdata.gangwei"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="一岗一表行" name="first">
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
                <el-tab-pane label="经济指标" name="second">
                    <dynamic-table
                        :columns="ecoIndicatorsColumns"
                        :table-data="ecoIndicatorsData"
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
                <el-tab-pane label="公司指标" name="third">
                    <dynamic-table
                        :columns="comIndicatorsColumns"
                        :table-data="comIndicatorsData"
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
                        :table-data="attachData"
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
        rowEACHPerEachJobDettype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            isDeartPopVisible:false,
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            yearsData:new proData().years,
            monthData:new proData().month,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            treeData2:[
                {
                    label: '计划部门类别',
                    id:'company01',
                    type:'company',
                    children: [
                        {
                            label: 'IT开发部',
                            id:'duties03',
                            type:'duties',  
                        },
                        {
                            label: '财务部',
                            id:'department01',
                            type:'department',
                            children: [
                                {
                                label: '石化财务',
                                id:'duties01',
                                type:'duties',
                                },
                                {
                                label: '收费员',
                                id:'duties02',
                                type:'duties',
                                }
                            ]
                        }
                    ]
                }
                ],
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
                    title: '指标库'
                },
                {
                    key: 'key3',
                    title: '关键指标'
                },
                {
                    key: 'key4',
                    title: '子指标'
                },
                {
                    key: 'key5',
                    title: '指标定义'
                },
                {
                    key: 'key6',
                    title: '指标权重'
                },
                {
                    key: 'key7',
                    title: '考评方法'
                },
                {
                    key: 'key8',
                    title: '备注'
                },
            ],
            ecoIndicatorsColumns:[
                {
                    type: "selection"
                },
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '指标项名称'
                },
                {
                    key: 'key3',
                    title: '指标类型'
                },
                {
                    key: 'key4',
                    title: '指标权重'
                },
                {
                    key: 'key5',
                    title: '指标定义'
                },
                {
                    key: 'key6',
                    title: '考评方法'
                },
                {
                    key: 'key7',
                    title: '备注'
                },
            ],
            comIndicatorsColumns:[
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
                    title: '权重'
                },
                {
                    key: 'key5',
                    title: '备注'
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
            ],
            tableData:[],
            ecoIndicatorsData:[],
            comIndicatorsData:[],
            attachData:[],
        }
    },
    methods: {
        handleClick() {
            
        }
    },
    watch:{
        rowEACHPerEachJobDettype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEACHPerEachJobDettype;
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
