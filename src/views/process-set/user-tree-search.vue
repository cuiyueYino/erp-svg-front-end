<template>
    <div>
        <el-dialog @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
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
                        <el-col :span="7" class="tree-class">
                            <!-- 树状图 -->
                            <el-tree
                                :data="treeData"
                                :props="defaultProps"
                                node-key="id"
                                :render-content="renderContent"
                                accordion
                                @node-click="handleNodeClick">
                            </el-tree>
                        </el-col>
                        <el-col :span="8" :offset="1">
                            <el-row :gutter="24">
                                <el-col :span="18">
                                    <el-form-item label="搜索" >
                                        <el-input v-model="formdata.searchKeyW" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" plain  size="small" @click="searchKey">查询</el-button>
                                </el-col>
                            </el-row>
                            <!-- 表格 -->
                            <dynamic-table
                                class="workTable"
                                :columns="columns3"
                                :table-data="gridData"
                                :total="total"
                                :page-num="pageNum"
                                :page-size="pageSize"
                                @current-change="onCurrentChange"
                                @selection-change="onSelectionChange"
                                v-loading="tableLoading"
                                element-loading-text="加载中"
                            ></dynamic-table>
                        </el-col>
                        <el-col :span="1" :offset="1">
                            <div style="margin-top:100px;width:60px;">
                                <div style="margin-bottom:15px">
                                    <el-button type="primary" icon="el-icon-arrow-left" circle  @click='AddToLeft'></el-button>
                                </div>
                                <div>
                                    <el-button type="primary" icon="el-icon-arrow-right" circle @click='AddToRight'></el-button>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="5" :offset="1">
                            <el-table
                                :data="teldata"
                                border
                                size="mini"
                                height='500'
                                @selection-change="onUSerSelectionChange"
                                ref='rightMultipleTable'
                            >
                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>
                                <el-table-column size="mini" label="所选人员">
                                    <template slot-scope="scope">
                                        {{scope.row.fname}}
                                    </template>
                                </el-table-column>
                            </el-table>      
                        </el-col>
                    </el-row>
                    <el-row class="remakerow">
                        <el-col :span="22">
                            <el-form-item label="是否可见" v-if="saveType =='加签'">
                                <el-checkbox v-model="formdata.checked">可见</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="remakerow">
                        <el-col :span="22">
                            <el-form-item :label="saveType =='委托'?'委托意见':'加签附言'" v-if="saveType =='委托'|| saveType =='加签'">
                                <el-input type="textarea" v-model="formdata.remark" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  type="primary" @click="saveConfig">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowUTSDataObj: Object,
        rowUTStype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data: function() {   
        return {
            pageNum: 1,
            pageSize: 10,
            total: 20,
            title:'',
            formdata:{
                searchKeyW:'',
            },
            leftDisabled:true,
            rightDisabled:true,
            dataForm:{
                receiver:'',
            },
            multipleSelection:[],
            UsermultipleSelection:[],
            teldata:[],
            saveType:'',
            tableLoading:false,
            ShowFinancVisible:false,
            labelPosition: 'left',
            columns3: [
                {
                    type: 'selection'
                },
                {
                    key: 'fname',
                    title: '名称'
                },
                {
                    key: 'positionName',
                    title: '职位'
                },
            ],
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            gridData:[],
            nodeClickData:{}
        };
    },
    methods: {
        //tree 改写样式
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.level =="1"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder-opened"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    )
                }else if(data.level=="2"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    )
                }else if(data.level=="3"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    )
                }
            }  
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
        //table选中事件
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //搜索-姓名模糊查询
        searchKey(){
            let data=this.nodeClickData;
            let fromdata={};
            fromdata.queryType='';
            if(data.foid){
                fromdata.orgUnitId=data.foid;
            }
            if(this.formdata.searchKeyW){
                fromdata.queryKey=this.formdata.searchKeyW;
            }
            fromdata.page=this.pageNum;;
            fromdata.size=this.pageSize;
            this.getUserData(fromdata);
        },
        //下一页
        onCurrentChange(val) {
            let data=this.nodeClickData;
            let fromdata={};
            fromdata.queryType='';
            if(data.foid){
                fromdata.orgUnitId=data.foid;
            }
            fromdata.page=val;
            fromdata.size=this.pageSize;
            this.getUserData(fromdata);
        },
        //所选人员选中改变
        onUSerSelectionChange(val) {
            this.UsermultipleSelection = val;
        },
        // 树形控件点击事件
        handleNodeClick(data) {
            this.nodeClickData=data;
            if(data.children){
            }else{
                let fromdata={};
                fromdata.queryType='';
                fromdata.orgUnitId=data.foid;
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                this.getUserData(fromdata)
            }
        },
        //转发
        setencyclic(fid,user){
            let fromdata={};
            fromdata.currUserId=localStorage.getItem('ms_userId');
            fromdata.bizMailId=fid;
            fromdata.participator=user;
            this.$api.processSet.setencyclic(fromdata).then(res=>{
                let resData=res;                   
                this.ShowFinancVisible=false;
                //this.reload();
                this.$emit('changeShow',false);
                
            },error=>{
                console.log(error)
            })  
        },
        //委托
        transmit(fid,user){
            let fromdata={};
            fromdata.currUserId=localStorage.getItem('ms_userId');
            fromdata.bizMailId=fid;
            fromdata.participator=user;
            fromdata.advice=this.formdata.remark;;
            this.$api.processSet.transmit(fromdata).then(res=>{
                let resData=res;                   
                this.ShowFinancVisible=false;
                //this.reload();
                this.$emit('changeShow',false);
                
            },error=>{
                console.log(error)
            })
        },
        //加签
        setAddTag(fid,user){
            let fromdata={};
            fromdata.fmailOid=fid;
            fromdata.fstaffOid=user;
            fromdata.fpublicity=this.formdata.checked;
            fromdata.fremark=this.formdata.remark;
            this.$api.processSet.SeTaddTag(fromdata).then(res=>{
                let resData=res;                   
                this.ShowFinancVisible=false;
                //this.reload();
                this.$emit('changeShow',false);
                
            },error=>{
                console.log(error)
            })
        },
        //转发按钮确认事件
        saveConfig(){
            let ParentSelectData=this.rowUTSDataObj.SelectionData;
            let selectListData=this.teldata;
            if(selectListData.length >0){
                let participator='';
                for(let j=0;j<selectListData.length;j++){
                    participator+=selectListData[j].foid+',';
                }
                participator=participator.slice(0,participator.length-1);
                if(this.saveType ==='转发'){
                    this.setencyclic(ParentSelectData[0].foid,participator);
                }else if(this.saveType ==='委托'){
                    this.transmit(ParentSelectData[0].foid,participator);
                }else if(this.saveType ==='加签'){
                    this.setAddTag(ParentSelectData[0].foid,participator);
                }
            }else{
                this.$message.error("请选择人员!");
            }
        },
        //所选人员移除操作
        AddToLeft(){
            let SelectUData=this.UsermultipleSelection;
            if(SelectUData.length >0){
                let selectListData=this.teldata;
                let listData=[];
                for(let i=0;i<SelectUData.length;i++){
                    for(let j=0;j<selectListData.length;j++){
                        if(SelectUData[i].foid===selectListData[j].foid){
                            selectListData.splice(j,1);
                        }
                    }
                }
            }else{
                this.$message.error("请选择数据!");
            }
        },
        //添加选中人员到所选人员
        AddToRight(){
            let selectTableData =this.multipleSelection;
            if(selectTableData){
                if(selectTableData.length >0){
                    let selectListData=this.teldata;
                    for(let i=0;i<selectTableData.length;i++){
                        for(let j=0;j<selectListData.length;j++){
                            if(selectTableData[i].foid===selectListData[j].foid){
                                selectListData.splice(j,1);
                            }
                        }
                    }
                    selectListData=selectListData.concat(selectTableData);
                    this.teldata=selectListData;
                }
            }else{
                this.$message.error("请选择一行数据!");
            }
        },
        //获取人员数据
        getUserData(data){
            let fromdata = data;
            this.$api.processSet.getUserTreeData(fromdata).then(res=>{
                let resData=res.data.data;
                let resDataArr= eval("("+resData+")");
                this.gridData=resDataArr.JsonInfo;
                this.total=resDataArr.pageInfo.total;
            },error=>{
                console.log(error)
            })  
        }
    },
    mounted() {
    },
    watch:{
        rowUTStype(oldVal,newVal){
            this.ShowFinancVisible=this.rowUTStype;
            let finandata=this.rowUTSDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.title=this.rowUTSDataObj.nametitle;
            this.saveType=this.rowUTSDataObj.FunctionType;
            let fromdata={};
            fromdata.queryType='org';
            this.$api.processSet.getUserTreeData(fromdata).then(res=>{
                let resData=res.data.data;
                let resDataArr= eval("("+resData+")");
                this.treeData = resDataArr;
            },error=>{
                console.log(error)
            })
        }
    }
};
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
.classlist{
    width: 100%;
    height: 300px;
}
.remakerow{
    margin-top: 10px;
}
</style>
<style lang='scss'>
.replydiag {
    .el-textarea__inner {
        min-height: 300px !important;
    }
}
.tree-class{
    height: 500px;
    overflow: auto;
}
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>