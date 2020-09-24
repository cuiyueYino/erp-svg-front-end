<template>
    <div>
        <el-dialog title="工作流监控" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="当前流程" >
                                <el-input v-model="formdata.curProcess" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="审批类型" >
                                <el-select v-model="formdata.auditType" value-key="value" v-bind:disabled="disabled">
                                    <el-option
                                        v-for="item in auditTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="来源节点">
                                <el-input v-model="formdata.srcNodeName" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="当前节点" >
                                <el-input v-model="formdata.curNodeName" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="业务工作" >
                                 <el-input v-model="formdata.activityName" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="业务数据">
                                <el-input v-model="formdata.metaClassName" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22"> 
                            <el-form-item label="节点参与者" >
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
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"> 
                            <el-form-item label="选择目标节点" >
                                <el-input v-model="formdata.documentNo" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22"> 
                            <el-form-item label="流转方式" >
                                <el-row>
                                    <el-col :span="20">
                                        <el-radio v-model="formdata.radio" label="1">略过当前节点直接流转到目标节点</el-radio>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="20">
                                        <el-radio v-model="formdata.radio" label="2">退回到目标节点，删除退回路径上的所有邮件及审批信息</el-radio>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"> 
                            <el-form-item label="当前审批人" >
                                <el-input v-model="formdata.currReviewers" size="mini" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj" rowDataprocesstype='0' :rowDataprocessOid="rowDataprocessOid"  @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
            <span slot="footer" v-if="LookOrupdate" class="dialog-footer">
                <el-button type='warning' icon='el-icon-close' size="small" @click="handleClose">取消</el-button>
                <el-button type='success' icon='el-icon-copy-document' size="small" @click="saveNewAndEdit()">提交</el-button>
            </span>
        </el-dialog>
        <erpDialog erpDialogwidth="false" title="选择目标节点" :dialogShow="ReviewVisible">
            <!-- 岗位表格 -->
            <dynamic-table 
                :columns="jdcolumns" 
                :table-data="tableDataJD" 
                :isShowPager="false"
                @selection-change="onSelectionChange" 
                v-loading="false" 
                :height="300"
                element-loading-text="加载中"
                >
            </dynamic-table>
            <div slot="footer">
                <el-button type='success' size="small" icon='el-icon-check' @click="submitMethodGW">确定</el-button>
                <el-button type='warning' icon='el-icon-close' size="small" @click="jDVisibleGW">取消</el-button>
            </div>
        </erpDialog>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import UserTree from './user-tree-search.vue';
import processnodelist from '../../views/comment/process-node-list.vue';
export default {
    props: {
        rowCWMDataObj: Object,
        rowCWMtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        UserTree,
        processnodelist
    },
    inject: ['reload'],
    data(){
        return{
            ReviewVisible:false,
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:true,
            LookOrupdate:false,
            rowUTStype:false,
            rowUTSDataObj:{},
            rowDataprocessOid:{},
            rowDataprocessObj:[],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            JDtype:'',
            mailDetail:{},
            auditMsg:[],
            participatorList:[],
            reviewerList:[],
            columns:[
                {
                    key: 'participatorTypeName',
                    title: '类别'
                },
                {
                    key: 'content',
                    title: '内容'
                },
                {
                    key: 'expression',
                    title: '表达式'
                },
            ],  
            auditTypes:[
                {
                    value:1,
                    label:'普通审批'
                },{
                    value:2,
                    label:'并行会签'
                },{
                    value:3,
                    label:'串行会签'
                }
            ],
            formdata:{
                radio:'1',
            },
            tableData:[],
            objectoptions:new proData().project,
            tableDataJD:[],
            multipleSelection:[],
            jdcolumns: [
                {
                    type: "selection"
                },
                {
                    key: "fcode",
                    title: "节点编码"
                },
                {
                    key: "fname",
                    title: "节点名称"
                },
	        ],
        }
    },
    methods: {
        showDetail(){
            let data = {
                mailInfo:{
                    foid:this.rowCWMDataObj.foid,
                    srcOid:this.rowCWMDataObj.srcOid
                }
            }
            this.$api.processSet.getMailDetailInfo(data).then(res=>{
                let detailMsg = res.data.data
                this.mailDetail = detailMsg.mailDetail
                this.auditMsg = detailMsg.auditMsg
                this.rowDataprocessObj = detailMsg.auditMsg
                this.participatorList = detailMsg.participatorList
                this.reviewerList = detailMsg.reviewerList

                this.formdata.curProcess = detailMsg.mailDetail.curProcess
                this.formdata.auditType = detailMsg.mailDetail.auditType
                this.formdata.srcNodeName = detailMsg.mailDetail.srcNodeName
                this.formdata.curNodeName = detailMsg.mailDetail.curNodeName
                this.formdata.activityName = detailMsg.mailDetail.activityName
                this.formdata.metaClassName = detailMsg.mailDetail.metaClassName
                this.formdata.documentfoid="";
                this.formdata.documentNo=""
                this.tableData = detailMsg.participatorList

                let tmpReviewers = ''
                detailMsg.reviewerList.forEach(element => {
                    tmpReviewers += element.fname + ','
                });

                this.formdata.currReviewers = tmpReviewers.substring(0,tmpReviewers.length-1)

            },error=>{
                console.log(error)
            })
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
        submitMethodGW(){
            let SelectData=this.multipleSelection;
            if(SelectData.length == 0){
                this.$message.error("请选择岗位!");
            }else{
                if(SelectData.length == 1){
                    if(this.formdata.radio =='1'){
                        this.JDtype='1';
                    }else{
                        if(SelectData[0].fnodetype == 1){
                            this.$message.error("不能回退到起始节点!");
                            return;
                        }
                        this.JDtype='2';
                    }
                    this.formdata.documentNo=SelectData[0].fname;
                    this.formdata.documentfoid=SelectData[0].foid;
                    this.multipleSelection=[];
                    this.ReviewVisible=false;
                }else{
                   this.$message.error("只能选择一个岗位!");     
                } 
            }
        },
        jDVisibleGW(){
            this.ReviewVisible=false;
            this.multipleSelection=[];
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //查询目标节点
        MoreSearchPS(data){
            this.multipleSelection=[];
            let finandata=this.rowCWMDataObj.selectOption;
            let FroMData=[];
            FroMData.mailId=finandata[0].foid;
            FroMData.transType=data.radio;
            this.$api.processSet.getAllowJumpNodes(FroMData).then(res=>{
                if(res.data){
                    if(res.data.code ==0){
                        this.tableDataJD=res.data.data;
                        this.ReviewVisible=true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }else{
                    this.$message.error("获取节点失败!");
                }
            },error=>{
                console.log(error)
            })
        },
        //流程图
        showprocessData(data){
            console.log(data)
        },
        saveNewAndEdit(){
            if(this.formdata.documentNo == ''){
                this.$message.error('请选择目标节点！');
                return;
            }
            if(this.formdata.radio != this.JDtype){
                this.$message.error('流转方式和目标节点选择不一致！');
                return;
            } 
            let data = {
                userId:localStorage.getItem('ms_userId'),
                transType:this.formdata.radio,
                transNode:this.formdata.documentfoid,
                mailDetailInfo:{
                    foid:this.mailDetail.foid,
                    srcOid:this.mailDetail.srcOid
                },
            }
            this.$api.processSet.saveEdit(data).then(res=>{
                if(res.data){
                    if(res.data.code ==0){
                        this.ShowFinancVisible=false;
                        this.$emit('changeShow',true);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }else{
                    this.$message.error("保存失败!");
                }
            },error=>{
                console.log(error)
            })
        }
    },
    watch:{
        rowCWMtype(oldVal,newVal){
            if(this.rowCWMtype){
                if(oldVal){
                    this.showDetail()
                }
                this.ShowFinancVisible=this.rowCWMtype;
                let finandata=this.rowCWMDataObj.selectOption;
                let rowData= {};
                rowData.finanrowname = finandata[0].activityName;
                rowData.finanrowId = finandata[0].foid;
                rowData.nametitle = finandata[0].subject;
                this.rowDataprocessOid=rowData;
                let lookOrUpdate=this.rowCWMDataObj.lookflag;
                this.formdata.documentfoid="";
                this.formdata.documentNo=""
                if(lookOrUpdate ==='look'){
                    this.LookOrupdate = false;
                }else{
                    this.LookOrupdate = true;
                }
            }
        }
    }
}
</script>