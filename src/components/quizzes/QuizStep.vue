<template>
  <div class="quiz-step">
    <h1 class="step-title">{{ step.title }}</h1>
    <div class="options">
      <vs-row>
        <vs-col w="6">
          <div class="option-item" @click="answer(step.options[0])">
            <h2 class="option-text">{{ step.options[0].title }}</h2>
          </div>
        </vs-col>
        <vs-col w="6">
          <div class="option-item" @click="answer(step.options[1])">
            <h2 class="option-text">{{ step.options[1].title }}</h2>
          </div>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col w="6">
          <div class="option-item" @click="answer(step.options[2])">
            <h2 class="option-text">{{ step.options[2].title }}</h2>
          </div>
        </vs-col>
        <vs-col w="6">
          <div class="option-item" @click="answer(step.options[3])">
            <h2 class="option-text">{{ step.options[3].title }}</h2>
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
  methods: {
    answer(option) {
      this.$emit("answer", option);
    },
  },
};
</script>

<style>
.step-title {
  margin-top: 50px;
  margin-bottom: 250px;
  max-width: 650px;
  text-align: center;
}

.options .vs-button__content .vs-button--size-xl {
  font-size: 50px;
}
.option-item {
  background-color: aqua;
  border-radius: 10px;
  padding: 0px 55px;
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  min-width: 40%;
}
.option-item:hover {
  cursor: pointer;
}
.option-text {
  text-align: center;
  color: white;
}
</style>
