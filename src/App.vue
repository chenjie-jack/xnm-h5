<script setup>
import { onBeforeMount , onMounted , reactive , computed , watch, nextTick} from 'vue';
import { RouterView } from 'vue-router';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex';
import { i18n } from '@/i18n/index';
import { PRO_PLATFORM } from '@/config/project';

console.hLog("build time:" + import.meta.env.VITE_BUILD_TIME);

const store = useStore()
const { t } = i18n.global;

// 图标&图片定义
let loadingImg = ResourcesForTheme("loading_img", store.state.darkMode);//loading

// 响应式属性定义
const proxy = reactive({ loading: true })
// const devId = computed(() => store.state.devId);
// const changeScreen = computed(() => store.state.changeScreen);
// const isPad = computed(() => store.state.isPad);

const stateDarkMode = computed(() => store.state.darkMode);
const watchDarkMode = watch(stateDarkMode, (newVal) => {
  console.hLog(`xnm-App::watch darkMode is ${store.state.darkMode}`);
  // 加载样式css文件
  if (PRO_PLATFORM === 'huawei') {
    // 判断暗黑模式
    if (store.state.darkMode) {
      store.dispatch('modifyTitleBar', true);
      import("@/assets/theme/huawei/dark.css");
      console.hLog(`xnm-App::import dark.css`);
    } else {
      store.dispatch('modifyTitleBar', false, '0');
      import("@/assets/theme/huawei/light.css");
      console.hLog(`xnm-App::import light.css`);
    }
  } else {
    import("@/assets/theme/honor/light.css");
  }
});

const gettersCanConnect = computed(() => store.getters.canConnect);
const watchCanConnect =  watch(gettersCanConnect, (newVal) => {
  console.hLog(`xnm-App::watch canConnect is ${store.getters.canConnect}`);
  if(store.getters.canConnect){
    // 订阅设备消息
    store.dispatch('subscribeBleEvent');
    // 连接蓝牙
    store.dispatch('connectBle');
  }
});

// 响应式状态函数定义
function initSize() {
  console.hLog(`xnm-App::initSize`);

  let browserWidth = document.documentElement.clientWidth;
  console.hLog(`xnm-App::browserWidth = ${browserWidth}`);
  store.commit('UPDATE_STATE',{ name: 'browserWidth', value: browserWidth });
  store.dispatch('getSystemInfoSync');
}

onBeforeMount(() => {
  console.hLog(`xnm-App::onBeforeMount.`);
  store.dispatch('getAppVersionCode');//获取app版本号
  store.dispatch('getStatusBarHeight');// 获取状态栏高度
  store.dispatch('setTitleVisible', true);//使用系统导航栏
  window.addEventListener('resize', e => {//窗口状态变化响应
    initSize();
  })

  // 初始化数据
  store.dispatch('initCallback');

  // 获取暗黑模式标志，同时先加载默认样式文件
  store.dispatch('getDarkMode');
  if (PRO_PLATFORM === 'huawei') {
    // 判断暗黑模式
    if (store.state.darkMode) {
      store.dispatch('modifyTitleBar', true);
      import("@/assets/theme/huawei/dark.css");
      console.hLog(`xnm-App::import dark.css`);
    } else {
      store.dispatch('modifyTitleBar', false, '0');
      import("@/assets/theme/huawei/light.css");
      console.hLog(`xnm-App::import light.css`);
    }
  } else {
    import("@/assets/theme/honor/light.css");
  }

  // 设置是否覆盖原生返回按钮方法
  store.dispatch('overrideBackPressed', false);

  // 监听手机蓝牙状态变化，在手机上开启或关闭蓝牙时会触发
  // =>更新belOn状态，如果蓝牙关闭，请求打开蓝牙
  store.dispatch('onBluetoothAdapterStateChange');

  // 获取当前手机蓝牙状态，判断当前蓝牙是否处于打开状态
  // =>更新belOn状态，如果蓝牙关闭，请求打开蓝牙
  store.dispatch('getBluetoothAdapterState');

  // 获取DeviceID和SN号
  // 获取当前蓝牙设备的缓存信息 -> 更新devId和mac
  store.dispatch('getCurrentRegisteredDevice').then((res) => {
    console.hLog(`xnm-App::getCurrentRegisteredDevice ${JSON.stringify(res)}`);
    // if (res) {
    //   proxy.loading = false
    // } else {
    //   // this.$router.push('/security')
    //   setTimeout(() => {
    //     proxy.loading = false
    //   }, 310)
    // }
  })

  // 同步系统信息
  store.dispatch('getSystemInfoSync');
});

//组件完成初始渲染并创建 DOM 节点后被调用
onMounted(() => {
  console.hLog(`xnm-App:: mounted.`);
  nextTick(() => {
      initSize()
    })
});

</script>

<template>
    <!-- <div v-if="proxy.loading" class="loading">
      <img v-bind:src="loadingImg">
    </div> -->
    <div class="xnm-layout">
      <RouterView />
    </div>
</template>

<style>
.xnm-layout{
    width: 100%;
}

.loading {
  width: 100%;
  height: 100%;
  background-color: var(--xnm-theme-nav-bg);
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 5.6rem;
    height: 5.6rem;
  }
}

</style>
