<template>
  <vs-row>
    <vs-col w="6">
      <create-quiz-alert />
    </vs-col>
    <vs-col w="6">
      <code-input-form />
    </vs-col>
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
