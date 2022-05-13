<template>
  <div class="results-table">
    <h1>Congratulations! You are on {{place}} place!</h1>
    <table-item
      v-for="([key, value], i) in Object.entries(results)"
      :key="i"
      :member="key"
      :result="value"
      :index="i"
    ></table-item>
    <vs-button class="exit-quiz-btn">Exit</vs-button>
  </div>
</template>
<script>
import TableItem from "./TableItem.vue";
import {mapGetters} from "vuex"
export default {
  data: () => {
    return {
      place: -1
    };
  },
  components: {
    TableItem,
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  props: {
    results: Object,
  },
  methods: {
    filterResults() {
      const sortable = Object.entries(this.results)
        .sort(([, a], [, b]) => a - b).reverse()
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      return sortable;
    },
  },
  created() {
    this.results = this.filterResults()
    console.log(this.currentUser.username)
    Object.keys(this.results).forEach((result, index) => {
      if (this.currentUser.username == result) {
        this.place = index+1
      }
    })
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
</style>
