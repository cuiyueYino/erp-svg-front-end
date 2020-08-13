<template>
    <div>
        <!-- 搜索框 -->
        <el-row :gutter="24">
                <el-col :span="6" :offset="18">
                    <el-button type="success" icon="el-icon-more" plain @click="editCDD">发送</el-button>
                    <el-button type="success" icon="el-icon-coin" plain @click="saveCDD">暂存</el-button>
                </el-col>
        </el-row>
        <el-form 
            :model="formData" 
            label-width="100px"
            class="dataForm"
            size="mini"
            :label-position="labelPosition">
            <el-row>
                <el-col :span="14">
                    <el-form-item label="主送" prop="addresseeName">
                        <el-input clearable size="small" v-model="formData.addresseeName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="text" @click="AddToUser('addressee',false)"><i class="el-icon-plus"></i>添加</el-button>
                    <el-button type="text" @click="clearAddToUser('addressee')"><i class="el-icon-delete"></i>清空</el-button>
                    <el-button type="text" @click="ShoWAddCCUser"><i class="el-icon-edit-outline"></i>{{ShoWAddCC==true?'隐藏抄送':'添加抄送'}}</el-button>
                </el-col>
            </el-row>
            <el-row v-if="ShoWAddCC==true">
                <el-col :span="14">
                    <el-form-item label="抄送" prop="duplicateName">
                        <el-input clearable size="small" v-model="formData.duplicateName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="text" @click="AddToUser('duplicate',false)"><i class="el-icon-plus"></i>添加</el-button>
                    <el-button type="text" @click="clearAddToUser('duplicate')"><i class="el-icon-delete"></i>清空</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="主题" prop="subject">
                        <el-input clearable size="small" v-model="formData.subject"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="内容" name="first">
                            <quill-editor
                                v-model="content"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)"
                            ></quill-editor>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <enclosurefile :rowDataFileObj="rowDataFileObj"  @changeShow="showFileData"/> 
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </el-form>

        <el-dialog  :title="dialogName" :visible.sync="dialogTree" width="50%" close-on-press-escape>
            <div>
                <el-card>
                    <el-row :gutter="24">
                        <el-col :span="5">
                            <el-input v-model="treeSearchVal" placeholder="根据姓名搜索"  prefix-icon="el-icon-search" clearable size="mini"/>
                        </el-col >
                        <el-col :span="3">
                            <el-button el-button type="primary" @click="treeSearch" icon="el-icon-search" size="mini">搜索</el-button>
                        </el-col>
                        <el-col :span="16" style="text-align: right;">
                            <el-button @click="choiceTree" size="mini">确定</el-button>
                            <el-button @click="dialogTree=false" size="mini">取消</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <div class="treeStyle">
                <el-tree
                :destroy-on-close="true"
                :data="treeData"
                ref="tree"
                
                show-checkbox
                node-key="oid"
                :default-checked-keys="defautChecked"
                :props="defaultProps">
                </el-tree>
            </div>
           
        </el-dialog>



    </div>
</template>
<script>
import enclosurefile from '../comment/enclosure-file.vue';
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';
export default {
    components: {
        enclosurefile,
        quillEditor
    },
    data(){
        return{
            //文本编辑器
            content: '',
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
            formData:{
                subjcet:'',
                senderName:'',
                addresseeName: '',
                duplicateName: '',
                addresseeList: {
                    oid: '',
                    name: ''
                },
                duplicateList: {
                    oid: '',
                    name: ''
                },
            },
            defautltAddressee: [],
            defautltDuplicate: [],
            treeTpye : '',

            ShoWAddCC:false,
            dialogTree: false,
            labelPosition: 'left',
            atctiveName:'first',
            rowDataFileObj:{},

            dialogName: '',
            treeData: [],
            treeSearchVal: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            defautChecked:[],
            // [{oid:'BFPID000000LSN000E',name:'聂立虹'},{oid:'BFPID000000LSN000M',name:'李阳'}],
        }
    },
    created(){
        this.$nextTick(() => {
            this.persetParam();
        });
        console.log("进入写信");
    },
    mounted() {
    },
    computed:{
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    props: {
        perData:{
            type: Object
        }
    }, 
    methods:{
        //滑块切换
        // handleClick(tab){
        //     var tabsname =tab.paneName;
        //     if(tabsname){
        //         if(tabsname ==="first"){
        //             //
        //         }else if(tabsname ==="second"){
        //             //
        //             this.financingCVMListtype=true;
        //         }else{
        //             //附件列表
        //             this.financingEFListtype=true;
                    
        //         }
        //     }
        // },
        //附件
        showFileData(data){
            this.FiletableData=data;
        },

        /**
         * 发送
         */
        editCDD(){
            let reqParam = {
                subject:this.formData.subject,
                content:this.content,
                sender:'',
                senderName:'',
                status:2,
                addresseeList:this.formData.addresseeList,
                duplicateList:this.formData.duplicateList
            }
            this.$api.insideMail.getSendMail(reqParam)
        },

        /**
         * 暂存
         */
        saveCDD(){
            let reqParam = {
                subject:this.formData.subject,
                content:this.content,
                sender:'',
                senderName:'',
                status:1,
                addresseeList:this.formData.addresseeList,
                duplicateList:this.formData.duplicateList
            }

        },
        /**
         * 添加 主送/抄送用户点击事件
         */
        AddToUser(data,flag){
             if(!flag){
                this.treeSearchVal='';
            }
            let param = {
                name: this.treeSearchVal
            }
           
            this.$api.jobUserManagement.addDepartData(param).then(res => {
                if(res.data.code === 0){
                    let data = res.data.data;
                    this.treeData = this.makeTree(data);
                }else{
                    this.$message.error(res.data.msg)
                }
            })
            if(data=="addressee"){
                this.dialogName = "选择主送人"
                this.defautChecked = this.defautltAddressee;
                this.treeTpye = 'addressee';
            }else if(data=="duplicate"){
                this.dialogName = "选择抄送人"
                this.defautChecked = this.defautltDuplicate;
                this.treeTpye = 'duplicate';
            }
            this.dialogTree=true;
        },
        treeSearch(){
            this.AddToUser(this.treeTpye,true)
        },
         /**
         * 清空 主送/抄送用户点击事件
         */
        clearAddToUser(data){
            console.log(data)
        },

        /**
         * 添加抄送显示隐藏控制
         */
        ShoWAddCCUser(){
            if(this.ShoWAddCC == true){
                this.ShoWAddCC=false;
            }else{
                this.ShoWAddCC=true;
            }
        },

        /**
         * 失去焦点事件
         */
        onEditorBlur() {}, 
        /**
         * 获得焦点事件
         */
        onEditorFocus(event) {
            if (this.formDisabled == true) {
                event.enable(false);
            } else {
                event.enable(true);
            }
        },
        /**
         * 内容改变事件
         */
        onEditorChange() {},


        /**
         * 预设值（回复，转发，编辑跳转带过来的值）
         */
        persetParam(){
            if(this.perData!=null){
                this.content = this.perData.content,
                this.formData.subject= this.perData.subject
                this.formData.addresseeName = this.perData.addresseeName
            }
           this.$parent.$parent.$parent.clearPerData();
        },

        /**
         * 人员选择后数据回写
         */
        choiceTree(){
            if(this.treeTpye=="addressee"){
                let staffList = this.$refs.tree.getCheckedNodes(true)
                this.formData.addresseeList = staffList;
                let nameString= '';
                let checkId=[];
                // 自动勾选数据,名字回显
                for(let i=0;i<staffList.length;i++){
                    nameString += staffList[i].name+",";
                    checkId.push(staffList[i].oid);
                };
                if(nameString!=''){
                    nameString = nameString.slice(0,nameString.length-1);
                }
                this.formData.addresseeName = nameString;
                this.defautltAddressee = checkId;
                this.addresseeList = staffList;

            }else if(this.treeTpye=="duplicate"){
                let staffList = this.$refs.tree.getCheckedNodes(true)
                this.formData.duplicateList = staffList;
                let nameString= '';
                let checkId=[];
                for(let i=0;i<staffList.length;i++){
                    nameString += staffList[i].name+",";
                    checkId.push(staffList[i].oid);
                };
                if(nameString!=''){
                    nameString = nameString.slice(0,nameString.length-1);
                }
                this.formData.duplicateName = nameString;
                this.defautltDuplicate = checkId;
                this.duplicateList = staffList;
            }

            this.dialogTree= false;
        },


        /**
         * 拼装树结构
         */
        makeTree(data){
            let treeData = []
            for (let i=0;i<data.length;i++) {
                let departmentList  = data[i].department;
                let treeDepartmentList = [];
                for(let n=0;n<departmentList.length;n++){
                    let staffList = departmentList[n].staff
                    let treeStaffList = [];
                    for(let m=0;m<staffList.length;m++){
                        let treeSraff = {
                            oid : staffList[m].staffOid,
                            name : staffList[m].staffName
                        }
                        treeStaffList.push(treeSraff);
                    }
                    let department = {
                        oid: departmentList[n].id,
                        name: departmentList[n].name,
                        children: treeStaffList
                    }
                    treeDepartmentList.push(department);
                }
                let group = {
                    oid: data[i].oid,
                    name: data[i].name,
                    children: treeDepartmentList,
                }
                treeData.push(group);
            }
            return treeData
        }
    }
}
</script>
<style lang='scss' scoped>
/deep/.ql-editor{
    height:400px;
}

.treeStyle{
    height: 500px; overflow: auto;
}

</style>