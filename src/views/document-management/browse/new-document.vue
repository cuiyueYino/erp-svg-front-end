<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="50%">
            <el-card>
                <el-row>
                    <el-col v-show="this.printFlg == '2'" :span="2" :offset="22">
                        <el-button type='info' size="small" icon='el-icon-printer' v-print="printObj" @click="printMethod">打印</el-button>
                    </el-col>
                </el-row>
            </el-card>
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                :model="formdata"
                size="mini"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="编码" >
                                <el-input v-model="formdata.fcode" :disabled="isEdit" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="名称" >
                                <el-input v-model="formdata.fname" :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="创建人">
                                <el-input v-model="formdata.fcreatorname"  :disabled="true" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="创建时间">
                                <el-date-picker
                                    style="width:100%"
                                    :disabled="true"
                                    v-model="formdata.fcreatetime"
                                    type="datetime"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formdata.fdescription" :rows="3" :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                            <el-tab-pane label="内容" name="first" >
                                <div id="print" >
                                    <p v-html="formdata.fcontent" ></p>
                                </div>
                                <!-- <quill-editor id="print"
                                    :disabled="isEdit"
                                    v-model="formdata.fcontent"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)"
                                ></quill-editor> -->
                            </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <enclosurefile :rowDataFileObj="rowDataFileObj" @changeShow="showFileData" />
                        </el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane label="              " disabled ></el-tab-pane>
                        <el-tab-pane :label="readCount"  name="four" disabled ></el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import enclosurefile from './enclosure-file.vue';
// import { quillEditor } from 'vue-quill-editor'; //调用编辑器
// import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';

export default {
    props: {
        rowNMMDataObj:Object,
        rowNMMtype: Boolean
    },
    components: {
        enclosurefile,
        // quillEditor
    },
    data(){
        return{
            readCount:"",
            atctiveName:'first',
            tableData:[],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns: [
                {
                    key: 'fstaffName',
                    title: '用户'
                },
                {
                    key: 'foperatetype',
                    title: '操作类型'
                },
                {
                    key: 'foperatetime',
                    title: '操作时间'
                }

            ],
            isShow:true,
            isEdit: false,
            ShowFinancVisible:false,
            rowBAtype:false,
            rowBADataObj:{},
            rowDataFileObj:{},
            formdata:{
                fisportalshow:false,
                fcreatetime:new Date(),
            },
            checked:false,
            printFlg:'',
            title:'',
            labelPosition: 'left',
            rules: {
                fcode:[{ required: true, message: '请输入编码', trigger: 'blur' }],
                fname:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                forder:[{ required: true, message: '请输入显示顺序', trigger: 'blur' }],
            },
            NewOrEditFlag:'',
            FiletableData: [],
            printContent:'',
            printObj: {
              id: "print",
            }
        }
    },
    created(){
    },
    mounted(){
    },
    methods: {
        printMethod(){
            this.printContent = this.formdata.fcontent;
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //内容
                } else if (tabsname ==="second"){
                    //附件列表:附件查询
                    this.findAttachmentInfosList();
                    this.rowDataFileObj.operateFlag = "QUERY";
                    this.rowDataFileObj.values = this.attachmentData;
                } else {
                     //操作记录数据获取
                }
            }
        },
        // 失去焦点事件
        onEditorBlur() {},
        // 获得焦点事件
        onEditorFocus(event) {
            if (this.formDisabled == true) {
                event.enable(false);
            } else {
                event.enable(true);
            }
        },
        // 内容改变事件
        onEditorChange() {},
        //附件
        showFileData(data){
            this.FiletableData=data;
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
        //根据 ID 查询文档浏览
        findDocManageById(data){
            let formDataA =data;
            this.$api.documentManagement.findDocumentManageById(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.formdata = tableDataArr;
                    //阅读量赋值label：重新加载 dom
                    this.$nextTick(() => {
                        this.readCount = "阅读量:("+this.formdata.freadcount+")";
                    });
                } else {
                    this.$message.success('查询失败!');
                }
            });

            formDataA.page=this.pageNum;
            formDataA.size=this.pageSize;
            this.$api.documentManagement.getDocumentRecordByMasterid(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.total=tableDataArr.total;
                } else {
                    this.$message.success('查询操作纪录失败!');
                }
            });
        },
        //附件查询
        findAttachmentInfosList(){
            let formDataA ={};
            let creator = localStorage.getItem('ms_userId');
            formDataA.voucherId = this.rowNMMDataObj.foid;
            formDataA.menuCode = 'document';
            if(creator){
                formDataA.userCode =  creator;
            } else {
                formDataA.userCode =  'test';
            }
            this.$api.documentManagement.findInfosList(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data) {
                    let values = responsevalue.data.data;
                    let rowObj = {};
                    rowObj.operateFlag ='QUERY';
                    //主表单的操作 //show标志传到附件中，控制 新增/删除 button隐藏
                    rowObj.masterOperateFlag = this.rowNMMDataObj.NewOrEditFlag;
                    rowObj.values = values;
                    this.rowDataFileObj = rowObj;
                    console.log(this.rowDataFileObj);
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        },
    },
    watch:{
        rowNMMtype(oldVal,newVal){
            this.atctiveName = 'first';
            this.isShow = true;
            this.isEdit = false;
            this.ShowFinancVisible=this.rowNMMtype;
            this.printFlg=this.rowNMMDataObj.printFlg;
            this.title=this.rowNMMDataObj.nametitle;
            this.NewOrEditFlag=this.rowNMMDataObj.NewOrEditFlag;
            if (this.rowNMMDataObj.NewOrEditFlag==="SHOW"){
                this.isShow = false;
                this.isEdit = true;
                let fromdataA={};
                fromdataA.from= '2';
                fromdataA.fuserid = localStorage.getItem('ms_userId'),
                fromdataA.foid=this.rowNMMDataObj.foid;
                this.findDocManageById(fromdataA);
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.el-form-item__label {
    text-align: left;
}
.red {
    color: #ff0000;
}
.dataForm {
    margin-top: 20px;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
}
</style>
<style lang='scss'>
.ql-editor{
    height:500px;
}
.dynamic-table{
    height:500px;
}
@page{
    size:  auto;   /* auto is the initial value */
    margin: 3mm;  /* this affects the margin in the printer settings */
  }

  html{
    background-color: #FFFFFF;
    margin: 0;  /* this affects the margin on the html before sending to printer */
  }
</style>
