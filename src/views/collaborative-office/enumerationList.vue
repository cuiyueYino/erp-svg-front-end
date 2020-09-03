<template>
	<div>
		<el-row>
			<el-col style="text-align: right;">
				<el-dropdown trigger="click" @command="showForm = true;showSave = true;disabledUpd = false">
					<el-button :disabled="showFigButton" type="success" plain><i class="el-icon-plus"></i>新建</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :disabled="showFig" @click.native="create">类别</el-dropdown-item>
						<el-dropdown-item :disabled="!showFig" @click.native="create">内容</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button :disabled="showFigUpd" @click="toUpd()" type="danger" plain><i class="el-icon-edit"></i>修改</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="6">
				<el-card>
					<el-tree highlight-current :data="dataList" :props="defaultProps" @node-click="handleNodeClick">
            <div slot-scope="{node,data}" class="customize-tree-p">
              <el-tooltip class="item" effect="dark" :content="data.name" placement="top-start">
                <span>{{data.name|labelShow}}</span>
              </el-tooltip>
            </div>
          </el-tree>
				</el-card>
			</el-col>
			<el-col :span="18">
				<el-card>
					<el-form v-if="showForm" size="mini" label-width="80px" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
						<el-form-item prop="code" label="编码">
							<el-input clearable :disabled="disabledUpd" v-model="ruleForm.code" maxlength="50" placeholder="编码"></el-input>
						</el-form-item>
						<el-form-item prop="name" label="名称">
							<el-input clearable v-model="ruleForm.name" maxlength="100" placeholder="名称"></el-input>
						</el-form-item>
						<el-form-item style="text-align: center;" v-if="showSubmit">
							<el-button @click="toSave" type="success" plain><i class="el-icon-edit"></i>提交</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
    //树结构 label 过长，替换显示成"..."结构
    filters: {
      labelShow(value) {
        if(!value) return ''
        if(value.length > 18) {
          return value.slice(0, 18) + '...'
        }
        return value
      }
    },
		data() {
			return {
				//修改-编码
				disabledUpd: false,
				//修改
				showFigUpd: false,
				//表单
				showForm: false,
				//表单提交按钮
        showSubmit: false,
				//新增/修改
				showSave: true,
				//类别/内容
				showFig: false,
				//新建
				showFigButton: false,
				ruleForm: {
					code: "",
					name: "",
					id: "",
					pid: "",
					resList: []
				},
				//校验规则-表单
				rules: {
					code: [{
						required: true,
						message: '请输入编码',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}]
				},
				dataList: [{
					name: '枚举类别',
					type: 2,
					resList: []
				}],
				defaultProps: {
					children: 'resList',
					label: 'name'
				},
				rowClick: {}
			};
		},
		mounted() {
			this.getContext()
		},
		methods: {
			getContext() {
				this.$api.collaborativeOffice.findList({}).then(data => {
					this.dataList[0].resList = data.data.data
				})
			},
			handleNodeClick(data) {
				this.rowClick = data
				this.clear()
				if(data.name == "枚举类别") {
					this.showFigUpd = true
					this.showFig = false
					this.showFigButton = false
				} else {
					this.showFigUpd = false
					if(data.type == 2) {
						this.showFigButton = true
					} else {
						this.showFigButton = false
						this.showFig = true
					}
					//右侧显示
          this.$nextTick(() => {
            this.showForm = true;
            this.showSubmit = false;
            this.ruleForm.code = data.code;
            this.ruleForm.name = data.name;
          });
				}
			},
      create(){
        this.showForm = true;
        this.showSubmit = true;
        this.ruleForm = {
          code: "",
          name: "",
          id: "",
          pid: "",
          resList: []
        }
      },
			clear() {
				this.showForm = false;
        this.showSubmit = false;
				this.ruleForm = {
					code: "",
					name: "",
					id: "",
					pid: "",
					resList: []
				}
			},
			toUpd() {
				if(this.noObject(this.rowClick)) {
					this.goOut("请选择")
				} else {
					this.showForm = true;
          this.showSubmit = true;
					this.ruleForm = this.rowClick;
					this.showSave = false
					this.disabledUpd = true
				}
			},
			toSave() {
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						if(this.showSave) {
							if(this.rowClick.type == 1) {
								this.ruleForm.type = 2
								this.ruleForm.pid = this.rowClick.id
							} else {
								this.ruleForm.type = 1

							}
							this.$api.collaborativeOffice.add(this.ruleForm).then(data => {
								if(this.dataBack(data, "新增成功")) {
									this.getContext()
									this.clear()
								}
							})
						} else {
							this.$api.collaborativeOffice.modify(this.ruleForm).then(data => {
								if(this.dataBack(data, "修改成功")) {
									this.getContext()
									this.clear()
								}
							})
						}
					} else {
						this.goOut("请填写完整内容")
						return false;
					}
				});

			}
		}
	}
</script>
<style scoped="scoped">
	.el-card {
		height: 80vh;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
