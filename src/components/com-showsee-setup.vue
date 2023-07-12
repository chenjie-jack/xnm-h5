<script setup>
import { onMounted, reactive, ref } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex';
import { i18n } from '@/i18n/index';

//传参
const props = defineProps({
}); 
console.hLog("com-showsee-setup::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值
const devicenameEle = ref(null);
const devicenameTitleEle = ref(null);
const devicenameActionEle = ref(null);
const devicenameImgEle = ref(null);

// 图标&图片定义
const iconImg = ResourcesForTheme("arrow_icon", store.state.darkMode);//箭头图标


// 响应式属性定义
const state = reactive({ 
    devNameWidth: 0//设备名称文本容器宽度
});

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`card-showsee-setup::onMounted.`);

    //计算title文本容器宽度
    calcDevNameEleWidth();

    // 获取设备所属空间
});

//计算title文本容器宽度
function calcDevNameEleWidth() {
    var devicenameEleWidth = devicenameEle.value.offsetWidth;//整行宽度
    var devicenameTitleEleWidth = devicenameTitleEle.value.offsetWidth;//title标题宽度
    var devicenameImgEleWidth = devicenameImgEle.value.offsetWidth;//title标题宽度
    var tempTitleWidth = devicenameEleWidth;//临时存放title文本区域宽度变量
    console.hLog(`card-showsee-setup::devicenameEleWidth=` + devicenameEleWidth);

    tempTitleWidth = tempTitleWidth - devicenameTitleEleWidth;//减去标题宽度
    console.hLog(`card-showsee-setup::减去标题宽度 tempTitleWidth=` + tempTitleWidth);

    tempTitleWidth = tempTitleWidth - parseInt(document.defaultView.getComputedStyle(devicenameActionEle.value).marginRight.slice(0, -2));//减去边框宽度
    console.hLog(`card-showsee-setup::减去标题宽度 tempTitleWidth=` + tempTitleWidth);

    tempTitleWidth = tempTitleWidth - devicenameImgEleWidth;//减去右侧图标宽度
    console.hLog(`card-showsee-setup::减去右侧图标宽度 tempTitleWidth=` + tempTitleWidth);

    state.devNameWidth = tempTitleWidth;
}

</script>

<template>
    <div class="xnm-com-showsee-setup">
        <div ref="devicenameEle" className="xnm-com-showsee-setup-devicename">
            <div ref="devicenameTitleEle" className="xnm-com-showsee-setup-devicename-title"><h3>{{t("DeviceName")}}</h3></div>
            <div ref="devicenameActionEle" className="xnm-com-showsee-setup-devicename-action">
                <div className="xnm-com-showsee-setup-devicename-action-devname" :style="{ width: state.devNameWidth + 'px' }"><h6>{{store.state.devName}}</h6></div>
                <img ref="devicenameImgEle" v-bind:src="iconImg" alt=""/>
            </div>
        </div>
        <div className="xnm-com-showsee-setup-dividing-line"/>
        <div className="xnm-com-showsee-setup-room">
            <div className="xnm-com-showsee-setup-room-title"><h3>{{t("RoomName")}}</h3></div>
            <div className="xnm-com-showsee-setup-room-action">
                <div className="xnm-com-showsee-setup-room-action-roomname" :style="{ width: state.devNameWidth + 'px' }"><h6>{{store.state.devId}}</h6></div>
                <img v-bind:src="iconImg" alt=""/>
            </div>
        </div>
        <div className="xnm-com-showsee-setup-dividing-line"/>
        <div className="xnm-com-showsee-setup-deviceinfo">
            <div className="xnm-com-showsee-setup-deviceinfo-title"><h3>{{t("DeviceInfo")}}</h3></div>
            <div className="xnm-com-showsee-setup-deviceinfo-action">
                <div className="xnm-com-showsee-setup-deviceinfo-action-content" :style="{ width: state.devNameWidth + 'px' }"><h6></h6></div>
                <img v-bind:src="iconImg" alt=""/>
            </div>
        </div>
        <div className="xnm-com-showsee-setup-dividing-line"/>
        <div className="xnm-com-showsee-setup-deletedevice">
            <div className="xnm-com-showsee-setup-deletedevice-title"><h3>{{t("DeleteDevice")}}</h3></div>
            <div className="xnm-com-showsee-setup-deletedevice-action">
                <div className="xnm-com-showsee-setup-deletedevice-action-content" :style="{ width: state.devNameWidth + 'px' }"><h6></h6></div>
                <img v-bind:src="iconImg" alt=""/>
            </div>
        </div>
        <div className="xnm-com-showsee-setup-dividing-line"/>
        <div className="xnm-com-showsee-setup-shortcut">
            <div className="xnm-com-showsee-setup-shortcut-title"><h3>{{t("Shortcut")}}</h3></div>
            <div className="xnm-com-showsee-setup-shortcut-action">
                <div className="xnm-com-showsee-setup-shortcut-action-content" :style="{ width: state.devNameWidth + 'px' }"><h6></h6></div>
                <img v-bind:src="iconImg" alt=""/>
            </div>
        </div>
    </div>
</template>

<style>
.xnm-com-showsee-setup{
    margin-left: var(--xnm-theme-card-margin);
    margin-right: var(--xnm-theme-card-margin);
    margin-top: 0.5rem;
    height: 15rem;
    border-radius: var(--xnm-theme-card-radius);
    background-color:var(--xnm-theme-card-bg);
    display: flex;
    flex-direction: column;
}

.xnm-com-showsee-setup-dividing-line{
    display: flex;
    height: 1px;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
}
.xnm-com-showsee-setup-dividing-line::before,
.xnm-com-showsee-setup-dividing-line::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--xnm-theme-dividing-line-color);
    transform: scaleY(0.25);
}

.xnm-com-showsee-setup-devicename{
    height: 3rem;
}

.xnm-com-showsee-setup-devicename-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-showsee-setup-devicename-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-showsee-setup-devicename-action-devname{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.xnm-com-showsee-setup-room{
    height: 3rem;
}

.xnm-com-showsee-setup-room-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-showsee-setup-room-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-showsee-setup-room-action-roomname{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.xnm-com-showsee-setup-deviceinfo{
    height: 3rem;
}

.xnm-com-showsee-setup-deviceinfo-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-showsee-setup-deviceinfo-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-showsee-setup-deviceinfo-action-content{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.xnm-com-showsee-setup-deletedevice{
    height: 3rem;
}

.xnm-com-showsee-setup-deletedevice-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-showsee-setup-deletedevice-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-showsee-setup-deletedevice-action-content{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.xnm-com-showsee-setup-shortcut{
    height: 3rem;
}

.xnm-com-showsee-setup-shortcut-title{
    height: 100%;
    float: left;
    display: flex;
}

.xnm-com-showsee-setup-shortcut-action{
    margin-right: 0.75rem;
    height: 100%;
    float: right;
    display: flex;
}

.xnm-com-showsee-setup-shortcut-action-content{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.xnm-com-showsee-setup h3{
    padding-left: 0.75rem;
    font-weight:500;
    color:var(--xnm-theme-text-level1-color);
    align-self: center;
    font-size: 1rem;
}

.xnm-com-showsee-setup h6{
    padding-left: 1rem;
    padding-right: 0.25rem;
    text-align: right;
    font-weight:400;
    color:var(--xnm-theme-text-level2-color);
    align-self: center;
    font-size: 0.875rem;

    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    /*让长段文本不换行*/
    white-space: nowrap;
    /*设置文本超出元素宽度部分隐藏*/
    overflow-x: hidden;
    /*设置文本超出部分用省略号显示*/
    text-overflow: ellipsis;
}

.xnm-com-showsee-setup img{
    margin: 0;
    border: 0;
    padding: 0;
    width:0.75rem;
    height:1.5rem;

    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}

</style>
