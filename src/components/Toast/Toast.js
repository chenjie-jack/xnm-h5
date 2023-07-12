// import Vue from 'vue';
// import BaseToast from './Toast.vue';

// const ToastConstructor = Vue.extend(BaseToast);
// let toastPools = [];

// // 获取或创建一个实例
// let getAnInstance = () => {
//     if (toastPools.length > 0) {
//         let instance = toastPools.splice(0, 1)[0];
//         instance.close();
//         toastPools.push(instance);
//         return instance;
//     }
//     let instance = new ToastConstructor({
//         el: document.createElement('div')
//     });
//     toastPools.push(instance);
//     return instance;
// };

// let removeDom = event => {
//     if (event.target.parentNode) {
//         event.target.parentNode.removeChild(event.target);
//     }
// };

// ToastConstructor.prototype.close = function () {
//     this.visible = false;
//     this.$el.addEventListener('transitionend', removeDom);
//     this.closed = true;
//     // returnAnInstance(this);
// };

// export default (options = {}) => {
//     let duration = options.duration || 2000;

//     let instance = getAnInstance();
//     instance.closed = false;
//     clearTimeout(instance.timer);
//     instance.message = typeof options === 'string' ? options : options.message;
//     instance.className = options.className || '';
//     instance.position = options.position || 'bottom';
//     instance.iconClass = options.iconClass || '';

//     document.body.appendChild(instance.$el);
//     Vue.nextTick(function () {
//         instance.visible = true;
//         instance.$el.removeEventListener('transitionend', removeDom);
//         ~duration
//             && (instance.timer = setTimeout(function () {
//                 if (instance.closed) return;
//                 instance.close();
//             }, duration));
//     });
//     return instance;
// };
