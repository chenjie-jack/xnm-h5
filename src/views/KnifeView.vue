<script setup>
import { onBeforeMount , onMounted , onBeforeUnmount , reactive , computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { lang, i18n } from '@/i18n/index';
import ResourcesForTheme from '../config/resource';
import { ComNavigation, HalfRingProgress, TipsCard } from '../components';

const router = useRouter();
const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值

// 图标&图片定义
let loadingImg = ResourcesForTheme("loading_img", store.state.darkMode);//loading

// 响应式属性定义
const state = reactive({ 
    isOpenDlg: false,//是否显示重置确认dialog
    isOpenResetting: false,//是否显示正在重置中loading dialog
    buttonWidth: 0,//容器宽度
    buttonHeight: 0//容器高度
});

const ringWidth = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed ringWidth=${5.6*rem2px}`);
        return 36*rem2px;
    }
);

const ringHeight = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed ringWidth=${5.6*rem2px}`);
        return 23.6*rem2px;
    }
);

const stroWidth = computed(
    () => {
        console.hLog(`card-showsee-knifestate::computed ringWidth=${5.6*rem2px}`);
        return 2.4*rem2px;
    }
);

// 响应式状态函数定义
onBeforeMount(() => {
  console.hLog(`xnm-knife-view::onBeforeMount`);
  store.dispatch('setTitleVisible', false);//暂停使用系统导航栏
});

onMounted(() => {
  console.hLog(`xnm-knife-view:: mounted`);

});

onBeforeUnmount(() => {
  console.hLog(`xnm-knife-view::onBeforeUnmount`);
  store.dispatch('setTitleVisible', true);//恢复使用系统导航栏
});

//计算按钮的宽高
function calcButtonWidth() {
    var windwoWidth = 33.6*rem2px;//整行宽度
    var marginLeft = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-dialog-content-margin').slice(0, -3));
    var marginRight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-dialog-content-margin').slice(0, -3));
    var separatorWidth = 0.8*rem2px;

    state.buttonWidth = (windwoWidth - marginLeft*rem2px - marginRight*rem2px - separatorWidth) / 2;
    state.buttonHeight = 4 * rem2px;
}

function resetTime(event) {
    console.hLog(`xnm-knife-view::resetTime`);
    //计算按钮的宽高
    calcButtonWidth();

    if( state.isOpenDlg ){
        state.isOpenDlg = false;
    }
    else{
        state.isOpenDlg = true;
    }
}

function doCancel(event) {
    console.hLog(`xnm-knife-view::doCancel`);
}

function doResetTime(event) {
    console.hLog(`xnm-knife-view::doResetTime`);
    if( state.isOpenDlg ){
        state.isOpenDlg = false;
        if( !state.isOpenResetting ){
          state.isOpenResetting = true;
        }
    }
}

function resetTimeLoading(event) {
    console.hLog(`xnm-knife-view::resetTimeLoading`);
    if( state.isOpenResetting ){
        state.isOpenResetting = false;
    }
    else{
        state.isOpenResetting = true;
    }
}
</script>

<template>
    <div v-show="state.isOpenDlg || state.isOpenResetting" className="xnm-com-progressshow-mask">
      <div v-show="state.isOpenDlg" className="xnm-com-progressshow-resetdlg">
        <div className="xnm-com-progressshow-resetdlg-title"><h3>{{t("ResetKnife")}}</h3></div>
        <div className="xnm-com-progressshow-resetdlg-content"><h6>{{t("ResetKnifeTips")}}</h6></div>
        <div className="xnm-com-progressshow-resetdlg-btn">
          <div className="xnm-com-progressshow-resetdlg-btn-cancel"  @click="doCancel" :style="{ width:(state.buttonWidth + 'px'),  height:(state.buttonHeight + 'px')}">
            <h2>{{t("Cancel")}}</h2>
          </div>
          <div className="xnm-com-progressshow-resetdlg-btn-separator"><div className="xnm-com-progressshow-resetdlg-btn-separator-line"></div></div>
          <div className="xnm-com-progressshow-resetdlg-btn-ok"  @click="doResetTime" :style="{ width:(state.buttonWidth + 'px'),  height:(state.buttonHeight + 'px')}">
            <h2>{{t("Ok")}}</h2>
          </div>
        </div>
      </div>
      <div v-show="state.isOpenResetting" className="xnm-com-progressshow-resettingdlg">
        <div className="xnm-com-progressshow-resettingdlg-content"><h6>{{t("Resetting")}}</h6></div>
        <div className="xnm-com-progressshow-resettingdlg-icon"><img v-bind:src="loadingImg" alt=""/></div>
      </div>
    </div>
    <div class="xnm-knife-header">
      <ComNavigation
        :isShowExitBtn=true
        :isShowInfoBtn=false
        :isShowSearchBtn=false
        :isShowMoreBtn=false
        :title="t('KnifeState')"
      />
    </div>

    <div class="xnm-knife-body">
      <div class="xnm-com-progressshow">
        <!-- progress 0 点在 0.86弧度位置，实际绘制进度在次基础上增加，2.86弧度时是360一圈 -->
        <HalfRingProgress
          :width="ringWidth"
          :height="ringHeight"
          :strokeWidth="stroWidth"
          :progress=2
          />
        <TipsCard/>

        <div className="xnm-com-progressshow-operate">
          <div className="xnm-com-progressshow-operate-reset" @click="resetTime"><h3>{{ t("ResetKnife") }}</h3></div>
          <div className="xnm-com-progressshow-operate-mall"><h3>{{ t("GoBuy") }}</h3></div>
          <!-- <div className="delete-device-flex"><Button className="delete-device-btn" block shape='rounded' color='primary' onClick={this.onClickDeleteDevice}>{StringForText("delete_device")}</Button></div> -->
        </div>
      </div>
    </div>
    <div class="xnm-knife-footer">
    </div>
</template>

<style>
.xnm-knife-header{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-knife-body{
  width: 100%;
  margin-top:calc( var(--xnm-theme-statusbar-height) + var(--xnm-theme-navigation-height) );
  background-color: var(--xnm-theme-bg);
}

.xnm-com-progressshow{
  width:100%;
  margin-top:calc( var(--xnm-theme-statusbar-height) + var(--xnm-theme-navigation-height) );
  margin-bottom: 1rem;
  text-align: center;
}

.xnm-knife-footer{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-com-progressshow-operate{
  width: 100%;
  height: 4rem;
  position: fixed;
  display: flex;
  flex-direction: row;
  bottom: 0;
  margin-bottom: 2.4rem;
}

.xnm-com-progressshow-operate-reset{
  margin-left: 3.2rem;
  margin-right: 1.6rem;
  border: 0;
  padding: 0;
  width: 200px;
  height: 100%;
  background-color: var(--xnm-theme-system-highlight-color);
  border-radius: 3.2rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.xnm-com-progressshow-operate-mall{
  margin-left: 1.6rem;
  margin-right: 3.2rem;
  border: 0;
  padding: 0;
  width: 200px;
  height: 100%;
  background-color: var(--xnm-theme-button-normal-color);
  border-radius: 3.2rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.xnm-com-progressshow-operate h3{
  margin: 0;
  border: 0;
  bottom: 0;
  font-weight:500;
  color:rgba(255,255,255,1);
  font-size: 1.6rem;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

/* 重置确认dialog */
.xnm-com-progressshow-mask{
  margin:0;
  border: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color:var(--xnm-theme-dialog-mask-color);
  z-index: 990;
}

.xnm-com-progressshow-resetdlg{
  margin-left: var(--xnm-theme-card-margin);
  margin-right: var(--xnm-theme-card-margin);
  border: 0;
  padding: 0;
  height: 15.4rem;
  width: 33.6rem;
  position: fixed;
  bottom: 0;
  margin-bottom: 1.6rem;
  z-index: 991;

  border-radius: var(--xnm-theme-card-radius);
  background-color:var(--xnm-theme-card-bg);
}

.xnm-com-progressshow-resetdlg-title{
  margin-left: var(--xnm-theme-dialog-content-margin);
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  height: 5.6rem;
  display: flex;
  align-items: center;
}

.xnm-com-progressshow-resetdlg-title h3{
  font-family: HarmonyHeiTi-Medium;
  font-size: 2rem;
  color:var(--xnm-theme-text-title-color);
  text-align: left;
  line-height: 2.8rem;

  margin-block-start: var(--xnm-theme-halfcard-space);
  margin-block-end: var(--xnm-theme-halfcard-space);
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.xnm-com-progressshow-resetdlg-content{
  margin-left: var(--xnm-theme-dialog-content-margin);
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  height: 4.2rem;
  display: flex;
  align-items: center;
}

.xnm-com-progressshow-resetdlg-content h6{
  font-family: HarmonyHeiTi;
  font-size: 1.6rem;
  color: var(--xnm-theme-text-content-color);
  text-align: justify;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;

  /* 最多显示2行 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 
}

.xnm-com-progressshow-resetdlg-btn{
  margin-left: var(--xnm-theme-dialog-content-margin);
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  height: 5.6rem;
  display: flex;
}

.xnm-com-progressshow-resetdlg-btn h2{
  font-family: HarmonyHeiTi-Medium;
  font-size: 1.6rem;
  color: var(--xnm-theme-text-highlight-color-blue);
  line-height: 2.2rem;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.xnm-com-progressshow-resetdlg-btn-cancel{
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xnm-com-progressshow-resetdlg-btn-separator{
  margin: 0;
  border: 0;
  padding: 0;
  height: 4rem;
  width: 0.8rem;
}

.xnm-com-progressshow-resetdlg-btn-separator-line{
  height: 2.4rem;
  width: 0.8px;
  margin-top:0.8rem;
  margin-bottom:0.8rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  background-color: var(--xnm-theme-dividing-line-color);
}

.xnm-com-progressshow-resetdlg-btn-ok{
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 重置中动画 */
.xnm-com-progressshow-resettingdlg{
  margin-left: var(--xnm-theme-card-margin);
  margin-right: var(--xnm-theme-card-margin);
  border: 0;
  padding: 0;
  height: 9.6rem;
  width: 33.6rem;
  position: fixed;
  bottom: 0;
  margin-bottom: 0.8rem;
  z-index: 992;

  border-radius: var(--xnm-theme-card-radius);
  background-color:var(--xnm-theme-card-bg);

  display: grid;
  grid-template-columns: auto 6.4rem;
}

.xnm-com-progressshow-resettingdlg-content{
  margin-left: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.xnm-com-progressshow-resettingdlg-content h6{
  font-family: HarmonyHeiTi;
  font-size: 1.6rem;
  color: var(--xnm-theme-text-content-color);

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.xnm-com-progressshow-resettingdlg-icon{
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.xnm-com-progressshow-resettingdlg-icon img{
  height: 4rem;
  width: 4rem;
}

</style>
