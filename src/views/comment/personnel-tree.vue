<template>
    <div>
        <!--<el-dialog :title="title" 
            @close="handleClose" 
            :visible.sync="ShowFinancVisible" 
            :append-to-body="true" 
            v-if="ShowFinancVisible" 
            :close-on-click-modal="false" 
            width="400px">
            <el-form
                label-width="110px"
                class="dataForm"
                :label-position="labelPosition"
            >   

                <el-card>
                    <div class="El-tree">
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            node-key="foid"
                            ref="tree"
                            :render-content="renderContent"
                            accordion
                            :show-checkbox="showcheckbox"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </el-card>    
            </el-form>
        </el-dialog>-->
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>