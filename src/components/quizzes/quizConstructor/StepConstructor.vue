<template>
  <div class="step-constructor">
    <vs-row v-responsive.lg.xl>
      <vs-col w="6"
        ><step-panel
          :existsSteps="quiz.steps"
          @addStep="handleAddStep"
        ></step-panel
      ></vs-col>
      <vs-col w="6"
        ><step-options-panel
          @markAsReady="markAsReady"
          :stepName="currentStep"
        ></step-options-panel
      ></vs-col>
      <vs-row>
        <vs-col class="add-step-btn" offset="10" w="6" v-if="addStepIsReady">
          <vs-button @click="addStep" flat size="xl">Add step</vs-button>
        </vs-col>
      </vs-row>
    </vs-row>
    <vs-row v-responsive.sm.xs>
      <step-panel
        :existsSteps="quiz.steps"
        @addStep="handleAddStep"
      ></step-panel>
    </vs-row>
    <vs-row v-responsive.sm.xs>
      <step-options-panel
        @markAsReady="markAsReady"
        :stepName="currentStep"
      ></step-options-panel>
    </vs-row>
      <vs-row v-responsive.sm.xs>
        <vs-col class="add-step-btn" offset="10" w="6" v-if="addStepIsReady">
          <vs-button @click="addStep" flat size="xl">Add step</vs-button>
        </vs-col>
      </vs-row>
  </div>
</template>
<script>
import StepPanel from "./StepPanel.vue";
import StepOptionsPanel from "./StepOptionsPanel.vue";
import { createStep } from "../../../api/items/steps.api";
import { createOption } from "../../../api/items/options.api";
import { getQuiz } from "../../../api/items/quizzes.api";
export default {
  components: {
    StepPanel,
    StepOptionsPanel,
  },
  data: () => {
    return {
      currentStep: "",
      currentStepData: null,
      addStepIsReady: false,
      options: [],
      currentCorrectAnswer: null,
    };
  },
  props: {
    quiz: Object,
  },
  methods: {
    handleAddStep(step) {
      this.currentStep = step;
    },
    markAsReady(payload) {
      this.addStepIsReady = payload.flag;
      this.options = payload.options;
      this.currentCorrectAnswer = payload.correctAnswer;
    },
    addStep() {
      createStep(this.currentStep, this.quiz.pk).then((response) => {
        this.currentStepData = response.data;
        this.currentStep = "";
        this.updateQuiz();
        this.options.forEach((option, index) => {
          createOption(
            option,
            index == this.currentCorrectAnswer,
            this.currentStepData.pk
          )
        });
      });
    },
    updateQuiz() {
      getQuiz(this.quiz.pk).then((response) => {
        this.quiz = response.data;
      });
    },
  },
};
</script>
<style scoped>
.add-step-btn .vs-button {
  margin-top: 25px;
}
</style>
