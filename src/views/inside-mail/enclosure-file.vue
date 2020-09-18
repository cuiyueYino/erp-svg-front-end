<template>
    <div>
        <div style="width:200px;height:40px;float:right;">
            <el-button type="success" icon="el-icon-folder-add" size="small"  style="margin-left:50px;magin-right:5px;" @click.prevent="addFileRow()" v-show="isShowButton">新增</el-button>
            <el-button type="danger" size="small" icon='el-icon-delete' @click.prevent="delFileData()" v-show="isShowButton">删除</el-button>
        </div>
        <div>
            <el-table
                :data="enclosureTableData"
                ref="table"
                size="mini"
                tooltip-effect="dark"
                border
                stripe
                style="width:100%;"
                @selection-change='selectfileRow'>
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column  label="附件" >
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.name" size="mini" style="padding:5px" readonly="readonly"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px" >
                                <el-upload
                                    action=""
                                    :disabled="authStatus"
                                    :file-list="scope.row.fileList"
                                    :on-change="fileChange"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                >
                                    <el-button type="primary" slot="trigger" icon="el-icon-search"  size="mini" v-show="isSearch" ></el-button>
                                    <el-button type="primary" slot="trigger" icon="el-icon-download" @click="downLoadFile(scope.row)" size="mini" v-show="isDownload"></el-button>
                                </el-upload>
                            </el-col>
                            <el-col :span="2" style="padding:5px" >

                            </el-col>
                            <!--<el-col :span="2" style="padding:5px">
                                <el-button type="primary" icon="el-icon-view" @click="getHtmlPreviewAttachment(scope.row)" size="mini" ></el-button>
                            </el-col>-->
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--<PreAttachment :rowNMMtype="rowNMMtype" :rowNMMDataObj="rowNMMDataObj" @changeShow="showAddMenu"/>-->
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import axios from 'axios';

export default {
    components: {
    },
    props: {
        enclosureConfig:Object
    },
    inject: ['reload'],
    data(){
        return{
            enclosureTableData: [],
            rowNum: 1,
            selectRow:[],
            rowNMMtype:false,
            rowNMMDataObj:{},

            isShowButton:this.enclosureConfig.isShowButton,
            authStatus:this.enclosureConfig.authStatus,
            isDownload:this.enclosureConfig.isDownload,
            isSearch:this.enclosureConfig.isSearch,
        }
    },

    methods: {

        /**
         * 附件预览
         * @param row
         */
        getHtmlPreviewAttachment(row){
            this.$api.insideMail.getHtmlPreviewAttachmentById(row.id).then(response => {
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

        /**
         * 是否展示dialog弹窗
         * @param type
         */
        showAddMenu(type){
            if(type === false){
                this.rowNMMtype = false;
            }else{
                this.rowNMMtype = true;
            }
            // this.reload();
        },

        /**
         * 下载文件
         * @param row
         */
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
                        attachmentId: row.id
                    },
                    responseType: 'blob'
                }).then(response => {
                    this.download(response,row.name);
                }).catch((error) => {

                })
        },

        /**
         * 下载文件
         * @param data
         * @param fileName
         */
        download (data,fileName) {
            if (!data) {
                return
            }
            let url = window.URL.createObjectURL(new Blob([data.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // let fileName = decodeURIComponent(data.headers.realname);
            console.log(fileName);
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
        },

        /**
         * 选取图片后自动回调，里面可以获取到文件 //参数形式：fileChange(event或file) -- event.raw ：获取到File对象
         * @param event
         */
        fileChange(event){

            let tableLen = this.enclosureTableData.length;
            let localFile = event.raw; //选中的File对象
            this.enclosureTableData.splice(tableLen - 1, 1);
            this.enclosureTableData.push(localFile);
            console.log(this.enclosureTableData)
            console.log(localFile)

            //选中的文件传给父组件

            // this.$emit('enclosureFile', event.raw);
        },

        /**
         * 上传
         */
        async upload(){
            let length = this.enclosureTableData.length;
            if(length==undefined||length==0){
                return;
            }
            let creator = localStorage.getItem('ms_staffId');

            // formData.append('files', this.uploadFiles);

            for(var i=0; i < length; i++ ){
                var formData = new FormData();
                if(this.enclosureTableData[i].id==null || this.enclosureTableData[i].id==''){
                    formData.append('file', this.enclosureTableData[i]);
                    formData.append('menuCode',this.enclosureConfig.menuCode);
                    if(creator){
                        formData.append('userCode',creator);
                    } else {
                        formData.append('userCode','test');
                    }
                    formData.append('voucherId',this.enclosureConfig.voucherId);
                    console.log(formData);
                    // this.$api.insideMail.uploadFileBatch(formData).then((response) => {
                    await this.$api.insideMail.uploadFile(formData).then((response) => {
                         return new Promise(resolve => {
                            //返回id和name 用于显示或者存储(服务10不出意外应该是input，无法显示和存储不同，暂时没法解决，只能显示id)
                            resolve({

                            });
                            });
                        if(response.data.code == 0 && response.data.data){
                        }
                    });
                }else if(this.enclosureConfig.haveAttachment){
                    formData.append('menuCode', this.enclosureConfig.menuCode);
                    formData.append('voucherId',this.enclosureConfig.voucherId );
                    formData.append('fileFullPath',this.enclosureTableData[i].fullPath );
                    formData.append('fileSize',this.enclosureTableData[i].fileSize );
                    formData.append('fileName', this.enclosureTableData[i].name);
                    if(creator){
                        formData.append('userCode', creator);
                    } else {
                        formData.append('userCode','test');
                    }
                    console.log(formData)
                    this.$api.insideMail.addAttachmentInfo(formData).then();
                }

            }
        },

        /**
         * 获取附件表格选中时的数据
         * @param val
         */
        selectfileRow (val) {
            this.selectRow = val;
        },

        /**
         * 增加附件行
         */
        addFileRow () {
           if(this.rowNum >1){
               if(!this.enclosureTableData[this.rowNum-2].name){
                   this.$message.error("请先添加附件");
                   return;
               }
           }
            var list = {
                rowNum:this.rowNum,
                filestyle:'',
                awardfile: '',
                remark:''
            };
            this.enclosureTableData.push(list);
            this.rowNum += 1;
        },

        /**
         * 删除选中附件行
         */
        delFileData () {
            if(this.selectRow.length < 1){
                this.$message.error("请选择一行数据!");
            }
            for (let i = 0; i < this.selectRow.length; i++) {
                let val = this.selectRow;
                val.forEach((val) => {
                    this.enclosureTableData.forEach((v, i) => {
                        if (val.rowNum === v.rowNum) {
                            // i 为选中的索引
                            this.enclosureTableData.splice(i, 1);
                            let ids = '';
                            ids = ids + '\'' + v.id +'\','
                            console.log(ids+"+++"+i);
                            this.$api.insideMail.deleteInfoByIds(ids).then((response) => {
                            });
                        }
                    })
                })
                this.rowNum--
            }
            // 删除完数据之后清除勾选框
            this.$refs.table.clearSelection();
        },

        /**
         * 查看附件列表
         * @param data
         */
        showFileData(data){
            let formDataA ={};
            let creator = localStorage.getItem('ms_staffId');
            formDataA.voucherId = data;
            // formDataA.menuCode = this.enclosureConfig.menuCode;
            // if(creator){
            //     formDataA.userCode =  creator;
            // } else {
            //     formDataA.userCode =  'test';
            // }
            this.$api.insideMail.findInfosList(formDataA).then(response => {
                if (response.data.data) {
                    let values = response.data.data;
                    let flag = true;
                    for(var i= 0;i<values.length;i++){
                        let attachment = values[i];
                            let file = {
                                rowNum: this.rowNum,
                                name: attachment.fileName,
                                id: attachment.id,
                                fullPath:attachment.fullPath,
                                fileSize:attachment.fileSize,
                            };
                        console.log(attachment)
                            this.enclosureTableData.unshift(file);
                            this.rowNum += 1;
                    }
                } else {
                    this.$message.error(response.data.msg);
                }
            });
        },
    },
    watch:{
        enclosureConfig: {
            handler:function(val,oldval){
                if(this.enclosureConfig.voucherId){
                    console.log(this.enclosureConfig.voucherId)
                    this.showFileData(this.enclosureConfig.voucherId)
                }
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
        //监控父组件附件Tab切换
       /* enclosureConfig(val,oldval){
            if(this.enclosureConfig.operateFlag==="QUERY"){
            }
        }*/
    },
    created(){
        console.log(this.enclosureConfig);
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
