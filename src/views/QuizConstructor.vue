<template>
  <div class="constructor">
    <constructor-header />
    <h1>constructor</h1>
    <step-constructor></step-constructor>
  </div>
</template>
<script>
import ConstructorHeader from "../components/quizzes/quizConstructor/ConstructorHeader.vue";
import StepConstructor from "../components/quizzes/quizConstructor/StepConstructor.vue";
export default {
  components: {
    ConstructorHeader,
    StepConstructor
  },
};
</script>
<style>
.constructor {
  width: 75%;
}
</style>
