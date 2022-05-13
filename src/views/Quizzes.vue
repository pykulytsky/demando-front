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
</style>
