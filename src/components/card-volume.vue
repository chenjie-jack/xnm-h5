<script setup>
import ResourcesForTheme from '../config/resource';
import { useStore } from 'vuex';
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
}); 
console.hLog("card-volume" + props);

const store = useStore()
const { t } = i18n.global;

// 图标&图片定义
let reduceBtnImgUrl = ResourcesForTheme("volumereduce_img", store.state.darkMode);//返回
let increaseBtnImgUrl = ResourcesForTheme("volumeincrease_img", store.state.darkMode);//更多

//开关事件处理
function onClickReduce(event) {
    console.hLog("card-volume onClickReduce");
}

//开关事件处理
function onClickIncrease(event) {
    console.hLog("card-volume onClickIncrease");
}

</script>

<template>
    <div class="xnm-card-volume">
        <div class="xnm-card-volume-reduce" @click="onClickReduce"><img v-bind:src="reduceBtnImgUrl" alt=""/></div>
        <div class="xnm-card-volume-title"><h4>音量</h4></div>
        <div class="xnm-card-volume-increase" @click="onClickIncrease"><img v-bind:src="increaseBtnImgUrl" alt=""/></div>
    </div>
</template>

<style>
.xnm-card-volume{
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 12px;
    height: 64px;
    border-radius: 16px;
    background-color:rgba(255,255,255,0.9);
    display: grid;
    grid-template-columns: repeat(3,33.33%);
}

.xnm-card-volume-reduce{
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-volume-reduce img{
    width: 1.5rem;
    height: 1.5rem;
}

.xnm-card-volume-title{
    margin:0;
    border: 0;
    padding: 0;
    height: 100%;
    text-align: center;
}
.xnm-card-volume-title h4{
    font-weight:500;
    color:rgba(0,0,0,0.9);
    align-self: center;
    font-size: 1rem;
}

.xnm-card-volume-increase{
    margin:0;
    border: 0;
    padding: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-volume-increase img{
    width: 1.5rem;
    height: 1.5rem;
}
</style>
