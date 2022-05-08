<template>
  <vs-row>
    <vs-col w="6"><step-panel @addStep="handleAddStep"></step-panel></vs-col>
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
export default {
  components: {
    StepPanel,
    StepOptionsPanel
  },
  data: () => {
    return {
      currentStep: '',
      addStepIsReady: false
    }
  },
  methods: {
    handleAddStep(step) {
      this.currentStep = step
    },
    markAsReady(payload) {
      this.addStepIsReady = payload.flag
      this.options = payload.options
    },
    addStep() {

    }
  }
}
</script>
<style scoped>
.add-step-btn .vs-button {
  margin-top: 25px;
}
</style>
