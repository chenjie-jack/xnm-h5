<script setup>
import { onMounted, reactive, ref } from 'vue';
import ResourcesForTheme from '@/config/resource';
import { useStore } from 'vuex'
import { i18n } from '@/i18n/index';

//传参
//progress参数欸当前进度值，取值范围 0.00-2.00 (计算规则 100% = 2.0*Math.PI, 0% = 0.0*Math.PI)
//本控件 progress 0度在0.86弧度位置，实际绘制进度在次基础上增加，2.86弧度时是360一圈
const props = defineProps({
    width: Number,
    height: Number,
    strokeWidth: Number,
    progress:Number
});

console.hLog("xnm-com-progress-halfring::props=" + props);

const store = useStore()
const { t } = i18n.global;

//DOM 元素定义
const rem2px = parseInt(window.getComputedStyle(document.documentElement)["fontSize"].slice(0, -2));//当前系统默认字体整数值
const drawEle = ref(null);
const canvasEle = ref(null);
const canvasContext = ref(null);

const ringLightBg = 'rgba(0,0,0,0.05)';
const ringDarkBg = 'rgba(255,255,255,0.1)';
// const ringLightBlue = 'rgba(10,89,247,1)';
// const ringDarkBlue = 'rgba(82,145,255,1)';
// const ringLightOrange = 'rgba(232,64,38,1)';
// const ringDarkOrange = 'rgba(217,72,56,1)';

// background-image: linear-gradient(26deg, #86C1FF 0%, #254FF7 99%);

// 图标&图片定义

// 响应式属性定义
const state = reactive({

    // 绘制区域的宽高
    drawEleWidth:0,
    drawEleHeigt:0,
    // Canvas的宽高
    canvasEleWidth:25.2 * rem2px,
    canvasEleHeigt:18.8 * rem2px,

    progress: 1.24,
});

// 响应式状态函数定义
onMounted(() => {
    console.hLog(`xnm-com-progress-halfring::onMounted.`);

    //计算各元素宽高
    calcElePosition();

    var ctx = canvasContext.value.getContext("2d");
    //绘制背景
    ctx.beginPath();
    ctx.arc( state.canvasEleWidth/2, state.canvasEleWidth/2, (state.canvasEleWidth-props.strokeWidth)/2, 0.86*Math.PI, 2.14*Math.PI);
    ctx.strokeStyle = store.state.darkMode ? ringDarkBg : ringLightBg;
    ctx.lineWidth = props.strokeWidth;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
    
    //绘制进度
    ctx.beginPath();
    ctx.arc( state.canvasEleWidth/2, state.canvasEleWidth/2, (state.canvasEleWidth-props.strokeWidth)/2, 0.86*Math.PI, props.progress*Math.PI);
    // 线样式设置，必须放在绘制之前
    var grd=ctx.createLinearGradient(0,0,state.canvasEleWidth,0);
    // 超过10%的渐变色
    // grd.addColorStop("0","#86C1FF");
    // grd.addColorStop(1,"#254FF7");
    // 小于10%的渐变色
    grd.addColorStop("0","#F57643");
    grd.addColorStop(1,"#E84026");

    ctx.strokeStyle = grd;
    ctx.lineWidth = props.strokeWidth;
    ctx.lineCap = "round";
    //开始绘制圆环
    ctx.stroke();
    ctx.closePath();
});

//计算各元素宽高
function calcElePosition() {
    // drawEle
    state.drawEleWidth = props.width - 2.4*rem2px - 2.4*rem2px;
    state.drawEleHeigt = props.height - 1.6*rem2px;
}

</script>

<template>
    <div class="xnm-com-progress-halfring" :style="{width: props.width + 'px', height: props.height + 'px'}">
        <div ref="drawEle" class="xnm-com-progress-halfring-draw" :style="{width: state.drawEleWidth + 'px', height: state.drawEleHeigt + 'px'}">
            <div ref="canvasEle" class="xnm-com-progress-halfring-draw-canvas" :style="{width: state.canvasEleWidth + 'px', height: state.canvasEleHeigt + 'px', marginLeft:(state.drawEleWidth-state.canvasEleWidth)/2 + 'px', marginRight:(state.drawEleWidth-state.canvasEleWidth)/2 + 'px'}">
                <canvas ref="canvasContext" :width="state.canvasEleWidth" :height="state.canvasEleHeigt">
                </canvas>
            </div>
            <div class="xnm-com-progress-halfring-draw-text" :style="{width: state.canvasEleWidth + 'px', height: state.canvasEleHeigt + 'px', marginLeft:(state.drawEleWidth-state.canvasEleWidth)/2 + 'px', marginRight:(state.drawEleWidth-state.canvasEleWidth)/2 + 'px'}">
                <div class="xnm-com-progress-halfring-draw-text-area-percent">
                    <div class="xnm-com-progress-halfring-draw-text-area-percent-area">
                        <h3>1000分钟</h3>
                    </div>
                    <div class="xnm-com-progress-halfring-draw-text-area-label"><h3>刀头剩余</h3></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.xnm-com-progress-halfring{
    margin: 0;
    padding: 0;
    border: 0;
}

.xnm-com-progress-halfring-draw{
    margin-left: 2.4rem;
    margin-right: 2.4rem;
    margin-top: 1.6rem;
    padding: 0;
    border: 0;
    position: relative;
}

.xnm-com-progress-halfring-draw-canvas{
    padding: 0;
    border: 0;
    margin: 0;
    bottom: 0;
    position: absolute;
}

.xnm-com-progress-halfring-draw-text {
    padding: 0;
    border: 0;
    margin: 0;
    bottom: 0;
    position: absolute;
    display: flex;
    align-items:center;
    justify-content:flex-end;
    flex-direction: column;
}

.xnm-com-progress-halfring-draw-text-area-percent{
    padding: 0;
    border: 0;
    margin: 0;
    position: relative;
}

.xnm-com-progress-halfring-draw-text-area-percent-area{
    padding: 0;
    border: 0;
    margin: 0;
}

.xnm-com-progress-halfring-draw-text-area-percent-area h3{
    margin: 0;
    border: 0;
    bottom: 0;
    font-weight:500;
    color:var(--xnm-theme-text-level1-color);
    font-size: 1.6rem;
    display: flex;
    flex-direction: row;

    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

.xnm-com-progress-halfring-draw-text-area-percent-symbol{
    margin: 0;
    border: 0;
    padding: 0;
    position: relative;
}

.xnm-com-progress-halfring-draw-text-area-label h3{
    margin: 0;
    border: 0;
    bottom: 0;
    font-weight:500;
    color:var(--xnm-theme-text-level2-color);
    font-size: 1.6rem;

    margin-block-start: 0px;
    margin-block-end: 20px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

</style>
