<template>
    <div >
        <el-form
            :model="formData"
            label-width="100px"
            class="dataForm"
            size="mini"
            :label-position="labelPosition">
            <el-row>
                <el-col :span="14">
                    <el-form-item label="发件人" prop="senderName">
                        <el-input  size="small" v-model="formData.senderName" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="主送" prop="addresseeName">
                        <el-input  size="small" v-model="formData.addresseeName" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="抄送" prop="duplicateName">
                        <el-input  size="small" v-model="formData.duplicateName" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="主题" prop="subject">
                        <el-input  size="small" v-model="formData.subject"  readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="发送时间" prop="sendTime">
                        <el-input  size="small" v-model="formData.sendTime" readonly></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <el-tabs v-model="atctiveName" @tab-click="changeTabs">
                        <el-tab-pane label="内容" name="article">
                            <quill-editor
                                v-model="content"
                                ref="myQuillEditor"
                                :options="editorOption"
                                style="height:400px"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)"
                            ></quill-editor>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="enclosure">
                            <enclosurefile :enclosureConfig="enclosureConfig"/>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <br/>
            <el-row>
                <el-col :span="14">
                    <el-button type="primary" @click="$parent.$parent.goBack()" icon="" size="mini">返回</el-button>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>
<script>
import enclosurefile from './enclosure-file.vue';
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';
export default {
    components: {
        enclosurefile,
        quillEditor
    },
    name: "insideMailDetail",
    data(){
        return{
            //文本编辑器
            content: '',
            editorOption: {
                placeholder: '请输入内容',
                modules: {
                    toolbar: null
                }
            },
            formData:{
                subject:"",
                senderName:"",
                duplicateName: "",
                addresseeName: "",
                addresseeList: {},
                duplicateList: {},
                sendTime:"",
            },
            formDisabled: true,
            labelPosition: 'left',
            atctiveName:'first',

            // 附件
            // 附件
            enclosureConfig:{
                voucherId: '',
                isShowButton: false,
                menuCode: 'insideMail',
                isDownload:true,
                isSearch:false,
            },
        }
    },
    props: {
        id: {
            type: String
        }
    },
    created(){

        this.atctiveName = "article",
        this.getDetail();
    },
    methods: {
        /**
         * 获取详情
         */
        getDetail(){
            if(this.id!=null&&this.id!=''){
                let reqParam = {
                    id: this.id
                }
                this.$api.insideMail.getMailById(reqParam).then(res => {
                    if(this.dataBack(res,"")){
                        let data = res.data.data;
                        this.formData.senderName = data.senderName;
                        this.formData.subject = data.subject;
                        this.formData.duplicateName = data.duplicateName;
                        this.formData.addresseeName = data.addresseeName;
                        this.formData.addresseeList = data.addresseeList;
                        this.formData.duplicateList = data.duplicateList;
                        this.formData.sendTime = data.sendTime;
                        this.content = data.content;
                        this.enclosureConfig.voucherId = data.mailCode;
                        this.showFileData(data.mailCode);
                    };
                })
            }
        },
        changeTabs(tab){
            let name = tab.name;
            this.atctiveName  = name
        },
        //附件
        showFileData(data){
        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus(event) {
            if (this.formDisabled == true) {
                event.enable(false);
            } else {
                event.enable(true);
            }
        }, // 获得焦点事件
        onEditorChange() {}, // 内容改变事件
    }
}
</script>
<style scoped>
</style>
