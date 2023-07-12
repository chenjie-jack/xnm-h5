<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
//progress参数欸当前进度值，取值范围 0.00-2.00 (计算规则 100% = 2.0*Math.PI, 0% = 0.0*Math.PI)
//progress 0 点在 1.5弧度位置，实际绘制进度在次基础上增加，3.5弧度时是360一圈
const props = defineProps({
    width: Number,
    height: Number,
    strokeWidth: Number,
    progress:Number
});

console.hLog("xnm-com-progress-ring::props=" + JSON.stringify(props));

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值
const ringEle = ref(null);
const ringCanvas = ref(null);

const ringLightBg = 'rgba(0,0,0,0.05)';
const ringDarkBg = 'rgba(255,255,255,0.1)';
const ringLightBlue = 'rgba(10,89,247,1)';
const ringDarkBlue = 'rgba(82,145,255,1)';
const ringLightOrange = 'rgba(232,64,38,1)';
const ringDarkOrange = 'rgba(217,72,56,1)';

// 图标&图片定义

// 响应式属性定义
const state = reactive({ 
    progress: 1.24,
});

const progressPencent = computed(() => props.progress / 2);

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`xnm-com-progress-ring::onMounted.`);
    var ctx=ringCanvas.value.getContext("2d");
    ctx.beginPath();
    //绘制背景
    ctx.arc( props.width/2, props.width/2, (props.width-props.strokeWidth)/2, 0, 2*Math.PI);
    ctx.strokeStyle = store.state.darkMode ? ringDarkBg : ringLightBg;
    ctx.lineWidth = props.strokeWidth;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();

    // 判断是否绘制蓝色进度，超过20%为蓝色，小于等于20%为橙色
    let isBlue = progressPencent.value > 0.2 ? true : false;

    //绘制进度
    ctx.beginPath();
    ctx.arc( props.width/2, props.width/2, (props.width-props.strokeWidth)/2, 1.5*Math.PI, props.progress*Math.PI);
    // 线样式设置，必须放在绘制之前
    if( isBlue ){
        ctx.strokeStyle = store.state.darkMode ? ringDarkBlue : ringLightBlue;
    } else{
        ctx.strokeStyle = store.state.darkMode ? ringDarkOrange : ringLightOrange;
    }
    ctx.lineWidth = props.strokeWidth;
    ctx.lineCap = "round";
    //开始绘制圆环
    ctx.stroke();
    ctx.closePath();
});

</script>

<template>
    <div ref="ringEle" class="xnm-com-progress-ring" :style="{width: props.width + 'px', height: props.height + 'px'}">
        <canvas ref="ringCanvas" :width="props.width" :height="props.height" :style="{width: props.width + 'px', height: props.height + 'px'}">
        </canvas>
        <div class="xnm-com-progress-ring-text" :style="{width: props.width + 'px', height: props.height + 'px'}">
            <span :style="{color: progressPencent > 0.2 ? 'var(--xnm-theme-text-highlight-color-blue)':'var(--xnm-theme-text-highlight-color-orange)'}">优</span>
        </div>
    </div>
</template>

<style>
.xnm-com-progress-ring{
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
    height: 100%;
    position: relative;
}

.xnm-com-progress-ring-text {
    width: 100%;
    height: 100%;
}

.xnm-com-progress-ring-text span{
    font-family: HarmonyHeiTi-Medium;
    font-size: 2rem;
    color: var(--xnm-theme-text-highlight-color-blue);

    display: flex;
    justify-content: center;
    align-items: center;
}

/*所有的后代都水平垂直居中，这样就是同心圆了*/
.xnm-com-progress-ring * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}

</style>
