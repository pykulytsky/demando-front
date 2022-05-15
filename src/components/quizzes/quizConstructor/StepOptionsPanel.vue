<template>
  <div class="step-options-create">
    <vs-row align="flex-end">
      <vs-col w="11">
       <span>Options</span>
      </vs-col>
    </vs-row>
    <div class="options" v-if="stepName !== ''">
      <vs-radio
        success
        v-for="(option, index) in options"
        :key="index"
        :val="index"
        v-model="correctAnswer"
      >
        <vs-input v-model="options[index]"></vs-input>
      </vs-radio>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    stepName: String,
  },
  data: () => {
    return {
      options: ['', '', '', ''],
      correctAnswer: -1,
      isOptionsFilled: false,
    }
  },
  watch: {
    stepName() {
      this.options = ['', '', '', '']
    },
    options() {
      this.isOptionsFilled = this.options.every(option => option !== '')
    }
  },
  updated() {
    if(this.isOptionsFilled && this.correctAnswer > -1) {
      this.$emit("markAsReady", {flag: true, options: this.options})
    }
    else {
      this.$emit("markAsReady", {
        flag: false,
        options: [],
        correctAnswer: this.correctAnswer
      })
    }
  }
}
</script>
<style>
.step-options-create {
  border: 2px rgba(65, 64, 64, .5) solid;
  padding: 10px 5px;
  border-radius: 10px;
}
.step-options-create .vs-radio-content {
  margin-top: 10px;
}
</style>
