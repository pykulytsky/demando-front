<template>
  <div class="code-input-form">
    <div class="code-input">
      <h1>Quiz PIN</h1>
      <code-input
        :fields="4"
        :fieldWidth="56"
        :fieldHeight="56"
        @complete="onComplete"
      />
      <vs-button
        @click="handleCodeEnter"
        flat
        class="code-enter-btn"
        block
        size="xl"
        :active="isComplete"
        >Enter</vs-button
      >
    </div>
  </div>
</template>

<script>
import CodeInput from "vue-verification-code-input";
import { getQuizzes } from "../../api/items/quizzes.api";
export default {
  data: () => {
    return {
      isComplete: false,
      quizzes: null,
      enterCode: null,
      notFound: true,
      played: false
    };
  },
  components: {
    CodeInput,
  },
  methods: {
    handleCodeEnter() {
      if (this.isComplete) {
        this.quizzes.forEach((quiz) => {
          if (quiz.enter_code == this.enterCode) {
            this.notFound = false;
            if (!quiz.done) {
              this.$router.push("/quizzes/quiz/" + quiz.pk);
            } else {
              this.played = true
              this.$vs.notification({
                icon: "<unicon name='share' fill='white' />",
                position: "bottom-right",
                color: "danger",
                duration: 2000,
                title: "No quiz was found",
                text: "Probably, this quiz was already played",
              });
            }
          }
        });
        if(this.notFound && !this.played) {
          this.notFound = true;
          this.$vs.notification({
            icon: "<unicon name='share' fill='white' />",
            position: "bottom-right",
            color: "danger",
            duration: 2000,
            title: "No quiz was found",
            text: "Enter code that you just puted, don't match any quiz. Probably, you made any mistake. Please, try again.",
          });
        }
      }
    },
    onComplete(v) {
      this.isComplete = true;
      this.enterCode = v;
    },
  },
  created() {
    getQuizzes().then((response) => {
      this.quizzes = response.data;
    });
  },
};
</script>

<style>
.code-input-form {
  min-height: 100px;
  height: 750px;
}
.code-input-form .vs-button {
  margin-top: 15px;
}
.code-input-form h1 {
  text-align: center;
}
.code-input-form .error-msg {
  text-align: center;
  color: red;
}
.code-input {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
