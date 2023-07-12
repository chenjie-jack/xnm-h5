<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

// 传参
// content 提示的内容文本
const props = defineProps({
    content: String,
});

console.hLog("xnm-com-tips-card::props=" + props);
const store = useStore();
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值

// 图标&图片定义

// 响应式属性定义

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`xnm-com-tips-card::onMounted.`);
});

</script>

<template>
    <div class="xnm-com-tips-card">
        <div class="xnm-com-tips-card-h4">{{t("KnifeStateTips")}}</div>
    </div>
</template>

<style>
.xnm-com-tips-card{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    height: 6.4rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    text-align: left;
    display: flex;
    align-items:center;
    justify-content:center;
}

.xnm-com-tips-card-h4{
    margin: 1.2rem;
    border: 0;
    bottom: 0;
    font-weight:500;
    color:var(--xnm-theme-text-level4-color);
    font-size: 1.6rem;

    /* 最多显示2行 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; 
}

</style>
