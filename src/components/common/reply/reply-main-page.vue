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
                                <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    :auto-upload="false"
                                    :http-request="uploadSectionFile"
                                >
                                <el-button slot="trigger" size="small" type="medium">选取文件</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer"  class="dialog-footer">
                <el-button  @click="handleClose" type="warning"  icon="el-icon-close" size="small">取消</el-button>
                <el-button @click="saveNewAndEdit()" type="success" icon="el-icon-copy-document" size="small">提交</el-button>
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
            fileList: [],
            labelPosition:'left',
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            let foredata={};
            this.$emit('changeShow',foredata,false);
        },
        //上传附件
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        //上传
        uploadSectionFile(param) {
            // FormData 对象
            var form = new FormData();
            // 文件对象
            //通过append向form对象添加数据
            form.append('workId', this.workId);
            form.append('fileList', param.file);
            /*this.$api.task.uploadFile(form).then(
                this.$message({
                    type: 'success',
                    message: '附件上传成功'
                })
            );
            this.itialize();
            */
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
            this.$api.processSet.addAuditReply(data).then(res=>{
                this.ShowFinancVisible= false;
                this.$emit('changeShow',this.formdata,true);
            },error=>{
                console.log(error)
            })

        },
    },
    watch:{
        rowRMPtype(){
            if(this.rowRMPtype){
                this.ShowFinancVisible=this.rowRMPtype;
                this.formdata=this.rowRMPDataObj;
            }
        }
    }
}
</script>