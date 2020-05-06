<template>
    <div
        :style="{left: `${x - size / 2}px`, top: `${y - size / 2}px`}"
        class="link-anchor"
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle
                :cx="size / 2"
                :cy="size / 2"
                :r="size / 2"
                fill="#457CB5"
            >
            </circle>
        </svg>
    </div>
</template>

<script>
/**
* @description 连接锚点组件
* @create 2019-04-11
* @author liyuanquan
*/
export default {
    name: 'LinkAnchor',
    props: ['x', 'y'],
    components: {},
    data () {
        return {
            // 连接锚点尺寸
            size: 12
        };
    },
    computed: {},
    watch: {},
    created () {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.link-anchor {
    width: $anchor-size;
    height: $anchor-size;
    z-index: 30;
    cursor: crosshair;
    position: absolute;
}
</style>
