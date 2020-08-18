<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
       <el-row :gutter="24">
               <el-col :span="16">
                    <el-form :inline="true"  class="demo-form-inline">
                       <el-col :span="3">
                       <el-form-item >
                        <el-select v-model="form.region" placeholder="请选择">
                          <el-option label="公司名称" value="shanghai"></el-option>
                          <el-option label="编码" value="beijing"></el-option>
                          <el-option label="组名" value="miaoshu"></el-option>
                          <el-option label="组长名称" value="gongsi"></el-option>
                          <el-option label="组员" value="bumen"></el-option>
                          <el-option label="离职、调转人员" value="renzhizhuangtai"></el-option>
                           <el-option label="备注" value="bumen"></el-option>
                        </el-select>
                      </el-form-item>
                       </el-col>
                    <el-form-item >
                        <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" plain @click="onSubmit">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="getAll" class="search-all">显示全部信息</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="8" style="text-align: right;">
                     <el-button type="success" plain class="el-icon-plus" @click="toEdit('新增')"> 新增</el-button>
                     <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg"> 删除</el-button>
                     <el-button type="warning" plain class="el-icon-edit"  @click="toEdit('编辑')"> 编辑</el-button>
                     <el-button type="primary" plain class="el-icon-view" @click="toEdit('查看')"> 查看</el-button>
                 </el-col>
            </el-row>

        
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <dynamic-table
        :columns="columns"
        :table-data="tableData"
        :total="total"
        :page-num="pageNum"
        :page-size="pageSize"
        @current-change="onCurrentChange"
        @selection-change="onSelectionChange"
        v-loading="false"
        element-loading-text="加载中"
      ></dynamic-table>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog :title="isEdit?'编辑工作业务组':(isLook?'查看工作业务组':'新建工作业务组')" 
    class="add-user"
    center
    width="50%"
     :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
            <el-form :model="form" :rules="rules"  ref="form">
                <el-row :gutter="22">
                     <el-col :span="11">
                    <el-form-item label="公司："  :label-width="formLabelWidth" class="pop-select" prop="tcompanyoid">
                        <el-select v-model="form.tcompanyoid"
                         size="small"
                         :disabled="isLook"
                          clearable placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                    </el-form-item>
                   <el-form-item label="组名：" :label-width="formLabelWidth" >
                    <el-input v-model="form.fteamname" :disabled="isLook" size="small"  maxlength="50" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="离职、调转人员：" label-width="134px" prop="transStaffRelUser">
                      <el-input
                          :disabled="true"
                          type="textarea"
                          autosize
                           size="small"
                          placeholder="请选择组员"
                          v-model="form.transStaffRelUser">
                        </el-input>
                    </el-form-item>
                   
                </el-col>
                 <el-col :span="11">
                    <el-form-item label="编码：" :label-width="formLabelWidth" prop="fteamid">
                    <el-input v-model="form.fteamid" :disabled="isLook" size="small"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="组长1：" :label-width="formLabelWidth" prop="fteamleader">
                      <el-input v-model="form.fteamleader" :disabled="isLook" placeholder="请选择组长" size="small"  autocomplete="off"></el-input>
                        <img class="icon-search" v-show="!isLook" src="../../assets/img/search.svg" @click="baseInputTable(form,'选择组长')" />
                    </el-form-item>
                      <el-form-item label="组员：" :label-width="formLabelWidth" prop="staffRelUsers">
                      <el-input type="textarea" autosize :disabled="isLook" size="small" placeholder="请选择组员" v-model="form.staffRelUsers"></el-input>
                         <img class="icon-search" v-show=" !isLook" src="../../assets/img/search.svg" @click="baseInputTable(form,'选择组员')" />
                    </el-form-item>
                 </el-col>
                 <el-col :span="22">
                    <el-form-item label="备注："  maxlength="3000"  :label-width="formLabelWidth" prop="fremark">
                      <el-input
                          type="textarea"
                          autosize
                          :disabled="isLook"
                           size="small"
                          v-model="form.fremark">
                        </el-input>
                    </el-form-item>
                 </el-col>
                </el-row>
                
            </el-form>
        
      <div slot="footer" class="dialog-footer">`
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('form')">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 组长/组员弹窗 -->
      <el-dialog :title="choseDepart" 
       top="20px"
      :visible.sync="userVisible"
      :close-on-click-modal="false">
       
       <div v-show="isLeader">
        <!-- 树状图 -->
        <div class="El-tree">
            <el-tree
                v-loading="treeloading"
                element-loading-text="拼命加载中"
                :data="treeData"
                :props="defaultProps"
                node-key="foid"
                :render-content="renderContent"
                :default-expanded-keys="defaultexpanded"
                accordion
                @node-click="handleNodeClick">
            </el-tree>
        </div>
       </div>
       <div v-show="isMembers">
          <el-tree
              :data="treeData2"
              :props="defaultProps"
               ref="treeData2"
              node-key="id"
              :render-content="renderContent"
              accordion
              show-checkbox
              :default-expanded-keys="checkdata"
              :default-checked-keys="checkdata"
              @node-click="nodeClick">
          </el-tree>
       </div>
         <div slot="footer" class="dialog-footer">
            <el-button @click="userVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPeople()">确 定</el-button>
        </div>
      </el-dialog>
      <OPSpage  :rowOPSDataObj="rowOPSDataObj" :rowOPStype="rowOPStype" @changeShow="showORhideForPS"/>
      <DUTSpage  :rowDUTSDataObj="rowDUTSDataObj" :rowDUTStype="rowDUTStype" @changeShow="showORhideForDUTS"/>
      <POSserachpage  :rowPOSSDataObj="rowPOSSDataObj" :rowPOSStype="rowPOSStype" @changeShow="showORhideForPOSS"/>
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
import OPSpage from '../comment/organization-personnel-search.vue';
import DUTSpage from '../comment/duties-search.vue';
import POSserachpage from '../comment/position-search.vue';
export default {
  name: "workBusiGroup",
  data() {
    return {
      defaultexpanded:[],
      treeloading:false,
      rowOPStype:false,
      rowOPSDataObj:{},
      rowDUTStype:false,
      rowDUTSDataObj:{},
      rowPOSStype:false,
      rowPOSSDataObj:{},
      dialogFormVisible: false,
      userVisible:false,
      isEdit:false,
      isLook:false,
      isAdd:false,
      isMembers:false,
      isLeader:false,
      checkdata:['duties03','duties02'],
      searchName:'',
      formCode: "",
      filterText: '',
       treeData:[
            ],
        defaultProps: {
        children: 'children',
        label: 'label'
        },
      treeData2:[
          {
              label: '角色类别',
              id:'company01',
              type:'company',
              children: [
                  {
                      label: '个人事务角色',
                      id:'duties03',
                      type:'duties',  
                  },
                  {
                      label: '公司架构角色-财务',
                      id:'department01',
                      type:'department',
                      children: [
                          {
                          label: '石化财务',
                          id:'duties01',
                          type:'duties',
                          },
                          {
                          label: '收费员',
                          id:'duties02',
                          type:'duties',
                          }
                      ]
                  }
              ]
          }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 20,
      columns: [
        {
          type: "selection"
        },
         {
          key: "fname",
          title: "公司名称"
        },
        {
          key: "fcode",
          title: "编码"
        },
        {
          key: "fname",
          title: "组名"
        },
        {
          key: "fname",
          title: "组长名称"
        },
        {
          key: "fname",
          title: "组员"
        },
        {
          key: "fstatus",
          title: "离职、调转人员"
        },
        {
          key: "fstatus",
          title: "备注"
        }
      ],
      tableData: [],
      tableData2: [],
      radio: "1",
      multipleSelection: [],
      checked: false,
      form: {
        fteamleader:'',
        fteamname: "",
        fteamid: "",
        fremark: "",
        fcompanyoid: "",
        staffRelUsers: [],
        transStaffRelUser: [],
      },
      searchForm: {},
      userForm:{},
      options: [],
      choseDepart:'',
      formLabelWidth: "120px",
      rules: {
        fteamid: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
        fteamleader: [
          { required: true, message: "请选择组长名称", trigger: "blur" },
        ],
        staffRelUsers: [
          { required: true, message: "请选择组员名称", trigger: "blur" },
        ]
      }
    };
  },
  components: {
    DynamicTable,
    DUTSpage,
    POSserachpage,
    OPSpage
  },
  created() {
    this.$nextTick(() => {
      this.getTableData("");
    });
  },
  computed: {},
   watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  mounted() {
    debugger;
        this.treeloading = true;
        this.$api.management.selectAllOrganizationInfo().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let tabledata=eval('(' + responsevalue.data.data + ')');
                this.treeData=tabledata;
            }
            this.treeloading = false;
        }); 
    },
  methods: {
        filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    // 查询行政上级，业务上级的返回值处理
        showORhideForPOSS(data,type){
            if(type === false){
                this.rowPOSStype = false;
            }else{
                this.rowPOSStype = true;
            }
            if(data.SearchData){
                let Sdata=data.SearchData;
                if(data.Searchtype =='Multiple'){
                    let FnameS='';
                    let FoidS='';
                    for(var i=0;i<Sdata.length;i++){
                        FnameS+=Sdata[i].fname+',';
                        FoidS+=Sdata[i].foid+',';
                    }
                    FnameS=FnameS.slice(0,FnameS.length-1);
                    FoidS=FoidS.slice(0,FoidS.length-1);
                    this.DutformData.businessLeaderName=FnameS;
                    this.DutformData.businessLeaderId=FoidS;
                }else{
                    this.DutformData.directLeaderName=Sdata[0].fname;
                    this.DutformData.directLeaderId=Sdata[0].foid;
                }
            }
        },
        //查询行政上级，业务上级
        MoreSearchPOSS(data,type){
            this.rowPOSStype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="组织机构维护";
            finandata.Searchtype=type;
            this.rowPOSSDataObj=finandata;
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.ftype =="1"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-office-building"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    );
                }else if(data.ftype=="2"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-s-help"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    );
                }else if(data.ftype=="3"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-s-check"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    );
                }
            }  
        },
    // 选择组长/组员方法
    baseInputTable(data,Str) {
      debugger;
      this.choseDepart = Str;
      switch (Str) {
        case "选择组员":
          this.isMembers = true
          this.isLeader = false
          break;
        case "选择组长":
           this.isMembers = false
           this.isLeader = true
          break;
        default:
          break;
      }
        this.rowOPStype = true;
        let finandata=data;
        finandata.finanrowname="人员缺省查询方案";
        finandata.finanrowId="QS_0056";
        finandata.nametitle="组织机构维护";
        finandata.UserSearchtype=type;
        this.rowOPSDataObj=finandata;
    },

    //获取人员查询结果
        showORhideForPS(data,type){
          
            if(type === false){
                this.rowOPStype = false;
            }else{
                this.rowOPStype = true;
            }
            if(data.UserSearchtype=='分管领导'){
                this.DepformData.vicePresidentName=data.selectOptionName;
                this.DepformData.vicePresidentId=data.selectOptionID;
            }else{
                this.DepformData.departmentLeaderName=data.selectOptionName;
                this.DepformData.departmentLeaderId=data.selectOptionID;
            }
        },
        //查询职务
        MoreSearchDUTS(data,type){
            this.rowDUTStype = true;
            let finandata={};
            finandata.finanrowname="职务查询方案";
            finandata.finanrowId="QS_0032";
            finandata.nametitle="组织机构维护";
            finandata.UserSearchtype=type;
            this.rowDUTSDataObj=finandata;
        },
        //职务查询结果
        showORhideForDUTS(data,type){
            if(type === false){
                this.rowDUTStype = false;
            }else{
                this.rowDUTStype = true;
            }
            if(data.UserSearchtype=="职务"){
                this.DutformData.positonName=data.awardcreditbreedname;
                this.DutformData.positonId=data.awardcreditbreedId;
            }
        },
    searchDepart(){

    },
    
    // 获取公司方法
    getCompany(){
        this.$api.jobUserManagement.getCompanyData().then(res=>{
            if(res.status == '200'){
               this.options = res.data.data.rows
            }
        }),error => {
          console.log(error);
        }
    },
     //树结构点击事件
    nodeClick(data){
      let treeType=data.type;
    },
    //树结构点击事件
        handleNodeClick(data) {
            let treeType=data.ftype;
            this.NodeClickData=data;
            if(treeType=="1"){
                let fromdata={};
                fromdata.foid=data.foid;
                this.$api.management.getselectCompanyInfo(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        this.Companyflag=true;
                        this.Departmentflag=false;
                        this.Dutiesflag=false;
                        this.disabled=true;
                        this.ConformData=returndata;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
            }else if(treeType=="2"){
                let fromdata={};
                fromdata.foid=data.foid;
                this.$api.management.selectDepartmentInfo(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        this.Companyflag=false;
                        this.Departmentflag=true;
                        this.Dutiesflag=false;
                        this.disabled=true;
                        this.DepformData=returndata;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
            }else if(treeType=="3"){
                let fromdata={};
                fromdata.foid=data.foid;
                this.$api.management.selectPositionInfo(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        this.Companyflag=false;
                        this.Departmentflag=false;
                        this.Dutiesflag=true;
                        this.disabled=true;
                        let busLList=returndata.businessLeaderList;
                        let busLListS='';
                        let busIDListS='';
                        if(busLList){
                            for(let i=0;i<busLList.length;i++){
                                busLListS+=busLList[i].fname+",";
                                busIDListS+=busLList[i].foid+",";
                            }
                            busLListS=busLListS.slice(0,busLListS.length-1);
                            busIDListS=busIDListS.slice(0,busIDListS.length-1);
                            returndata.businessLeaderName=busLListS;
                            returndata.businessLeaderId=busIDListS;
                        }
                        this.DutformData=returndata;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
            }
        },
    //多选
    onSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      this.getTableData("");
    },
    // 搜索
    onSubmit() {
      this.getTableData(this.formCode);
    },
    getAll() {
      this.getTableData("");
    },
    // 获取表格数据
    getTableData(params) {
      let data = {
        fcode: params,
        page: this.pageNum,
        size: this.pageSize
      };
      this.$api.processSet.getTableData(data).then(
        res => {
          this.tableData = res.data.data.rows;
          for (let i in this.tableData) {
            switch (this.tableData[i].fstatus) {
              case 3:
                this.tableData[i].fstatus = "禁用";
                break;
              case 8:
                this.tableData[i].fstatus = "生效";
                break;
              default:
                break;
            }
            switch (this.tableData[i].fsubprocess) {
              case 1:
                this.tableData[i].fsubprocess = "是";
                break;
              case 0:
                this.tableData[i].fsubprocess = "否";
                break;
              default:
                break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    addPeople(){
      this.userVisible =false
    },
   
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.processSet.addSubmit(this.form).then(res => {
            if ((res.data.data.msg = "success")) {
              this.dialogFormVisible = false;
              this.$message.success("新增成功");
              //刷新表格
              this.getTableData("");
            }
          }),
            error => {
              console.log(error);
            };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    deleteMsg() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个删除");
        return;
      }
      this.$api.processSet
        .deleteMsg(this.multipleSelection[0].foid)
        .then(res => {
          if ((res.data.data.msg = "success")) {
            this.$message.success("删除成功");
            //刷新表格
            this.getTableData("");
          }
        }),
        error => {
          console.log(error);
        };
    },
    //生效/禁用
    effectOrDisableMsg() {
      let status = this.multipleSelection[0];
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个删除");
        return;
      } else if ((this.multipleSelection.length = 0)) {
        this.$message.error("请选择一项删除");
        return;
      }

      switch (status.fstatus) {
        case "生效":
          status.fstatus = 3;
          break;
        case "禁用":
          status.fstatus = 8;
          break;
        default:
          break;
      }
      let data = {
        foid: status.foid,
        status: status.fstatus
      };
      this.$api.processSet.effectOrDisable(data).then(res => {
        if ((res.data.data.msg = "success")) {
          this.$message.success("操作成功");
          //刷新表格
          this.getTableData("");
        }
      }),
        error => {
          console.log(error);
        };
    },
    toEdit(Str) {
        this.dialogFormVisible = true;
        switch (Str) {
           case '新增':
            this.isAdd = true;
            this.isEdit = false;
            this.isLook = false;
            this.getCompany();
            break;
          case '查看':
            this.isLook = true;
            this.isEdit = false;
            this.isAdd = false;
            break;
          case '编辑':
            this.isEdit = true;
            this.isLook = false;
            this.isAdd = false;
            break;
        
          default:
            break;
        }
    },
     renderContent(h, { node, data, store }) {
        if(data){
            if(data.type =="company"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-folder-opened"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }else if(data.type=="department"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-folder"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }else if(data.type=="duties"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-document"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }
        }  
        },
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-textarea .el-input__count {
  background: #fff0;
}
/deep/ .el-select {
  width: 100%;
}

.box-card:first-child {
  margin-bottom: 16px;
}
.search-all {
  margin: 0 50px;
}
.icon-search {
  width: 24px;
  height: auto;
  position: absolute;
  top: 8px;
  left: 292px;
  cursor: pointer;
}
</style>