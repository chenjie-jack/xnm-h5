<script setup>
import { reactive , nextTick , onMounted , ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { i18n } from '@/i18n/index';
import ResourcesForTheme from '../config/resource';

// 传参 TODO：当前不支持 infobtn 和 searchbtn，所以参数只支持false
const props = defineProps({
    title: String,
    isShowExitBtn: Boolean,
    isShowInfoBtn: Boolean,
    isShowSearchBtn: Boolean,
    isShowMoreBtn: Boolean
});

console.hLog("com-navigation::props=" + props);

const router = useRouter();
const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值
const navigationEle = ref(null);
const exitEle = ref(null);
const functionsEle = ref(null);
const infoEle = ref(null);
const searchEle = ref(null);
const moreEle = ref(null);

// 图标&图片定义区域
let backBtnImgUrl = ResourcesForTheme("system_back", store.state.darkMode);//返回
let infoBtnImgUrl = ResourcesForTheme("system_more", store.state.darkMode);//信息
let searchBtnImgUrl = ResourcesForTheme("system_more", store.state.darkMode);//搜索
let moreBtnImgUrl = ResourcesForTheme("system_more", store.state.darkMode);//更多

// 响应式属性定义
const state = reactive({ 
    titleWidth: 0,//title文本容器宽度
    abc:"test"
});

// 响应式状态函数定义
//计算title文本容器宽度
function calcTitleEleWidth() {
    var navigationEleWidth = navigationEle.value.offsetWidth;//整行宽度
    var tempTitleWidth = navigationEleWidth;//临时存放title文本区域宽度变量
    console.hLog(`xnm-com-navigation::tempTitleWidth=` + tempTitleWidth);
    if( props.isShowExitBtn ){
        tempTitleWidth = tempTitleWidth - exitEle.value.offsetWidth;//减按钮区域宽度
        //减按钮区域margin宽度
        tempTitleWidth = tempTitleWidth - parseInt(document.defaultView.getComputedStyle(exitEle.value).marginLeft.slice(0, -2)) - parseInt(document.defaultView.getComputedStyle(exitEle.value).marginRight.slice(0, -2));
        console.hLog(`xnm-com-navigation::减去exit btn宽度后tempTitleWidth=` + tempTitleWidth);
    }

    if( props.isShowInfoBtn ){
        tempTitleWidth = tempTitleWidth - infoEle.value.offsetWidth;//减按钮区域宽度
        //减按钮区域margin宽度
        tempTitleWidth = tempTitleWidth - parseInt(document.defaultView.getComputedStyle(infoEle.value).marginLeft.slice(0, -2)) - parseInt(document.defaultView.getComputedStyle(infoEle.value).marginRight.slice(0, -2));
        console.hLog(`xnm-com-navigation::减去info btn宽度后tempTitleWidth=` + tempTitleWidth);
    }

    if( props.isShowSearchBtn ){
        tempTitleWidth = tempTitleWidth - searchEle.value.offsetWidth;//减按钮区域宽度
        //减按钮区域margin宽度
        tempTitleWidth = tempTitleWidth - parseInt(document.defaultView.getComputedStyle(searchEle.value).marginLeft.slice(0, -2)) - parseInt(document.defaultView.getComputedStyle(searchEle.value).marginRight.slice(0, -2));
        console.hLog(`xnm-com-navigation::减去search btn宽度后tempTitleWidth=` + tempTitleWidth);
    }

    if( props.isShowMoreBtn ){
        tempTitleWidth = tempTitleWidth - moreEle.value.offsetWidth;//减按钮区域宽度
        //减按钮区域margin宽度
        tempTitleWidth = tempTitleWidth - parseInt(document.defaultView.getComputedStyle(moreEle.value).marginLeft.slice(0, -2)) - parseInt(document.defaultView.getComputedStyle(moreEle.value).marginRight.slice(0, -2));
        console.hLog(`xnm-com-navigation::减去more btn宽度后tempTitleWidth=` + tempTitleWidth);
    }

    state.titleWidth = tempTitleWidth;
}

//事件处理函数区域
onMounted(() => {
    console.hLog(`xnm-com-navigation::onMounted.`);

    //计算title文本容器宽度
    calcTitleEleWidth();

});

//返回事件
function onClickBack(event) {
    console.hLog(`xnm-com-navigation::onClickBack`);
    if( window.location.hash === '#/home'){
        console.hLog(`xnm-com-navigation::onClickBack exit`);
        store.dispatch('finishDeviceActivity');
    }
    else{
        console.hLog(`xnm-com-navigation::onClickBack back`);
        router.go(-1);
    }
}

//更多事件处理
function onClickMore(event) {
    console.hLog(`xnm-com-navigation::onClickMore.`);
    router.push({path:'/more'});
}

</script>

<template>
    <div class="xnm-com-navigation">
        <div class="xnm-com-navigation-placeholder"></div>
        <div ref="navigationEle" class="xnm-com-navigation-interaction">
            <div ref="exitEle" v-if="props.isShowExitBtn" class="xnm-com-navigation-exitbtn" @click="onClickBack"><img v-bind:src="backBtnImgUrl" alt=""/></div>
            <div ref="titleEle" class="xnm-com-navigation-titletxt" :style="{ width: state.titleWidth + 'px' }"><h1>{{ props.title }}</h1></div>
            <div ref="functionsEle" class="xnm-com-navigation-functions">
                <div ref="infoEle" v-if="props.isShowInfoBtn" class="xnm-com-navigation-functions-infobtn"><img v-bind:src="infoBtnImgUrl" alt=""/></div>
                <div ref="searchEle" v-if="props.isShowSearchBtn" class="xnm-com-navigation-functions-searchbtn"><img v-bind:src="searchBtnImgUrl" alt=""/></div>
                <div ref="moreEle" v-if="props.isShowMoreBtn" @click="onClickMore" class="xnm-com-navigation-functions-morebtn"><img v-bind:src="moreBtnImgUrl" alt=""/></div>
                <!-- <RouterLink to="/more"><div v-if="props.isShowMoreBtn" class="xnm-com-navigation-functions-morebtn"><img v-bind:src="moreBtnImgUrl" alt=""/></div></RouterLink> -->
            </div>
        </div>
    </div>
</template>

<style>
.xnm-com-navigation{
    width: 100%;
    height: calc( var(--xnm-theme-statusbar-height) + var(--xnm-theme-navigation-height) );
    background-color:var(--xnm-theme-nav-bg);
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
}

.xnm-com-navigation-placeholder{
    width: 100%;
    height: var(--xnm-theme-statusbar-height);
    background-color:var(--xnm-theme-nav-bg);
}

.xnm-com-navigation-interaction{
    width: 100%;
    height: var(--xnm-theme-navigation-height);
    background-color:var(--xnm-theme-nav-bg);
}

.xnm-com-navigation-exitbtn{
    padding: 0;
    border: 0;
    margin-left: 1.2rem;
    margin-right: 0.4rem;
    width: 4.8rem;
    height: 5.6rem;
    float: left;
}

.xnm-com-navigation-exitbtn img{
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
}

.xnm-com-navigation-titletxt{
    height: 5.6rem;
    float: left;
    display: flex;
}

.xnm-com-navigation-titletxt h1{
    font-weight:500;
    color:var(--xnm-theme-text-level1-color);
    align-self: center;
    font-size: 2rem;

    /*让长段文本不换行*/
    white-space: nowrap;
    /*设置文本超出元素宽度部分隐藏*/
    overflow-x: hidden;
    /*设置文本超出部分用省略号显示*/
    text-overflow: ellipsis;
}

.xnm-com-navigation-functions{
    padding: 0;
    border: 0;
    margin:0;
}

.xnm-com-navigation-functions-infobtn{
    padding: 0;
    border: 0;
    margin-left: 0.4rem;
    margin-right: 1.2rem;
    width: 4.8rem;
    height: 5.6rem;
    float: right;
}

.xnm-com-navigation-functions-infobtn img{
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
}

.xnm-com-navigation-functions-searchbtn{
    padding: 0;
    border: 0;
    margin-left: 0.4rem;
    margin-right: 1.2rem;
    width: 4.8rem;
    height: 5.6rem;
    float: right;
}

.xnm-com-navigation-functions-searchbtn img{
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
}

.xnm-com-navigation-functions-morebtn{
    padding: 0;
    border: 0;
    margin-left: 0.4rem;
    margin-right: 1.2rem;
    width: 4.8rem;
    height: 5.6rem;
    float: right;
}

.xnm-com-navigation-functions-morebtn img{
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    width: 2.4rem;
    height: 2.4rem;
}

</style>
