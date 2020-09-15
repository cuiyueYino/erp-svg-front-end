<template>
  <div>
    <!-- 菜单栏 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="2">
          <el-select v-model="form.select" placeholder="请选择" size="mini">
            <el-option label="发送者" value="senderName"></el-option>
            <el-option label="主题" value="subject"></el-option>
            <el-option label="内容" value="content"></el-option>
            <el-option label="发送时间" value="sendTime"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-if="isNormal" v-model="form.selectVal"  placeholder="搜索内容"  prefix-icon="el-icon-search" clearable size="mini"/>
          <el-date-picker
                v-if="isDate"
                clearable
                v-model="form.startTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择开始日期"
                size="mini"
                style="width:140px">
          </el-date-picker>
          <el-date-picker
                v-if="isDate"
                clearable
                v-model="form.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择结束日期"
                size="mini"
                style="width:140px">
          </el-date-picker>
        </el-col >
        <el-col :span="4">
          <el-button el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-tickets" size="medium" plain @click="showAll">显示全部</el-button>
        </el-col>
        <el-col :span="13" style="text-align: right;">
          <el-button type="primary" icon='el-icon-message' size="medium" plain @click="getUnRead">未读邮件({{unReadCount}})</el-button>
          <el-button type="primary" plain icon="el-icon-postcard" size="medium" @click="setRead">已读</el-button>
          <el-button type="primary" plain icon="el-icon-finished" size="medium" @click="setReadAll">全部已读</el-button>
          <el-button type="primary" plain icon="el-icon-chat-line-round" size="medium"  @click="reply">回复</el-button>
          <el-button type="primary" plain class="el-icon-document-checked" size="medium" @click="replyAll">回复全部</el-button>
          <el-button type="success" plain icon="el-icon-position" size="medium" @click="relay">转发</el-button>
          <el-button type="info" plain icon="el-icon-view"  size="medium" @click="read">查看</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="medium" @click="deleteMsg">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <dynamic-table
        ref="dataTable"
        :columns="columns"
        :table-data="tableData"
        :total="total"
        :page-num="pageNum"
        :page-size="pageSize"
        v-loading="false"
        @current-change="onCurrentChange"
        @selection-change = "selection"
        element-loading-text="加载中"
        @Row-Click="clickRow">
      </dynamic-table>

    </el-card>
  </div>
</template>
<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  name: 'mailInbox',
  data() {
    const { rendersubject } = this;
    return {
      name: "insideMailInbox",
      userName: localStorage.getItem('ms_username'),
      userId: localStorage.getItem('ms_staffId'),
      //搜索内容
      form: {
        select: [],
        selectVal: "",
        endTime:'',
        startTime:''
      },
      isDate: false,
      isNormal: true,
      //未读数量
      unReadCount: 0,

      pageNum: 1,
      pageSize: 10,
      total: 0,
      columns: [
        {
          type: "selection"
        },
        {
          width: 200,
          key: "senderName",
          title: "发送者"
        },
        {
          key: "subject",
          title: "主题",
          render:rendersubject
        },
        {
          width: 300,
          key: "sendTime",
          title: "发送时间"
        },
        {
          width: 80,
          key: "isRead",
          title: "是否已读"
        }
      ],
      tableData: [],
      //选择器
      multipleSelection: [],
      // 共享参数列表（用于分页时带着条件）
      params: {},
    }
  },
  components: {
      DynamicTable
  },
  created() {
    this.$nextTick(() => {
      this.getReceiveMail('2');
    });
  },
  methods: {
    // 未读邮件的格式化
    rendersubject(v) {
      let subjectName = v.row.subject;
      switch(v.row.isRead){
        case '未读':
          return <div class='subjectStyle'>{subjectName}<span class="li-after"></span></div>;
          break;
        case '已读':
          return <div>{subjectName}</div>;
          break;
        default :
          break;
      }
          // if (v.row.projectNo) {
          //     let projectNoS = v.row.projectNo;
          //     projectNoS = projectNoS.split('-(')[0];
          //     return <div>{projectNoS}</div>;
          // }
      },
    /**
     * 获取收件箱信息
     */
    getReceiveMail(type){
      // debugger;
      //表格查询基础参数
      let reqParam={
        owner: this.userId,
        // owner: 'BFPID000000LSN000E',
        page: this.pageNum,
        size: this.pageSize
      };
      //拼入其他条件参数
      Object.assign(reqParam,this.params);
      //查询结果处理
      this.$api.insideMail.getReceiveMail(reqParam).then(
        res => {
          if(this.dataBack(res,"")){
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total;
            for(var i=0,len=this.tableData.length; i<len;i++ ){
              switch(this.tableData[i].isRead){
                case 0:
                  this.tableData[i].isRead = "未读";
                  break;
                case 1:
                  this.tableData[i].isRead = "已读";
                  break;
                default :
                  break;
              }
            }
            if(type == '2') {
              this.$api.insideMail.unReadCountById(reqParam).then(
              res => {
                this.unReadCount = res.data.data;
              }
            );
            }

          };
        }
      );

    },

    /**
     * 分页、下一页
     */
    onCurrentChange(val) {
      this.pageNum = val;
      this.getReceiveMail('2');
    },

    /**
     * 未读邮件
     */
    getUnRead(){
      //清空共享参数，拼装需要的参数
      this.emptyParam();
      this.params.isRead= 0;
      this.pageNum = 1;
      // 刷新列表
      this.getReceiveMail('2');
    },

    /**
     * 搜索
     */
    search() {
      this.emptyParam();
      if(this.isDate){
        this.params={
          startTime : this.form.startTime,
          endTime : this.form.endTime
        };
      }else{
        this.params={
          [this.form.select] : this.form.selectVal
        };
      }
      this.pageNum = 1;
      // 刷新列表
      this.getReceiveMail('1');
    },

    /**
     * 显示全部
     */
     showAll() {
        this.form.select=undefined;
        this.form.selectVal="";
        this.form.startTime="";
        this.form.endTime="";
       this.emptyParam();
       this.pageNum = 1;
       this.getReceiveMail('2');
     },

    /**
     * 选择器
     */
    selection(val) {
      this.multipleSelection = val;
    },

    /**
     *  已读
     */
    setRead(){
      if(this.multipleSelection.length==0){
        this.$message.error("未选中任何邮件");
        return;
      };
      let reqParam=[];
      this.multipleSelection.forEach(item => {
        let req={
          id: item.id,
          isRead: 1,
        };
        reqParam.push(req);
      });
      this.$api.insideMail.modifyMail(reqParam).then(
        res => {
          if(this.dataBack(res,"修改成功")){
            // 刷新表格
            this.getReceiveMail('2');
          };
        },
      );
      console.log(reqParam);
    },

    /**
     * 全部已读
     */
    setReadAll(){

      let reqParam={
        owner: this.userId,
        // owner: 'BFPID000000LSN000E'
      }
      //返回成功 刷新表格
      this.$api.insideMail.setReadAll(reqParam).then(
        res => {
          if(this.dataBack(res,"")){
            // 刷新表格
            this.getReceiveMail('2');
          };
        },
      );
    },

    /**
     * 回复
     */
    reply(){
      if (this.multipleSelection.length == 0) {
        this.$message.error("未选中任何邮件");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error("回复只能选择一封邮件");
        return;
      }
      let reqParam = {
        id: this.multipleSelection[0].id
      };
      this.$api.insideMail.reply(reqParam).then(
        res => {
          if(this.dataBack(res,"")){
            let data = res.data.data;
            this.$parent.$parent.$parent.toPage(data,"newMail");
          };
        }
      )
    },

    /**
     * 回复全部
     */
    replyAll(){
      if (this.multipleSelection.length == 0) {
        this.$message.error("未选中任何邮件");
        return;
      }
       if (this.multipleSelection.length > 1) {
        this.$message.error("回复只能选择一封邮件");
        return;
      }
      let reqParam = {
        id: this.multipleSelection[0].id
      };
      this.$api.insideMail.replyAll(reqParam).then(
        res => {
          if(this.dataBack(res,"")){
            let data = res.data.data;
            this.$parent.$parent.$parent.toPage(data,"newMail");
          };
        }
      )
    },

    /**
     * 转发
     */
    relay(){
      if (this.multipleSelection.length == 0) {
        this.$message.error("未选中任何邮件");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error("转发只能选择一封邮件");
        return;
      }
      let reqParam = {
        id: this.multipleSelection[0].id
      };
      this.$api.insideMail.relay(reqParam).then(
        res => {
          if(this.dataBack(res,"")){
            let data = res.data.data;
            this.$parent.$parent.$parent.toPage(data,"newMail");
          };
        }
      )
    },

    /**
     * 查看
     */
    read(){
      if (this.multipleSelection.length == 0) {
        this.$message.error("未选中任何邮件");
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error("查看只能选择一封邮件");
        return;
      }
      this.$parent.$parent.$parent.toDetail(this.multipleSelection[0].id,"inbox");
    },

    /**
     * 删除
     */
    deleteMsg(){
      if(this.multipleSelection.length==0){
        this.$message.error("未选中任何邮件");
        return;
      }
      let reqParam=[];
      this.multipleSelection.forEach(item => {
        let req={
          id: item.id,
          isDelete: 1,
        };
        reqParam.push(req);
      });
      this.$api.insideMail.modifyMail(reqParam).then(
        res => {
          if(this.dataBack(res,"删除成功")){
            // 刷新表格
            this.getReceiveMail('2');
          };
        },
      );
    },

    /**
     * 清空共享参数列表
     */
      emptyParam(){
      for(let key of Object.keys(this.params)){
         delete this.params[key];
      }
    },

    /* // 选中背景色
   tableRowClassName({
    row,
    rowIndex
   }) {
     console.log(row+"--"+rowIndex)
    var color = ""
    if(row.id == this.rowClickId) {
     color = "warning-row"
    }
    return color;
   }, */
   //选中行
   clickRow(val) {
    //  选中点击
    this.$refs.dataTable.toggleRowSelection(val);
   },

  },
  computed: {
    querySelect() {
      return this.form.select;
    },
  },
  watch: {
    querySelect(val) {
      this.form.selectVal = null;
      if (val == "sendTime") {
        // 开始，结束时间查询时
        this.isDate = true;
        this.isNormal = false;
      } else {
        this.isNormal = true;
        this.isDate = false;
      }
    },
  },


}
</script>
<style>
.el-table__fixed-right::before{
background-color:revert;
}
.subjectStyle {
  color: red !important;
}
.li-after {
  display: inline-block;
  margin: 0 0 4px 4px;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 4px;
}
</style>
