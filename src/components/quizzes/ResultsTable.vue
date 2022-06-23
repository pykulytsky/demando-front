<template>
  <div class="results-table">
    <h1>Congratulations! You are on {{ place }} place!</h1>

    <div class="place-anim">
        <lottie-animation
          v-if="place == 1"
          :animationData="require('@/assets/lottie/108451-trophy.json')"
          :loop="true"
        />
        <lottie-animation
          v-if="place == 2"
          :animationData="require('@/assets/lottie/69654-sport-winner-medal-2nd.json')"
          :loop="true"
        />
        <lottie-animation
          v-if="place == 3"
          :animationData="require('@/assets/lottie/69653-sport-winner-medal-3rd.json')"
          :loop="true"
        />
    </div>

    <table-item
      v-for="([key, value], i) in Object.entries(results)"
      :key="i"
      :member="key"
      :result="value"
      :index="i"
    ></table-item>

    <vs-button
      @click="$router.push('/quizzes')"
      size="xl"
      flat
      class="exit-quiz-btn"
      >Exit</vs-button
    >
  </div>
</template>
<script>
import TableItem from "./TableItem.vue";
import { mapGetters } from "vuex";
import LottieAnimation from "lottie-web-vue";
export default {
  data: () => {
    return {
      place: -1,
    };
  },
  components: {
    TableItem,
    LottieAnimation
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  props: {
    results: Object,
    nickname: String,
  },
  methods: {
    filterResults() {
      const sortable = Object.entries(this.results)
        .sort(([, a], [, b]) => a - b)
        .reverse()
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      return sortable;
    },
  },
  created() {
    this.results = this.filterResults();
    Object.keys(this.results).forEach((result, index) => {
      if (this.nickname !== "") {
        if (result == this.nickname) {
          this.place = index + 1;
        }
      } else {
        if (this.currentUser.username == result) {
          this.place = index + 1;
        }
      }
    });
  },
};
</script>
<style>
.results-table h1 {
  text-align: center;
}
.exit-quiz-btn {
  position: absolute;
  bottom: 0;
  right: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.results-table .vs-button {
  position: absolute;
  right: 0;
  bottom: 0;
}
.place-anim {
  height: 300px;
  display: flex;
  justify-content: center;
}
</style>
