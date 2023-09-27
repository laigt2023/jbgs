<template>
    <div class="toolbar-warp">
        <div  class="toolbar-top" >
            <slot name="top"></slot>
        </div>
        <div class="toolbar">
            <div v-if="$slots.left" class="toolbar-left">
                <slot name="left"></slot>
            </div>
            <slot name="default"></slot>
            <div v-if="$slots.right" class="toolbar-right">
                <slot name="right"></slot>
                <div v-if="$slots.search" class="search-warp">
                    <slot name="search"></slot>
                </div>
            </div>
        </div>
        <div class="toolbar-bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<style lang="less">
.toolbar {
    padding: 10px 0;

    .item-label {
        padding: 0 10px;
    }

    .item-input {
        margin-left: 15px;
    }

    .toolbar-left {
        padding: 5px 0;
        display: inline-block;
    }

    .toolbar-right {
        bottom: 0;
        padding: 5px 0;
        float: right;
    }

    .search-warp {
        float: right;
    }

    &:after {
        content: "";
        display: block;
        clear: both;
    }

}
</style>
