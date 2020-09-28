<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
             :disabled="!disFlag"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in companyData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="单据号：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度：">
                        <el-select v-model="formdata.text" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in yearData"
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
                                v-for="item in monthData"
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
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办日期：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="汇总部门：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="不参与考评人员：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="汇总说明：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="汇总部门明细行" name="first">
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
                <el-tab-pane label="期权详情" name="second">
                    <dynamic-table
                        :columns="detailsColumns"
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
        rowEmpApprTabNumDetailDataObj: String,
        rowEmpApprTabNumDetailtype:Boolean,
        disFlag:Boolean
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            yearData:[],
            monthData:[],
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:[],
            yearsData:new proData().years,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns:[
                {
                    key: 'key1',
                    title: '部门名称'
                },
                {
                    key: 'key2',
                    title: '部门编码'
                },
                {
                    key: 'key3',
                    title: '备注'
                },
            ],
            detailsColumns:[
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
        }
    },
    methods: {
        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyData= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
        handleClick() {
            
        }
    },
    watch:{
        rowEmpApprTabNumDetailtype(oldVal,newVal){
            this.selectCom();
            this.ShowFinancVisible=this.rowEmpApprTabNumDetailtype;
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