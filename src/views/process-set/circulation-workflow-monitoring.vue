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
                                <el-input v-model="formdata.awardcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="审批类型" >
                                <el-select v-model="formdata.project" value-key="value" v-bind:disabled="disabled">
                                    <el-option
                                        v-for="item in objectoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="来源节点">
                                <el-input v-model="formdata.contractname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="当前节点" >
                                <el-input v-model="formdata.awardcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="业务工作" >
                                 <el-input v-model="formdata.awardcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="业务数据">
                                <el-input v-model="formdata.contractname" v-bind:disabled="disabled"></el-input>
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
                            <el-form-item label="修改方式" >
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
                                <el-input v-model="formdata.documentNo" size="mini" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
            <span slot="footer" v-if="LookOrupdate" class="dialog-footer">
                <el-button type="primary" @click="ShowFinancVisible=false">取消</el-button>
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
import processnodelist from '../../views/finance/process-node-list';
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
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:true,
            LookOrupdate:false,
            rowUTStype:false,
            rowUTSDataObj:{},
            rowDataprocessObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns:[
                {
                    key: 'statusString',
                    title: '类别'
                },
                {
                    key: 'statusString',
                    title: '内容'
                },
                {
                    key: 'statusString',
                    title: '表达式'
                },
            ],  
            formdata:{
                radio:'',
            },
            tableData:[],
            objectoptions:new proData().project,
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',false);
        },
        //人员查询
        MoreSearchPS(data){ 
            this.rowUTStype = true;
            let finandata=data;
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="待办事项";
            this.rowUTSDataObj=finandata;
        },
        //人员查询结果处理
        closeBaseInfo(data){
            if(data === false){
                this.rowUTStype = false
            }else{
                this.rowUTStype = true
            }
        },
        //流程图
        showprocessData(data){
            console.log(data)
        },
        saveNewAndEdit(){

        }
    },
    watch:{
        rowCWMtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowCWMtype;
            let finandata=this.rowCWMDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            let lookOrUpdate=this.rowCWMDataObj.lookflag;
            if(lookOrUpdate ==='look'){
                this.LookOrupdate = false;
            }else{
                this.LookOrupdate = true;
            }
        }
    }
}
</script>