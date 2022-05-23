<template>
  <div class="polls-main">
    <div :class="currentTheme == 'light' ? 'polls-header': 'polls-header-dark'">
      <h1 class="polls-header-title">Polls are very useful tool in lectures, meatings and other activities. Make your meetings more interactive, choose topics to discuss, speakers and so on.</h1>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Polls",
  metaInfo: {
    title: "Polls",
  },
  computed: {
    ...mapGetters(["currentTheme"])
  }
};
</script>
<style>
.polls {
}
.polls-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 650px;
  padding: 0 10vw;
  padding-bottom: 100px;
  position: relative;
  background: url("../assets/polls-background-light.svg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
.polls-header-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 650px;
  padding: 0 10vw;
  position: relative;
  background: url("../assets/polls-background-dark.svg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 100px;
  text-align: center;
}
.curve {
  position: absolute;
  height: 225px;
  width: 100%;
  bottom: 0;
}
.curve::before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100% 50%;
  width: 55%;
  height: 100%;
  background-color:chocolate;
  transform: translate(85%, 60%);
}
.curve::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100% 50%;
  width: 55%;
  height: 100%;
  background-color:chartreuse;
  transform: translate(-4%, 40%);
  z-index: -1;
}
.polls-header-title {
  font-size: 50px;
}
</style>
