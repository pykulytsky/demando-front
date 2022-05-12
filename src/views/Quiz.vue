<template>
  <div class="quiz">
    <div class="quiz-start-page" v-if="currentStep == 0">
      <h3>Use this code to join the game:</h3>
      <vs-tooltip>
        <h1 class="code">{{ quiz.enter_code }}</h1>
        <template #tooltip> Click here copy the code </template>
      </vs-tooltip>
      <h3>or join the game using QR-code bellow</h3>
      <qrcode-vue class="qr-code" :value="link" :size="220" level="H" />
      <h3>Members:</h3>
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
      <vs-button flat transparent v-if="isOwner" @click="startQuiz">
        Start Game
      </vs-button>
      <h3 v-else>Please, wait when game owner starts the game!</h3>
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
        :val="(timer * 100) / 30"
      ></progress-bar>
    </transition>
    <h2 v-if="timerEnabled">{{ timer }}</h2>
    <transition name="component-fade" mode="out-in">
      <div class="current-results" v-if="answerTimerEnabled">
        <h1 v-if="currentAnswer.option.is_right">Your answer is correct!</h1>
        <h1 v-else>Your answer is wrong!</h1>
        <img
          v-if="currentAnswer.option.is_right"
          width="150"
          height="150"
          src="../assets/icons8-ok.svg"
        />
        <img v-else width="150" height="150" src="../assets/icons8-close.svg" />
        <number tag="h1" :from="0" :to="currentResults" :duration="3" />
      </div>
    </transition>
    <div class="final-results" v-if="finalResults">{{ finalResults }}</div>
  </div>
</template>

<script>
import { getQuiz } from "../api/items/quizzes.api";
import { mapGetters, mapActions } from "vuex";
import jwt_decode from "jwt-decode";
import QrcodeVue from "qrcode.vue";
import QuizStep from "../components/quizzes/QuizStep.vue";
import ProgressBar from "vue-simple-progress";
export default {
  components: {
    QrcodeVue,
    QuizStep,
    ProgressBar,
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
          this.timer = 30;
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
          this.setLoading(true);
          this.setLoading(false);
        }
      },
    },
  },
  computed: { ...mapGetters(["currentUser", "isLoading", "currentTheme"]) },
  methods: {
    ...mapActions(["setLoading"]),
    startTimer() {
      this.timerEnabled = true;
    },
    stopTimer() {
      this.timerEnabled = false;
    },
    connectToWebsocket() {
      this.connection = new WebSocket(
        "ws://localhost:8000/ws/quiz/" +
          this.quiz.enter_code +
          "/" +
          localStorage.getItem("token")
      );
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
  },
  created() {
    this.setLoading(true);
    this.quizId = this.$route.params.quizId;
    getQuiz(this.quizId)
      .then((response) => {
        this.quiz = response.data;

        this.link = "localhost:8080" + this.$route.fullPath;

        const userPk = jwt_decode(localStorage.getItem("token")).pk;
        if (userPk == this.quiz.owner.pk) {
          this.isOwner = true;
        }
        this.connectToWebsocket();
      })
      .catch(() => {
        this.$router.push("/404");
      });
    this.setLoading(false);
  },
};
</script>

<style>
html {
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
  margin-top: 20px;
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
  margin-top: 150px;
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
}
</style>
