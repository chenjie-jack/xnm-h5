<script setup>
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
//level - 警告级别，1为一般警告，2为严重警告，3为致命警告
//content - 警告的内容文本
//isShow - 是否显示警告
const props = defineProps({
    level:Number,
    content:String,
    isShow:Boolean
});

console.hLog("com-noticebar::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义
let level1Img = ResourcesForTheme("notice1", store.state.darkMode);//3级警告图标
let level2Img = ResourcesForTheme("notice2", store.state.darkMode);//3级警告图标
let level3Img = ResourcesForTheme("notice3", store.state.darkMode);//3级警告图标

// 响应式属性定义

// 响应式状态函数定义
function onClicktest(event) {
    console.hLog(`xnm-com-noticebar::onClicktest`);
}

</script>

<template>
    <div v-if="props.isShow" class="xnm-com-noticebar" @click="onClicktest">
        <div class="xnm-com-noticebar-icon"><img :src="level3Img" alt="" /></div>
        <div class="xnm-com-noticebar-text"><h6>{{props.content}}</h6></div>
    </div>
</template>

<style>
.xnm-com-noticebar{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    border: 0;
    padding: 0;
    height: 3rem;

    border-radius: var(--xnm-theme-float-window-radius);
    background-color: var(--xnm-theme-noticebar-level3-color);

    z-index: 999;

    display: flex;
    flex-direction: row;
}

.xnm-com-noticebar-icon{
    margin: 0;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.xnm-com-noticebar-icon img{
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    width: 1.5rem;
    height: 1.5rem;
}

.xnm-com-noticebar-text{
    margin: 0;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.xnm-com-noticebar-text h6{
    font-family: PingFangSC-Regular;
    font-weight: normal;
    font-size: 1rem;
    color: var(--xnm-theme-text-highlight-color-orange);
    letter-spacing: 0;
    line-height: 1.375rem;

    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;

    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

</style>
