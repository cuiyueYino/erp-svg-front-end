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
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.selectVal"  placeholder="根据标题或内容搜索"  prefix-icon="el-icon-search" clearable size="mini"/>
        </el-col >
        <el-col :span="3">
          <el-button el-button type="primary" @click="search" icon="el-icon-search" size="mini">搜索</el-button>
        </el-col>
        <el-col :span="14" style="text-align: right;">
          <el-button type="primary" plain class="el-icon-paperclip" @click="getUnRead" size="mini">未读邮件({{unReadCount}})</el-button>
          <el-button type="primary" plain class="el-icon-check" @click="setRead" size="mini">已读</el-button>
          <el-button type="primary" plain class="el-icon-check" @click="setReadAll" size="mini">全部已读</el-button>
          <el-button type="primary" plain class="el-icon-s-promotion" @click="reply" size="mini">回复</el-button>
          <el-button type="primary" plain class="el-icon-s-promotion" @click="replyAll" size="mini">回复全部</el-button>
          <el-button type="primary" plain class="el-icon-share" @click="relay" size="mini">转发</el-button>
          <el-button type="info" plain class="el-icon-reading" @click="read" size="mini">查看</el-button>
          <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg" size="mini">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <dynamic-table
        :columns="columns"
        :table-data="tableData"
        :total="total"
        :page-num="pageNum"
        :page-size="pageSize"
        v-loading="false"
        @current-change="onCurrentChange"
        @selection-change = "selection"
        element-loading-text="加载中"
        :row-class-name="tableRowClassName"
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
    return {
      name: "insideMailInbox",
      
      //搜索内容
      form: {
        select: [],
        selectVal: "",
      },
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
          title: "主题"
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
      rowClickId:"",
      // 共享参数列表（用于分页时带着条件）
      params: {},
    }
  },
  components: {
      DynamicTable
  },
  created() {
    this.$nextTick(() => {
      this.getReceiveMail();
    });
    console.log("进入收件箱");
  },
  methods: {
    /**
     * 获取收件箱信息
     */
    getReceiveMail(){
      //表格查询基础参数
      let reqParam={
        owner: 'BFPID000000LSN000E',
        page: this.pageNum,
        size: this.pageSize
      };
      //拼入其他条件参数
      Object.assign(reqParam,this.params);
      //查询结果处理
      this.$api.insideMail.getReceiveMail(reqParam).then(
        res => {
          if(res.data.code==0){
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
            this.$api.insideMail.unReadCountById(reqParam).then(
              res => {
                this.unReadCount = res.data.data;
              }
            );
          }else{
            this.$message.error(res.data.msg)
          };
        }
      );
      
    },

    /**
     * 分页、下一页
     */
    onCurrentChange(val) {
      this.pageNum = val;
      this.getReceiveMail();
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
      this.getReceiveMail();
    },

    /**
     * 搜索
     */
    search() {
      
      this.params={
        [this.form.select] : this.form.selectVal
      };
      // 刷新列表
      this.getReceiveMail();
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
          if(res.data.code==0){
            this.$message.success("修改成功")
            // 刷新表格
            this.getReceiveMail();
          }else{
            this.$message.error(res.data.msg)
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
        owner: 'BFPID000000LSN000E'
      }
      //返回成功 刷新表格
      this.$api.insideMail.setReadAll(reqParam).then(
        res => {
          if(res.data.code==0){
            this.$message.success("修改成功")
            // 刷新表格
            this.getReceiveMail();
          }else{
            this.$message.error(res.data.msg)
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
          if(res.data.code==0){
            let data = res.data.data;
            this.$parent.$parent.$parent.toNewMail(data);
          }else{
            this.$message.error(res.data.msg)
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
          if(res.data.code==0){
            let data = res.data.data;
            this.$parent.$parent.$parent.toNewMail(data);
          }else{
            this.$message.error(res.data.msg)
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
          if(res.data.code==0){
            let data = res.data.data;
            this.$parent.$parent.$parent.toNewMail(data);
          }else{
            this.$message.error(res.data.msg)
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
          if(res.data.code==0){
            this.$message.success("删除成功")
            // 刷新表格
            this.getReceiveMail();
          }else{
            this.$message.error(res.data.msg)
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

    // 选中背景色
   tableRowClassName({
    row,
    rowIndex
   }) {
    var color = ""
    if(row.id == this.rowClickId) {
     color = "warning-row"
    }
    return color;
   },
   //选中行
   clickRow(val) {
    this.selection(val);
    console.log(this.multipleSelection.length);
    this.rowClickId = val.id
   },

  }
    
      
}
</script>
<style lang="scss" scoped>
/deep/ .el-table__fixed-right::before {
  background-color: revert;
}
</style>