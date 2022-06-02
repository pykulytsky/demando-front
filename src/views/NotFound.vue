<template>
    <div class="error-block">
              <lottie-animation
        ref="anim"
        :animationData="require('@/assets/lottie/84178-404-error.json')"
        :loop="true"
        width="500px"
      />
        <i>Requested page was not found!  </i>
        <router-link to="/qa">Go to main</router-link>
    </div>
</template>
<script>
import LottieAnimation from "lottie-web-vue";
export default {
  components: {
    LottieAnimation,
  },
}
</script>
<style>
.error-block {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.error-message {
    font-size: 150px;
    margin-bottom: 10px;
}
</style>
