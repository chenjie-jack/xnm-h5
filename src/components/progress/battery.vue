<script setup>
import { onMounted } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
//progress参数当前进度值，取值范围 0-100
const props = defineProps({
    progress:Number
});

console.hLog("xnm-com-progress-battery::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值

// 图标&图片定义

// 响应式属性定义

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`xnm-com-progress-battery::onMounted.`);

});

</script>

<template>
    <div class="xnm-com-progress-battery">
        <div class="xnm-com-progress-battery-border">
            <div class="xnm-com-progress-battery-progress"></div>
        </div>
        <div class="xnm-com-progress-battery-dot"></div>
    </div>
</template>

<style>
.xnm-com-progress-battery{
    margin: 0;
    padding: 0;
    border: 0;
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-com-progress-battery-border{
    margin: 0;
    padding: 0;
    width: 1.8rem;
    height: 1rem;
    border: 0.6px solid var(--xnm-theme-icon-color);
    border-radius: 1.6px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.xnm-com-progress-battery-progress{
    padding: 0;
    width: 1.6rem;
    height: 0.75rem;
    background-color: var(--xnm-theme-icon-color);
    border-radius: 0.8px;
}

.xnm-com-progress-battery-dot{
    margin: 0;
    padding: 0;
    width: 1.4px;
    height: 6px;
    background-color: var(--xnm-theme-icon-color);
}

</style>
