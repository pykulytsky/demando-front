<template>
<div :class="klass"></div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => {
    return {
      klass: 'lds-dual-ring'
    }
  },
  computed: {
    ...mapGetters(['currentTheme'])
  },
  watch: {
    currentTheme () {
      if (this.currentTheme === 'dark') {
        this.klass = 'lds-dual-ring'
      }
      else {
        this.klass = 'lds-dual-ring-dark'
      }
    }
  }
}
</script>


<style>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.lds-dual-ring-dark {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  position: fixed;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
.lds-dual-ring-dark:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  position: fixed;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes lds-dual-ring-dark {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
