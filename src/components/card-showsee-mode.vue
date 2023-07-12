<script setup>
import { onMounted , reactive, ref , computed} from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
    title : String
}); 
console.hLog("card-showsee-mode::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值
const modeEle = ref(null);

// 图标&图片定义
let highSpeedOffImg = ResourcesForTheme("high_speed_off", store.state.darkMode);//high_speed_off
let highSpeedOnImg = ResourcesForTheme("high_speed_on", store.state.darkMode);//high_speed_on
let lowSpeedOffImg = ResourcesForTheme("low_speed_off", store.state.darkMode);//low_speed_off
let lowSpeedOnImg = ResourcesForTheme("low_speed_on", store.state.darkMode);//low_speed_on
let lowSpeedSelectImg = ResourcesForTheme("low_speed_select", store.state.darkMode);//low_speed_select

// 响应式属性定义
const state = reactive({ 
    isOpenMenu: false,//是否显示菜单标志
    menuWidth: 0,//容器宽度
    menuHeight: 0,//容器高度
    menuLeft:0,//容器左上角left
    menuTop:0//容器左上角top
});

const connectStatus = computed(
    () => {
        console.hLog(`card-showsee-mode::computed connectStatus=${store.state.connectStatus}`);
        return store.state.connectStatus;
    }
);

const modeState = computed(
    () => {
        console.hLog(`card-showsee-mode::computed modeState=${store.state.mode.mode}`);
        return store.state.mode.mode;
    }
);

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-showsee-mode::onMounted.`);

    // document.addEventListener("click", (e)=> {
    //   // 元素里是否包含点击的元素，不包含点击的元素就隐藏菜单
    //   if( this.state.more_menu_visable ){
    //     if( e.target.id !== "moreId" && e.target.id !== "menuId" && e.target.id !== "moreIconId"){
    //       this.setState({
    //         more_menu_visable:false,
    //       })
    //     }
    //   }
    // });

});

//计算弹出菜单容器RECT
function calcMenuRect() {
    //计算宽高
    var windwoWidth = document.documentElement.clientWidth || document.body.clientWidth;//整行宽度
    var halfWindowWidth = windwoWidth / 2;

    var marginLeft = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-card-margin').slice(0, -3));
    var marginRight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-halfcard-space').slice(0, -3));

    state.menuWidth = halfWindowWidth - marginLeft*rem2px - marginRight*rem2px;
    state.menuHeight = 6.5*rem2px;

    // 计算绝对坐标
    state.menuLeft = 0 + halfWindowWidth - marginRight*rem2px;
    state.menuTop = 0 - state.menuHeight / 2;
}

function selectLowSpeed(event) {
    console.hLog(`card-showsee-mode::selectLowSpeed`);
    if( connectStatus.value===2 ){//可用状态判断
        if( state.isOpenMenu ){
            state.isOpenMenu = false;
        }
        else{
            //计算弹出菜单容器RECT
            calcMenuRect();
            state.isOpenMenu = true;
        }
    }
}

function selectHighSpeed(event) {
    console.hLog(`card-showsee-mode::selectHighSpeed`);
    if( connectStatus.value===2 ){//可用状态判断
        store.dispatch('sendCommand', {//模式
            data: {
                sid: 'mode',
                data: {
                    mode:2
                }
            },
            toast: false
        });
    }
}

function selectLowSpeedNromal(event) {
    console.hLog(`card-showsee-mode::selectLowSpeedNromal`);
    if( connectStatus.value===2 ){//可用状态判断
        store.dispatch('sendCommand', {//舒适模式
            data: {
                sid: 'mode',
                data: {
                    mode:1
                }
            },
            toast: false
        });
        if( state.isOpenMenu ){
            state.isOpenMenu = false;
        }
        else{
            //计算弹出菜单容器RECT
            calcMenuRect();
            state.isOpenMenu = true;
        }
    }
}

function selectLowSpeedSlight(event) {
    console.hLog(`card-showsee-mode::selectLowSpeedSlight`);
    if( connectStatus.value===2 ){//可用状态判断
        store.dispatch('sendCommand', {//敏感模式
            data: {
                sid: 'mode',
                data: {
                    mode:0
                }
            },
            toast: false
        });
        
        if( state.isOpenMenu ){
            state.isOpenMenu = false;
        }
        else{
            //计算弹出菜单容器RECT
            calcMenuRect();
            state.isOpenMenu = true;
        }
    }
}

</script>

<template>
    <div class="xnm-card-showsee-mode" ref="modeEle" :style="{ opacity:connectStatus===2 ? 1 : 0.5}">
        <div v-show="state.isOpenMenu" class="xnm-card-showsee-mode-menu" 
            :style="{ width:(state.lowSpeedCardWidth + 'px'),  
                    height:(state.lowSpeedCardHeight + 'px'),
                    top:(state.menuTop + 'px'),
                    left:(state.menuLeft + 'px')}">
            <div class="xnm-card-showsee-mode-menu-slight" @click="selectLowSpeedSlight" 
            :style="{ backgroundColor:modeState===0 ? 'var(--xnm-theme-menu-item-color)' : 'var(--xnm-theme-card-bg)'}">
                <h4 :style="{ color:modeState===0 ? 'var(--xnm-theme-text-highlight-color-blue)' : 'var(--xnm-theme-text-title-color)'}">{{ t("LowSlightSpeed") }}</h4>
            </div>
            <div class="xnm-card-showsee-mode-menu-normal" @click="selectLowSpeedNromal" 
            :style="{ backgroundColor:modeState===1 ? 'var(--xnm-theme-menu-item-color)' : 'var(--xnm-theme-card-bg)'}">
                <h4 :style="{ color:modeState===1 ? 'var(--xnm-theme-text-highlight-color-blue)' : 'var(--xnm-theme-text-title-color)'}">{{ t("LowNormalSpeed") }}</h4>
            </div>
        </div>
        <div class="xnm-card-showsee-mode-title"><h3>{{t("ModeTitle")}}</h3></div>
        <div class="xnm-card-showsee-mode-interaction">
            <div class="xnm-card-showsee-mode-interaction-high">
                <div class="xnm-card-showsee-mode-interaction-high-area" @click="selectHighSpeed">
                    <div class="xnm-card-showsee-mode-interaction-high-area-circle" 
                    :style="{ backgroundColor:modeState===2 ? 'var(--xnm-theme-text-highlight-color-blue)' : 'var(--xnm-theme-text-highlight-color-gray)'}">
                        <img v-bind:src="modeState===2 ? highSpeedOnImg : highSpeedOffImg" alt=""/>
                    </div>
                    <div class="xnm-card-showsee-mode-interaction-high-area-text">
                        <h6 :style="{ color:modeState===2 ? 'var(--xnm-theme-text-highlight-color-blue)' : 'var(--xnm-theme-text-highlight-color-gray)'}">{{t("HighSpeed")}}</h6>
                    </div>
                </div>
            </div>
            <div class="xnm-card-showsee-mode-interaction-low">
                <div class="xnm-card-showsee-mode-interaction-low-area">
                    <div class="xnm-card-showsee-mode-interaction-low-area-circle" 
                    :style="{ backgroundColor:modeState!==2 ? 'var(--xnm-theme-text-highlight-color-blue)' : 'var(--xnm-theme-text-highlight-color-gray)'}">
                        <img v-bind:src="modeState!==2 ?lowSpeedOnImg:lowSpeedOffImg" alt=""/>
                    </div>
                    <div class="xnm-card-showsee-mode-interaction-low-area-text" @click="selectLowSpeed">
                        <div class="xnm-card-showsee-mode-interaction-low-area-content">
                            <h6 :style="{ color:modeState!==2 ? 'var(--xnm-theme-text-highlight-color-blue)' : 'var(--xnm-theme-text-highlight-color-gray)'}">{{t("LowNormalSpeed")}}</h6>
                        </div>
                        <div class="xnm-card-showsee-mode-interaction-low-area-arrow">
                            <img v-bind:src="lowSpeedSelectImg" alt=""/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="xnm-card-showsee-mode-tips">
            <div class="xnm-card-showsee-mode-tips-block">
                <div class="xnm-card-showsee-mode-tips-title">
                    <h3 v-if="modeState === 2">{{ t("HighSpeedTipsTitle") }}</h3>
                    <h3 v-else-if="modeState === 1">{{ t("LowNormalSpeedTipsTitle") }}</h3>
                    <h3 v-else>{{ t("LowSlightSpeedTipsTitle") }}</h3>
                </div>
                <div class="xnm-card-showsee-mode-tips-content">
                    <h6 v-if="modeState === 2">{{ t("HighSpeedTipsDesc") }}</h6>
                    <h6 v-else-if="modeState === 1">{{ t("LowNormalSpeedTipsDesc") }}</h6>
                    <h6 v-else>{{ t("LowSlightSpeedTipsDesc") }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.xnm-card-showsee-mode{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    height: 22.3rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    display: grid;
    grid-template-rows: 4.8rem 8.8rem 8.6rem;

    position: relative;
}

/* 弹出菜单样式 */
.xnm-card-showsee-mode-menu{
    margin: 0;
    border: 0;
    padding: 0;
    height: 10.4rem;
    width: 16.2rem;

    position: absolute;
    left: 0;
    top: 0;

    border-radius: var(--xnm-theme-card-radius);
    background-color: var(--xnm-theme-card-bg);
    -webkit-box-shadow: 0px 10px 50px rgba(0,0,3,0.15);
    -moz-box-shadow: 0px 10px 50px rgba(0,0,3,0.15);
    box-shadow: 0px 10px 50px rgba(0,0,3,0.15);

    z-index: 999;

    float: left;
    display: flex;
    flex-direction: column;
}

.xnm-card-showsee-mode-menu-slight{
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
    border: 0;
    padding: 0;
    height: 50%;
    border-radius: var(--xnm-theme-float-window-radius);
    background-color: var(--xnm-theme-menu-item-color);

    display: flex;
    align-items: center;
}

.xnm-card-showsee-mode-menu-slight h4{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-left: var(--xnm-theme-card-margin);
    border: 0;

    font-family: HarmonyHeiTi;
    font-size: 1.6rem;
    color: var(--xnm-theme-text-highlight-color-blue);
    text-align: left;
}

.xnm-card-showsee-mode-menu-normal{
    margin-top: 0.2rem;
    margin-bottom: 0.4rem;
    margin-right: 0.4rem;
    margin-left: 0.4rem;

    border: 0;
    padding: 0;
    height: 50%;
    border-radius: var(--xnm-theme-float-window-radius);
    /* background-color: var(--xnm-theme-menu-item-color); */

    display: flex;
    align-items: center;
}

.xnm-card-showsee-mode-menu-normal h4{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-left: var(--xnm-theme-card-margin);
    border: 0;

    font-family: HarmonyHeiTi;
    font-size: 1.6rem;
    color: var(--xnm-theme-text-title-color);
    text-align: left;
}

/* 模式选择卡片 */
.xnm-card-showsee-mode-title{
    padding-left: 1.6rem;
    padding-top: 1.8rem;
}

.xnm-card-showsee-mode-title h3{
    font-family: HarmonyHeiTi-Medium;
    font-size: 1.6rem;
    color:var(--xnm-theme-text-level1-color);
    text-align: left;
    line-height: 2.2rem;

    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.xnm-card-showsee-mode-interaction{
    display: grid;
    grid-template-columns: 50% 50%;
}

.xnm-card-showsee-mode-interaction-high{
    padding-left: 0.8rem;
    margin: 0;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.xnm-card-showsee-mode-interaction-high-area{
    margin: 0;
    border: 0;
    padding: 0;
}

.xnm-card-showsee-mode-interaction-high-area-circle{
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    background-color: var(--xnm-theme-text-highlight-color-blue);

    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-showsee-mode-interaction-high-area-circle img{
    width: 2.4rem;
    height: 2.4rem;
}

.xnm-card-showsee-mode-interaction-high-area-text{
    margin: 0;
    border: 0;
    padding: 0;
}

.xnm-card-showsee-mode-interaction-high-area-text h6{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    padding-top: 0.4rem;
    font-family: HarmonyHeiTi;
    font-size: 1.2rem;
    color: var(--xnm-theme-text-highlight-color-blue);
    text-align: center;
}

.xnm-card-showsee-mode-interaction-low{
    padding-right: 0.8rem;
    margin: 0;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.xnm-card-showsee-mode-interaction-low-area{
    margin: 0;
    border: 0;
    padding: 0;
}

.xnm-card-showsee-mode-interaction-low-area-circle{
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    background-color: var(--xnm-theme-text-highlight-color-gray);

    display: flex;
    justify-content: center;
    align-items: center;
}

.xnm-card-showsee-mode-interaction-low-area-circle img{
    width: 2.4rem;
    height: 2.4rem;
}

.xnm-card-showsee-mode-interaction-low-area-text{
    margin: 0;
    border: 0;
    padding: 0;
    display: flex;
}

.xnm-card-showsee-mode-interaction-low-area-content{
    margin: 0;
    border: 0;
    padding: 0;
}

.xnm-card-showsee-mode-interaction-low-area-content h6{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0.8rem;
    margin-inline-end: 0px;

    padding-top: 0.4rem;
    font-family: HarmonyHeiTi;
    font-size: 1.2rem;
    color: var(--xnm-theme-text-level2-color);
    text-align: center;
}

.xnm-card-showsee-mode-interaction-low-area-arrow{
    width: 1.2rem;
    height: 2.4rem;
    padding-top: 0.2rem;
}

.xnm-card-showsee-mode-interaction-low-area-arrow img{
    width: 1.2rem;
    height: 1.2rem;
}

.xnm-card-showsee-mode-tips{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.xnm-card-showsee-mode-tips-block{
    margin: 0;
    border: 0;
    padding: 0;
}

.xnm-card-showsee-mode-tips-title{
    padding-left: 1.6rem;
    padding-right: 1.6rem;
}

.xnm-card-showsee-mode-tips-title h3{
    font-family: HarmonyHeiTi-Medium;
    font-size: 1.6rem;
    color:var(--xnm-theme-text-level1-color);
    text-align: left;
    line-height: 2.2rem;
    
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.xnm-card-showsee-mode-tips-content{
    padding-left: 1.6rem;
    padding-right: 1.6rem;
}

.xnm-card-showsee-mode-tips-content h6{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    color:var(--xnm-theme-text-level2-color);
    font-size: 1.4rem;
    font-family: HarmonyHeiTi;
    line-height: 1.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

</style>
