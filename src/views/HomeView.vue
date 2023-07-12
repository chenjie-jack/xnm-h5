<script setup>
import { onMounted, onBeforeMount, computed , reactive , watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { lang, i18n } from '@/i18n/index';
import ResourcesForTheme from '../config/resource';
import { ComNavigation, ComDeviceShow, ComNoticeBar, CardShowseeRealtime, CardShowseeKnifestate, CardShowseeMode, CardOTA, CardTitle, CardEntryPicture } from '../components';
// import { ComNavigation, ComDeviceShow, CardRealtime, CardControl, CardVolume } from '../components';

const router = useRouter();
const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值

// 图标&图片定义
let wikiImg = ResourcesForTheme("wiki", store.state.darkMode);//产品百科入口banner
let aftersaleImg = ResourcesForTheme("aftersale", store.state.darkMode);//售后服务入口banner

// 响应式属性定义
const headerHeight = computed(() => store.getters.headerHeight);
// const otaDlgShow = computed(() => store.state.hasNewVersion);

const connectStatus = computed(
    () => {
        console.hLog(`xnm-home-view::computed connectStatus=${store.state.connectStatus}`);
        return store.state.connectStatus
    }
);

const watchConnectStatus =  watch(connectStatus, (newVal) => {
  console.hLog(`xnm-home-view::watch connectStatus is ${connectStatus.value}`);
  if(connectStatus.value===2){//连接成功
    // 获取版本信息会掉线？？？？
    // store.dispatch('checkDeviceHota').then((res = {}) => {
    //   console.hLog(`xnm-home-view::ota res=${JSON.stringify(res)}`);
    // });
  }
});

const state = reactive({ 
  otaDlgShow:store.state.hasNewVersion,//ota弹框按钮宽度
  otaButtonWidth: 0,//ota弹框按钮宽度
  otaButtonHeight: 0//ota弹框按钮高度
});

// 响应式状态函数定义
onBeforeMount(() => {
  console.hLog(`xnm-home-view:: onBeforeMount`);

});

onMounted(() => {
  console.hLog(`xnm-home-view:: mounted`);

  //计算ota弹窗按钮的宽高
  calcButtonWidth();

  // test();
});

function test(){
  store.dispatch('sendCommand', 
    {
      data: {
        sid: 'batteryInfo',
        data: {
          batteryLevel: Number
        }
      }
    }
    ).then(() => {
      console.hLog(`xnm-home-view:: sendCommand then`);
    }).finally(() => {
      console.hLog(`xnm-home-view:: sendCommand finally`);
    });
}

//计算ota弹窗按钮的宽高
function calcButtonWidth() {
    var windwoWidth = 33.6*rem2px;//整行宽度
    var marginLeft = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-dialog-content-margin').slice(0, -3));
    var marginRight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--xnm-theme-dialog-content-margin').slice(0, -3));
    var separatorWidth = 0.8*rem2px;

    state.otaButtonWidth = (windwoWidth - marginLeft*rem2px - marginRight*rem2px - separatorWidth) / 2;
    state.otaButtonHeight = 4 * rem2px;
}

function onClickWiki(event) {
    console.hLog(`xnm-home-view::onClickWiki`);
    router.push({path:'/wiki'});
}

function onClickAftersale(event) {
    console.hLog(`xnm-home-view::onClickAftersale`);
}

function onClickCancel(event) {
  console.hLog(`xnm-home-view::onClickCancel`);
  state.otaDlgShow = false;
}

function onClickOta(event) {
  console.hLog(`xnm-home-view::onClickOta`);
}

</script>

<template>
    <div v-show="state.otaDlgShow" className="xnm-home-mask">
      <div className="xnm-home-otadlg">
        <div className="xnm-home-otadlg-title"><h3>{{t("NewVersion")}}</h3></div>
        <div className="xnm-home-otadlg-content"><h6>{{t("ResetKnifeTips")}}</h6></div>
        <div className="xnm-home-otadlg-btn">
          <div className="xnm-home-otadlg-btn-cancel"  @click="onClickCancel" :style="{ width:(state.otaButtonWidth + 'px'),  height:(state.otaButtonHeight + 'px')}">
            <h2>{{t("UpdateLater")}}</h2>
          </div>
          <div className="xnm-home-otadlg-btn-separator"><div className="xnm-home-otadlg-btn-separator-line"></div></div>
          <div className="xnm-home-otadlg-btn-ok"  @click="onClickOta" :style="{ width:(state.otaButtonWidth + 'px'),  height:(state.otaButtonHeight + 'px')}">
            <h2>{{t("UpdateNow")}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="xnm-home-header">
      <!-- <ComNavigation
        :isShowExitBtn=true
        :isShowInfoBtn=false
        :isShowSearchBtn=false
        :isShowMoreBtn=true
        :title="$store.state.devName"
      /> -->
    </div>

    <div class="xnm-home-body">
      <div class="xnm-home-body-placeholder" :style="{ height:( headerHeight + 'px')}"></div>
      <ComNoticeBar
        :level=1
        :content="t('LowPowerNotice')"
        :isShow=false />
      <ComDeviceShow/>
      <CardShowseeRealtime/>
      <CardShowseeKnifestate/>
      <CardShowseeMode/>
      <CardOTA/>
      <CardTitle
        :title="t('Wiki')"/>
      <CardEntryPicture
        :img="wikiImg"
        :isLastOne="false"
        :title="t('Wiki')"
        :desc="t('WikiDesc')"
        @click="onClickWiki"/>
      <CardTitle
        :title="t('Aftersale')"/>
      <CardEntryPicture
        :img="aftersaleImg"
        :isLastOne="true"
        :title="t('Aftersale')"
        :desc="t('Servicevender')"
        @click="onClickAftersale"/>
    </div>
    <div class="xnm-home-footer">
    </div>
</template>

<style>
.xnm-home-header{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-home-body{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-home-body-placeholder{
  height: calc( var(--xnm-theme-statusbar-height) + var(--xnm-theme-navigation-height) );
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-home-footer{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-home-mask{
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

.xnm-home-otadlg{
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

.xnm-home-otadlg-title{
  margin-left: var(--xnm-theme-dialog-content-margin);
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  height: 5.6rem;
  display: flex;
  align-items: center;
}

.xnm-home-otadlg-title h3{
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

.xnm-home-otadlg-content{
  margin-left: var(--xnm-theme-dialog-content-margin);
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  height: 4.2rem;
  display: flex;
  align-items: center;
}

.xnm-home-otadlg-content h6{
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

.xnm-home-otadlg-btn{
  margin-left: var(--xnm-theme-dialog-content-margin);
  margin-right: var(--xnm-theme-dialog-content-margin);
  border: 0;
  padding: 0;
  height: 5.6rem;
  display: flex;
}

.xnm-home-otadlg-btn h2{
  font-family: HarmonyHeiTi-Medium;
  font-size: 1.6rem;
  color: var(--xnm-theme-text-highlight-color-blue);
  line-height: 2.2rem;

  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
}

.xnm-home-otadlg-btn-cancel{
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xnm-home-otadlg-btn-separator{
  margin: 0;
  border: 0;
  padding: 0;
  height: 4rem;
  width: 0.8rem;
}

.xnm-home-otadlg-btn-separator-line{
  height: 2.4rem;
  width: 0.8px;
  margin-top:0.8rem;
  margin-bottom:0.8rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  background-color: var(--xnm-theme-dividing-line-color);
}

.xnm-home-otadlg-btn-ok{
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>