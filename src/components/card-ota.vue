<script setup>
import { onMounted , computed } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
    title: String,
    isShowMoreBtn: Boolean
}); 
console.hLog("card-ota::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值

// 图标&图片定义
let otaImg = ResourcesForTheme("ota_img", store.state.darkMode);//ota图片

// 响应式属性定义
const connectStatus = computed(
    () => {
        console.hLog(`card-ota::computed connectStatus=${store.state.connectStatus}`);
        return store.state.connectStatus
    }
);

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-ota::onMounted`);

});

// 跳转到hota
function onClickOTA(event) {
    console.hLog(`card-ota::onClickOTA`);
    if( connectStatus.value===2 ){//可用状态判断
        store.dispatch("jumpTo",'com.huawei.smarthome.deviceBleUpgradeActivity');
    }
}

</script>

<template>
    <div class="xnm-card-ota" :style="{ opacity:connectStatus===2 ? 1 : 0.5}">
        <div class="xnm-card-ota-title"><h3>{{t("HOta")}}</h3></div>
        <div class="xnm-card-ota-icon">
            <div class="xnm-card-ota-icon-background" @click="onClickOTA">
                <img v-bind:src="otaImg" alt=""/>
            </div>
        </div>
    </div>
</template>

<style>
.xnm-card-ota{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    margin-top: var(--xnm-theme-card-margin);
    height: 6.4rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    display: grid;
    grid-template-columns: repeat(2,50%);
}

.xnm-card-ota-title{
    margin: 0;
    border: 0;
    padding-left:1.6rem;
    padding-right:0.8rem;
    height: 100%;
    display: flex;
}

.xnm-card-ota-title h3{
    font-family: HarmonyHeiTi-Medium;
    color:var(--xnm-theme-text-level1-color);
    align-self: center;
    font-size: 1.8rem;
    line-height: 2.5rem;
}

.xnm-card-ota-icon{
    opacity: 100%;
    margin:0;
    border: 0;
    padding-right: 1.6rem;
    height: 100%;
    display:flex;
    align-items:center;
    justify-content:flex-end;
}

.xnm-card-ota-icon-background{
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    background-color: var(--xnm-theme-system-highlight-cyan);

    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-ota-icon-background img{
    height: 2.2rem;
    width: 2.2rem;
}
</style>
