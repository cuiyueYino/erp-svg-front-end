<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>部门月度计划开始。。。。。。。。。。</div>
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
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
                    <el-form-item label="月计划编号：">
                        <el-input v-model="formdata.yuejihuabianhao" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.banben"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度：">
                        <el-select v-model="formdata.years" value-key="value" v-bind:disabled="disabled">
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
                <el-col :span="6">
                    <el-form-item label="月度：">
                        <el-select v-model="formdata.month" value-key="value" v-bind:disabled="disabled">
                            <el-option  
                                v-for="item in monthData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="计划部门：">
                        <el-input v-model="formdata.jihuabumen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="PlanDep(formdata)"></el-button>
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
                            :disabled="false"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.jingbanren" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办日期：" :label-width="formLabelWidth" prop="fenddate">
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
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="月计划编制" name="first">
                    <el-row type="flex" justify="center">
                        <el-col :span="24" class="btn-wrapper">
                            <el-button type="primary" size="small" plain icon="el-icon-view" @click="monthCooperateTask">月度配合任务</el-button>
                            <el-button type="primary" size="small" plain icon="el-icon-download" @click="generateTask">生成任务</el-button>
                            <el-button type="primary" size="small" plain icon="el-icon-upload2" @click="upload">导 出</el-button>
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
                </el-tab-pane>
                <el-tab-pane label="附件" name="fourth">
                 <el-row>
                        <el-col :span="24" class="btn-file">
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary" icon="el-icon-download">文件上传</el-button>
                                
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-col>
                    </el-row>
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
      <div>部门月度计划结束。。。。。。。。。</div>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEACHPerEachJobDataObj: Object,
        rowDepartMonPlanDettype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
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
                    title: '任务类型'
                },
                {
                    key: 'key5',
                    title: '任务级别'
                },
                {
                    key: 'key6',
                    title: '周期性任务'
                },
                {
                    key: 'key7',
                    title: '工作名称'
                },
                {
                    key: 'key8',
                    title: '工作标准'
                },
                {
                    key: 'key9',
                    title: 'Q累计预计计划完成指标'
                },
                {
                    key: 'key10',
                    title: '计量单位'
                },
                {
                    key: 'key11',
                    title: '重点级别'
                },
                {
                    key: 'key12',
                    title: '开始时间'
                },
                {
                    key: 'key13',
                    title: '结束时间'
                },
                {
                    key: 'key14',
                    title: '责任人'
                },
                {
                    key: 'key15',
                    title: '协办人'
                },
                {
                    key: 'key16',
                    title: '秘书'
                },
                {
                    key: 'key17',
                    title: '检查人'
                },
                {
                    key: 'key18',
                    title: '交办人'
                },
                {
                    key: 'key19',
                    title: '完成情况'
                },
                {
                    key: 'key20',
                    title: '情况说明'
                },
                {
                    key: 'key21',
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
                {
                    key: 'key3',
                    title: '操作'
                },
            ],
            tableData:[],
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
        rowDepartMonPlanDettype(oldVal,newVal){
            this.ShowFinancVisible=this.rowDepartMonPlanDettype;
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