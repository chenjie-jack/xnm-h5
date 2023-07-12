<script setup>
import { onMounted } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
    title : String
}); 
console.hLog("card-title::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义

// 响应式属性定义

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-title::onMounted.`);

});

</script>

<template>
    <div class="xnm-card-title">
        <h2>{{props.title}}</h2>
    </div>
</template>

<style>
.xnm-card-title{
    width: 100%;
    height: 4.8rem;
    position: relative;
}

.xnm-card-title h2{
    margin: 0;
    border: 0;
    padding-left: 2.4rem;
    padding-bottom: 0.8rem;
    bottom: 0;
    position: absolute;
    font-weight:500;
    color:var(--xnm-theme-text-level1-color);
    font-size: 1.6rem;
    display: flex;
    flex-direction: row;

    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

</style>
