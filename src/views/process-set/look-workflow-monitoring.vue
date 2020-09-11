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
                                <el-select v-model="formdata.auditType" value-key="value" disabled>
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
                        <el-col :span="22"> 
                            <el-form-item label="修改方式"  >
                                <el-row>
                                    <el-col :span="20">
                                        <el-radio v-model="formdata.radio" label="1">修改当前邮件审批人</el-radio>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="20">
                                        <el-radio v-model="formdata.radio" label="2">修改当前邮件审批人并删除已发送的即时消息</el-radio>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="20">
                                        <el-radio v-model="formdata.radio" label="3">委托处理（生成委托邮件和委托记录），当前邮件设为已办</el-radio>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"> 
                            <el-form-item label="当前审批人" >
                                <el-input v-model="formdata.currReviewers" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj" :rowDataprocessOid="rowDataprocessOid" @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
            <span slot="footer" v-if="LookOrupdate" class="dialog-footer">
                <el-button type="primary" @click="handleClose()">取消</el-button>
                <el-button @click="saveNewAndEdit()">提交</el-button>
            </span>
        </el-dialog>
        <UserTree  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import UserTree from './user-tree-search.vue';
import processnodelist from '../comment/process-node-list.vue';
export default {
    props: {
        rowLWMDataObj: Object,
        rowLWMtype: Boolean
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
            operationType:true,
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
                curProcess:'',
                auditType:'',
                srcNodeName:'',
                curNodeName:'',
                activityName:'',
                metaClassName:'',
                radio:'2',
                currReviewers:''
            },
            tableData:[],
            newReviewers:'',
            objectoptions:new proData().project,
        }
    },
    methods: {
        showDetail(){
            let data = {
                mailInfo:{
                    foid:this.rowLWMDataObj.foid,
                    srcOid:this.rowLWMDataObj.srcOid
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
            this.$emit('changeShow',false);
        },
        //人员查询
        MoreSearchPS(data){ 
            if(!this.LookOrupdate){
                return
            }
            this.rowUTStype = true;
            let finandata=data;
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="待办事项";
            finandata.FunctionType='人员查询';
            this.rowUTSDataObj=finandata;
        },
        //人员查询结果处理
        closeBaseInfo(data){
            if(data.length > 0){
                this.newReviewers = data
                let tmpReviewers = ''
                data.forEach(element => {
                    tmpReviewers += element.fname + ','
                });

                this.formdata.currReviewers = tmpReviewers.substring(0,tmpReviewers.length-1)
            }
            this.rowUTStype = false
        },
        //流程图
        showprocessData(data){
            console.log(data)
        },
        saveNewAndEdit(){
            if(this.newReviewers == ''){
                this.$message.error('审批人员没有发生变更！');
                return;
            }

            let reviewsIds = '';
            this.newReviewers.forEach(element => {
                reviewsIds += element.userid + ","
            });

            let data = {
                userId:localStorage.getItem('ms_userId'),
                modifyType:this.formdata.radio,
                mailDetailInfo:{
                    foid:this.mailDetail.foid,
                    srcOid:this.mailDetail.srcOid
                },
                newReviewers:reviewsIds.substring(0,reviewsIds.length-1)
            }
            this.$api.processSet.saveEdit(data).then(res=>{
                this.$emit('changeShow',true);
            },error=>{
                console.log(error)
            })
        }
    },
    watch:{
        rowLWMtype(oldVal,newVal){
            if(oldVal){
                this.showDetail()
            }
            this.ShowFinancVisible=this.rowLWMtype;
            let finandata=this.rowLWMDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            let lookOrUpdate=this.rowLWMDataObj.lookflag;
            if(lookOrUpdate ==='look'){
                this.LookOrupdate = false;
            }else{
                this.LookOrupdate = true;
            }
        }
    }
}
</script>