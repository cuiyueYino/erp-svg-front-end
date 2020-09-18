<template>
    <div>
        <!-- 搜索框 -->
        <el-row :gutter="24">
                <el-col :span="6" :offset="18">
                    <el-button type="primary" icon="el-icon-s-promotion" size="small" plain @click="editCDD">发送</el-button>
                    <el-button type="success" icon="el-icon-folder-remove" size="small" plain @click="saveCDD">暂存</el-button>
                </el-col>
        </el-row>
        <el-form
            :model="formData"
            label-width="100px"
            class="dataForm"
            size="mini"
            :rules="rules"
            :label-position="labelPosition">
            <el-row>
                <el-col :span="14">
                    <el-form-item label="主送" prop="addresseeName">
                        <el-input size="small" v-model="formData.addresseeName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="warning" size="small" @click="AddToUser('addressee',false,'2')"><i class="el-icon-plus"></i>添加</el-button>
                    <el-button type="el-icon-error" size="small" @click="clearAddToUser('addressee')"><i class="el-icon-delete"></i>清空</el-button>
                    <!--<el-button type="text" @click="ShoWAddCCUser"><i class="el-icon-edit-outline"></i>{{ShoWAddCC==true?'隐藏抄送':'添加抄送'}}</el-button>-->
                </el-col>
            </el-row>
            <!--<el-row v-if="ShoWAddCC==true">-->
            <el-row>
                <el-col :span="14">
                    <el-form-item label="抄送" prop="duplicateName">
                        <el-input size="small" v-model="formData.duplicateName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="warning" size="small" @click="AddToUser('duplicate',false,'2')"><i class="el-icon-plus"></i>添加</el-button>
                    <el-button type="el-icon-error" size="small" @click="clearAddToUser('duplicate')"><i class="el-icon-delete"></i>清空</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="主题" prop="subjectName">
                        <el-input clearable size="small" v-model="formData.subjectName" @input="change($event)" maxlength="3000"></el-input>
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
                            <enclosureFile ref="child" :enclosureConfig="enclosureConfig"/>
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
                            <el-button el-button type="primary" icon='el-icon-search' size="small" @click="treeSearch">搜索</el-button>
                        </el-col>
                        <el-col :span="16" style="text-align: right;">
                            <el-button type='success' size="small" icon='el-icon-check' @click="choiceTree">确定</el-button>
                            <el-button type='warning' icon='el-icon-close' size="small" @click="dialogTree=false">取消</el-button>
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
                node-key="foid"
                v-loading="loading"
                :default-checked-keys="defaultsChecked"
                @check-change="checkChange"
		:default-expanded-keys="treeDataObject"
                :props="defaultProps">
                </el-tree>
            </div>

        </el-dialog>



    </div>
</template>
<script>

import enclosureFile from './enclosure-file.vue';
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.snow.css';
export default {
    components: {
        enclosureFile,
        quillEditor
    },
    data(){
        return{
            searchFromPersonArrayNew:[],
            searchFromDuplicateArrayNew:[],
            treeDataObject:[],
            zancunCount:'',
            loading : true,
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
                id:'',
                subjcet:'',
                addresseeName: '',
                duplicateName: '',
                addresseeList: [],
                duplicateList: [],
            },
            defautltAddressee: [],
            defautltDuplicate: [],
            sender: localStorage.getItem('ms_staffId'),
            senderName: localStorage.getItem('ms_username'),
            treeTpye : '',

            ShoWAddCC:false,
            dialogTree: false,
            labelPosition: 'left',
            atctiveName:'first',

            dialogName: '',
            treeData: [],
            treeSearchVal: '',
            defaultProps: {
                children: 'children',
                label: 'fname'
            },
            defaultsChecked:[],

            // 附件
            enclosureConfig:{
                voucherId: '',
                isShowButton: true,
                menuCode: 'insideMail',
                isDownload:false,
                isSearch:true,
                haveAttachment:false,
                authStatus:false
            },

            rules: {
               subjectName: [
                    { required: true, message: "请输入主题", trigger: "blur" }
                ],
                addresseeName: [
                    { required: true, message: "请选择主送人", trigger: "blur" }
                ]
            }
        }
    },
    created(){
        // alert("编辑页面");
        this.$nextTick(() => {
            this.persetParam();
        });
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
        change(e) {
          this.$forceUpdate();
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //内容
                }else if(tabsname ==="second"){
                }else{
                }
            }
        },

        /**
         * 发送
         */
        editCDD(){
            let reqParam = {
                id: this.formData.id,
                subject:this.formData.subjectName,
                content:this.content,
                sender: this.sender,
                senderName: this.senderName,
                // sender:'BFPID000000LSN000E',
                // senderName:'聂立虹',
                status:2,
                addresseeList:this.formData.addresseeList,
                duplicateList:this.formData.duplicateList
            }
            this.$api.insideMail.sendInsideMail(reqParam).then(res=>{
                if(this.dataBack(res,"发送成功")){
                    this.enclosureConfig.voucherId = res.data.data;
                    this.$refs.child.upload();
                    this.$parent.$parent.$parent.toPage(null,"outbox");
                };
            })
        },

        /**
         * 暂存
         */
        saveCDD(){
            this.zancunCount ++;
            var zancunCount2 = this.zancunCount;
            if(zancunCount2 == 1){
            let reqParam = {
                id: this.formData.id,
                subject:this.formData.subjectName,
                content:this.content,
                sender: this.sender,
                senderName: this.senderName,
                // sender:'BFPID000000LSN000E',
                // senderName:'聂立虹',
                status:1,
                addresseeList:this.formData.addresseeList,
                duplicateList:this.formData.duplicateList
            }
            this.$api.insideMail.sendInsideMail(reqParam).then(res=>{
                if(this.dataBack(res,"成功存储")){
                    this.enclosureConfig.voucherId = res.data.data;
                    this.$refs.child.upload();
                    this.$parent.$parent.$parent.toPage(null,"drafts");
                };
            })
            }

        },
        /**
         * 添加 主送/抄送用户点击事件
         */
        AddToUser(data,flag,searchFlag){
            this.loading = true;
             if(!flag){
                this.treeSearchVal='';
            }
            let param = {
                name: this.treeSearchVal
            }
            this.$api.jobUserManagement.getStaffTree(param).then(res => {
                if(this.dataBack(res,"")){
                    let reqData =eval('(' +res.data.data+ ')') ;
                    // let reqData =res.data.data ;
                    // this.treeData = this.makeTree(reqData);
                    this.treeData = reqData;
                    this.operateUserTree(this.treeData);
                    let searchArray = reqData;
                    if(searchFlag == 'searchFlag') {
                        for(var i=0;i<searchArray.length;i++){
                            let company = searchArray[i].children;
                            if(company != undefined) {
                                for(var j= 0;j<company.length;j++) {
                                    let department = company[j].children;
                                    if(department != undefined) {
                                        for(var m= 0;m<department.length;m++){
                                            this.treeDataObject.push(department[m].foid);
                                            // let person = department[m].children;
                                            // if(person!= undefined) {
                                            //     // this.treeDataObject.push(person.foid);
                                            // }
                                        }
                                    }
                                }
                            }
                        }
                        console.log( this.treeDataObject)
                    }
                }
            })
            if(data=="addressee"){
                this.dialogName = "选择主送人"
                this.defaultsChecked = this.defautltAddressee;
                this.treeTpye = 'addressee';
            }else if(data=="duplicate"){
                this.dialogName = "选择抄送人"
                this.defaultsChecked = this.defautltDuplicate;
                this.treeTpye = 'duplicate';
            }
            this.dialogTree=true;
            let self=this
            setTimeout(function() {
                self.loading = false;
            }, 1000);
        },
        treeSearch(){
            this.AddToUser(this.treeTpye,true,'searchFlag')
        },
        // 选择人员树时，公司部门层级不可点击
        operateUserTree(staffTree) {
          this.treeData = [];
          for (let i in staffTree) {
            // 第一级
            if (staffTree[i].fstruid != undefined) {
              staffTree[i].disabled = true;
            }
            // 第二级
            let company = staffTree[i].children;
            for (let k in company) {
              if (company[k].fstruid != undefined) {
                company[k].disabled = true;
              }
              // 第三级
              let dept = company[k].children;
              for (let l in dept) {
                if (dept[l].fstruid != undefined) {
                  dept[l].disabled = true;
                }
              }
            }
          }
          this.treeData = staffTree;
        },
         /**
         * 清空 主送/抄送用户点击事件
         */
        clearAddToUser(data){
            if(data=="addressee"){
                this.formData.addresseeName = '';
                if(this.defautltAddressee!=null&&this.defautltAddressee.length!=0){
                    this.defautltAddressee.splice(0,this.defautltAddressee.length);
                }
                 if(this.formData.addresseeList!=null&&this.formData.addresseeList.length!=0){
                    this.formData.addresseeList.splice(0,this.formData.addresseeList.length);
                }
            }else if(data=="duplicate"){
                this.formData.duplicateName = '';
                if(this.defautltDuplicate!=null&&this.defautltDuplicate.length!=0){
                    this.defautltDuplicate.splice(0,this.defautltDuplicate.length);
                }
                 if(this.formData.duplicateList!=null&&this.formData.duplicateList.length!=0){
                     this.formData.duplicateList.splice(0,this.formData.duplicateList.length);
                }
            }
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
                this.formData.id = this.perData.id,
                this.content = this.perData.content,
                this.formData.subjectName= this.perData.subject + "";
                this.formData.addresseeList = this.perData.addresseeList
                this.enclosureConfig.voucherId = this.perData.mailCode;
                if(!this.perData.status){
                    this.enclosureConfig.haveAttachment = true;
                }
                 // 主送人自动勾选数据,名字回显
                let addresseeName= '';
                let defautltAddressee=[];
                for(let i in this.perData.addresseeList){
                    addresseeName += this.perData.addresseeList[i].fname+",";
                    defautltAddressee.push(this.perData.addresseeList[i].foid);
                }
                if(addresseeName!=''){
                    addresseeName = addresseeName.slice(0,addresseeName.length-1);
                }
                this.formData.addresseeName = addresseeName;
                this.defautltAddressee = defautltAddressee;

                //抄送人名字回显，自动勾选
                this.formData.duplicateList = this.perData.duplicateList;
                if(this.perData.typeFlag == 'draftsEdit') {
                    if(this.perData.duplicateList != null) {
                        let nameString= '';
                        let checkId=[];
                        for(let i=0;i<this.perData.duplicateList.length;i++){
                            nameString += this.perData.duplicateList[i].fname+",";
                            checkId.push(this.perData.duplicateList[i].foid);
                        };
                        if(nameString!=''){
                            nameString = nameString.slice(0,nameString.length-1);
                        }
                        this.formData.duplicateName = nameString;
                        this.defautltDuplicate = checkId;
                    }
                }



            }
           this.$parent.$parent.$parent.clearPerData();
        },

        checkChange(data,check){
            //去除人员之外的勾选项
            if(data.fstruid==undefined){
                if(this.treeTpye=="addressee"){
                    if(check){
                        this.formData.addresseeList.push(data)
                        this.defautltAddressee.push(data.foid)
                    }else {
                        //移除人员对象
                        for(let i=0,list=this.formData.addresseeList ;i<list.length;i++){
                            if(list[i].foid == data.foid){
                                this.formData.addresseeList.splice(i,1)
                            }
                        }
                        //移除勾选项
                        for(let i=0,list=this.defautltAddressee ;i<list.length;i++){
                            if(list[i] == data.foid){
                                this.defautltAddressee.splice(i,1)
                            }
                        }
                    }
                }else if(this.treeTpye=="duplicate"){
                    if(check){
                        this.formData.duplicateList.push(data)
                        this.defautltDuplicate.push(data.foid)
                    }else {
                        //移除人员对象
                        for(let i=0,list=this.formData.duplicateList ;i<list.length;i++){
                            if(list[i].foid == data.foid){
                                this.formData.duplicateList.splice(i,1)
                            }
                        }
                        //移除勾选项
                        for(let i=0,list=this.defautltDuplicate ;i<list.length;i++){
                            if(list[i] == data.foid){
                                this.defautltDuplicate.splice(i,1)
                            }
                        }
                    }
                }
            }
        },

        /**
         * 人员选择后数据回写
         */
        choiceTree(){

            if(this.treeTpye=="addressee"){
                let staffList = this.formData.addresseeList;
                let nameString= '';
                // 自动勾选数据,名字回显
                for(let i=0;i<staffList.length;i++){
                    nameString += staffList[i].fname+",";
                };
                if(nameString!=''){
                    nameString = nameString.slice(0,nameString.length-1);
                }
                this.formData.addresseeName = nameString;
            }else if(this.treeTpye=="duplicate"){
                let staffList = this.formData.duplicateList;
                let nameString= '';
                // 自动勾选数据,名字回显
                for(let i=0;i<staffList.length;i++){
                    nameString += staffList[i].fname+",";
                };
                if(nameString!=''){
                    nameString = nameString.slice(0,nameString.length-1);
                }
                this.formData.duplicateName = nameString;
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
                            foid : staffList[m].staffOid,
                            fname : staffList[m].staffName
                        }
                        treeStaffList.push(treeSraff);
                    }
                    let department = {
                        foid: departmentList[n].id,
                        fname: departmentList[n].name,
                        children: treeStaffList
                    }
                    treeDepartmentList.push(department);
                }
                let group = {
                    foid: data[i].oid,
                    fname: data[i].name,
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
