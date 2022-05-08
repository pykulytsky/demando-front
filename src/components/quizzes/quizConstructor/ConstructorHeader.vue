<template>
  <div class="constructor-header">
    <vs-input placeholder="Quiz name..."></vs-input>
    <div class="quiz-options">
      <vs-checkbox>Test</vs-checkbox>
      <vs-checkbox>Test</vs-checkbox>
      <vs-checkbox>Test</vs-checkbox>
    </div>
  </div>
</template>

<style>
.constructor-header {
  margin-top: 25px;
  padding: 25px 0;
  border-radius: 8px;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.constructor-header .vs-input {
  font-size: 45px;
  width: 100%;
  min-width: 100%;
}
.constructor-header .vs-input__label {
  font-size: 45px;
}
.quiz-options {
  margin-top: 10px;
  display: flex;
  align-items: space-between;
}
.quiz-options .vs-checkbox-content {
  margin-left: 25px;
}
.quiz-options:first-child {
  margin-left: 0;
}

</style>
