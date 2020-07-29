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
                    <el-form-item label="主送" prop="fcode">
                        <el-input clearable size="small" v-model="formData.fcode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="text" @click="dialogTree=true"><i class="el-icon-plus"></i>添加</el-button>
                    <el-button type="text" @click="clearAddToUser('ToUser')"><i class="el-icon-delete"></i>清空</el-button>
                    <el-button type="text" @click="ShoWAddCCUser"><i class="el-icon-edit-outline"></i>{{ShoWAddCC==true?'隐藏抄送':'添加抄送'}}</el-button>
                </el-col>
            </el-row>
            <el-row v-if="ShoWAddCC==true">
                <el-col :span="14">
                    <el-form-item label="抄送" prop="fcode">
                        <el-input clearable size="small" v-model="formData.fcode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="text" @click="AddToUser('CCUser')"><i class="el-icon-plus"></i>添加</el-button>
                    <el-button type="text" @click="clearAddToUser('CCUser')"><i class="el-icon-delete"></i>清空</el-button>
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

        <el-dialog title="收货地址" :visible.sync="dialogTree">
            <el-tree
            :destroy-on-close="true"
            :data="treeData"
            show-checkbox
            node-key="id"
            :default-checked-keys="defautChecked"
            :props="defaultProps">
            </el-tree>
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
            formData:{},
            ShoWAddCC:false,
            dialogTree: false,
            labelPosition: 'left',
            atctiveName:'first',
            rowDataFileObj:{},

            treeData: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            defautChecked:[5,6],
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
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //
                }else if(tabsname ==="second"){
                    //
                    this.financingCVMListtype=true;
                }else{
                    //附件列表
                    this.financingEFListtype=true;
                    
                }
            }
        },
        //附件
        showFileData(data){
            this.FiletableData=data;
        },
        editCDD(){

        },
        saveCDD(){

        },
        //添加 主送/抄送用户点击事件
        AddToUser(data){
            console.log(data)
        },
        //清空 主送/抄送用户点击事件
        clearAddToUser(data){
            console.log(data)
        },
        //添加抄送显示隐藏控制
        ShoWAddCCUser(){
            if(this.ShoWAddCC == true){
                this.ShoWAddCC=false;
            }else{
                this.ShoWAddCC=true;
            }
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

        persetParam(){
            if(this.perData!=null){
                this.content = this.perData.content,
                this.formData.fcode= this.perData.subject
            }
           this.$parent.$parent.$parent.clearPerData();
        }
    }
}
</script>
<style lang='scss' scoped>
/deep/.ql-editor{
    height:400px;
}
</style>