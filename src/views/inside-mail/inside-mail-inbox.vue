<template>
  <div>
    <!-- 菜单栏 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="5">
          <el-input v-model="content"  placeholder="根据标题或内容搜索"  prefix-icon="el-icon-search" clearable />
        </el-col >
        <el-col :span="5">
          <el-button el-button type="primary" @click="search" >搜索</el-button>
        </el-col>
        <el-col :span="14" style="text-align: right;">
          <el-button type="primary" plain class="el-icon-paperclip" >未读邮件({{unReadCount}})</el-button>
          <el-button type="primary" plain class="el-icon-check" @click="setRead">已读</el-button>
          <el-button type="primary" plain class="el-icon-check" @click="setReadAll">全部已读</el-button>
          <el-button type="primary" plain class="el-icon-s-promotion" @click="reply">回复</el-button>
          <el-button type="primary" plain class="el-icon-s-promotion" @click="replyAll">回复全部</el-button>
          <el-button type="primary" plain class="el-icon-share" @click="relay">转发</el-button>
          <el-button type="info" plain class="el-icon-reading" @click="read">查看</el-button>
          <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg">删除</el-button>
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
        element-loading-text="加载中">
      </dynamic-table>

    </el-card>
  </div>
</template>
<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  name: '',
  data() {
    return {
      name: "insideMailInbox",
      
      //搜索内容
      content : "",
      //未读数量
      unReadCount: 1,

      pageNum: 1,
      pageSize: 10,
      total: 10,
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

    }
  },
  components: {
      DynamicTable
  },
  created() {
    
  },
  mounted(){
    this.$nextTick(() => {
      this.getReceiveMail("");
    });
  },
  methods: {
    // 获取收件箱信息
    getReceiveMail(Params){     
      let reqParam;

      reqParam={
        owner: 'BFPID000000LSN000E',
        page: this.pageNum,
        size: this.pageSize
      }
      
      this.$api.insideMail.getReceiveMail(reqParam).then(
        res => {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
          for(let i in this.tableData){
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
        }
      )
      this.$api.insideMail.unReadCountById(reqParam).then(
        res => {
          this.unReadCount = res.data.data;
        }
      )
    },

    // 搜索
    search() {
      alert(this.content);
    },
    //选择器
    selection(val) {
      this.multipleSelection = val;
    },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      // this.getTableData("");
    },
    // 已读
    setRead(){
      alert("已读");
    },
    // 全部已读
    setReadAll(){
      alert("全部已读");
    },
    // 回复
    reply(){
      if (this.multipleSelection.length > 1) {
        this.$message.error("回复只能选择一封邮件");
        return;
      }
      alert("回复");
    },
    // 回复全部
    replyAll(){
       if (this.multipleSelection.length > 1) {
        this.$message.error("回复只能选择一封邮件");
        return;
      }
      alert("回复全部");
    },
    // 转发
    relay(){
      if (this.multipleSelection.length > 1) {
        this.$message.error("转发只能选择一封邮件");
        return;
      }
      alert("转发");
    },
    // 查看
    read(){
      if (this.multipleSelection.length > 1) {
        this.$message.error("查看只能选择一封邮件");
        return;
      }
      alert("查看");
    },
    // 删除
    deleteMsg(){
      alert("删除");
    }


  }
    
      
}
</script>
<style lang="scss" scoped>
</style>