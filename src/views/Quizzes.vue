<template>
  <vs-row>
    <vs-col w="6" v-responsive.lg.xl >
      <create-quiz-alert/>
    </vs-col>
    <vs-col w="6" v-responsive.lg.xl>
      <code-input-form />
    </vs-col>
      <code-input-form v-responsive.sm.xs />
  </vs-row>
</template>

<script>
import CodeInputForm from "../components/quizzes/CodeInputForm.vue";
import CreateQuizAlert from "../components/quizzes/CreateQuizAlert.vue";
export default {
  components: {
    CodeInputForm,
    CreateQuizAlert
  },
};
</script>

<style>
.blob-light {
  background: url("../assets/blob-light.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.blob-dark {
  background: url("../assets/blob-dark.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
