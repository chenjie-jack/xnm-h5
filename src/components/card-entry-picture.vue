<script setup>
import { onMounted } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
// img - 背景图片url地址
// isLastOne - 是否是最后一个卡片标志，最后一个卡片有下边距，中间卡片没有
const props = defineProps({
    img: String,
    isLastOne: Boolean,
    title: String,
    desc: String,
});
console.hLog("card-entry-picture::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义

// 图标&图片定义

// 响应式属性定义

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-entry-picture::onMounted.`);
});

</script>

<template>
    <div class="xnm-card-entry-picture" :style="{ marginBottom:props.isLastOne ? '1.5rem' : '0', backgroundImage: 'url(' + props.img + ')'}">
        <div class="xnm-card-entry-picture-area">
            <div class="xnm-card-entry-picture-area-title">{{props.title}}</div>
            <div class="xnm-card-entry-picture-area-desc">{{props.desc}}</div>
        </div>
    </div>
</template>

<style>
.xnm-card-entry-picture{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    height: 11.2rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);

    background-repeat:no-repeat;/*设置背景不重复*/
	background-size:cover;/*此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。*/

    display: flex;
    align-items: center;
}

.xnm-card-entry-picture-area{
    padding-left:2.4rem;
    width: 100%;
}

.xnm-card-entry-picture-area-title{
    bottom: 0;
    margin: 0;
    padding-bottom: 2px;
    border: 0;
    width: 15.2rem;
    
    font-weight:500;
    color:rgba(255,255,255,1);
    font-size: 2rem;
    text-shadow: 1px 1px 2px rgba(2, 55, 91, 0.5);
}

.xnm-card-entry-picture-area-desc{
    top: 0;
    margin: 0;
    padding: 0;
    border: 0;
    width: 15.2rem;

    font-weight:500;
    color:rgba(255,255,255,1);
    font-size: 1rem;
    text-shadow: 1px 1px 2px rgba(2, 55, 91, 0.5);

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

</style>
