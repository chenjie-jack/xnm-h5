<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { lang, i18n } from '@/i18n/index';
import ResourcesForTheme from '../config/resource';
import { ComNavigation } from '../components';

const router = useRouter();
const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义

// 响应式属性定义

// 响应式状态函数定义
onMounted(() => {
  console.hLog(`xnm-wiki-view:: mounted`)

});

</script>

<template>
    <div class="xnm-wiki-header">
      <!-- <ComNavigation
        :isShowExitBtn=true
        :isShowInfoBtn=false
        :isShowSearchBtn=false
        :isShowMoreBtn=false
        :title="t('Wiki')"
      /> -->
    </div>

    <div class="xnm-wiki-body">
    </div>

    <div class="xnm-wiki-footer">
    </div>
</template>

<style>
.xnm-wiki-header{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}

.xnm-wiki-body{
  width: 100%;
  margin-top:calc( var(--xnm-theme-statusbar-height) + var(--xnm-theme-navigation-height) );
  background-color: var(--xnm-theme-bg);
}

.xnm-wiki-footer{
  width: 100%;
  background-color: var(--xnm-theme-bg);
}
</style>
