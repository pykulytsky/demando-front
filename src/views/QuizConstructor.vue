<template>
  <div class="constructor">
    <h3>Next you have to add some questions to your quiz...</h3>
    <step-constructor v-if="!startDialog" :quizID="quiz.pk"></step-constructor>
    <vs-dialog
      not-close
      prevent-close
      blur
      width="300px"
      not-center
      v-model="startDialog"
    >
      <template #header>
        <h4 class="not-margin">Fill some info about your <b>Quiz</b></h4>
      </template>

      <div class="con-content">
        <p>Enter name of your quiz</p>
        <vs-input v-model="quizName" placeholder="Name">
          <template v-if="nameValid" #message-danger> At least 6 symbols </template>
        </vs-input>
        <p>Seconds per answer:</p>
        <vs-input type="number" v-model="seconds"> </vs-input>
        <p>Choose PIN: (Optional)</p>
        <code-input
          :fields="4"
          :fieldWidth="36"
          :fieldHeight="36"
          @complete="onPINInput"
        />
        <br />
        <vs-checkbox v-model="isPrivate">Private</vs-checkbox>
        <vs-checkbox v-model="deleteAfterFinish"
          >Delete after finish</vs-checkbox
        >
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="handleCreateQuiz" transparent> Save </vs-button>
          <vs-button @click="$router.push('/quizzes')" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import StepConstructor from "../components/quizzes/quizConstructor/StepConstructor.vue";
import { createQuiz } from "../api/items/quizzes.api";
import CodeInput from "vue-verification-code-input";
export default {
  components: {
    StepConstructor,
    CodeInput,
  },
  data: () => {
    return {
      startDialog: true,
      quizName: "",
      enterCode: "",
      seconds: 30,
      isPrivate: false,
      deleteAfterFinish: false,
      quiz: null
    };
  },
  computed: {
    nameValid() {
      if (this.quizName.length > 6 || this.quizName == 0) {
        return false;
      } else return true;
    },
  },
  methods: {
    handleCreateQuiz() {
      if(!this.nameValid && this.quizName != "") {
        createQuiz(this.quizName, this.enterCode).then((response) => {
          this.quiz = response.data;
          this.startDialog = false;
          console.log(this.quiz);
        });
      }
      else {
        this.$vs.notification({
          icon: "<unicon name='share' fill='white' />",
          position: "bottom-center",
          color: "danger",
          duration: 3000,
          title: "Some fields are invalid",
          text: "Please check the form, maybe you missed some fields?",
        });
      }
    },
    onPINInput(v) {
      this.enterCode = v;
    },
  },
};
</script>
<style>
.constructor {
  width: 75%;
  margin-top: 25px;
}
</style>
