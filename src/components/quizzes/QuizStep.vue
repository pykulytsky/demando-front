<template>
  <div class="quiz-step">
    <h1 class="step-title">{{ step.title }}</h1>
    <div class="options">
      <vs-row>
        <vs-col w="6">
          <div :class="{'option-item': true, 'picked-option': pickedOption == 0}" @click="answer(step.options[0], 0)">
            <h2 v-if="step.options[0].title.length < 15" class="option-text">{{ step.options[0].title }}</h2>
            <h4 v-else>{{ step.options[0].title }}</h4>
          </div>
        </vs-col>
        <vs-col w="6">
          <div :class="{'option-item': true, 'picked-option': pickedOption == 1}" @click="answer(step.options[1], 1)">
            <h2 v-if="step.options[1].title.length < 15" class="option-text">{{ step.options[1].title }}</h2>
            <h4 v-else>{{ step.options[1].title }}</h4>
          </div>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col w="6">
          <div :class="{'option-item': true, 'picked-option': pickedOption == 2}" @click="answer(step.options[2], 2)">
            <h2 v-if="step.options[2].title.length < 15" class="option-text">{{ step.options[2].title }}</h2>
            <h4 v-else>{{ step.options[2].title }}</h4>
          </div>
        </vs-col>
        <vs-col w="6">
          <div :class="{'option-item': true, 'picked-option': pickedOption == 3}" @click="answer(step.options[3], 3)">
            <h2 v-if="step.options[3].title.length < 15" class="option-text">{{ step.options[3].title }}</h2>
            <h4 v-else>{{ step.options[3].title }}</h4>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    step: Object,
  },
  data: () => {
    return {
      picked: false,
      pickedOption: null,
    };
  },
  methods: {
    answer(option, key) {
      this.picked = true
      this.pickedOption = key;
      this.$emit("answer", option);
    },
  },
  created() {
    this.picked = false;
    this.pickedOption = null;
  },
};
</script>

<style>
.step-title {
  margin-top: 50px;
  margin-bottom: 250px;
  max-width: 600px;
  text-align: center;
}

.options .vs-button__content .vs-button--size-xl {
  font-size: 50px;
}
.option-item {
  background-color: rgb(24, 24, 24);
  border-radius: 10px;
  opacity: 0.5;
  padding: 0px 55px;
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  min-width: 30%;
}
.picked-option {
  background-color: rgb(134, 221, 134);
}
.option-item:hover {
  cursor: pointer;
}
.option-text {
  text-align: center;
  color: white;
}
</style>
