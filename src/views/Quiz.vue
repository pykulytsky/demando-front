<template>
  <div class="quiz">
    <div class="quiz-start-page" v-if="currentStep == 0">
      <h1>{{ quiz.name }}</h1>
      <h3>Use this PIN code to join the game:</h3>
      <vs-tooltip>
        <h1 class="code">
          <span>{{ quiz.enter_code }}</span>
        </h1>
        <template #tooltip> Click here copy the code </template>
      </vs-tooltip>
      <h4>or join the game using QR-code bellow</h4>
      <qrcode-vue class="qr-code" :value="link" :size="200" level="H" />
      <h3>Waiting for other users to join...</h3>
      <div class="members">
        <vs-tooltip v-for="member in members" :key="member">
          <vs-avatar :color="getRandomColor()" circle>
            <template #text>
              {{ member[0].toUpperCase() }}
            </template>
          </vs-avatar>
          <template #tooltip>
            {{ member }}
          </template>
        </vs-tooltip>
      </div>
      <vs-button
        flat
        size="xl"
        class="start-btn"
        v-if="isOwner"
        @click="startQuiz"
      >
        Start Game
      </vs-button>
      <h3 v-else>Please, wait when game owner starts the game...</h3>
      <img
        v-if="!isOwner"
        src="../assets/spinner3.gif"
        width="100"
        height="100"
      />
    </div>

    <transition name="component-fade" mode="out-in">
      <quiz-step
        v-if="currentStep !== 0 && timerEnabled"
        :step="currentStepData"
        @answer="handleAnswer"
      />
    </transition>
    <transition name="component-fade" mode="out-in">
      <progress-bar
        v-if="timerEnabled"
        class="option"
        text-position="inside"
        size="30"
        :bar-color="timer > 5 ? '#0ec4a6' : 'red'"
        :bg-color="currentTheme == 'dark' ? '#18191c' : 'white'"
        text-align="right"
        :font-size="25"
        :bar-border-radius="50"
        :val="(timer * 100) / quiz.seconds_per_answer"
      ></progress-bar>
    </transition>
    <transition name="component-fade" mode="out-in">
      <div class="current-results" v-if="answerTimerEnabled">
        <h1 v-if="currentAnswer.option.is_right">Your answer is correct!</h1>
        <h1 v-if="!currentAnswer.option.is_right && !isNoAnswer">
          Your answer is wrong!
        </h1>
        <h1 v-if="isNoAnswer">There was no answer</h1>
        <img
          v-if="currentAnswer.option.is_right"
          width="150"
          height="150"
          src="../assets/check.png"
        />
        <img
          v-if="!currentAnswer.option.is_right || isNoAnswer"
          width="150"
          height="150"
          src="../assets/icons8-close.svg"
        />
        <number tag="h1" :from="0" :to="currentResults" :duration="3" />
        <h1 v-if="!currentAnswer.option.is_right || isNoAnswer">
          Corrent answer: {{ rightAnswer }}
        </h1>
        <h3>Waiting for the next question...</h3>
        <img src="../assets/spinner3.gif" width="150" height="150" />
      </div>
    </transition>
    <div class="final-results" v-if="finalResults">
      <results-table :results="finalResults"></results-table>
    </div>

    <vs-dialog
      width="300px"
      blur
      not-close
      prevent-close
      v-model="createUserDialog"
    >
      <template #header>
        <h3 class="not-margin">Welcome, pick up your nickname</h3>
      </template>

      <div class="con-content-nickname">
        <vs-input v-model="newUserNickname" placeholder="Nickname"></vs-input>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="createTempUser" transparent> Ok </vs-button>
          <vs-button @click="cancelTempUser" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { getQuiz } from "../api/items/quizzes.api";
import { mapGetters, mapActions } from "vuex";
import jwt_decode from "jwt-decode";
import QrcodeVue from "qrcode.vue";
import QuizStep from "../components/quizzes/QuizStep.vue";
import ProgressBar from "vue-simple-progress";
import ResultsTable from "../components/quizzes/ResultsTable.vue";
import { register } from "../api/auth.api";
export default {
  components: {
    QrcodeVue,
    QuizStep,
    ProgressBar,
    ResultsTable,
  },
  data: () => {
    return {
      quizId: null,
      quiz: null,
      currentStep: 0,
      currentStepData: null,
      isOwner: false,
      connection: null,
      link: "",
      members: [],
      timer: 30,
      timerEnabled: false,
      currentResults: null,
      currentAnswer: null,
      answerTimer: 5,
      answerTimerEnabled: false,
      finalResults: null,

      testTimer: 10,
      testTimerEnabled: false,

      isNoAnswer: false,

      createUserDialog: false,
      isUserCreated: false,
      newUserNickname: '',
      newUserToken: null
    };
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timer--;
        }, 1000);
      }
    },
    testTimerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.testTimer--;
        }, 1000);
      }
    },
    answerTimerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.answerTimer--;
        }, 1000);
      }
    },
    timer: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timer--;
          }, 1000);
        } else if (this.timerEnabled) {
          this.setLoading(true);
          if (this.currentAnswer == null) {
            this.isNoAnswer = true;
            this.currentStepData.options.forEach((option) => {
              if (!option.is_right) {
                this.currentAnswer = {
                  option: option,
                  time: this.timer,
                  step: this.currentStepData.pk,
                };
              }
            });
          }
          console.log(this.currentAnswer);
          this.connection.send(
            JSON.stringify({
              action: "answer",
              answer: this.currentAnswer,
            })
          );
          this.answerTimerEnabled = true;
          this.timerEnabled = false;
          this.timer = this.quiz.seconds_per_answer;
          this.setLoading(false);
        }
      },
    },

    testTimer: {
      handler(value) {
        if (value > 0 && this.testTimerEnabled) {
          setTimeout(() => {
            this.testTimer--;
          }, 1000);
        } else if (this.testTimerEnabled) {
          console.log("TEST Timer");
          console.log("test timer -", this.testTimer);
          console.log("test timer enabled -", this.testTimerEnabled);
          this.testTimerEnabled = false;
          this.testTimer = 10;
        }
      },
    },
    answerTimer: {
      handler(value) {
        if (value > 0 && this.answerTimerEnabled) {
          setTimeout(() => {
            this.answerTimer--;
            console.log(this.rightAnswer);
          }, 1000);
        } else if (this.answerTimerEnabled) {
          if (this.isOwner) {
            this.connection.send(
              JSON.stringify({
                action: "next",
                step: this.currentStep,
              })
            );
          }
          this.currentResults = null;
          this.answerTimerEnabled = false;
          this.answerTimer = 5;
          this.currentAnswer = null;
          this.isNoAnswer = false;
          this.setLoading(true);
          this.setLoading(false);
        }
      },
    },
  },
  computed: {
    ...mapGetters(["currentUser", "isLoading", "currentTheme"]),
    rightAnswer() {
      this.currentStepData.options.forEach((option) => {
        if (option.is_right) {
          return option.title;
        }
      });
      return null;
    },
  },
  methods: {
    ...mapActions(["setLoading"]),
    startTimer() {
      this.timerEnabled = true;
    },
    stopTimer() {
      this.timerEnabled = false;
    },
    connectToWebsocket() {
      if(!this.newUserToken) {
        this.connection = new WebSocket(
          "wss://" + "demando-backend.herokuapp.com" + "/ws/quiz/" +
            this.quiz.enter_code +
            "/" +
            localStorage.getItem("token")
        );
      }
      else {
        this.connection = new WebSocket(
          "wss://" + "demando-backend.herokuapp.com" + "/ws/quiz/" +
            this.quiz.enter_code +
            "/" +
            this.newUserToken
        );
      }
      this.connection.onmessage = (message) => {
        this.setLoading(true);
        let data = JSON.parse(message.data);
        if (data.members) {
          this.members = data.members;
        } else if (data.step) {
          this.currentStep = data.step_number;
          this.currentStepData = data.step;
          this.startTimer();
        } else if (data.results) {
          console.log("results - ", data.results);
          this.currentResults = data.results;
        } else if (data.action == "finish") {
          this.finalResults = data.final_results;
          console.log(this.finalResults);
        }
        this.setLoading(false);
      };
      this.connection.onopen = () => {};
      this.connection.onclose = (e) => {
        console.log(e);
      };
      this.connection.onerror = (err) => {
        console.log(err);
      };
    },
    isYourAnswerRight() {
      this.currentStepData.options.forEach((option) => {
        if (this.currentAnswer.option.pk == option.pk) {
          return true;
        }
      });
    },

    getRandomColor() {
      let colors = ["primary", "success", "danger", "warn", "dark"];
      return colors[Math.floor(colors.length * Math.random())];
    },
    handleAnswer(option) {
      this.currentAnswer = {
        option: option,
        time: this.timer,
        step: this.currentStepData.pk,
      };
    },
    sendActionToWebsocket(action) {
      this.connection.send(
        JSON.stringify({
          action: action,
        })
      );
    },
    startQuiz() {
      this.sendActionToWebsocket("start");
    },
    createTempUser() {
      register(this.newUserNickname, "temp.email.quiz@temp.quiz", "UNSECURE_PASSWORD")
      .then(response => {
        this.newUserToken = response.data.token
        this.connectToWebsocket()
        this.createUserDialog = false;
      })
    },
    cancelTempUser() {
        this.$router.push("/quizzes");
    }
  },
  beforeCreate() {
    document.body.classList.add("gradient-background");
  },
  destroyed() {
    document.body.classList.remove("gradient-background");
  },
  created() {
    this.setLoading(true);
    this.quizId = this.$route.params.quizId;
    getQuiz(this.quizId)
      .then((response) => {
        this.quiz = response.data;
        this.timer = this.quiz.seconds_per_answer;
        this.link = "localhost:8080" + this.$route.fullPath;

        if (localStorage.getItem("token") !== null) {
          const userPk = jwt_decode(localStorage.getItem("token")).pk;
          if (userPk == this.quiz.owner.pk) {
            this.isOwner = true;
          }
          if (!this.connection) {
            this.connectToWebsocket();
          }
        } else {
          this.createUserDialog = true;
        }
      })
      .catch((error) => {
        console.log(error);
        this.$router.push("/404");
      });

    this.setLoading(false);
  },
};
</script>

<style>
/* html {
  background: linear-gradient(-45deg, #ee7752, #c55982, #538ba0, #42e6bf);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
} */
.gradient-background {
  background: linear-gradient(-45deg, #ee7752, #c55982, #538ba0, #42e6bf);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
.quiz {
  color: white;
  overflow-wrap: break-word;
}
.quiz-start-page h3 {
  text-align: center;
}
.quiz-start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.members {
  display: flex;
  flex-direction: row;
}
.members .vs-avatar-content {
  margin-right: 5px;
}
.current-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;
  text-align: center;
}
.final-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 150px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.code {
  cursor: pointer;
  font-size: 50px;
}
.code span {
  background-color: rgb(24, 24, 24);
  opacity: 0.5;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  color: white;
}
.start-btn .vs-button--size-xl {
  font-size: 75px;
}
.con-content-nickname .vs-input {
  font-size: 32px;
  min-width: 350px;
}
.con-content-nickname .vs-input-content {
  font-size: 32px;
  min-width: 300px;
}
.con-content-nickname .vs-input__label {
  font-size : 32px;
}
</style>
