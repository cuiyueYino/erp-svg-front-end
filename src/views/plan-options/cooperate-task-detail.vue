<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>配合任务开始。。。。。。。。。。</div>
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
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="配合任务部门：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="检查人：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务类型：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务等级：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="状态：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="交办人：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="开始时间：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="结束时间：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务名称：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="秘书：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="重点级别：">
                        <el-checkbox-group v-model="focusLevelCheckList" disabled="true">
                            <el-checkbox label="集团重点"></el-checkbox>
                            <el-checkbox label="公司重点"></el-checkbox>
                            <el-checkbox label="部门重点" disabled></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>  
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="责任人：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="工作标准：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="描述：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
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
        </el-form>
        </el-dialog>
      <div>配合任务结束。。。。。。。。。</div>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowCooTaskDetailDataObj: Object,
        rowCooTaskDetailtype:Boolean,
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
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '参数名称'
                },
                {
                    key: 'key3',
                    title: '期权数值'
                },
                {
                    key: 'key4',
                    title: '计量单位'
                },
            ],
            tableData:[],
        }
    },
    methods: {
    },
    watch:{
        rowCooTaskDetailtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowCooTaskDetailtype;
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