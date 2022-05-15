<template>
  <div class="steps-create">
    <vs-row align="flex-end">
      <vs-col w="11">
       <span>Steps</span>
      </vs-col>
      <vs-col w="1">
        <unicon @click="addStep" class="add-step-btn" name="plus" width="15" height="15" fill="grey" />
      </vs-col>
    </vs-row>
    <vs-row align="flex-end">
      <vs-col w="11" v-for="(step, index) in existsSteps" :key="step.pk">
      <h4 class="exists-step">{{index+1}}. {{step.title}}</h4></vs-col>
    </vs-row>
    <vs-row v-for="(step, index) in steps" :key="index" class="step-item" align="center">
      <vs-col w="10">
        <vs-input placeholder="Question..." v-model="steps[index]" />
      </vs-col>
      <vs-col w="1">
        <vs-tooltip>
          <unicon
            @click="handleAddStep(index)"
            name="plus"
            width="15"
            height="15"
            fill="grey"
          />
          <template #tooltip>
            Add options
          </template>

        </vs-tooltip>
      </vs-col>
      <vs-col w="1"><unicon @click="removeStep(index)" name="times" width="15" height="15" fill="grey"/></vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      stepsCount: 0,
      currentStepTitle: '',
      steps: []
    }
  },
  props: {
    existsSteps: Object
  },
  methods: {
    addStep() {
      this.steps.push('')
    },
    removeStep(index) {
      this.steps.splice(index, 1)
    },
    handleAddStep(index) {
      if (this.steps[index] !== '') {
        this.$emit('addStep', this.steps[index])
      }
      else {
      this.$vs.notification({
        icon: "<unicon name='share' fill='white' />",
        position: "bottom-right",
        duration: 1000,
        title: "Please fill the question name",
      });
      }
    }
  },
}
</script>
<style>
.steps-create {
  border: 2px rgba(65, 64, 64, .5) solid;
  padding: 10px 5px;
  border-radius: 10px;
  margin-right: 20px;
}
.unicon:hover {
  cursor: pointer;
}

.step-item {
  padding: 5px;
}
.steps-create .vs-input {
  min-width: 390px;
}
.exists-step {
  margin-left: 10px;
}
</style>
