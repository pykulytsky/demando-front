<template>
<div class="quiz">

</div>
</template>

<script>
import {getQuiz} from "../api/items/quizzes.api";
export default {
  data: () => {
    return {
      quiz: null,
    };
  },
  created() {
    getQuiz(this.$route.params.quizId)
    .then(response => {
      this.quiz = response.data
    })
  },
};
</script>
