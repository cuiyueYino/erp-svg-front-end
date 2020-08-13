<script>
/**
 * 动态表格，可根据传入的columns设置进行表格列内容的渲染
 */
export default {
    name: 'dytable',
    props: {
        height:Number,
        columns: Array,

        tableRowClassName: null,

        defaultsort: null,
        // 查询结果数据
        tableData: {
            type: Array,
            default() {
                return [];
            }
        },
        // 是否显示pager组件
        isShowPager: {
            type: Boolean,
            default: false
        },
        // 查询结果总数量
        total: null,
        // 当前显示页号
        pageNum: {
            type: Number,
            default: 1
        },
        // 当前每页显示数据数量
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            pageSizes: [10, 20, 50, 100]
        };
    },
    created() {
        let targetInstance = window;
        if (window.top !== targetInstance) {
            targetInstance = window.top;
        }
        if (targetInstance.dynamicTablePageSizes && typeof targetInstance.dynamicTablePageSizes === 'string') {
            this.pageSizes = targetInstance.dynamicTablePageSizes.split(',');
        }
    },
    mounted() {

    },
    methods: {
        /**
         * 当前页号变更事件处理
         * @event
         * @param {Number} val 变更后的页号
         */
        onCurrentChange(val) {
            this.$emit('current-change', val);
        },
        /**
         * 当前表格数据显示数量变更事件处理
         * @event
         * @param {Number} val 变更后的表格数据显示数量
         */
        onSizeChange(val) {
            this.$emit('size-change', val);
        },
        /**
         * 选择项发生变化时事件处理
         * @event
         * @param {Array} val 当前的选择项
         */
        onSelectionChange(val) {
            this.$emit('selection-change', val);
        },
        /**
         * 选择项选中时事件处理
         * @event
         * @param {Array} val 当前的选择项
         */
        onSelect(data,row) {
            this.$emit('select',data,row);
        },
        /**
         * table单列选中时事件处理
         * @event
         * @param {Array} val 当前的选择项
         */
        onRowClick(val) {
            this.$emit('Row-Click', val);
        },
        /**
         * 渲染表格Column
         * @param {Object} props Column属性
         */
        renderColumn(props) {
            let ret = null;
            if (props.type && props.type !== '') {
                ret = (
                    <ElTableColumn
                        type={props.type}
                        width={props.width}
                        index={props.index}
                        align="center"
                        selectable={props.selectable}
                        reserve-selection={props.reserveelection}
                    ></ElTableColumn>
                );
            } else {
                const scopedSlots =
                    typeof props.render === 'function'
                        ? {
                              default: scope => props.render(scope)
                          }
                        : null;
                ret = (
                    <ElTableColumn
                        label={props.title}
                        prop={props.key}
                        formatter={props.formatter}
                        width={props.width}
                        fixed="right"
                        scopedSlots={scopedSlots}
                        show-overflow-tooltip
                    ></ElTableColumn>
                );
            }
            return ret;
        }
    },
    /**
     * Vue实例渲染函数，生成组件模版
     */
    render() {
        const {
            height,
            columns,
            pageNum,
            pageSize,
            pageSizes,
            onCurrentChange,
            onSelect,
            onRowClick,
            onSelectionChange,
            tableRowClassName,
            onSizeChange,
            renderColumn,
            tableData = [],
            total,
            isShowPager,
            $slots,
            defaultsort = {}
        } = this;
        const renderColumns = [];
        columns.forEach(column => {
            const { children } = column;
            // Column的场合
            if (children === null || children === undefined) {
                renderColumns.push(renderColumn(column));
                // ColumnGroup的场合
            } else {
                const childColumnList = children.map(childColumn => renderColumn(childColumn));
                renderColumns.push(
                    <ElTableColumnGroup name={column.key} label={column.title}>
                        {childColumnList}
                    </ElTableColumnGroup>
                );
            }
        });
        return (
            <div class="table">
                <ElTable
                    height={height}
                    data={tableData}
                    border
                    header-cell-class-name="table-header"
                    on-select={onSelect}
                    on-row-click={onRowClick}
                    on-selection-change={onSelectionChange}
                    size="small"
                    row-class-name={tableRowClassName}
                    default-sort={defaultsort}
                >
                    {$slots['batch-control'] ? <template slot="control">{$slots['batch-control']}</template> : null}
                    {renderColumns}
                </ElTable>
            </div>
        );
    }
};
</script>
<style lang="scss" scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
