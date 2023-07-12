<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { lang, i18n } from '@/i18n/index';
import ResourcesForTheme from '../config/resource';
import { ComNavigation , CardShowseeSetup } from '../components';

const router = useRouter();
const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义
let wikiImg = ResourcesForTheme("aftersale", store.state.darkMode);//产品百科入口banner
let aftersaleImg = ResourcesForTheme("aftersale", store.state.darkMode);//售后服务入口banner

// 响应式属性定义

// 响应式状态函数定义
onMounted(() => {
  console.hLog(`xnm-more-view:: mounted`)

});

</script>

<template>
    <div class="xnm-more-header">
      <!-- <ComNavigation
        :isShowExitBtn=true
        :isShowInfoBtn=false
        :isShowSearchBtn=false
        :isShowMoreBtn=false
        :title="t('Setup')"
      /> -->
    </div>

    <div class="xnm-more-body">
      <CardShowseeSetup/>
    </div>

    <div class="xnm-more-footer">
    </div>
</template>

<style>
.xnm-more-header{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-more-body{
  width: 100%;
  margin-top:calc( var(--xnm-theme-statusbar-height) + var(--xnm-theme-navigation-height) );
  background-color: var(--xnm-theme-bg);
}

.xnm-more-footer{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}
</style>
