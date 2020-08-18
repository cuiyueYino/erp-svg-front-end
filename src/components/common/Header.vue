<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<i v-if="!collapse" class="el-icon-s-fold"></i>
			<i v-else class="el-icon-s-unfold"></i>
		</div>
		<div class="logo">福佳集团ERP管理系统</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 进入系统 -->
				<div class="el-icon-monitor to-oa" @click="toOa">
					<span>进入系统</span>
				</div>
			</div>
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				collapse: false,
				fullscreen: false,
				name: '系统管理员',
				message: 2,
				ruleForm: {
					pass: '',
					checkPass: '',
					oldpass: ''
				}
			};
		},
		computed: {
			username() {
				let username = localStorage.getItem('ms_username');
				return username ? username : this.name;
			}
		},
		inject: ['bus'],
		methods: {
			toOa() {
				sessionStorage.setItem("oaMenu", false);
				//根据token查询登陆人的信息并存入缓存
				this.$api.common.getUserInfo().then(data => {
					//通过用户ID查询菜单
					this.$api.common.findMenuByComputer({
						userId: data.data.principal.accountId
					}).then(data2 => {
						//菜单放入本地缓存,并跳转首页
						sessionStorage.setItem("menuList", JSON.stringify(data2.data.data));
						this.$router.push("/");
					})
					//用户ID
					localStorage.setItem('ms_userId', data.data.principal.accountId);
					//用户名称
					localStorage.setItem('ms_username', data.data.principal.fullname);
					//部门ID
					localStorage.setItem('ms_userDepartId', data.data.principal.deptmentId);
					//部门名称
					localStorage.setItem('ms_userDepartName', data.data.principal.deptmentName);
					//公司ID
					localStorage.setItem('ms_companyId', data.data.principal.companyId);
					//公司名称
					localStorage.setItem('ms_companyName', data.data.principal.companyName);
					//获取工作事项相关参数
					this.getContext()
					//获取员工树信息
					this.getStaffTreeList()
				})
			},
			//登录时获取员工树信息
			getStaffTreeList() {
				this.$api.confMangement.getStaffTreeList({}).then(res => {
					let resData = res.data.data;
					let resDataArr = eval("(" + resData + ")");
					localStorage.setItem('conf_staffTree', JSON.stringify(resDataArr));
				})
			},
			/*
			 * 孟鹏飞 2020-08-06
			 *
			 * 登陆时调用工作事项内的查询接口，并放置于本地缓存
			 *
			 * */
			getContext() {
				//最上端公司选择
				this.$api.collaborativeOffice.getCompanyData().then(data => {
					localStorage.setItem('CompanyData', JSON.stringify(data.data.data.rows));
				})
				//全部枚举
				this.$api.collaborativeOffice.findList({}).then(data => {
					localStorage.setItem('selectList', JSON.stringify(data.data.data));
				})
				//全部服务
				this.$api.collaborativeOffice.findTServiceByParams({}).then(data => {
					localStorage.setItem('tServiceByParams', JSON.stringify(data.data.data));
				})
				//工作事项
				this.$api.collaborativeOffice.getFieldBrowse().then(data => {
					localStorage.setItem('fieldBrowseList', JSON.stringify(data.data.data));
				})
				//公司 部门 职位
				this.$api.management.selectAllOrganizationInfo().then(data => {
					localStorage.setItem('allOrganizationInfo', JSON.stringify(eval('(' + data.data.data + ')')));
				})
				//人员
				this.$api.collaborativeOffice.findConList("staffManage/findStaffByPage", {
					page: 1,
					size: 100000
				}).then(data => {
					localStorage.setItem('staffList', JSON.stringify(data.data.data.rows));
				})
				//用户
				this.$api.collaborativeOffice.findConList("userManage/findUserBypage", {
					page: 1,
					size: 100000
				}).then(data => {
					localStorage.setItem('userList', JSON.stringify(data.data.data.rows));
				})
				//职务
				this.$api.collaborativeOffice.findConList("positionmnt/findPositionList", {
					page: 1,
					size: 100000
				}).then(data => {
					localStorage.setItem('positionList', JSON.stringify(data.data.data.rows));
				})
			},
			// 用户名下拉菜单选择事件
			handleCommand(command) {
				if(command == 'loginout') {
					localStorage.removeItem('ms_roleId');
					localStorage.removeItem('ms_username');
					localStorage.removeItem('ms_name');
					localStorage.removeItem('ms_userId');
					this.$router.push('/login');
				} else if(command == 'change') {
					this.dialogVisible = true;
				}
			},
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse;
				this.bus.$emit('collapse', this.collapse);
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if(this.fullscreen) {
					if(!document.exitFullscreen) {
						document.exitFullscreen();
					} else if(document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if(document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if(document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			}
		},
		mounted() {
			if(document.body.clientWidth < 1500) {
				this.collapseChage();
			}
		}
	};
</script>
<style scoped lang="scss">
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
	}
	
	.collapse-btn {
		float: left;
		padding: 0 21px;
		cursor: pointer;
		line-height: 70px;
	}
	
	.header .logo {
		/* background: url(../../assets/img/loginLogo.png); */
		float: left;
		line-height: 70px;
	}
	
	.header-right {
		float: right;
		padding-right: 50px;
		display: flex;
	}
	
	.header-user-con {
		display: flex;
		height: 70px;
		align-items: center;
	}
	
	.btn-fullscreen {
		transform: rotate(45deg);
		margin-right: 5px;
		font-size: 24px;
	}
	
	.btn-bell,
	.btn-fullscreen {
		position: relative;
		width: 30px;
		height: 30px;
		text-align: center;
		border-radius: 15px;
		cursor: pointer;
	}
	
	.btn-bell-badge {
		position: absolute;
		right: 0;
		top: -2px;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #f56c6c;
		color: #fff;
	}
	
	.btn-bell .el-icon-bell {
		color: #fff;
	}
	
	.user-name {
		margin-left: 10px;
	}
	
	.user-avator {
		margin-left: 20px;
	}
	
	.user-avator img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	
	.el-dropdown-link {
		color: #fff;
		cursor: pointer;
	}
	
	.el-dropdown-menu__item {
		text-align: center;
	}
	
	.to-oa {
		cursor: pointer;
		margin-right: 14px;
		font-size: 21px;
		span {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>