<script setup>
import { onMounted , computed } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';
import { BatteryProgress } from '../components';

//传参
const props = defineProps({
}); 
console.hLog("card-showsee-realtime::props=" + JSON.stringify(props));

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义
let loadingImg = ResourcesForTheme("loading_img", store.state.darkMode);//loading
let batteryImg = ResourcesForTheme("battery5", store.state.darkMode);//电池状态图片
let unlockImg = ResourcesForTheme("unlock_img", store.state.darkMode);//已解锁状态图片
let lockImg = ResourcesForTheme("lock_img", store.state.darkMode);//已锁定状态图片

// 响应式属性定义
const connectStatus = computed(
    () => {
        console.hLog(`card-showsee-realtime::computed connectStatus=${store.state.connectStatus}`);
        return store.state.connectStatus
    }
);

const lockState = computed(
    () => {
        console.hLog(`card-showsee-realtime::computed lockState=${store.state.status.status}`);
        return store.state.status.status
    }
);

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-showsee-realtime::onMounted`);
});

//开关事件处理
function onReconnect(event) {
    console.hLog(`card-showsee-realtime::onReconnect connectStatus = ${store.state.connectStatus}`);
    if (!store.state.bleOn) {
        store.dispatch('openBluetoothAdapter')
        return
    }
    // 规避重连失败，需要先断连再重连
    store.dispatch('disconnectBle').then((res = {}) => {
        console.hLog(`card-showsee-realtime::onReconnect disconnectBle ok`);
        //修改当前连接状态
        store.commit('UPDATE_STATE',{ name: 'connectStatus', value: 1 });
        console.hLog(`card-showsee-realtime::onReconnect disconnectBle connectStatus = ${store.state.connectStatus}`);

        store.dispatch('subscribeBleEvent');
        store.dispatch('connectBle');
        // 记录重新连接的次数
        store.commit('UPDATE_STATE',{ name: 'isReconnect', value: true });
    })
}

//开解锁事件处理
function onClickLock(event) {
    console.hLog("card-showsee-realtime::onClickLock");
    let value = 0;
    if( lockState === 0){
        value = 1;
    }
    store.dispatch('sendCommand', {//敏感模式
        data: {
            sid: 'status',
            data: {
                status:value
            }
        },
        toast: false
    });
}
</script>

<template>
    <div class="xnm-card-showsee-realtime">
        <div v-if="connectStatus!==2" class="xnm-card-showsee-realtime-title"><h3>{{ connectStatus===1 ? t("Connecting") : t("Disconnect")}}</h3></div>
        <div v-if="connectStatus===2" class="xnm-card-showsee-realtime-title"><h3>{{ lockState!==1 ? t("Unlocked") : t("Locked") }}</h3></div>
        <div class="xnm-card-showsee-realtime-middle">
            <div v-if="connectStatus===2" class="xnm-card-showsee-realtime-middle-icon">
                <BatteryProgress/>
                <h5>88%</h5>
            </div>
        </div>
        <div v-if="connectStatus===1" class="xnm-card-showsee-realtime-switch"><img v-bind:src="loadingImg" alt=""/></div>
        <div v-if="connectStatus===0 || connectStatus===3 || connectStatus===-1" class="xnm-card-showsee-realtime-switch" @click="onReconnect"><h5>{{t("Reconnect")}}</h5></div>
        <div v-if="connectStatus===2" class="xnm-card-showsee-realtime-switch" @click="onClickLock">
            <div class="xnm-card-showsee-realtime-switch-background">
                <img v-bind:src="lockState!==1?unlockImg:lockImg" alt=""/>
            </div>
        </div>
    </div>
</template>

<style>
.xnm-card-showsee-realtime{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    margin-bottom: var(--xnm-theme-card-margin);
    height: 8.8rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    display: grid;
    grid-template-columns: repeat(3,33.33%);
}

.xnm-card-showsee-realtime-title{
    margin: 0;
    border: 0;
    padding-left:1.6rem;
    padding-right:0.8rem;
    height: 100%;
    display: flex;
}

.xnm-card-showsee-realtime-title h3{
    font-family: HarmonyHeiTi-Medium;
    color:var(--xnm-theme-text-level1-color);
    align-self: center;
    font-size: 1.8rem;
    line-height: 2.5rem;
}

.xnm-card-showsee-realtime-middle{
    margin: 0;
    border: 0;
    padding:0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-showsee-realtime-middle-icon{
    margin: 0;
    border: 0;
    padding:0;
    display: flex;
    flex-direction:column;
}

.xnm-card-showsee-realtime-middle-icon img{
    margin: 0;
    border: 0;
    padding:0;
    width: 2.4rem;
    height: 1.4rem;
}

.xnm-card-showsee-realtime-middle-icon h5{
    margin: 0;
    border: 0;
    padding:0;
    color:var(--xnm-theme-text-level2-color);
    align-self: center;
    font-size: 1.2rem;
    font-family: HarmonyHeiTi;
}

.xnm-card-showsee-realtime-switch{
    opacity: 100%;
    margin:0;
    border: 0;
    padding-right: 1.6rem;
    height: 100%;
    display:flex;
    align-items:center;
    justify-content:flex-end;
}

.xnm-card-showsee-realtime-switch h5{
    border: 0;
    padding:0;
    font-weight:500;
    color:var(--xnm-theme-text-highlight-color-blue);
    align-self: center;
    font-size: 1.8rem;
}

.xnm-card-showsee-realtime-switch img{
    height: 4rem;
    width: 4rem;
}

.xnm-card-showsee-realtime-switch-background{
    height: 4.8rem;
    width: 4.8rem;
    border-radius: 50%;
    background-color: var(--xnm-theme-text-highlight-color-blue);

    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-showsee-realtime-switch-background img{
    height: 2.4rem;
    width: 2.4rem;
}

</style>
