<template>
    <div>
        <div style="height:40px;float:right;">
            <el-button type="success" icon="el-icon-folder-add" size="small" style="magin-right:5px;" @click.prevent="addfileRow()" v-show="isShowButton">新增</el-button>
            <el-button type="danger" size="small" icon='el-icon-delete' @click.prevent="delfileData()" v-show="isShowButton">删除</el-button>
        </div>
        <div>
            <el-table
                :data="enclosuretableData"
                ref="table"
                size="mini"
                tooltip-effect="dark"
                border
                stripe
                style="width:100%;"
                @selection-change='selectfileRow'>
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <!-- <el-table-column label="文件类型" width="150px">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.filestyle" size="mini" value-key="value" v-bind:disabled="disabled">
                            <el-option
                                v-for="item in filestyleoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column> -->
                <el-table-column  label="文件" >
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.fileName" size="mini" style="padding:5px" readonly="readonly"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-upload
                                    action=""
                                    :disabled="authenStatus"
                                    :file-list="scope.row.fileList"
                                    :on-change="imgSaveToUrl"
                                    :show-file-list="false"
                                    :auto-upload="false">
                                    <el-button type="primary" slot="trigger" @click="addFile(scope.row)" icon="el-icon-search"  size="mini" ></el-button>
                                </el-upload>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary" icon="el-icon-download" @click="downLoadFile(scope.row)" size="mini" ></el-button>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary" icon="el-icon-view" @click="getHtmlPreviewAttachment(scope.row)" size="mini" ></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <!-- <template slot-scope="scope">
                        <input type="file"  id="fileExport" icon="el-icon-search" @change="handleFileChange(scope.row)" ref="inputer">
                    </template> -->
                </el-table-column>
                <!-- <el-table-column label="必须" >
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.filechecked" size="mini"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="编制单位" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="负责人" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="审核单位" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="审核人" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="定版日期" width="250px">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.value1"
                            type="date"
                            size="mini"
                            placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column  label="文档密级" align="center" width="220px">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="scope.row.awardcreditbreed" size="mini" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary"  icon="el-icon-search"  size="mini" @click="MoreSearchuserVisible = true"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column  label="保管期限" align="center" width="220px">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="scope.row.awardcreditbreed" size="mini" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchuserVisible = true"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="230px">
                    <template slot-scope="scope">
                        <el-input type="textarea" class="remark" size="mini" v-model="scope.row.remark" :rows="1"></el-input>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <PreAttachment :rowNMMtype="rowNMMtype" :rowNMMDataObj="rowNMMDataObj" @changeShow="showAddMenu"/>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import axios from 'axios';
import PreAttachment from './preview-attachment.vue';

export default {
    components: {
        PreAttachment
    },
    props: {
        rowDataFileObj:Object
    },
    inject: ['reload'],
    data(){
        return{
            enclosuretableData: [],
            rowNum: 1,
            isShowButton:true,
            selectfilelistRow:[],
            filestyleoptions:new proData().filestyle,
            disabled:false,
            MoreSearchuserVisible:false,
            rowNMMtype:false,
            authenStatus:false,
            rowNMMDataObj:{},
        }
    },

    methods: {
        addFile(data){
            if(data.filetype){
                if(data.filetype ==='downLoad'){
                    this.$message.error("非当前节点上传附件不能替换!");
                    this.authenStatus=true;
                }else{
                    this.authenStatus=false;
                }
            }
        },
        //附件预览
        getHtmlPreviewAttachment(row){
            //获取最后一个.的位置
            var index = row.fileName.lastIndexOf(".");
            //获取后缀
            var ext = row.fileName.substr(index+1);
            if(!this.isAssetTypeAnImage(ext)){
              this.$message.error("暂不支持该类型文件预览!");
              return;
            }
            //html方式
            this.$api.documentManagement.getHtmlPreviewAttachmentById(row.fileFoid).then(response => {
            //pdf方式
            // this.$api.documentManagement.getPdfPreviewAttachmentById(row.fileFoid).then(response => {
                let responsevalue = response;
                let value =response.data.data;
                if (value) {
                    this.rowNMMtype = true;
                    //子组件传值
                    let finandata={};
                    finandata.value = value;
                    this.rowNMMDataObj=finandata;
                } else {
                    this.$message.success('查询失败!');
                }
            });
        },
        //是否是文件
        isAssetTypeAnImage(ext) {
          return [
            'xlsx', 'xls', 'doc', 'docx', 'pdf'].
          indexOf(ext.toLowerCase()) !== -1;
        },
        //是否展示dialog弹窗
        showAddMenu(type){
            if(type === false){
                this.rowNMMtype = false;
            }else{
                this.rowNMMtype = true;
            }
            // this.reload();
        },
        //下载文件
        downLoadFile(row){
            //拦截器放入token
            axios.interceptors.request.use(
            config => {
                    if(localStorage.getItem('ms_tokenId')){
                        config.headers.Authorization = 'bearer '+localStorage.getItem('ms_tokenId');
                    }
                    return config;
                },
                error => Promise.error(error)
            );
            axios({
                    method: 'post',
                    url: '/api/interfaces/attachment/downloadFile',
                    params: {
                        attachmentId: row.fileFoid
                    },
                    responseType: 'blob'
                }).then(response => {
                    this.download(response,row.fileName);
                }).catch((error) => {

                })
        },
        //下载文件
        download (data,fileName) {
            if (!data) {
                return
            }
            let url = window.URL.createObjectURL(new Blob([data.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // let fileName = decodeURIComponent(data.headers.realname);
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
        },
        //选取图片后自动回调，里面可以获取到文件 //参数形式：imgSaveToUrl(event或file) -- event.raw ：获取到File对象
        imgSaveToUrl(event){
            let tableLen = this.enclosuretableData.length;
            let localFile = event.raw; //选中的File对象
            let tval =  this.enclosuretableData[tableLen - 1];
            tval.fileName = event.name;
            this.enclosuretableData.splice(tableLen - 1, 1);
            this.enclosuretableData.push(tval);
            //选中的文件传给父组件
            this.$emit('enclosureFile', event.raw);
        },
        // 获取附件表格选中时的数据
        selectfileRow (val) {
            this.selectfilelistRow = val;
        },
        // 增加附件行
        addfileRow () {
            var list = {
            rowNum:this.rowNum,
            filetype:'new',
            filestyle:'',
            awardfile: '',
            remark:''
            };
            this.enclosuretableData.push(list);
            this.rowNum += 1;
        },
        // 删除选中附件行
        delfileData () {
            if(this.selectfilelistRow.length < 1){
                this.$message.error("请选择一行数据!");
                return
            }
            let downLoadS='';
            for (let i = 0; i < this.selectfilelistRow.length; i++) {
                let val = this.selectfilelistRow;
                if(val.id){

                }
                val.forEach((val, index) => {
                    this.enclosuretableData.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            if(v.filetype=='downLoad'){
                                downLoadS+=v.fileName+','
                            }else{
                                // i 为选中的索引
                                this.enclosuretableData.splice(i, 1);
                                this.$emit('enclosureFile', v);
                            }
                            // i 为选中的索引
                            //this.enclosuretableData.splice(i, 1);
                            //this.$emit('enclosureFile', v);
                        }
                    })
                })
            }
            if(downLoadS !=''){
                downLoadS=downLoadS.slice(0,downLoadS.length-1);
                this.$message.error(downLoadS+" 是非当前节点上传的附件,不能删除!");
            }
            // 删除完数据之后清除勾选框
            this.$refs.table.clearSelection();
        },
        MoreSearchfileVisile(data){
            this.$emit('changeShow',data);
        },
        handleFileChange(event){
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            // event.file = inputDOM.files[0];
            /*this.errText = '';

            let size = Math.floor(this.file.size / 1024);
            console.log(this.file)
            //new一个FileReader实例
            let reader = new FileReader();
            let _this = this;
            // reader.readAsText(this.file)  //文本读取，默认utf-8，格式 其他格式：reader.readAsText(this.file, "GBK")
            reader.readAsDataURL(this.file)  //base 64 读取
            reader.onload=function(e){
                // 读取结果
                console.log(this.result)
                // if (size > ...) {
                //     // 这里可以加个文件大小控制
                //     return false
                // }
            }*/
            console.log(event);
            this.$emit('enclosureFile', event.file);

        }
    },
    watch:{
        //监控父组件附件Tab切换
        rowDataFileObj(oldVal,newVal){
            if(this.rowDataFileObj.operateFlag==="QUERY"){
                //父组件传来的附件集合
                let attachments = this.rowDataFileObj.values;
                let flag = true;
                for(var i= 0;i<attachments.length;i++){
                    let attachment = attachments[i];
                    for(var j= 0;j<this.enclosuretableData.length;j++){
                        if(attachment.fileName == this.enclosuretableData[j].fileName){
                            flag = false;
                        }
                    }
                    if(flag){
                        var list = {
                            rowNum: this.rowNum,
                            fileName: attachment.fileName,
                            fileFoid: attachment.id,
                            filetype:'downLoad'
                        };
                        this.enclosuretableData.unshift(list);
                        this.rowNum += 1;
                    }
                    flag = true;
                }
            }
            // 查看操作的话隐藏按钮
            if(this.rowDataFileObj.NewOrEditFlag==="SHOW"){
                this.isShowButton = false;
                this.authenStatus = true;
            } else {
                this.isShowButton = true;
                this.authenStatus = false;
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
.mr10 {
    margin-right: 10px;
}
.topinput {
    width: 100px;
}
.topselect {
    width: 242px;
}
.datatable {
    margin-top: 20px;
}
.dataForm {
    margin-top: 10px;
}
.elrowStyle {
    margin-top: 20px;
}
.elColCenter {
    text-align: center;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
}
/deep/ .el-upload--text{
    width: 45px;
    height: 30px;
    border: none;
}
</style>
<style lang='scss'>
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
