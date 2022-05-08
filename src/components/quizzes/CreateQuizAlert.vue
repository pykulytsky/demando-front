<template>
    <div class="create-quiz-alert">
      <div class="background-container"></div>
        <div class="create-quiz-info">
          <h1>Want to create your own quiz?</h1>
          <vs-button @click="$router.push({name: 'Constructor'})" block warn size="xl">Create quiz</vs-button>
        </div>
    </div>
</template>

<style>
.create-quiz-alert {
  min-height: 100px;
  height: 750px;
  border-radius: 5px;
  background-repeat: no-repeat;
  text-align: center;
}

.background-container {
  background-image: url("../../assets/quiz.jpg");
  height: 100%;
}

.create-quiz-alert h1 {
  margin-top: 0;
  margin-left: 0;
}
.create-quiz-info {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
