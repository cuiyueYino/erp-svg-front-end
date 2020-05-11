<template>
<!-- 弹出框内容 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="closeConfig"
        :close-on-press-escape="closeConfig"
        width="400px"
    >
        <el-form
            :model="formData"
            label-width="97px"
            label-suffix="："
            label-position="right"
            ref="workflowConfigForm"
            :rules="configRules"
            size="small"
            @submit.native.prevent
        >
            <el-form-item label="英文名" prop="name">
                <el-input ref="nameInput" v-model="formData.name" clearable @keyup.enter.native="saveConfig"></el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="displayName">
                <el-input v-model="formData.displayName" clearable @keyup.enter.native="saveConfig"></el-input>
            </el-form-item>
            <el-form-item label="参与类型" prop="type" v-if="type === 'Task'">
                <el-select v-model="formData.performType" clearable style="width: 100%;">
                    <el-option
                        v-for="(item, index) in typeOpt"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-row :gutter="20">
            <el-col :span="12" style="text-align: right;">
                <el-button type="primary" size="small" @click="saveConfig">保存</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="small" @click="cancelConfig">取消</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
/**
* @description 节点配置组件
* @create 2019-04-11
* @author liyuanquan
*/
export default {
    name: 'NodeConfig',
    props: {
        // 配置数据源
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        // 当前配置节点类型
        type: {
            type: String,
            default: ''
        },
        // 配置对话框显示标识
        visible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // 关闭对话框配置
            closeConfig: false,
            // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入英文名', trigger: 'blur' },
                displayName: { required: true, message: '请输入名称', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: this.data,
            // task参与类型
            typeOpt: [
                {
                    label: '普通参与',
                    value: 'NORMAL'
                },
                {
                    label: '会签参与',
                    value: 'ALL'
                }
            ]
        };
    },
    computed: {
        title () {
            const typeConfig = {
                Start: '端点配置',
                End: '端点配置',
                Condition: '手工活动配置',
                Fork: '自由活动配置',
                Join: '审核活动配置',
                router: '路由配置',
                Line: '连接线配置'
            };
            return typeConfig[this.type] || '保存工作流';
        }
    },
    watch: {
        // 监听配置数据源
        data: {
            handler (obj) {
                this.formData = JSON.parse(JSON.stringify(obj));
            },
            deep: true,
            immediate: true
        },
        // 监听对话框显示标识
        dialogVisible (bool) {
            this.$emit('update:visible', bool);
        },
        // 对话框显示 自动聚焦name输入框
        visible (bool) {
            this.dialogVisible = bool;
            if (bool) {
                setTimeout(() => {
                    this.$refs.nameInput.focus();
                }, 100);
            }
        }
    },
    methods: {
        // 取消配置操作
        cancelConfig () {
            this.dialogVisible = false;
            this.$refs.workflowConfigForm.resetFields();
            this.$emit('cancel');
        },
        // 执行保存配置操作
        saveConfig () {
            this.$refs.workflowConfigForm.validate(valid => {
                if (!valid) return;
                this.$emit('save', this.formData);
                this.dialogVisible = false;
            });
        }
    }
};
</script>
