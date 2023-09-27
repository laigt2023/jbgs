
<!--
 * @Description: 框架-底部权限说明
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
    <footer class="foot">
        <p>联系地址：{{ address }}</p>
        <p>主办单位：{{ sponsor }}</p>
        <p>{{  right  }}</p>
    </footer>
</template>
<script lang="ts" setup>
const address = '中国湖南省长沙市湘江新区管委会办公室'
const sponsor = '长沙市湘江新区管委会'
const right = '湘公网安备43019002000506湘ICP备06004882号网站标识码：4301000018站点地图|联系我们'
</script>

<style lang="less">
.foot{
    text-align: center;
    padding: 25px 30px 10px 30px;
    color: #fff;
    background: #054cb7;
    p{
        margin: 6px;
    }
}
</style>
