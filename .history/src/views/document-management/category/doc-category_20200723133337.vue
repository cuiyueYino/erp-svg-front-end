<template>
    <div>
        <!-- 树状图 -->
        <el-tree
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
        ></el-tree>
    </div>
</template>

<script>
    import DynamicTable from "../../components/common/dytable/dytable.vue";

    export default {
      data() {
        return {
          treeData: [],
          defaultProps: {
            children: "children",
            label: "label"
          },
        }
      },
      components: {
        DynamicTable
      },
    };

</script>