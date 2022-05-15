<template>
  <vs-row>
    <vs-col w="6"><step-panel :existsSteps="quiz.steps !== null? quiz.steps: null" @addStep="handleAddStep"></step-panel></vs-col>
    <vs-col w="6"><step-options-panel @markAsReady="markAsReady" :stepName="currentStep"></step-options-panel></vs-col>
    <vs-row>
      <vs-col class="add-step-btn" offset="10" w="6" v-if="addStepIsReady">
        <vs-button @click="addStep" flat size="xl">Add step</vs-button>
      </vs-col>
    </vs-row>
  </vs-row>
</template>
<script>
import StepPanel from "./StepPanel.vue"
import StepOptionsPanel from "./StepOptionsPanel.vue"
import {createStep} from "../../../api/items/steps.api"
import {createOption} from "../../../api/items/options.api"
import {getQuiz} from "../../../api/items/quizzes.api"
export default {
  components: {
    StepPanel,
    StepOptionsPanel
  },
  data: () => {
    return {
      currentStep: '',
      currentStepData: null,
      addStepIsReady: false,
      options: [],
      currentCorrectAnswer: null
    }
  },
  props: {
    quiz: Object
  },
  methods: {
    handleAddStep(step) {
      this.currentStep = step
    },
    markAsReady(payload) {
      this.addStepIsReady = payload.flag
      this.options = payload.options
      this.currentCorrectAnswer = payload.correctAnswer
    },
    addStep() {
      console.log(this.currentStep)
      console.log(this.options)
      createStep(this.currentStep, this.quiz.pk)
      .then(response => {
        this.currentStepData = response.data
        this.options.forEach((option, index) => {
          createOption(option, index==this.currentCorrectAnswer, this.currentStepData.pk)
          .then(response => {
            console.log("Created option - ", response.data)
          })
        })
      })
    },
    updateQuiz() {
      getQuiz(this.quizID)
      .then(response => {
        this.quiz = response.data
      })
    }
  }
}
</script>
<style scoped>
.add-step-btn .vs-button {
  margin-top: 25px;
}
</style>
