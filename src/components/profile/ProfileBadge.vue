<template>
  <div
    :class="{
      'profile-badge': currentTheme == 'light' && $mq !=='mobile',
      'profile-badge-dark': currentTheme == 'dark' && $mq !== 'mobile',
      'profile-badge-small': $mq == 'mobile' && currentTheme == 'light',
      'profile-badge-small-dark': $mq == 'mobile' && currentTheme == 'dark',
      }"
  >
    <unicon :name="icon" :height="$mq !== 'mobile'? '50': '25'" :width="$mq !== 'mobile'? '50': '25'" />
        <number
style="color:aqua;"
          tag="h2"
          :from="0"
          :to="count"
          :duration="1"
          @complete="$emit('complete', title)"
        />
    <p v-if="showCaption" id="badge-caption">{{title}}</p>

  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    icon: String,
    title: String,
    count: Number
  },
  data: () => {
    return {
      showCaption: true,


    }
  },
  computed: {
    ...mapGetters(["currentTheme"]),
  },
};
</script>
<style>
.profile-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5%;
  border-radius: 25px;
  width: 10vw;
  height: 10vh;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  cursor: pointer;
}
.profile-badge-small {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5%;
  border-radius: 25px;
  width: 20vw;
  height: 10vh;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  cursor: pointer;
}
.profile-badge-dark {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5%;

  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

  width: 10vw;
  height: 10vh;
  background-color: #18191c;
  cursor: pointer;
}
.profile-badge-small-dark {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5%;

  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

  width: 20vw;
  height: 10vh;
  background-color: #18191c;
  cursor: pointer;
}
.hvr-grow {
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    transition-duration: 0.3s;
    transition-property: transform;
}

.hvr-grow:hover,
.hvr-grow:focus,
.hvr-grow:active {
    transform: scale(1.1);
}
.hvr-pulse {
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-pulse:hover, .hvr-pulse:focus, .hvr-pulse:active {
  -webkit-animation-name: hvr-pulse;
  animation-name: hvr-pulse;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.badge-caption {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 2;
}
</style>
