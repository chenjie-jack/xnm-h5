<script setup>
import ResourcesForTheme from '../config/resource';
import { useStore } from 'vuex';
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
}); 
console.hLog("com-moregeneral::props=" + props);

const store = useStore()
const { t } = i18n.global;

// 图标&图片定义
let productImgUrl = ResourcesForTheme("product_img", store.state.darkMode);
let logoImgUrl = ResourcesForTheme("logo_img", store.state.darkMode);

</script>

<template>
    <div class="xnm-com-moregeneral">
        <div className="xnm-com-moregeneral-instructions">
            <div className="xnm-com-moregeneral-instructions-title"><h3>使用说明</h3></div>
            <div className="xnm-com-moregeneral-instructions-action" ><h6>使用说明</h6></div>
        </div>
        <div className="xnm-com-moregeneral-dividing-line"/>
        <div className="xnm-com-moregeneral-specification">
            <div className="xnm-com-moregeneral-specification-title"><h3>说明书</h3></div>
            <div className="xnm-com-moregeneral-specification-action" ><h6>说明书</h6></div>
        </div>
        <div className="xnm-com-moregeneral-dividing-line"/>
        <div className="xnm-com-moregeneral-beginnerguide">
            <div className="xnm-com-moregeneral-beginnerguide-title"><h3>新手引导</h3></div>
            <div className="xnm-com-moregeneral-beginnerguide-action" ><h6>新手引导</h6></div>
        </div>
        <div className="xnm-com-moregeneral-dividing-line"/>
        <div className="xnm-com-moregeneral-faq">
            <div className="xnm-com-moregeneral-faq-title"><h3>常见问题</h3></div>
            <div className="xnm-com-moregeneral-faq-action" ><h6>常见问题</h6></div>
        </div>
        <div className="xnm-com-moregeneral-dividing-line"/>
        <div className="xnm-com-moregeneral-privacy">
            <div className="xnm-com-moregeneral-privacy-title"><h3>隐私声明</h3></div>
            <div className="xnm-com-moregeneral-privacy-action" ><h6>隐私声明</h6></div>
        </div>
        <div className="xnm-com-moregeneral-dividing-line"/>
        <div className="xnm-com-moregeneral-firmware">
            <div className="xnm-com-moregeneral-firmware-title"><h3>固件版本</h3></div>
            <div className="xnm-com-moregeneral-firmware-action" ><h6>固件版本</h6></div>
        </div>
    </div>
</template>

<style>
.xnm-com-moregeneral{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    margin-top: 0.5rem;
    height: 18rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    display: flex;
    flex-direction: column;
}

.xnm-com-moregeneral-dividing-line{
    display: flex;
    height: 1px;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
}
.xnm-com-moregeneral-dividing-line::before,
.xnm-com-moregeneral-dividing-line::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--xnm-theme-dividing-line-color);
    transform: scaleY(0.25);
}

.xnm-com-moregeneral-instructions{
    height: 3rem;
}

.xnm-com-moregeneral-instructions-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-moregeneral-instructions-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-moregeneral-specification{
    height: 3rem;
}

.xnm-com-moregeneral-specification-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-moregeneral-specification-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-moregeneral-beginnerguide{
    height: 3rem;
}

.xnm-com-moregeneral-beginnerguide-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-moregeneral-beginnerguide-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-moregeneral-faq{
    height: 3rem;
}

.xnm-com-moregeneral-faq-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-moregeneral-faq-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-moregeneral-privacy{
    height: 3rem;
}

.xnm-com-moregeneral-privacy-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-moregeneral-privacy-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-moregeneral-firmware{
    height: 3rem;
}

.xnm-com-moregeneral-firmware-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-moregeneral-firmware-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-moregeneral h3{
    padding-left: 0.75rem;
    font-weight:500;
    color:var(--xnm-theme-text-level1-color);
    align-self: center;
    font-size: 1rem;
}

.xnm-com-moregeneral h6{
    padding-left: 1rem;
    padding-right: 0.25rem;
    text-align: right;
    font-weight:400;
    color:var(--xnm-theme-text-level2-color);
    align-self: center;
    font-size: 0.875rem;
}

</style>
