<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="15">
          <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
            <el-col :span="4">
              <el-form-item prop="select">
                <el-select v-model="form.select" placeholder="请选择">
                  <el-option label="公司" value="fcompanyname"></el-option>
                  <el-option label="编码" value="fcode"></el-option>
                  <el-option label="名称" value="fname"></el-option>
                  <el-option label="会议室" value="fconfname"></el-option>
                  <el-option label="参会人数" value="fcpmcount"></el-option>
                  <el-option label="是否公开" value="fovert"></el-option>
                  <el-option label="起始时间" value="fstartdate"></el-option>
                  <el-option label="结束时间" value="fenddate"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item prop="selectVal">
              <el-input v-if="isNormal" clearable v-model="form.selectVal" placeholder="请输入任意查询内容"></el-input>
              <el-date-picker
                v-if="isDate"
                clearable
                v-model="form.selectVal"
                value-format="yyyy-MM-dd HH:mm"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <el-select v-if="isOvert" v-model="form.selectVal" placeholder="请选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="resetForm('form')" class="search-all">显示全部信息</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" style="text-align: right;">
          <el-button type="success" plain class="el-icon-plus" size="medium" @click="add">新建</el-button>
          <el-button type="warning" plain class="el-icon-edit" size="medium" @click="toEdit">修改</el-button>
          <el-button type="primary" plain class="el-icon-unlock" size="medium" @click="toRevise">修订</el-button>
          <el-button type="danger" plain class="el-icon-delete" size="medium" @click="cancleMsg">取消</el-button>
          <el-button type="primary" plain class="el-icon-search" size="medium" @click="queryMsg">查看</el-button>
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
    <!-- 提交弹出框 -->
    <el-dialog
      :title="isEdit?'修改会议申请':'新建会议申请'"
      class="add-apply"
      center
      :visible.sync="submitFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-right: 60px;">
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item
              label="公司："
              :label-width="formLabelWidth"
              style="position:relative;"
              prop="fcompany"
            >
              <el-input
                v-model="searchForm.fcompanyname"
                autocomplete="off"
                size="small"
                @focus="baseInputTable('1','组织机构查询')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-model="searchForm.fcode" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-model="searchForm.fname" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人：" :label-width="formLabelWidth" prop="fconvener">
              <el-input
                v-model="searchForm.fconvenername"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('2','用户查询')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fconvenerdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人：" :label-width="formLabelWidth" prop="fcontact">
              <el-input
                v-model="searchForm.fcontactname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('3','用户查询')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fcontactdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式：" :label-width="formLabelWidth" prop="fphone">
              <el-input v-model="searchForm.fphone" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="参会人数(人)：" :label-width="formLabelWidth" prop="fcpmcount">
              <el-input v-model="searchForm.fcpmcount" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起始时间：" :label-width="formLabelWidth" prop="fstartdate">
              <el-date-picker
                clearable
                v-model="searchForm.fstartdate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="fenddate">
              <el-date-picker
                clearable
                v-model="searchForm.fenddate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="会议室：" :label-width="formLabelWidth" prop="fconfname">
              <el-input
                v-model="searchForm.fconfname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="queryConfOffice('1')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="是否公开：" :label-width="formLabelWidth">
              <el-switch
                v-model="searchForm.fovert"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="重要程度：" :label-width="formLabelWidth" prop="fimportanceValue">
              <el-select size="small" v-model="searchForm.fimportanceValue" placeholder="请选择">
                <el-option label="重要" value="1"></el-option>
                <el-option label="一般" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="padding-left: 48px !important;">
            <el-form-item label="是否对外：" :label-width="formLabelWidth">
              <el-switch
                v-model="searchForm.fexternal"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="内部参与人：" :label-width="formLabelWidth" prop="internalmans">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                class="unfocus"
                v-model="searchForm.internalMansName"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-internalMansName_" style="padding: 10px 0 0 0 !improtant;">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('4','用户查询')"
            ></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="外部参与人：" :label-width="formLabelWidth" prop="fexternalman">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                v-model="searchForm.fexternalman"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="会议内容：" :label-width="formLabelWidth" prop="fmeetcontent">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                v-model="searchForm.fmeetcontent"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfApply('searchForm')">提 交</el-button>
        <el-button @click="stagingConfApply('searchForm')">暂 存</el-button>
      </div>
    </el-dialog>
    <!-- 修订弹出框 -->
    <el-dialog
      :title="'修订会议申请'"
      class="revise-apply"
      center
      :visible.sync="resiveFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-right: 60px;">
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item
              label="公司："
              :label-width="formLabelWidth"
              style="position:relative;"
              prop="fcompany"
            >
              <el-input
                v-model="searchForm.fcompanyname"
                autocomplete="off"
                size="small"
                @focus="baseInputTable('1','组织机构查询')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-model="searchForm.fcode" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-model="searchForm.fname" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人：" :label-width="formLabelWidth" prop="fconvener">
              <el-input
                v-model="searchForm.fconvenername"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('2','用户查询')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fconvenerdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人：" :label-width="formLabelWidth" prop="fcontact">
              <el-input
                v-model="searchForm.fcontactname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('3','用户查询')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fcontactdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式：" :label-width="formLabelWidth" prop="fphone">
              <el-input v-model="searchForm.fphone" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="参会人数(人)：" :label-width="formLabelWidth" prop="fcpmcount">
              <el-input v-model="searchForm.fcpmcount" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起始时间：" :label-width="formLabelWidth" prop="fstartdate">
              <el-date-picker
                clearable
                v-model="searchForm.fstartdate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="fenddate">
              <el-date-picker
                clearable
                v-model="searchForm.fenddate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="会议室：" :label-width="formLabelWidth" prop="fconfname">
              <el-input
                v-model="searchForm.fconfname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="queryConfOffice('1')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="是否公开：" :label-width="formLabelWidth">
              <el-switch
                v-model="searchForm.fovert"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="重要程度：" :label-width="formLabelWidth" prop="fimportanceValue">
              <el-select size="small" v-model="searchForm.fimportanceValue" placeholder="请选择">
                <el-option label="重要" value="0"></el-option>
                <el-option label="一般" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="padding-left: 48px !important;">
            <el-form-item label="是否对外：" :label-width="formLabelWidth">
              <el-switch
                v-model="searchForm.fexternal"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="内部参与人：" :label-width="formLabelWidth" prop="internalmans">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                class="unfocus"
                v-model="searchForm.internalMansName"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-internalMansName">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('4','用户查询')"
            ></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="外部参与人：" :label-width="formLabelWidth" prop="fexternalman">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                v-model="searchForm.fexternalman"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="会议内容：" :label-width="formLabelWidth" prop="fmeetcontent">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                v-model="searchForm.fmeetcontent"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfApply('searchForm')">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹出框 -->
    <el-dialog
      :title="'查看会议申请'"
      class="add-apply"
      center
      :visible.sync="queryFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-right: 60px;">
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item
              label="公司："
              :label-width="formLabelWidth"
              style="position:relative;"
              prop="fcompany"
            >
              <el-input
                v-model="searchForm.fcompanyname"
                autocomplete="off"
                size="small"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-model="searchForm.fcode" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-model="searchForm.fname" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人：" :label-width="formLabelWidth" prop="fconvener">
              <el-input
                v-model="searchForm.fconvenername"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fconvenerdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人：" :label-width="formLabelWidth" prop="fcontact">
              <el-input
                v-model="searchForm.fcontactname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fcontactdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式：" :label-width="formLabelWidth" prop="fphone">
              <el-input
                v-model="searchForm.fphone"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="参会人数(人)：" :label-width="formLabelWidth" prop="fcpmcount">
              <el-input
                v-model="searchForm.fcpmcount"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起始时间：" :label-width="formLabelWidth" prop="fstartdate">
              <el-date-picker
                clearable
                v-model="searchForm.fstartdate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="fenddate">
              <el-date-picker
                clearable
                v-model="searchForm.fenddate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="会议室：" :label-width="formLabelWidth" prop="fconfname">
              <el-input
                v-model="searchForm.fconfname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="是否公开：" :label-width="formLabelWidth" prop="fovertValue">
              <el-switch
                v-model="searchForm.fovertValue"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
                :disabled="true"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="重要程度：" :label-width="formLabelWidth" prop="fimportanceValue">
              <el-select
                size="small"
                v-model="searchForm.fimportanceValue"
                :disabled="true"
                placeholder="请选择"
              >
                <el-option label="重要" value="0"></el-option>
                <el-option label="一般" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="padding-left: 48px !important;">
            <el-form-item label="是否对外：" :label-width="formLabelWidth" prop="fexternalVaule">
              <el-switch
                v-model="searchForm.fexternalVaule"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
                :disabled="true"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="内部参与人：" :label-width="formLabelWidth" prop="internalmans">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                class="unfocus"
                v-model="searchForm.internalMansName"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-internalMansName_">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="外部参与人：" :label-width="formLabelWidth" prop="fexternalman">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                :disabled="true"
                v-model="searchForm.fexternalman"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="会议内容：" :label-width="formLabelWidth" prop="fmeetcontent">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                :disabled="true"
                v-model="searchForm.fmeetcontent"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 用户或组织机构模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <staff-tree-search
        class="children-dialog"
        :visible="staffTableVsible"
        :type="baseInputType"
        :title="baseInputTitle"
        :fcompanyid="fcompanyid"
        @closeDialog="closeBaseInfo"
      ></staff-tree-search>
    </el-form>

    <!-- 会议室模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <conference-office-search
        class="children-dialog"
        :type="type"
        :visible="officeTableVsible"
        :fcompanyid="fcompanyid"
        :fstartdate="fstartdate"
        :fenddate="fenddate"
        :fvolume="fvolume"
        @closeDialog="closeConfOffice"
      ></conference-office-search>
    </el-form>
  </div>
</template>

<script>
  import DynamicTable from "../../components/common/dytable/dytable.vue";
  import staffTreeSearch from "../conference/staff-tree-search";
  import conferenceOfficeSearch from "../conference/conference-office-search";

  export default {
    name: "confOffice",
    components: {
      DynamicTable,
      staffTreeSearch,
      conferenceOfficeSearch,
    },
    data() {
      let checkInt = (rule, value, callback) => {
        if (Number(value) && value % 1 === 0) {
          callback();
        } else {
          return callback(new Error("请输入整数！"));
        }
      };
      return {
        isEdit: false,
        isDate: false,
        isNormal: true,
        isOvert: false,
        submitFormVisible: false,
        resiveFormVisible: false,
        queryFormVisible: false,
        staffTableVsible: false,
        officeTableVsible: false,
        rowPOSStype: false,
        pageNum: 1,
        pageSize: 10,
        total: 20,
        baseInputTitle: "",
        baseInputType: "",
        formLabelWidth: "120px",
        fcompanyid: "",
        fstartdate: "",
        fenddate: "",
        type: "",
        fvolume: 0,
        formProcess: {},
        tableData: [],
        rowPOSSDataObj: {},
        multipleSelection: [],
        form: {
          select: [],
          selectVal: "",
        },
        searchForm: {
          fovert: 0,
          fexternal: 0,
          fcompanyid: "_DefaultCompanyOId",
          fcompanyname: "福佳集团",
        },
        columns: [
          {
            type: "selection",
          },
          {
            key: "fstatusValue",
            title: "状态",
          },
          {
            key: "fcode",
            title: "编码",
          },
          {
            key: "fname",
            title: "名称",
          },
          {
            key: "fconfname",
            title: "会议室",
          },
          {
            key: "fconvenername",
            title: "召集人",
          },
          {
            key: "fconvenerdeptname",
            title: "召集人部门",
          },
          {
            key: "fcontactname",
            title: "联系人",
          },
          {
            key: "fcontactdeptname",
            title: "联系人部门",
          },
          {
            key: "fphone",
            title: "联系方式",
          },
          {
            key: "fcpmcount",
            title: "参会人数(人)",
          },
          {
            key: "fstartdate",
            title: "起始时间",
          },
          {
            key: "fenddate",
            title: "结束时间",
          },
          {
            key: "fovertValue",
            title: "是否公开",
          },
          {
            key: "fexternalVaule",
            title: "是否对外",
          },
          {
            key: "fimportanceValue",
            title: "重要程度",
          },
        ],
        rules: {
          fcode: [
            {required: true, message: "请输入编码", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 50 个字符",
              trigger: "blur",
            },
          ],
          fname: [
            {required: true, message: "请输入名称", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 100 个字符",
              trigger: "blur",
            },
          ],
          fcpmcount: [{validator: checkInt, trigger: "blur"}],
          fconvener: [
            {required: true, message: "请输入召集人", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
          fcontact: [
            {required: true, message: "请输入联系人", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
          fconfname: [
            {required: true, message: "请输入会议室", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
          fimportanceValue: [
            {required: true, message: "请输入重要程度", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
          fstartdate: [
            {
              type: "string",
              required: true,
              message: "起始时间格式错误",
              trigger: "change",
            },
          ],
          fenddate: [
            {
              type: "string",
              required: true,
              message: "结束时间格式错误",
              trigger: "change",
            },
          ],
        },
      };
    },
    created() {
      this.$nextTick(() => {
        this.getTableData("");
      });
    },
    computed: {
      querySelect() {
        return this.form.select;
      },
    },
    watch: {
      querySelect(val) {
        this.form.selectVal = null;
        if (val == "fstartdate" || val == "fenddate") {
          // 开始，结束时间查询时
          this.isDate = true;
          this.isNormal = false;
          this.isOvert = false;
        } else if (val == "fovert") {
          // 是否公开查询时
          this.isOvert = true;
          this.isDate = false;
          this.isNormal = false;
        } else {
          this.isNormal = true;
          this.isDate = false;
          this.isOvert = false;
        }
      },
    },
    methods: {
      //分页、下一页
      onCurrentChange(val) {
        this.pageNum = val;
        this.isEdit = false;
        this.getTableData("");
      },
      //多选
      onSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length > 1) {
          this.$message.error("只能选择一个");
          return;
        }
      },
      // 搜索
      onSubmit() {
        console.log(this.form.select);
        this.isEdit = false;
        this.pageNum = 1;
        this.getTableData(this.form.select);
      },
      // 新增
      add() {
        this.searchForm = {
          fcompanyid: "_DefaultCompanyOId",
          fcompanyname: "福佳集团",
        };
        this.submitFormVisible = true;
        this.pageNum = 1;
        this.isEdit = false;
      },
      // 修改
      toEdit() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        if (this.multipleSelection[0].fstatusValue != "暂存") {
          this.$message.error("只有暂存状态的数据可以修改");
          return;
        }
        this.isEdit = true;
        this.getTableData("foid");
        this.submitFormVisible = true;
      },
      // 修订
      toRevise() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        if (this.multipleSelection[0].fstatusValue != "生效") {
          this.$message.error("只有生效状态的数据可以修改");
          return;
        }
        this.isEdit = true;
        this.getTableData("foid");
        this.resiveFormVisible = true;
      },
      // 取消
      cancleMsg() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        this.$confirm("确实要取消当前选择的记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.confMangement
              .cancelConfApply(this.multipleSelection[0].foid)
              .then((res) => {
                if (res.data.code == 0) {
                  this.$message.success("已取消!");
                  this.isEdit = false;
                  //刷新表格
                  this.getTableData("");
                } else {
                  let errorMsg = res.data.msg;
                  const h = this.$createElement;
                  let params = h("p", null, [
                    h("span", null, ""),
                    h("p", null, errorMsg),
                  ]);
                  this.errorOpen(params);
                }
              }),
              (error) => {
                console.log(error);
              };
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      // 错误提示框
      errorOpen(params) {
        this.$msgbox({
          title: "错误",
          message: params,
          showCancelButton: false,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then((action) => {
        });
      },
      // 显示全部信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.pageNum = 1;
        this.isEdit = true;
        this.getTableData("");
      },
      // 获取列表数据
      getTableData(params) {
        let data;
        switch (this.isEdit) {
          case true:
            // 修改
            data = {
              [params]: this.multipleSelection[0].foid,
              page: 1,
              size: 999,
            };
            break;
          case false:
            let dataParams = this.form.selectVal;
            // 新增
            data = {
              [params]: dataParams,
              page: this.pageNum,
              size: this.pageSize,
            };
            break;

          default:
            break;
        }
        this.$api.confMangement.getApplyList(data).then(
          (res) => {
            if (this.isEdit) {
              let resData = res.data.data.rows[0];
              let internalMans = resData.internalmans;
              let internalMansName = "";
              for (let i in internalMans) {
                if (i < internalMans.length - 1) {
                  internalMansName += internalMans[i].fname + ",";
                } else {
                  internalMansName += internalMans[i].fname;
                }
              }
              switch (resData.fimportance) {
                case 0:
                  resData.fimportanceValue = "一般";
                  break;
                case 1:
                  resData.fimportanceValue = "重要";
                  break;
                default:
                  break;
              }
              this.searchForm = resData;
              this.searchForm.internalMansName = internalMansName;
              this.searchForm.internalMans = internalMans;
              console.log(this.searchForm);
            } else {
              let taData = res.data.data.rows;
              for (let i in taData) {
                // 状态 0：暂存 1：提交 2：生效 3：作废
                switch (taData[i].fstatus) {
                  case 0:
                    taData[i].fstatusValue = "暂存";
                    break;
                  case 1:
                    taData[i].fstatusValue = "提交";
                    break;
                  case 2:
                    taData[i].fstatusValue = "生效";
                    break;
                  case 3:
                    taData[i].fstatusValue = "作废";
                    break;
                  default:
                    break;
                }
                // 是否公开 0：公开 1：不公开
                switch (taData[i].fovert) {
                  case 0:
                    taData[i].fovertValue = "是";
                    break;
                  case 1:
                    taData[i].fovertValue = "否";
                    break;
                  default:
                    break;
                }
                // 是否对外 0：对内 1：对外
                switch (taData[i].fexternal) {
                  case 0:
                    taData[i].fexternalVaule = "否";
                    break;
                  case 1:
                    taData[i].fexternalVaule = "是";
                    break;
                  default:
                    break;
                }
                // 重要程度 0：一般 1：重要
                switch (taData[i].fimportance) {
                  case 0:
                    taData[i].fimportanceValue = "一般";
                    break;
                  case 1:
                    taData[i].fimportanceValue = "重要";
                    break;
                  default:
                    break;
                }
              }
              this.searchForm = {};
              this.total = res.data.data.total;
              this.tableData = taData;
              console.log(this.tableData);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 提交
      submitConfApply(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check();
            this.$api.confMangement
              .submitConfApply(this.searchForm)
              .then((res) => {
                if (res.data.code == 0) {
                  this.submitFormVisible = false;
                  this.isEdit = false;
                  this.$message.success("提交成功");
                  //刷新表格
                  this.getTableData("");
                } else {
                  this.$message.error(res.data.msg);
                }
              }),
              (error) => {
                console.log(error);
              };
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 暂存
      stagingConfApply(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check();
            console.log(this.searchForm);
            this.$api.confMangement
              .stagingConfApply(this.searchForm)
              .then((res) => {
                if (res.data.code == 0) {
                  this.submitFormVisible = false;
                  this.isEdit = false;
                  this.$message.success("暂存成功");
                  //刷新表格
                  this.getTableData("");
                } else {
                  this.$message.error(res.data.msg);
                }
              }),
              (error) => {
                console.log(error);
              };
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 暂存或提交form表单校验
      check(){
        if (this.searchForm.internalmans.length <= 0) {
          this.$message.error("内部参与人员不可为空");
          return;
        }
        switch (this.searchForm.fimportanceValue) {
          case "0":
            this.searchForm.fimportance = 0;
            break;
          case "1":
            this.searchForm.fimportance = 1;
            break;
          default:
            break;
        }
      },
      //查看
      queryMsg() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据查看详情");
          return;
        }
        this.isEdit = true;
        this.getTableData("foid");
        this.queryFormVisible = true;
      },
      // 打开组织架构弹窗
      baseInputTable(type, title) {
        this.staffTableVsible = true;
        this.baseInputType = type; //公司:1,召集人:2,联系人:3
        this.baseInputTitle = title; //如:用户查询
      },
      // 关闭组织架构弹窗
      closeBaseInfo(data, title, type) {
        if (data == null || data.length === 0) {
        } else {
          if (type === "1") {
            // 公司
            this.searchForm.fcompanyname = data.fname;
            this.searchForm.fcompanyid = data.foid;
            this.fcompanyid = data.foid;
          } else if (type === "2") {
            // 召集人
            this.searchForm.fconvenername = data.fname;
            this.searchForm.fconvener = data.foid;
            this.searchForm.fconvenerdeptname = data.fdeptname;
            this.searchForm.fconvenerdept = data.fdeptid;
          } else if (type === "3") {
            // 联系人
            this.searchForm.fcontactname = data.fname;
            this.searchForm.fcontact = data.foid;
            this.searchForm.fcontactdeptname = data.fdeptname;
            this.searchForm.fcontactdept = data.fdeptid;
          } else if (type === "4") {
            let internalmans = [];
            let internalMansName = "";
            for (let i in data) {
              if (i < data.length - 1) {
                internalMansName += data[i].fname + ",";
              } else {
                internalMansName += data[i].fname;
              }
              let staff = {
                foid: data[i].foid,
                fname: data[i].fname,
              };
              internalmans.push(staff);
            }
            this.searchForm.internalmans = internalmans;
            this.searchForm.internalMansName = internalMansName;
          }
        }
        this.staffTableVsible = false;
      },
      // 打开会议室弹窗
      queryConfOffice(type) {
        if (this.searchForm.fstartdate == null) {
          this.$message.error("会议开始时间不可为空");
          return;
        }
        if (this.searchForm.fenddate == null) {
          this.$message.error("会议结束时间不可为空");
          return;
        }
        if (this.searchForm.fcpmcount == null) {
          this.$message.error("会议参与人数不可为空");
          return;
        }
        this.type = type;
        this.fcompanyid = this.searchForm.fcompany;
        this.fstartdate = this.searchForm.fstartdate;
        this.fenddate = this.searchForm.fenddate;
        this.fvolume = parseInt(this.searchForm.fcpmcount);
        this.officeTableVsible = true;
      },
      // 关闭会议室弹窗
      closeConfOffice(data) {
        this.searchForm.fconfname = data.fname;
        this.searchForm.fconfid = data.foid;
        this.officeTableVsible = false;
      },
    },
  };
</script>
<style lang="scss" scoped>
  /deep/ .el-textarea .el-input__count {
    background: #fff0;
  }

  /deep/ .el-select {
    width: 100%;
  }

  /deep/ .el-col {
    padding-right: 6px !important;
  }

  /deep/ .el-confOffice {
    padding-left: 0px !important;
    padding-top: 6px;
  }

  /deep/ .el-table__fixed-right::before {
    background-color: revert;
  }

  /deep/ .el-positionType {
    padding-left: 0px !important;
    padding-top: 6px;
  }

  /deep/ .el-internalmans {
    padding-left: 0px !important;
    padding-top: 10px;
  }

  /deep/ .el-form-item .el-form-item__label {
    padding-left: 13px;
    text-align: left;
  }

  /deep/ .unfocus .el-textarea__inner {
    background-color: #e4e7ed;
    color: #606266;
  }

  /deep/ .unfocus .el-input__inner {
    background-color: #e4e7ed;
    color: #606266;
  }

  /deep/ .el-input.is-disabled .el-input__inner {
    color: #606266;
  }

  /deep/ .el-textarea.is-disabled .el-textarea__inner {
    color: #606266;
  }

  .el-internalMansName_ {
    padding: 10px 0 0 0 !important;
  }

  .box-card:first-child {
    margin-bottom: 16px;
  }

  .icon-search {
    width: 24px;
    height: auto;
    position: absolute;
    top: 8px;
    left: 230px;
    cursor: pointer;
  }
</style>
