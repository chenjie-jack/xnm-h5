<script setup>
import ResourcesForTheme from '../config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
    title: String,
    isShowMoreBtn: Boolean
}); 
console.hLog("card-realtime" + props);

const store = useStore()
const { t } = i18n.global;

// 图标&图片定义
let switchBtnImgUrl = ResourcesForTheme("switch_img", store.state.darkMode);//开关

//开关事件处理
function onClickSwitch(event) {
    console.hLog("card-realtime onClickSwitch");
}

</script>

<template>
    <div class="xnm-card-realtime">
        <div class="xnm-card-realtime-title"><h3>已启动</h3></div>
        <div class="xnm-card-realtime-middle"></div>
        <div class="xnm-card-realtime-switch" @click="onClickSwitch"><img v-bind:src="switchBtnImgUrl" alt=""/></div>
    </div>
</template>

<style>
.xnm-card-realtime{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    margin-bottom: var(--xnm-theme-card-margin);
    height: 5.5rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:rgba(255,255,255,0.9);
    display: grid;
    grid-template-columns: repeat(3,33.33%);
}

.xnm-card-realtime-title{
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    display: flex;
}

.xnm-card-realtime-title h3{
    padding-left:1rem;
    font-weight:500;
    color:rgba(0,0,0,0.9);
    align-self: center;
    font-size: 1.125rem;
}

.xnm-card-realtime-switch{
    opacity: 100%;
    margin:0;
    border: 0;
    padding: 0;
    height: 100%;
    display:flex;
    align-items:center;
    justify-content:flex-end;
}

.xnm-card-realtime-switch img{
    margin-right: 1rem;
    height: 3rem;
    width: 3rem;
}
</style>
