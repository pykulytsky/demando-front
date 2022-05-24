<template>
  <div class="constructor">
    <div class="constructor-head" v-if="!startDialog">
      <div class="quiz-info">
        <h1 class="quiz-name">{{ quiz.name }}</h1>
        <div class="quiz-detail-info">
          <div class="quiz-detail-info-sec">

            <span><unicon name="dialpad-alt" /> <h2 class="quiz-caption">{{ quiz.enter_code }}</h2></span>

            <span><unicon name="clock-five" /> <h2 class="quiz-caption">{{ quiz.seconds_per_answer }}s</h2></span>
          </div>
          <div class="quiz-detail-info-sec">
            <vs-switch v-model="quiz.is_private" disabled>
              <template #off> Public </template>
              <template #on> Private </template>
            </vs-switch>
            <vs-switch v-model="quiz.delete_after_finish" disabled>
              <template #off> Delete after finish </template>
              <template #on> Delete after finish </template>
            </vs-switch>
          </div>
        </div>
      </div>
      <div class="quiz-details">
        <vue-select-image
          :h="'100'"
          :w="'100'"
          :dataImages="quizCovers"
          @onselectimage="onSelectCover"
          :useLabel="true"
          :selectedImages="defaultCover"
        >
        </vue-select-image>
      </div>
    </div>
    <h2 class="steps-caption">Next you have to add some questions to your quiz...</h2>
    <div class="steps-constructor">
      <div :class="'step-con-item'" v-for="(step, i) in steps" :key="i">
        <vs-input
          placeholder="Start putting question..."
          @input="handleInput(i)"
          v-model="steps[i].name"
        >
          <template
            v-if="steps[i].name == '' && i !== steps.length - 1"
            #message-danger
          >
            Required
          </template>
        </vs-input>

        <unicon
          @click="steps[i].isShown = !steps[i].isShown"
          v-if="i !== steps.length - 1 && steps[i].isShown"
          name="angle-up"
        />
        <unicon
          @click="steps[i].isShown = !steps[i].isShown"
          v-if="i !== steps.length - 1 && !steps[i].isShown"
          name="angle-down"
        />
        <unicon
          v-if="i !== steps.length - 1"
          name="times"
          @click="removeStep(step)"
        />
        <div
          class="options-con"
          v-if="
            steps[i].name !== '' && i !== steps.length - 1 && steps[i].isShown
          "
        >
          <vs-radio
            :val="j"
            v-model="steps[i].rightAnswer"
            v-for="(option, j) in steps[i].options"
            :key="j"
          >
            <vs-input
              placeholder="Option..."
              v-model="steps[i].options[j]"
            ></vs-input>
          </vs-radio>
        </div>
      </div>
    </div>

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
          <template v-if="nameValid" #message-danger>
            At least 6 symbols
          </template>
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

    <vs-dialog blur v-model="successDialog">
      <template #header>
        <h4 class="not-margin">Quiz was successfully created</h4>
      </template>

      <div class="con-content">
        <p>
          Now you can start this quiz, you will be redirected t oquiz page where
          you can find QR-code or PIN code and other users can join the game.
          Have fun!
        </p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button
            @click="$router.push('/quizzes/quiz/' + quiz.pk)"
            transparent
          >
            Start quiz
          </vs-button>
          <vs-button @click="successDialog = false" transparent
            >Close</vs-button
          >
        </div>
      </template>
    </vs-dialog>

    <vs-button
      size="xl"
      class="add-steps-btn"
      @click="createSteps"
      v-if="steps.length > 1"
      >Create</vs-button
    >
  </div>
</template>
<script>
import { createQuiz, getQuizzes } from "../api/items/quizzes.api";
import CodeInput from "vue-verification-code-input";
import { mapGetters, mapActions } from "vuex";
import { createStep } from "../api/items/steps.api";
import { createOption } from "../api/items/options.api";
export default {
  components: {
    CodeInput,
  },
  data: () => {
    return {
      startDialog: true,
      successDialog: false,
      quizName: "",
      enterCode: "",
      seconds: 30,
      isPrivate: false,
      deleteAfterFinish: false,
      quiz: null,
      steps: [
        {
          name: "",
          options: [],
          rightAnswer: null,
          isShown: true,
        },
      ],
      currentStep: {
        name: "",
        options: [],
        rightAnswer: null,
        isShown: true,
      },
      quizCovers: [
        {
          id: "1",
          src: require("../assets/default-background.png"),
        },
        {
          id: "2",
          src: require("../assets/quiz-background1.jpg"),
        },
        {
          id: "3",
          src: require("../assets/quiz-background2.jpg"),
        },
        {
          id: "4",
          src: require("../assets/quiz-background3.jpg"),
        },
        {
          id: "5",
          src: require("../assets/quiz-background4.jpg"),
        },
        {
          id: "6",
          src: require("../assets/quiz-background5.jpg"),
        },
      ],
      defaultCover: [
        {
          id: "1",
          src: require("../assets/default-background.png"),
          alt: "Default",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    nameValid() {
      if (this.quizName.length > 6 || this.quizName == 0) {
        return false;
      } else return true;
    },
  },
  methods: {
    ...mapActions(["setLoading"]),
    handleCreateQuiz() {
      if (!this.nameValid && this.quizName != "") {
        let enterCodeIsUsed = false;
        this.quizzes.forEach((quiz) => {
          if (quiz.enter_code == this.enterCode) {
            enterCodeIsUsed = true;
          }
        });
        if (!enterCodeIsUsed) {
          createQuiz(
            this.quizName,
            this.enterCode,
            this.isPrivate,
            this.deleteAfterFinish
          ).then((response) => {
            this.quiz = response.data;
            this.startDialog = false;
          });
        } else {
          this.$vs.notification({
            icon: "<unicon name='share' fill='white' />",
            position: "bottom-center",
            color: "danger",
            duration: 3000,
            title: "PIN code is already in use",
            text: "PIN code is already in use, please, try another one.",
          });
        }
      } else {
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
    handleInput(currentIndex) {
      if (currentIndex == this.steps.length - 1) {
        this.steps[currentIndex].options.push("");
        this.steps[currentIndex].options.push("");
        this.steps[currentIndex].options.push("");
        this.steps[currentIndex].options.push("");
        // if(this.steps[currentIndex].options.every(option => {
        //   return option !== ""
        // }) && this.steps[currentIndex].rightAnswer) {
        this.steps.push({
          name: "",
          options: [],
          rightAnswer: null,
          isShown: true,
        });
        // }
      }
    },
    createSteps() {
      let valid = true;
      let steps = this.steps.slice(0, -1);
      console.log(steps);
      steps.forEach((step) => {
        if (step.name == "") {
          valid = false;
        }
        if (step.rightAnswer == null) {
          valid = false;
        }
        step.options.forEach((option) => {
          if (option == "") {
            valid = false;
          }
        });
      });
      if (valid) {
        this.setLoading(true);
        steps.forEach((step) => {
          createStep(step.name, this.quiz.pk).then((response) => {
            step.options.forEach((option) => {
              let isRight = step.options.indexOf(option) == step.rightAnswer;
              createOption(option, isRight, response.data.pk);
            });
            this.successDialog = true;
          });
        });
        this.setLoading(false);
      } else {
        this.$vs.notification({
          color: "danger",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          duration: 2000,
          title: "Some fields are incorrect",
          text: "Check all the fields, some of them are incorrect, are you shure you filled them?",
        });
      }
    },
    onPINInput(v) {
      this.enterCode = v;
    },
    addStep() {
      this.options.push(this.currentOption);
      this.currentOption = "";
    },
    removeStep(step) {
      this.steps.splice(this.steps.indexOf(step), 1);
    },
  },

  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }
    getQuizzes().then((response) => {
      this.quizzes = response.data;
    });
  },
};
</script>
<style>
.constructor {
  width: 100%;
  margin-top: 25px;
}
.quiz-name {
  text-align: center;
  font-size: 60px;
  color: white;
}
.steps-constructor {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.step-con-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.step-con-item .unicon {
  display: flex;
  margin-top: 10px;
}
.steps-constructor .vs-input {
  width: 350px;
}
.constructor .add-steps-btn {
  position: fixed;
  right: 0;
  bottom: 0;
}
.constructor-head {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 25px;
  background-color: rgb(83, 97, 97);
}
.quiz-details {
  padding: 25px 50px;
  max-width: 35%;
}
.quiz-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.constructor hr {
  color: black;
}
.quiz-detail-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.quiz-detail-info-sec {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 15px;
}
.quiz-caption {
  display: inline;
  color: white;
}
.steps-caption {
  text-align: center;
  padding: 25px;
}
</style>
