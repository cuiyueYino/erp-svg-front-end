<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="50%">
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
                        <el-tab-pane label="内容" name="first">
                            <quill-editor
                                v-model="formdata.fcontent"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)"
                            ></quill-editor>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <enclosurefile v-on:enclosureFile="enclosureFile" :rowDataFileObj="rowDataFileObj" @changeShow="showFileData" />
                        </el-tab-pane>
                        <el-tab-pane label="操作记录" name="third" v-if='isShowOperateRecord'>
                            <el-card class="box-card" >
                                <el-row :gutter="20"  class="el-row">
                                    <el-col :span="24">
                                        <dynamic-table
                                            class='dynamic-table'
                                            :columns="columns"
                                            :table-data="formdata1"
                                            :total="total"
                                            :page-num="pageNum"
                                            :page-size="pageSize"
                                            @current-change="onCurrentChange"
                                            :tableRowClassName="tableRowClassName"
                                            v-loading="false"
                                            element-loading-text="加载中"
                                            ></dynamic-table>
                                    </el-col>
                                </el-row>
                              </el-card>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="isShow" @click="handleClose">取 消</el-button>
                <el-button v-if="isShow" @click="tempSaveNewMenu">暂 存</el-button>
                <el-button v-if="isShow" @click="onHandleSave">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import enclosurefile from './enclosure-file.vue';
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';
import axios from 'axios';

export default {
    props: {
        rowNMMDataObj:Object,
        rowNMMtype: Boolean
    },
    components: {
        enclosurefile,
        DynamicTable,
        quillEditor
    },
    data(){
        return{
            // ------------文本编辑器---BEGIN-------------------------------------------------------------------------
            // fcontent: '',
            editorOption: {
                placeholder: '请输入内容',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                        ['blockquote', 'code-block'], //引用，代码块
                        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                        [{ list: 'ordered' }, { list: 'bullet' }], //列表
                        [{ script: 'sub' }, { script: 'super' }], // 上下标
                        [{ indent: '-1' }, { indent: '+1' }], // 缩进
                        [{ direction: 'rtl' }], // 文本方向
                        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
                        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                        [{ font: [] }], //字体
                        [{ align: [] }], //对齐方式
                        ['clean'], //清除字体样式
                        ['image'] //上传图片、上传视频
                    ]
                }
            },
            atctiveName: 'first',
            // ------------文本编辑器 ---END----------------------------------------------------------------------------
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
            formdata1:[],
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
            title:'',
            labelPosition: 'left',
            // 改变table行样式
            tableRowClassName(){},
            rules: {
                fcode:[{ required: true, message: '请输入编码', trigger: 'blur' }],
                fname:[{ required: true, message: '请输入名称', trigger: 'blur' }],
            },
            NewOrEditFlag:'',
            FiletableData: [],
            uploadFiles:[],
            attachmentData:[],
            delFileFoids:[],
        }
    },
    mounted(){
        //生成文档管理树结构
        // this.formdata.fcreatetime = new Date();
    },
    methods: {
        enclosureFile:function(event){
            //子组件传来的event中，fileFoid存在，代表要删除该文件。否则，为上传该文件
            if(event.fileFoid){
                this.delFileFoids.push(event.fileFoid);
            } else {
                this.uploadFiles.push(event);
            }
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //内容
                } else if (tabsname ==="second"){
                   //附件列表:附件查询
                    if(this.NewOrEditFlag==="EDIT" || this.NewOrEditFlag==="SHOW"){
                        this.findAttachmentInfosList();
                        this.rowDataFileObj.operateFlag = "QUERY";
                        this.rowDataFileObj.values = this.attachmentData;
                    }
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
        //分页查询菜单
        searchMenutable(data){
            let creator = localStorage.getItem('ms_userId');
            let fromdata=data;
            this.$api.documentManagement.getDocumentRecordByMasterid(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableArr=returndata.data.rows;
                    this.formdata1=tableArr;
                    this.total=returndata.data.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            }); 
        },
        //分页，下一页
        onCurrentChange(val){
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            this.searchMenutable(formDataA);
        },
        //附件
        showFileData(data){
            this.FiletableData=data;
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
        onHandleSave(){
            let fromDataS={};
            fromDataS=this.formdata;
            let SaveFlag=false;
            if(this.formdata.fcode){
                fromDataS.fcode=this.formdata.fcode;
                SaveFlag=true;
            }else{
                this.$message.error('请输入编号!');
                SaveFlag=false
            }
            if(this.formdata.fname){
                fromDataS.fname=this.formdata.fname;
                SaveFlag=true;
            }else{
                this.$message.error('请输入名称!');
                SaveFlag=false
            }
            if(this.NewOrEditFlag==="NEW"){
                fromDataS.creator=localStorage.getItem('ms_userId');
            }else{
                fromDataS.handler=localStorage.getItem('ms_userId');
            }
            if(this.NewOrEditFlag==="NEW"){
                this.saveNewMenu(fromDataS);
            }else{
                this.saveEditmenu(fromDataS);
            }
        },
        //根据 ID 查询文档管理
        findDocManageById(data){
            let formDataA =data;
            this.$api.documentManagement.findDocumentManageById(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.formdata = tableDataArr;
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
                    this.formdata1 = tableDataArr.rows;
                    this.total=tableDataArr.total;
                } else {
                    this.$message.success('查询操作纪录失败!');
                }
            });
        },
        //提交：新建
        saveNewMenu(data){
            let foid ='';
            data.fpid = this.rowNMMDataObj.fpid;
            let formDataA =data;
            let creator = localStorage.getItem('ms_userId'); 
            formDataA.fcreator = creator;
            formDataA.fistop = '2';
            formDataA.fdocstatus = '2';
            formDataA.fstatus = 2;
            this.$api.documentManagement.insertDocumentManage(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data) {
                    foid = responsevalue.data.data;
                    //上传附件
                    if(this.uploadFiles != null){
                        this.uploadFile("document",foid);
                    }
                    this.$message.success('新建成功!');
                    this.ShowFinancVisible=false;
                    this.$emit('changeShow',false);
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        },
        //暂存：新建
        tempSaveNewMenu(data){
            data.fpid = this.rowNMMDataObj.fpid;
            let formDataA =data;
            let creator = localStorage.getItem('ms_userId'); 
            formDataA.fcreator = creator;
            formDataA.fistop = '2';
            formDataA.fdocstatus = '1';
            formDataA.fstatus = 1;
            this.$api.documentManagement.insertDocumentManage(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data) {
                    foid = responsevalue.data.data;
                    //上传附件
                    if(this.uploadFiles != null){
                        this.uploadFile("document",foid);
                    }
                    this.$message.success('暂存成功!');
                    this.ShowFinancVisible=false;
                    this.$emit('changeShow',false);
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        },
        //修改文档管理提交
        saveEditmenu(data){
            let files = this.rowDataFileObj;
            let foid = this.formdata.foid;
            let attachment ={};
            let formDataA =data;
            this.$api.documentManagement.updateDocumentManage(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data) {
                    //修改成功后附件上传或删除
                    if(this.uploadFiles != null){
                        this.uploadFile("document",foid);
                    }
                    if(this.delFileFoids != null){
                        this.delFile();
                    }
                    this.$message.success('修改成功!');
                    this.ShowFinancVisible=false;
                    this.$emit('changeShow',false);
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        },
        //附件上传
        uploadFile(menuCode,voucherId){
            if(menuCode==""||menuCode===undefined||menuCode==null){
                layer.alert("请填写menuCode");
                return;
            }
            if(voucherId==""||voucherId===undefined||voucherId==null){
                layer.alert("请填写voucherId");
                return;
            }
            let creator = localStorage.getItem('ms_userId');
            var formData = new FormData();
            // formData.append('files', this.uploadFiles);
            let length = this.uploadFiles.length;
            let count = 0;
            for(var i=0; i < length; i++ ){
                formData.append('file', this.uploadFiles[0]);
                formData.append('menuCode',menuCode);
                if(creator){
                    formData.append('userCode',creator);
                } else {
                    formData.append('userCode','test');
                }
                formData.append('voucherId',voucherId);
                // this.$api.documentManagement.uploadFileBatch(formData).then((response) => {
                this.$api.documentManagement.uploadFile(formData).then((response) => {
                    if(response.data.code == 0 && response.data.data){
                        count++;
                    }
                });
            }
        },
        //删除附件
        delFile(){
            debugger
            let ids = '';
            let list = this.delFileFoids.forEach(element => {
                ids = ids + '\'' + element +'\','
            });
            ids = ids.substring(0,ids.length-1)
            this.$api.documentManagement.deleteInfoByIds(ids).then((response) => {
                console.log(response.data);
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
            this.isShowOperateRecord = true;
            this.isShow = true;
            this.isEdit = false;
            this.ShowFinancVisible=this.rowNMMtype;
            this.title=this.rowNMMDataObj.nametitle;
            this.NewOrEditFlag=this.rowNMMDataObj.NewOrEditFlag;
            if(this.rowNMMDataObj.NewOrEditFlag==="NEW"){
                this.isShowOperateRecord = false;
                this.formdata={};
                this.formdata.flevel=this.rowNMMDataObj.flevel; 
                this.formdata.fcreator = localStorage.getItem('ms_username');
                this.formdata.fcreatetime =new Date() ;
            } else if (this.rowNMMDataObj.NewOrEditFlag==="EDIT"){
                let fromdataA={};
                fromdataA.foid=this.rowNMMDataObj.foid;
                this.findDocManageById(fromdataA);
            } else if (this.rowNMMDataObj.NewOrEditFlag==="SHOW"){
                this.isShow = false;
                this.isEdit = true;
                let fromdataA={};
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
</style>