<template>
    <div>
        <el-dialog :title="title" 
            @close="handleClose" 
            :visible.sync="ShowFinancVisible" 
            :append-to-body="true" 
            v-if="ShowFinancVisible" 
            :close-on-click-modal="false" 
            width="400px">
            <el-form
                label-width="110px"
                class="dataForm"
                :label-position="labelPosition"
            >
                <el-card>
                    <div class="El-tree">
                        <el-tree
                            v-loading="treeloading"
                            element-loading-text="拼命加载中"
                            :data="treeData"
                            :props="defaultProps"
                            node-key="foid"
                            ref="tree"
                            :render-content="renderContent"
                            accordion
                            :show-checkbox="showcheckbox"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ShowFinanc">取 消</el-button>
                <el-button type="primary" @click="onHandleMoreSave">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        rowPOSSDataObj:Object,
        rowPOSStype: Boolean
    },
    data(){
        return{
            treeData:[],
            labelPosition: 'left',
            showcheckbox:false,
            NodeClickData:{},
            NodeCheckData:[],
            ShowFinancVisible:false,
            defaultProps: {
                children: 'children',
                label: 'fname'
            },
            treeloading:false
        }
    },
    methods:{
        //关闭当前dialog时给父组件传值
        handleClose(){
            //返回选中的父组件选中的row,并修某些改值
            this.ShowFinancVisible = false;
            this.$emit('changeShow',this.rowPOSSDataObj,false);
        },
        ShowFinanc(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',this.rowPOSSDataObj,false);
        },
        handleNodeClick(data) {
            this.NodeClickData=data;
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.ftype =="1"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-office-building"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.ftype=="2"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-s-help"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.ftype=="3"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-s-check"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }
            }  
        },
        
        onHandleMoreSave(){
            let SearchData=[];
            let SaveType=false;
            if(this.showcheckbox==true){
                //获取选中的树节点数据
                let NodeCheckData=this.$refs.tree.getCheckedNodes(true,false);
                if(NodeCheckData){
                   SearchData= NodeCheckData;
                   SaveType=true;
                }else{
                    this.$message.error('请选择职务!');
                    SaveType=false;
                }
            }else{
                let NodeClickData=this.NodeClickData;
                if(NodeClickData){
                    let treeType=NodeClickData.ftype;
                    if(treeType =='3'){
                        SearchData.push(NodeClickData);
                        SaveType=true;   
                    }else{
                        this.$message.error('请选择职务!');
                        SaveType=false;
                    }
                }else{
                    this.$message.error('请选择职务!');
                    SaveType=false;
                }
            }
            if(SaveType){
                this.rowPOSSDataObj.SearchData=SearchData;
                this.$emit('changeShow',this.rowPOSSDataObj,false);
                this.ShowFinancVisible = false;
            }
        }
    },
    watch:{
        rowPOSStype(oldVal,newVal){
            if(this.rowPOSStype){
                this.ShowFinancVisible=this.rowPOSStype;
                let rowDataObj=this.rowPOSSDataObj;
                this.title=rowDataObj.nametitle;
                let searchtype=rowDataObj.Searchtype;
                if(searchtype=='Multiple'){
                    this.showcheckbox=true;
                }else{
                    this.showcheckbox=false;
                }
                this.treeloading = true;
                this.$api.management.selectAllOrganizationInfo().then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let tabledata=eval('(' + responsevalue.data.data + ')');
                        this.treeData=tabledata;
                        this.treeloading = false;
                    }
                }) 
            }
        }
    }
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
}
 /deep/ .el-dropdown-menu__item{
    padding: 0;
}
.el-dropdown-link {
cursor: pointer;
color: #409EFF;
margin-right: 10px;
}
.el-icon-arrow-down {
font-size: 12px;
}
.box-card:first-child{
    margin-bottom: 16px;
}
.search-all{
    margin-left: 50px;
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
.El-tree{
    height: 400px;
    overflow-y:auto;
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