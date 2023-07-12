<script setup>
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
}); 
console.hLog("com-deviceshow::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义
const devImg = ResourcesForTheme("product_img", store.state.darkMode);//设备图
const logoImg = ResourcesForTheme("logo_img", store.state.darkMode);//logo图

// 响应式属性定义

// 响应式状态函数定义

</script>

<template>
    <div class="xnm-com-deviceshow">
        <div class="xnm-com-deviceshow-product"><img v-bind:src="devImg" alt=""/></div>
        <div class="xnm-com-navigation-logo"><img v-bind:src="logoImg" alt=""/></div>
    </div>
</template>

<style>
.xnm-com-deviceshow{
    width:100%;
    margin-bottom: 1rem;
    text-align: center;
}

.xnm-com-deviceshow-product{
    height: 25.2rem;
    width:100%;
}

.xnm-com-deviceshow-product img{
    height: 100%;
}

.xnm-com-navigation-logo{
    height: 1.8rem;
    width:100%;
}

.xnm-com-navigation-logo img{
    height: 100%;
}

</style>
