<template>
    <div>
        <el-dialog title="工作流监控"  
            :visible.sync="ShowFinancVisible" 
            :append-to-body="true" 
            v-if="ShowFinancVisible" 
            @close="handleClose"
            :close-on-click-modal="false" 
            width="40%">
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
                        <el-col :span="10">
                            <el-form-item label="回复人" >
                                <el-input v-model="formdata.senduser" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="被回复人" >
                                <el-input v-model="formdata.staffName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="是否公开" ><el-checkbox v-model="formdata.checked"></el-checkbox></el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="回复内容" >
                                <el-input type="textarea" v-model="formdata.freplycontent" :rows="4" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="附件" >
                                <el-row>
                                    <el-col :span="14">
                                        <el-input v-model="fileName" size="mini" style="padding:5px" readonly="readonly"></el-input>
                                    </el-col>
                                    <el-col :span="4" style="padding:5px">
                                        <el-upload
                                            action=""
                                            :disabled="authenStatus"
                                            :file-list="fileList"
                                            :on-change="imgSaveToUrl"
                                            :show-file-list="false"
                                            :auto-upload="false">
                                            <el-button type="primary" slot="trigger" icon="el-icon-search"  size="mini" ></el-button>
                                        </el-upload>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer"  class="dialog-footer">
                <el-button  @click="handleClose" type="warning"  icon="el-icon-close" size="small">取消</el-button>
                <el-button @click="SaveButtonClick()" type="success" icon="el-icon-copy-document" size="small">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        rowRMPDataObj:Object,
        rowRMPtype:Boolean,
    },
    data(){
        return{
            ShowFinancVisible:false,
            formdata:{},
            fileName:'',
            fileList: [],
            uploadFiles:[],
            labelPosition:'left',
            authenStatus:false,
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            let foredata={};
            this.$emit('changeShow',foredata,false);
        },
        //选取图片后自动回调，里面可以获取到文件 //参数形式：imgSaveToUrl(event或file) -- event.raw ：获取到File对象
        imgSaveToUrl(event){
            let localFile = event.raw; //选中的File对象
            //文件大小控制
            const isLt2M = localFile.size / 1024 / 1024 < 150;
            if (!isLt2M) {
              this.$message.error('上传文件大小不能超过 150MB！');
              return;
            }
            this.fileName = event.name;
            this.uploadFiles=[];
            this.uploadFiles.push(event.raw);
        },
        //上传
        uploadSectionFile(voucherId) {
            let creator = localStorage.getItem('ms_userId');
            var formData = new FormData();
            formData.append('file', this.uploadFiles[0]);
            if(this.formdata.fparentreply){
                formData.append('menuCode',this.formdata.fparentreply);
            }else{
                formData.append('menuCode',this.formdata.foid);
            }
            formData.append('userCode',creator);
            formData.append('voucherId',voucherId);
            // this.$api.documentManagement.uploadFileBatch(formData).then((response) => {
            return this.$api.documentManagement.uploadFile(formData);
        },
        //确定按钮点击事件
        async SaveButtonClick(){
            let SaveRes= await this.saveNewAndEdit();
            if(SaveRes){
                if(SaveRes.data.data){
                    if(this.uploadFiles != null){
                        let FileData= await this.uploadSectionFile(SaveRes.data.data);
                        if(FileData){
                            if(FileData.data.data){
                                let fileId = FileData.data.data;
                                let foidS=SaveRes.data.data;
                                let UData= await this.updateReplydata(fileId,foidS);
                                if(UData){
                                    if(UData.data.data){
                                        this.ShowFinancVisible= false;
                                        this.$emit('changeShow',this.formdata,true);
                                    }else{
                                        this.$message.error('回复失败!');
                                    }
                                }else{
                                    this.$message.error('回复失败!');
                                }
                            }else{
                                this.$message.error('上传附件失败!');
                            }
                        }else{
                            this.$message.error('上传附件失败!');
                        }
                    }else{
                        this.ShowFinancVisible= false;
                        this.$emit('changeShow',this.formdata,true);
                    }
                }else{
                    this.$message.error('回复失败!');
                }
            }else{
                this.$message.error('回复失败!');
            }
        },
        //回写附件信息到消息列表
        updateReplydata(fileId,foid){
            let DDdata = {};
            DDdata.fileId=fileId;
            DDdata.replyId=foid;
            return this.$api.processSet.updateReplyAnnexMsg(DDdata);
        },
        //提交回复
        saveNewAndEdit(){
            let data = {
                fcreator:this.formdata.senduserId,
                freplyedpesron:this.formdata.staffId,
                fpublish:this.formdata.checked == undefined || this.formdata.checked == false ? 0 : 1,
                freplycontent:this.formdata.freplycontent,
            }
            if(this.formdata.fparentreply){
                data.fparentreply=this.formdata.foid;
                data.faudit=this.formdata.fparentreply;
            }else{
                data.faudit=this.formdata.foid;
            }
            return this.$api.processSet.addAuditReply(data);
        },
    },
    watch:{
        rowRMPtype(){
            if(this.rowRMPtype){
                this.ShowFinancVisible=this.rowRMPtype;
                this.formdata=this.rowRMPDataObj;
                this.authenStatus = false;
                this.fileName ='';
                this.uploadFiles=[];
            }
        }
    }
}
</script>