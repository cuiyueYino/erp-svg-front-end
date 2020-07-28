<template>
    <div>
        <el-tabs tab-position="left" type="border-card" style="height:800px;">
            <el-tab-pane>
                <span slot="label" ><i class="el-icon-receiving"></i>收信</span>
                <div>
                    <mailInbox></mailInbox>
                </div>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label" ><i class="el-icon-edit"></i> 写信</span>
                <div>
                    <newMailPage></newMailPage>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" ><i class="el-icon-edit-outline"></i> 草稿箱</span>
                <div>
                    草稿箱
                </div>
            </el-tab-pane>
            <el-tab-pane >
                <span slot="label" ><i class="el-icon-message"></i> 已发送</span>
                <div>
                    已发送
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" ><i class="el-icon-delete"></i> 已删除</span>
                <div>
                    已删除
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import newMailPage from './new-mail-message.vue';
import mailInbox from './inside-mail-inbox';
export default {
    components: {
        newMailPage,
        mailInbox
    },
    data(){
        return{

        }
    }
}
</script>