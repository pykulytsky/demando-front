<template>
  <div class="critical-error">
    <lottie-animation
      ref="anim"
      :animationData="
        require('@/assets/lottie/92811-server-error.json')
      "
      :loop="true"
      width="500px"
    />
  </div>
</template>
<script>
import LottieAnimation from "lottie-web-vue";
export default {
  components: {
    LottieAnimation,
  },
};
</script>
<style>
.critical-error {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
