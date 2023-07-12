<template>
  <transition name="pop">
    <div class="toast"
         v-show="visible"
         :class="customClass">
      <span class="toast-text">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    customClass() {
      var classes = []
      switch (this.position) {
        case 'top':
          classes.push('placetop')
          break
        case 'bottom':
          classes.push('placebottom')
          break
        default:
          classes.push('placemiddle')
      }
      classes.push(this.className)
      return classes.join(' ')
    }
  }
}
</script>

<style lang="less">
.toast {
  position: fixed;
  min-width: 10rem;
  max-width: 31.2rem;
  padding: 0.8rem 1.6rem;
  box-sizing: border-box;
  border-radius: 1.8rem;
  background-color: rgba(77, 77, 77, 0.95);
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  z-index: 1000;
  transition: all 0.3s linear;

  .toast-text {
    font-size: 1.4rem;
    display: block;
    text-align: center;
  }

  &.placebottom {
    bottom: 6.4rem;
    transform: translateX(calc(50vw - 50%));
    left: 0;
  }

  .pop-enter,
  .pop-leave-active {
    opacity: 0;
  }
}
</style>