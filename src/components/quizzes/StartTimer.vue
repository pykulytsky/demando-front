<template>
  <div :class="klass">
    <lottie-animation
      :animationData="require('@/assets/lottie/92464-321-go.json')"
      :loop="true"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LottieAnimation from "lottie-web-vue";
export default {
  data: () => {
    return {
      klass: "lds-dual-ring",
    };
  },
  components: {
    LottieAnimation,
  },
  computed: {
    ...mapGetters(["currentTheme"]),
  },
  watch: {
    currentTheme() {
      if (this.currentTheme === "dark") {
        this.klass = "lds-dual-ring";
      } else {
        this.klass = "lds-dual-ring-dark";
      }
    },
  },
};
</script>

<style>
.lds-dual-ring {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-size: 1000% 1000%;
  padding: 1000%;
  backdrop-filter: blur(112px);
  background-color: rgba(24, 24, 24, 0.5);
  -webkit-backdrop-filter: blur(5px);
  -moz-backdrop-filter: blur(5px);
  -o-backdrop-filter: blur(5px);
  -ms-backdrop-filter: blur(5px);
}
.lds-dual-ring-dark {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-size: 1000% 1000%;
  padding: 1000%;
  backdrop-filter: blur(112px);
  background-color: rgba(24, 24, 24, 0.5);
  -webkit-backdrop-filter: blur(5px);
  -moz-backdrop-filter: blur(5px);
  -o-backdrop-filter: blur(5px);
  -ms-backdrop-filter: blur(5px);
}
</style>
