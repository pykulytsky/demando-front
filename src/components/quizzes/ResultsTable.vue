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

    <vs-button size="xl" flat class="exit-quiz-btn">Exit</vs-button>
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

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
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
</style>
