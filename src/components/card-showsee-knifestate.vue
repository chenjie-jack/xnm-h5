<script setup>
import { onMounted, reactive , computed } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';
import { RingProgress } from '../components';

//传参
const props = defineProps({
    title: String,
    isShowMoreBtn: Boolean
}); 
console.hLog("card-showsee-knifestate::props=" + props);

const router = useRouter();
const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值


// 图标&图片定义
let greenImg = ResourcesForTheme("clean_green", store.state.darkMode);//正常绿色背景
let yellowImg = ResourcesForTheme("clean_yellow", store.state.darkMode);//异常橙色背景

// 响应式属性定义
const state = reactive({ 
    harlCardWidth: 0,//容器宽度
    harlCardHeight: 0,//容器高度
    ringProgressWidth: 0,//环形进度条宽度
    ringProgressHeight: 0,//环形进度条高度
    strokeWidth:4,//环形进度条笔画宽度
});

const ringWidth = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed ringWidth=${5.6*rem2px}`);
        return 5.6*rem2px;
    }
);
const strokeWidth = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed strokeWidth=${0.4*rem2px}`);
        return 0.4*rem2px;
    }
);

const connectStatus = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed connectStatus=${store.state.connectStatus}`);
        return store.state.connectStatus;
    }
);

const cleanStatu = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed knifeLife=${store.state.unusual.unusual}`);
        return store.state.unusual.unusual===1;
    }
);

const knifeLife = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed knifeLife=${store.state.knife.life}`);
        return store.state.knife.life;
    }
);

const knifeLifePercent = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed knifeLifePercent=${((1200 - store.state.knife.life)/1200) * 100}`);
        return ((1200 - store.state.knife.life)/1200) * 100;
    }
);

const knifeLifePercentProgress = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed knifeLifePercentProgress=${((1200 - store.state.knife.life)/1200) * 100}`);
        return ((1200 - store.state.knife.life)/1200) * 2 + 1.5;
    }
);

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-showsee-knifestate::onMounted.`);

    //计算容器宽度
    calcKnifestateEleWidth();
});

//计算容器宽度
function calcKnifestateEleWidth() {
    var windwoWidth = document.documentElement.clientWidth || document.body.clientWidth;//整行宽度
    var halfWindowWidth = windwoWidth / 2;

    var marginLeft = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-card-margin').slice(0, -3));
    var marginRight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-halfcard-space').slice(0, -3));

    state.harlCardWidth = halfWindowWidth - marginLeft*rem2px - marginRight*rem2px;
    state.harlCardHeight = state.harlCardWidth;
}

function onClickKnife(event) {
    console.hLog(`card-showsee-knifestate::onClickKnife connectStatus=${connectStatus.value}`);
    if( connectStatus.value===2 ){//可用状态判断
        router.push({path:'/knife'});
    }
}

</script>

<template>
    <div class="card-showsee-knifestate" :style="{ opacity:connectStatus===2 ? 1 : 0.5}">
        <!-- 左侧刀头状态 -->
        <div class="card-showsee-knifestate-lifetime" @click="onClickKnife" :style="{ width:(state.harlCardWidth + 'px'),  height:(state.harlCardHeight + 'px')}">
            <div class="card-showsee-knifestate-lifetime-title">
                <div class="card-showsee-knifestate-lifetime-title-text"><h3>{{t("KnifeState")}}</h3></div>
                <div class="card-showsee-knifestate-lifetime-title-desc"><h6>{{t("KnifeStateDesc")}}</h6></div>
            </div>
            <div class="card-showsee-knifestate-lifetime-chart">
                <div class="card-showsee-knifestate-lifetime-chart-percent">
                    <h3>{{knifeLifePercent}}
                        <div class="card-showsee-knifestate-lifetime-chart-percent-symbol"><h5>%</h5></div>
                    </h3>
                </div>
                <div class="card-showsee-knifestate-lifetime-chart-toroidal">
                    <!-- progress 0 点在 1.5弧度位置，实际绘制进度在次基础上增加，3.5弧度时是360一圈-->
                    <RingProgress
                        :width="ringWidth"
                        :height="ringWidth"
                        :strokeWidth="strokeWidth"
                        :progress="knifeLifePercentProgress"
                    />
                </div>
            </div>
        </div>

        <!-- 右侧清洗提醒 -->
        <div class="card-showsee-knifestate-cleantime" 
            :style="{ width:(state.harlCardWidth + 'px'),  height:(state.harlCardHeight + 'px'), backgroundImage: cleanStatu ? `url(${yellowImg})` : `url(${greenImg})`}">
            <div class="card-showsee-knifestate-cleantime-title">
                <div class="card-showsee-knifestate-cleantime-title-text"><h3>{{t("KnifeClean")}}</h3></div>
                <div class="card-showsee-knifestate-cleantime-title-desc"><h6>{{t("KnifeCleanDesc") + knifeLife + t("KnifeCleanDescMin")}}</h6></div>
            </div>
            <div class="card-showsee-knifestate-cleantime-tips">
                <h3 :style="{color: cleanStatu ?  'var(--xnm-theme-text-highlight-color-yellow)':'var(--xnm-theme-text-highlight-color-green)'}">
                    {{cleanStatu ? t("KnifeNeedClean"):t("KnifeNormal")}}
                </h3>
            </div>
        </div>
    </div>
</template>

<style>
.card-showsee-knifestate{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    margin-bottom: var(--xnm-theme-card-margin);
    border: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
}

/* 左侧状态提醒 */
.card-showsee-knifestate-lifetime{
    margin-right: var(--xnm-theme-halfcard-space);
    height: 8rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    display: grid;
    grid-template-rows: repeat(2,50%);
}

.card-showsee-knifestate-lifetime-title{
    margin: 0;
    border: 0;
    padding: 0;
}

.card-showsee-knifestate-lifetime-title-text{
    margin: 0;
    border: 0;
    padding-left:1.6rem;
    padding-top:1.2rem;
}

.card-showsee-knifestate-lifetime-title-text h3{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;

    font-family: HarmonyHeiTi-Medium;
    color:var(--xnm-theme-text-level1-color);
    font-size: 1.6rem;
    letter-spacing: 0;
    line-height: 2.1rem;

    /* 最多显示1行 */
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.card-showsee-knifestate-lifetime-title-desc{
    margin: 0;
    border: 0;
    padding-left:1.6rem;
    padding-right:1.6rem;
}

.card-showsee-knifestate-lifetime-title-desc h6{
    color:var(--xnm-theme-text-level2-color);
    font-size: 1.2rem;

    font-family: HarmonyHeiTi;
    letter-spacing: 0;
    line-height: 1.9rem;

    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    /* 最多显示2行 */
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; 
}

.card-showsee-knifestate-lifetime-chart{
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2,50%);

    /* 行间距 列间距 */
    grid-gap:0px 0px;
}

.card-showsee-knifestate-lifetime-chart-percent{
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    position: relative;
}

.card-showsee-knifestate-lifetime-chart-percent h3{
    margin: 0;
    border: 0;
    padding-left: 1.6rem;
    padding-bottom: 1.6rem;
    bottom: 0;
    position: absolute;

    display: flex;
    flex-direction: row;

    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    font-family: HarmonyHeiTi;
    font-size: 2.4rem;
    color:var(--xnm-theme-text-level1-color);
    letter-spacing: -1.2px;
}

.card-showsee-knifestate-lifetime-chart-percent-symbol{
    margin: 0;
    border: 0;
    padding: 0;
    position: relative;
}

.card-showsee-knifestate-lifetime-chart-percent-symbol h5{
    margin: 0;
    border: 0;
    padding: 0;

    position: absolute;
    bottom: 0;

    font-family: HarmonyHeiTi;
    color:var(--xnm-theme-text-level2-color);
    font-size: 1.2rem;
    letter-spacing: -0.6px;
    text-align: left;
}

.card-showsee-knifestate-lifetime-chart-toroidal{
    margin: 0;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 右侧清洗提醒 */
.card-showsee-knifestate-cleantime{
    margin-left: var(--xnm-theme-halfcard-space);
    height: 8rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    background-size: cover;
    display: grid;
    grid-template-rows: repeat(2,50%);
}


.card-showsee-knifestate-cleantime-title{
    margin: 0;
    border: 0;
    padding: 0;
}

.card-showsee-knifestate-cleantime-title-text{
    margin: 0;
    border: 0;
    padding-left:1.6rem;
    padding-top:1.2rem;
}

.card-showsee-knifestate-cleantime-title-text h3{
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;

    font-family: HarmonyHeiTi-Medium;
    color:var(--xnm-theme-text-level1-color);
    font-size: 1.6rem;
    letter-spacing: 0;
    line-height: 2.1rem;

    /* 最多显示1行 */
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.card-showsee-knifestate-cleantime-title-desc{
    margin: 0;
    border: 0;
    padding-left:1.6rem;
    padding-right:1.6rem;
}

.card-showsee-knifestate-cleantime-title-desc h6{
    color:var(--xnm-theme-text-level2-color);
    font-size: 1.2rem;

    font-family: HarmonyHeiTi;
    letter-spacing: 0;
    line-height: 1.9rem;

    /* 最多显示2行 */
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; 

    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.card-showsee-knifestate-cleantime-tips{
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    position: relative;
}

.card-showsee-knifestate-cleantime-tips h3{
    margin: 0;
    border: 0;
    padding-left: 1.6rem;
    padding-bottom: 1.6rem;
    bottom: 0;
    position: absolute;

    font-family: HarmonyHeiTi-Medium;
    color: var(--xnm-theme-text-highlight-color-green);
    font-size: 2.4rem;
    letter-spacing: -1.2px;

    display: flex;
    flex-direction: row;

    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

</style>
