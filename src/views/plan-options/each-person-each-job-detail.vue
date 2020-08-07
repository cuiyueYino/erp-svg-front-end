<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>一岗一表开始。。。。。。。。。。</div>
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :rules="rules"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="12">
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
                    <el-form-item label="岗位：" prop="job">
                        <el-input v-model="formdata.gangwei"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：" prop="version">
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
      <!-- 计划部门弹窗  -->
      <el-dialog title="选择计划部门" 
      class="add-user"
        center
        width="50%"
      :visible.sync="isDeartPopVisible"
      append-to-body
      :close-on-click-modal="false">
       <div v-show="true">
          <el-tree
              :data="treeData2"
              :props="defaultProps"
               ref="treeData2"
              node-key="id"
              :render-content="renderContent"
              accordion
              show-checkbox
              :default-expanded-keys="checkdata"
              :default-checked-keys="checkdata"
              @node-click="nodeClick">
          </el-tree>
       </div>
         <div slot="footer" class="dialog-footer">
            <el-button @click="isDeartPopVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPeople()">确 定</el-button>
        </div>
      </el-dialog>
      <div>一岗一表结束。。。。。。。。。</div>
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
             rules: {
                job:[{ required: true, message: '请输入岗位', trigger: 'blur' }],
                version:[{ required: true, message: '请输入版本号', trigger: 'blur' }]
            },
            //fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},],
            isDeartPopVisible:false,
            fenddate:'',
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
            isEdit: false,
            isLook:false,
             defaultProps: {
                children: 'children',
                label: 'label'
                },
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
            peopleTableForm:{
                zhibiaoku: "",
                guanjinzhibiao: "",
                zizhibiao:'',
                dingyizhibiao:'',
                kaopingfangfa:'',
                beizhu:''
            },
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
        // 图片上传的限制方法
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 导出
        upload() {
            //this.$api.confMangement.confUsageDetailExport();
            console.log("导出年计划编制");
        },
        // 生成任务
        generateTask() {
            //this.$api.confMangement.confUsageDetailExport();
            console.log("生成任务");
        },
        // 月度配合任务
        monthCooperateTask() {
            //this.$api.confMangement.confUsageDetailExport();
            console.log("月度配合任务");
        },
        // 选择 计划部门 方法
        PlanDep() {
            this.isDeartPopVisible = true
        },
        addPeople(){
            this.isDeartPopVisible =false
            this.formdata.jihuabumen = "IT开发部"
            },
        //树结构点击事件
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data) {
            console.log(data);
        },
        MoreSearchPS(){

        },
        handleClick(){

        }
    },
    watch:{
        //新建一岗一表行数据清空
        peopleJobgsTableVisible(val){
            switch (val) {
                case false:
                    this.$refs['peopleTableForm'].resetFields();
                    this.checked = false;
                break;
            
                default:
                break;
            }
            },
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
<style lang='scss'>
.btn-file {
    margin-bottom:5px;
    text-align:right;
}
.btn-wrapper {
    text-align:right;
    margin-bottom:5px;
}
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