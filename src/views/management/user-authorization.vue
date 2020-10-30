<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="24">
				<!--<el-col :span="12">
					<el-form :inline="true" class="demo-form-inline">
						<el-col :span="5">
							<el-select v-model="formInline.company" placeholder="公司" clearable>
								<el-option v-for="item in companyData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-col>
					</el-form>
				</el-col>-->
				<el-col :span="6" :offset="18">
					<el-button type="warning" size="small" icon="el-icon-sort"   @click="Changedimension">切换维度</el-button>
					<el-button type='success' size="small" icon='el-icon-check'   @click="determineSave">确定</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card>
			<el-row>
				<el-col :span="11">
					<el-row>
						<el-col :span="5" :offset="1">
							<el-select v-model="formInline.regionleft" placeholder="请选择">
								<el-option v-for="item in leftData" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6" :offset="1">
							<el-input v-model="formInline.searchValueleft"></el-input>
						</el-col>
						<el-col :span="2" :offset="1">
							<el-button type="primary" size="small" icon="el-icon-help"   @click="filterLeft">过滤</el-button>
						</el-col>
						<el-col :span="2" :offset="1">
							<el-button type="primary" size="small" icon="el-icon-menu"   @click="getALLLeft">全部</el-button>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="11" :offset="1">
					<el-row>
						<el-col :span="5" :offset="1">
							<el-select v-model="formInline.regionRight" placeholder="请选择">
								<el-option v-for="item in rightData" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6" :offset="1">
							<el-input v-model="formInline.searchValueright"></el-input>
						</el-col>
						<el-col :span="2" :offset="1">
							<el-button type="primary" size="small" icon="el-icon-help"   @click="filterRight">过滤</el-button>
						</el-col>
						<el-col :span="2" :offset="1">
							<el-button type="primary" size="small" icon="el-icon-menu"   @click="getALLRight">全部</el-button>
						</el-col>
						<el-col :span="2" :offset="1">
							<el-button type="success" size="small" icon="el-icon-circle-check"   @click="RightSelecT">已选中</el-button>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row class="magiantop">
				<el-col :span="11">
					<div v-if="dimension">
						<el-table ref="userTable" :data="UsertableData" tooltip-effect="dark" size="small" border style="width: 100%" :row-style="rowClass" @row-click="selectRow">
							<el-table-column prop="fcode" size="small" label="登录账户"></el-table-column>
							<el-table-column prop="fname" size="small" label="用户名称"></el-table-column>
							<el-table-column prop="fcompanyname" size="small" label="公司名称"></el-table-column>
						</el-table>
						<div class="pagination" v-if="UsertableData.length >0">
							<el-pagination :total="total" background layout="prev, pager, next,jumper,total" :current-page="pageNum" :page-size="pageSize" @current-change="onUserCurrentChange">
							</el-pagination>
						</div>
					</div>
					<div v-else>
						<el-table ref="roleLTable" :data="roleLtableData" tooltip-effect="dark" size="small" border style="width: 100%" :row-style="roleLrowClass" @row-click="selectroleLRow">
							<el-table-column prop="code" size="small" label="角色编码"></el-table-column>
							<el-table-column prop="name" size="small" label="角色名称"></el-table-column>
							<el-table-column prop="companyName" size="small" label="公司名称"></el-table-column>
						</el-table>
						<div class="pagination" v-if="roleLtableData.length >0">
							<el-pagination :total="roleLtotal" background layout="prev, pager, next,jumper,total" :current-page="roleLpageNum" :page-size="pageSize" @current-change="onroleLCurrentChange">
							</el-pagination>
						</div>
					</div>
				</el-col>
				<el-col :span="11" :offset="1">
					<div v-if="dimension" class="CheckTable">
						<el-table ref="roleTable" :data="RoletableData" tooltip-effect="dark" size="small" border style="width: 100%" @select-all="onRoleSelectionALLChange" @select="onRoleSelectionChange"
							@row-click="clickRow1">
							<el-table-column type="selection" min-width="5%"></el-table-column>
							<el-table-column prop="code" size="small" label="角色编码"></el-table-column>
							<el-table-column prop="name" size="small" label="角色名称"></el-table-column>
							<el-table-column prop="companyName" size="small" label="公司名称"></el-table-column>
						</el-table>
						<div class="pagination" v-if="RoletableData.length >0">
							<el-pagination :total="total1" background layout="prev, pager, next,jumper,total" :current-page="pageNum1" :page-size="pageSize" @current-change="onRoleCurrentChange">
							</el-pagination>
						</div>
					</div>
					<div v-else class="CheckTable">
						<el-table ref="UserLTable" :data="UserLtableData" tooltip-effect="dark" size="small" border style="width: 100%" @select-all="onUserLSelectionALLChange"  @select="onUserLSelectionChange"@row-click="clickRow2">
							<el-table-column type="selection" min-width="5%"></el-table-column>
							<el-table-column prop="fcode" size="small" label="登录账户"></el-table-column>
							<el-table-column prop="fname" size="small" label="用户名称"></el-table-column>
							<el-table-column prop="fcompanyname" size="small" label="公司名称"></el-table-column>
						</el-table>
						<div class="pagination" v-if="UserLtableData.length >0">
							<el-pagination :total="totalUserL" background layout="prev, pager, next,jumper,total" :current-page="pageNumUserL" :page-size="pageSize" @current-change="onUserLCurrentChange">
							</el-pagination>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script>
	import proData from '../../components/common/proData/proData';
	import DynamicTable from '../../components/common/dytable/dytable.vue';
	export default {
		name: 'workProcess',
		components: {
			DynamicTable,
		},
		data() {
			return {
				ALLSelectFlage: false,
				dimension: false,
				disShowPager: true,
				companyData:[],
				formInline: {
					searchValueleft: "",
					searchValueright: "",
					company: '_DefaultCompanyOId'
				},
				pageNum: 1,
                pageNumUser:1,
                pageNumRole:1,
				pageSize: 10,
				total: 2,
				pageNum1: 1,
				pageNumUserL: 1,
				roleLpageNum: 1,
				pageSize1: 10,
				pageSize2: 10,
				total1: 2,
				totalUserL: 2,
				roleLtotal: 2,
				UsertableData: [],
				UserselectedList: [],
				UserselectedRow: [],
				roleLselectedList: [],
				roleLselectedRow: [],
				roleLtableData: [],
				RoletableData: [],
				RoleselectData: [],
				RUserLselectData: [],
				UserLtableData: [],
				leftData: [],
				rightData: [],
				UserData: [{
						value: '',
						label: '--'
					},
					{
						value: 'code',
						label: '登录账户'
					},
					{
						value: 'name',
						label: '用户名称'
					},
					{
						value: 'company',
						label: '公司名称'
					},
				],
				roleData: [{
						value: '',
						label: '--'
					},
					{
						value: 'name',
						label: '角色名称'
					},
					{
						value: 'code',
						label: '角色编码'
					},
					{
						value: 'company',
						label: '公司名称'
					},
				],

                //拼接查询条件
                reqRole:{},
                reqUser:{},
			}
		},
		created() {
			this.leftData = this.roleData;
			this.rightData = this.UserData;

			this.searchRole();

			this.getUserData();
			this.selectCom();
		},
		methods: {
			clickRow1(val) {
				//选中点击
				this.$refs.roleTable.toggleRowSelection(val);
				//判断新增还是删除
				let hasIdS = false;
				if(this.RoleselectData.length >0){
					for(var i = 0; i < this.RoleselectData.length; i++) {
						let item = this.RoleselectData[i];
						if(val.id == item) {
							this.RoleselectData.splice(i, 1);
							hasIdS = true;
							break;
						}
					}
				}
				if(!hasIdS) {
					this.RoleselectData[this.RoleselectData.length] = val.id;
				}
			},
			clickRow2(val) {
				//  选中点击
				this.$refs.UserLTable.toggleRowSelection(val);
				//判断新增还是删除
				let hasIdS = false;
				if(this.RUserLselectData.length > 0){
					for(let i = 0; i < this.RUserLselectData.length; i++) {
						let item = this.RUserLselectData[i];
						if(val.foid == item) {
							this.RUserLselectData.splice(i, 1);
							hasIdS = true;
							break
						}
					}
				}
				if(!hasIdS) {
					this.RUserLselectData[this.RUserLselectData.length] = val.foid;
				}
			},
			selectCom(){
				this.$api.jobUserManagement.getCompanyData().then((res) => {
					if (res.status == "200") {
						this.companyData= res.data.data.rows;
					}
				}),
				(error) => {
					console.log(error);
				};
			},
			//获取人员
			getUserData() {
                let fromData={
                    page : this.pageNumUser,
                    size : this.pageSize,
                };
                Object.assign(fromData,this.reqUser);
				this.$api.management.getUserTableData(fromData).then(response => {
					let responsevalue = response;
					if(responsevalue) {
						let returndata = responsevalue.data;
						let tableDataArr = returndata.data.rows;
						this.UserLtableData = tableDataArr;
						this.UsertableData = tableDataArr;
						this.total = responsevalue.data.data.total;
						this.pageNum= responsevalue.data.data.page;
						this.totalUserL = responsevalue.data.data.total;
						this.pageNumUserL= responsevalue.data.data.page;
						if(this.dimension === false) {
							this.$nextTick(() => {
								// 在这里面去设置人员选中
								this.selectRUserRow();
							});
						}
					} else {
						this.$message.success('数据库没有该条数据!');
					}
				});
			},
			//通过ID字符串查用户
			getUserDataByID(data, total,pageNum) {
				let fromdata = data;
				this.$api.management.getUserByIds(fromdata).then(response => {
					let responsevalue = response;
					if(responsevalue) {
						let returndata = responsevalue.data;
						let tableDataArr = returndata.data;
						this.UserLtableData = tableDataArr;
						this.UsertableData = tableDataArr;
						this.total = total;
						this.pageNum= pageNum;
						this.totalUserL = total;
						this.pageNumUserL= pageNum;
						if(this.dimension === false) {
							this.$nextTick(() => {
								// 在这里面去设置人员选中
								this.selectRUserRow();
							});
						}
					} else {
						this.$message.success('数据库没有该条数据!');
					}
				});
			},
			//获取角色
			searchRole() {
                let fromData={
                    page : this.pageNumRole,
                    size : this.pageSize,
                };
                Object.assign(fromData,this.reqRole);
				this.$api.RoleManagement.findRolePage(fromData).then(response => {
					let responsevalue = response;
					if(responsevalue) {
						let returndata = responsevalue.data;
						let tableDataArr = returndata.rows;
						this.roleLtableData = tableDataArr;
						this.RoletableData = tableDataArr;
						this.total1 = returndata.total;
						this.pageNum1= returndata.page;
						this.roleLtotal = returndata.total;
						this.roleLpageNum = returndata.page;
						if(this.dimension) {
							this.$nextTick(() => {
								// 在这里面去设置角色选中
								this.selectRRoleRow();
							});
						}
					} else {
						this.$message.success('数据库没有该条数据!');
					}
				});
			},
			//左边过滤条件
			filterLeft() {
				this.ALLSelectFlage = false;
				if(this.dimension == true) {
					this.pageNumUser =1;
					if(this.formInline.regionleft == "name") {
						this.reqUser.fname = this.formInline.searchValueleft;
					} else if(this.formInline.regionleft == "code") {
                        this.reqUser.fcode = this.formInline.searchValueleft;
					} else if(this.formInline.regionleft == "company") {
                        this.reqUser.fcompanyname = this.formInline.searchValueleft;
					}
					this.getUserData();
				} else {
					this.pageNumRole = 1;
					if(this.formInline.regionleft == "name") {
						this.reqRole.name = this.formInline.searchValueleft;
					} else if(this.formInline.regionleft == "code") {
                        this.reqRole.code = this.formInline.searchValueleft;
					} else if(this.formInline.regionleft == "company") {
                        this.reqRole.companyName = this.formInline.searchValueleft;
					}
					this.searchRole();
				}
			},
			//右边过滤条件
			filterRight() {
				//formInline.regionRight
				//formInline.searchValueright
				this.disShowPager = true;
				this.ALLSelectFlage = false;
				if(this.dimension == true) {
					this.pageNumRole = 1;
					if(this.formInline.regionRight == "name") {
                        this.reqRole.name = this.formInline.searchValueright;
					} else if(this.formInline.regionRight == "code") {
                        this.reqRole.code = this.formInline.searchValueright;
					} else if(this.formInline.regionRight == "company") {
                        this.reqRole.companyName = this.formInline.searchValueright;
					}
					this.searchRole();
				} else {
					this.pageNumUser = 1;
					if(this.formInline.regionRight == "name") {
                        this.reqUser.fname = this.formInline.searchValueright;
					} else if(this.formInline.regionRight == "code") {
                        this.reqUser.fcode = this.formInline.searchValueright;
					} else if(this.formInline.regionRight == "company") {
                        this.reqUser.fcompanyname = this.formInline.searchValueright;
					}
					this.getUserData();
				}
			},
			//左边全部点击事件
			getALLLeft() {
				this.ALLSelectFlage = false;
                this.formInline.regionleft = "";
                this.formInline.searchValueleft = "";
				if(this.dimension == true) {
					this.reqUser= {};
					this.pageNumUser = 1;
					this.getUserData();
				} else {
					this.reqRole = {};
					this.pageNumRole = 1;
					this.searchRole();
				}
			},
			//右边全部点击事件
			getALLRight() {
				this.ALLSelectFlage = false;
				this.disShowPager = true;
                this.formInline.regionRight = "";
                this.formInline.searchValueright = "";
				if(this.dimension == true) {
                    this.reqRole = {};
                    this.pageNumRole = 1;
					this.searchRole();
				} else {
                    this.reqUser= {};
                    this.pageNumUser = 1;
					this.getUserData();
				}
			},
			//切换维度
			Changedimension() {
				this.disShowPager = true;
				this.ALLSelectFlage = false;
				//切换维度前清空搜索条件
				this.formInline.searchValueleft = '';
				this.formInline.searchValueright = '';
				this.UserselectedList = [];
				this.UserselectedRow = [];
				this.roleLselectedList = [];
				this.roleLselectedRow = [];
				this.RUserLselectData = [];
				this.RoleselectData = [];
				//切换维度
				if(this.dimension == true) {
					this.dimension = false;
					this.leftData = this.roleData;
					this.rightData = this.UserData;
				} else {
					this.dimension = true;
					this.leftData = this.UserData;
					this.rightData = this.roleData;
				}
				//this.formInline.regionleft='';
				//this.formInline.regionRight='';
                this.reqRole = {};
                this.pageNumRole = 1;
				this.searchRole();
                this.reqUser= {};
                this.pageNumUser = 1;
				this.getUserData();
			},
			//左侧人员table行点击事件
			selectRow(row, column, event) {
				this.UserselectedList = [];
				this.UserselectedList.push(row);
				//通过用户查询角色
				this.RoleselectData = [];
				let fromdata = {};
				fromdata.userId = row.foid;
				this.$api.management.findRoleByUserId(fromdata).then(response => {
					let responsevalue = response;
					if(responsevalue) {
						let returndata = responsevalue.data;
						let tableDataArr = returndata.data;
						this.RoleselectData = tableDataArr;
						this.$nextTick(() => {
							// 在这里面去设置角色选中
							this.selectRRoleRow();
						});
					} else {
						this.$message.success('数据库没有该条数据!');
					}
				});
			},
			rowClass(data) {
				if(this.UserselectedRow.includes(data.rowIndex)) {
					return {
						"background-color": "#98F898"
					}
				}
			},
			//左侧角色table行点击事件
			selectroleLRow(row, column, event) {
				this.roleLselectedList = [];
				this.roleLselectedList.push(row);
				//通过角色查询用户
				this.RUserLselectData = [];
				let fromdata = {};
				fromdata.roleId = row.id;
				this.$api.management.findUserByRoleId(fromdata).then(response => {
					let responsevalue = response;
					if(responsevalue) {
						let returndata = responsevalue.data;
						let tableDataArr = returndata.data;
						this.RUserLselectData = tableDataArr;
						this.$nextTick(() => {
							// 在这里面去设置人员选中
							this.selectRUserRow();
						});
					} else {
						this.$message.success('数据库没有该条数据!');
					}
				});
			},
			roleLrowClass(data) {
				if(this.roleLselectedRow.includes(data.rowIndex)) {
					return {
						"background-color": "#98F898"
					}
				}
			},
			//左侧角色分页下一页
			onroleLCurrentChange(val) {
				this.ALLSelectFlage = false;
				this.roleLselectedList = [];
				this.RUserLselectData = [];
                this.pageNumRole = val;
				this.searchRole();
                this.reqUser= {};
                this.pageNumUser = 1;
				this.getUserData();
			},
			//左侧人员分页下一页
			onUserCurrentChange(val) {
				this.UserselectedList = [];
				this.RoleselectData = [];
				this.ALLSelectFlage = false;
                this.pageNumUser = val;
				this.getUserData();

                this.reqRole = {};
                this.pageNumRole = 1;
				this.searchRole();
			},
			//右侧角色下一页
			onRoleCurrentChange(val) {
                this.pageNumRole = val;
				if(this.ALLSelectFlage == true) {
					let RoleRSelect = this.RoleselectData;
					this.reqRole.roleIds = RoleRSelect;
				}
				this.searchRole();
			},
			//右侧角色选中事件
			onRoleSelectionChange(data, val) {
				if(data.length ==1){
					this.getRRoleSelectedList(val.id,"add");
				}else{
					if(data.length ==10){
						this.getRRoleSelectedList(val.id,'add');
					}else{
						let hasIdS = false;
						for(var i = 0; i < data.length; i++) {
							var item = data[i];
							if(val.id == item.id) {
								hasIdS = true;
							}
						}
						if(hasIdS) {
							this.getRRoleSelectedList(val.id,'add');
						}else{
							this.getRRoleSelectedList(val.id,'remove');
						}
					}
				}
				//this.getRRoleSelectedList(val.id);
			},
			//右侧角色全部选中事件
			onRoleSelectionALLChange(data){
				let RoleSData=data;
				if(RoleSData.length>0){
					for(let i=0;i<RoleSData.length;i++){
						this.getRRoleSelectedList(RoleSData[i].id,'add');
					}
				}else{
					let TableData=this.RoletableData;
					for(let i=0;i<TableData.length;i++){
						this.getRRoleSelectedList(TableData[i].id,'remove');
					}
				}
			},
			//右侧已选中点击事件
			RightSelecT() {
				this.ALLSelectFlage = true;
				if(this.dimension == true) {
                    this.pageNumRole = 1;
					if(this.RoleselectData.length > 0) {
						let RoleRSelect = this.RoleselectData;
                        this.reqRole.roleIds = RoleRSelect;
					}
					this.searchRole();
				} else {
					if(this.RUserLselectData.length > 0) {
						this.UserSelectDataPage(1, this.pageSize, this.RUserLselectData);
					}
				}
			},
			//人员已选中处理分页
			UserSelectDataPage(pageNum, size, data) {
				let USerSelectData = [];
				USerSelectData = data;
				if(USerSelectData) {
					let UserIDStr = '';
					for(var i = 0; i < USerSelectData.length; i++) {
						if(i >= (pageNum - 1) * size && i < (pageNum * size)) {
							UserIDStr += USerSelectData[i] + ",";
						}
					}
					UserIDStr = UserIDStr.slice(0, UserIDStr.length - 1);
					let fromdataU = {};
					fromdataU.userIds = UserIDStr;
					this.getUserDataByID(fromdataU, USerSelectData.length,pageNum);
				}
			},
			//右侧角色选中去重
			getRRoleSelectedList(id,type) {
				var hasId = false;
				for(var i = 0; i < this.RoleselectData.length; i++) {
					var item = this.RoleselectData[i];
					if(id == item) {
						if(type=="add"){
							hasId = true;
						}else{
							this.RoleselectData.splice(i, 1);
							hasId = true;
						}
						//this.RoleselectData[i] = '';
						//hasId = true;
					}
				}
				if(!hasId) {
					this.RoleselectData[this.RoleselectData.length] = id;
				}
			},
			//右侧角色添加默认选中
			selectRRoleRow() {
				this.$refs.roleTable.clearSelection();
				this.RoletableData.forEach(row => {
					if(this.RoleselectData.includes(row.id)) {
						this.$refs.roleTable.toggleRowSelection(row);
					}
				});
			},
			//右侧人员下一页
			onUserLCurrentChange(val) {
				if(this.ALLSelectFlage === true) {
					this.UserSelectDataPage(val, this.pageSize, this.RUserLselectData);
				} else {
                    this.pageNumUser = val;
					this.getUserData();
				}
			},
			//右侧人员全部选中事件
			onUserLSelectionALLChange(data){
				let SelectData=data;
				if(SelectData.length >0){
					for(let i=0;i<SelectData.length;i++){
						this.getRUserSelectedList(SelectData[i].foid,"add");
					}
				}else{
					let TableData=this.UserLtableData;
					for(let i=0;i<TableData.length;i++){
						this.getRUserSelectedList(TableData[i].foid,"remove");
					}
				}
			},
			//右侧人员选中事件
			onUserLSelectionChange(data, val) {
				if(data.length ==1){
					this.getRUserSelectedList(val.foid,"add");
				}else{
					if(data.length ==10){
						this.getRUserSelectedList(val.foid,"add");
					}else{
						let hasIdS = false;
						for(var i = 0; i < data.length; i++) {
							var item = data[i];
							if(val.foid == item.foid) {
								hasIdS = true;
							}
						}
						if(hasIdS) {
							this.getRUserSelectedList(val.foid,"add");
						}else{
							this.getRUserSelectedList(val.foid,"remove");
						}
					}
				}
				//this.getRUserSelectedList(val.foid,"false");
			},
			//右侧人员选中去重
			getRUserSelectedList(id,type) {
				var hasId = false;
				for(var i = 0; i < this.RUserLselectData.length; i++) {
					var item = this.RUserLselectData[i];
					if(id == item) {
						//this.RUserLselectData[i] = '';
						if(type=="add"){
							hasId = true;
						}else{
							this.RUserLselectData.splice(i, 1);
							hasId = true;
						}
					}
				}
				if(!hasId) {
					this.RUserLselectData[this.RUserLselectData.length] = id;
				}
			},
			//右侧人员添加默认选中
			selectRUserRow() {
				this.$refs.UserLTable.clearSelection();
				this.UserLtableData.forEach(row => {
					if(this.RUserLselectData.includes(row.foid)) {
						this.$refs.UserLTable.toggleRowSelection(row);
					}
				});
			},
			//确认提交事件
			determineSave() {
				this.ALLSelectFlage = false;
				if(this.dimension == true) {
					//给人员授权角色
					let UserSelect = this.UserselectedList;
					let RoleRSelect = this.RoleselectData;
					if(UserSelect.length > 0) {
						if(RoleRSelect.length > 0) {
							let UserID = UserSelect[0].foid;
							let RoleID = [];
							for(var i = 0; i < RoleRSelect.length; i++) {
								if(RoleRSelect[i]) {
									RoleID.push(RoleRSelect[i])
								}
							}
							let fromdata = {};
							fromdata.roleIds = RoleID;
							fromdata.userId = UserID;
							this.$api.management.userAuthRole(fromdata).then(response => {
								let responsevalue = response;
								if(responsevalue.data.data == "success") {
									this.$message.success('授权成功!');
									this.disShowPager = true;
								} else {
									this.$message.error(responsevalue.data.msg);
								}
							});
						} else {
							this.$message.error('请选择角色数据!');
						}
					} else {
						this.$message.error('请选择一行人员数据!');
					}
				} else {
					//给角色授权人员
					let RoleSelect = this.roleLselectedList;
					let UserRSelect = this.RUserLselectData;
					if(RoleSelect.length > 0) {
						// if(UserRSelect.length > 0) {
							let roleID = RoleSelect[0].id;
							let UserID = [];
							for(var i = 0; i < UserRSelect.length; i++) {
								if(UserRSelect[i]) {
									UserID.push(UserRSelect[i])
								}
							}
							let FormData = {};
							FormData.roleId = roleID;
							FormData.userIds = UserID;
							this.$api.management.roleAuthUser(FormData).then(response => {
								let responsevalue = response;
								if(responsevalue.data.data == "success") {
									this.$message.success('授权成功!');
									this.disShowPager = true;
								} else {
									this.$message.error(responsevalue.data.msg);
								}
							});
						// } 
						// else {
						// 	this.$message.error('请选择人员数据!');
						// }
					} else {
						this.$message.error('请选择一行角色数据!');
					}
				}
			}
		},
		watch: {
			UserselectedList(data) {
				this.UserselectedRow = [];
				if(data.length > 0) {
					data.forEach((item, index) => {
						this.UserselectedRow.push(this.UsertableData.indexOf(item));
					});
				}
			},
			roleLselectedList(data) {
				this.roleLselectedRow = [];
				if(data.length > 0) {
					data.forEach((item, index) => {
						this.roleLselectedRow.push(this.roleLtableData.indexOf(item));
					});
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	/deep/ .el-textarea .el-input__count {
		background: #fff0;
	}

	/deep/ .el-select {
		width: 100%;
	}

	/deep/ .el-dropdown-menu__item {
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

	.box-card:first-child {
		margin-bottom: 16px;
	}

	.search-all {
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

	.CheckTable {
		overflow-y: auto;
	}
</style>
<style lang='scss'>
	.replydiag {
		.el-textarea__inner {
			min-height: 300px !important;
		}
	}

	.el-dialog__body {
		padding: 0;
	}

	.el-card__header {
		padding: 10px 20px;
	}

	.magiantop {
		margin-top: 20px;
	}
</style>
