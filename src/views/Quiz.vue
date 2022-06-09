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
      <qrcode-vue class="qr-code" :value="link" :size="150" level="H" />
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

      <div class="quiz-loader">
        <lottie-animation
          :animationData="require('@/assets/lottie/94324-loader.json')"
          :loop="true"
          width="150"
        />
      </div>
    </div>

    <transition name="component-fade" mode="out-in">
      <quiz-step
        v-if="currentStep !== 0 && timerEnabled"
        :step="currentStepData"
        @answer="handleAnswer"
      />
    </transition>
    <div class="progress">
      <transition name="component-fade" mode="out-in">
        <progress-bar
          v-if="timerEnabled"
          text-position="inside"
          size="30"
          :bar-color="timer > 5 ? '#0ec4a6' : 'red'"
          :bg-color="'none'"
          text-align="right"
          :font-size="25"
          :bar-border-radius="50"
          :val="(timer * 100) / quiz.seconds_per_answer"
        ></progress-bar>
      </transition>
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="current-results" v-if="answerTimerEnabled">
        <h1 v-if="currentAnswer.option.is_right">Your answer is correct!</h1>
        <h1 v-if="!currentAnswer.option.is_right && !isNoAnswer">
          Your answer is wrong!
        </h1>
        <h1 v-if="isNoAnswer">There was no answer</h1>

        <div
          class="quiz-result-img"
          v-if="currentAnswer.option.is_right"
        >
          <lottie-animation
            :animationData="require('@/assets/lottie/89101-confirmed-tick.json')"
            :loop="false"
            width="150"
          />
        </div>

        <div
          class="quiz-result-img"
          v-if="!currentAnswer.option.is_right || isNoAnswer"
        >
          <lottie-animation
            :animationData="require('@/assets/lottie/58412-cross-close-cancel-icon-animation.json')"
            :loop="false"
            width="150"
          />
        </div>
        <number
          tag="h1"
          :from="0"
          :to="currentResults !== null ? currentResults : 0"
          :duration="3"
        />
        <h1 v-if="!currentAnswer.option.is_right || isNoAnswer">
          Correct answer: {{ rightAnswer }}
        </h1>
        <h3>Waiting for the next question...</h3>
        <div class="quiz-loader">
          <lottie-animation
            :animationData="require('@/assets/lottie/94324-loader.json')"
            :loop="true"
            width="150"
          />
        </div>
      </div>
    </transition>
    <div class="final-results" v-if="finalResults">
      <results-table
        :results="finalResults"
        :nickname="newUserNickname"
      ></results-table>
    </div>

    <vs-dialog blur not-close prevent-close v-model="createUserDialog">
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
    <div class="volume-control" @click="volumeEnabled = !volumeEnabled">
      <unicon v-if="volumeEnabled" name="volume" fill="white" />
      <unicon v-else name="volume-mute" fill="white" />
    </div>
  </div>
</template>

<script>
import { getQuiz } from "../api/items/quizzes.api";
import { getAnonUsers } from "../api/items/anon.api";
import { mapGetters, mapActions } from "vuex";
import jwt_decode from "jwt-decode";
import QrcodeVue from "qrcode.vue";
import QuizStep from "../components/quizzes/QuizStep.vue";
import ProgressBar from "vue-simple-progress";
import ResultsTable from "../components/quizzes/ResultsTable.vue";
import LottieAnimation from "lottie-web-vue";
export default {
  components: {
    QrcodeVue,
    QuizStep,
    ProgressBar,
    ResultsTable,
    LottieAnimation,
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
      newUserNickname: "",
      newUserToken: null,

      pickSound: new Audio(require("../assets/one-popping-sound-96661.mp3")),
      timerSound: new Audio(
        require("../assets/wemida-heartbeat-voting-quizzing-voting-background-music-16574.mp3")
      ),
      volumeEnabled: true,
      anonUsers: null,
    };
  },
  watch: {
    volumeEnabled(value) {
      if (value) {
        this.timerSound.volume = 0.2;
        this.pickSound = 1;
      } else {
        this.timerSound.volume = 0;
        this.pickSound = 0;
      }
    },
    timerEnabled(value) {
      if (value) {
        this.timerSound.play();
        setTimeout(() => {
          this.timer--;
        }, 1000);
      } else {
        this.timerSound.pause();
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
          this.isNoAnswer = false;
          this.setLoading(true);
          this.setLoading(false);
        }
      },
    },
    finalResults(value) {
      if (value !== null) {
        document.removeEventListener("beforeunload", this.preventWindowClose);
        window.removeEventListener("beforeunload", this.preventWindowClose);
      }
    },
  },
  computed: {
    ...mapGetters(["currentUser", "isLoading", "currentTheme"]),
    rightAnswer() {
      let correntAnswer = "";
      this.currentStepData.options.forEach((option) => {
        if (option.is_right) {
          correntAnswer = option.title;
        }
      });
      return correntAnswer;
    },
  },
  methods: {
    ...mapActions(["setLoading"]),
    preventWindowClose(e) {
      e.preventDefault();
      e.returnValue = "";
    },
    startTimer() {
      this.timerEnabled = true;
    },
    stopTimer() {
      this.timerEnabled = false;
    },
    connectToWebsocket() {
      if (this.newUserNickname == "") {
        this.connection = new WebSocket(
          "wss://" +
            "demando-backend.herokuapp.com" +
            "/ws/quiz/" +
            this.quiz.enter_code +
            "/" +
            localStorage.getItem("token")
        );
      } else {
        this.connection = new WebSocket(
          "wss://" +
            "demando-backend.herokuapp.com" +
            "/ws/quiz/" +
            this.quiz.enter_code +
            "/username:" +
            this.newUserNickname
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
          this.currentResults = data.results;
        } else if (data.action == "finish") {
          this.finalResults = data.final_results;
        } else if (data.type == "username") {
          this.createUserDialog = true;
          this.$vs.notification({
            color: "danger",
            icon: '<unicon name="exclamation-triangle" fill="white"/>',
            position: "bottom-center",
            title: "Nickname is alreay taken",
            text: "This email is already taken, please take another one",
          });
        }
        this.setLoading(false);
      };
      this.connection.onopen = () => {};
      this.connection.onclose = () => {
        this.connection = null;
        document.removeEventListener("beforeunload", this.preventWindowClose);
        window.removeEventListener("beforeunload", this.preventWindowClose);
      };
      this.connection.onerror = () => {
        this.connection = null;
        this.$vs.notification({
          color: "danger",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          title: "Critical error",
          text: "Error occured when receiving data from server",
        });
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
      this.pickSound.play();
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
      this.connectToWebsocket();
      this.createUserDialog = false;
    },
    cancelTempUser() {
      this.$router.push("/quizzes");
    },
  },
  beforeCreate() {
    document.body.classList.add("gradient-background");
  },
  destroyed() {
    document.body.classList.remove("gradient-background");
    document.removeEventListener("beforeunload", this.preventWindowClose);
    window.removeEventListener("beforeunload", this.preventWindowClose);
    this.timerSound.pause();
  },
  created() {
    this.setLoading(true);
    this.timerSound.volume = 0.1;
    document.addEventListener("beforeunload", this.preventWindowClose);
    window.addEventListener("beforeunload", this.preventWindowClose);

    this.quizId = this.$route.params.quizId;
    getQuiz(this.quizId)
      .then((response) => {
        this.quiz = response.data;
        this.timer = this.quiz.seconds_per_answer;
        this.link = new URL(this.$route.fullPath, window.location.href).href;
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
      .catch(() => {
        this.$vs.notification({
          color: "danger",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          title: "Critical error",
          text: "Error occured when receiving data from server",
        });
        this.$router.push("/404");
      });
    getAnonUsers().then((response) => {
      this.anonUsers = response.data;
    });
    this.setLoading(false);
  },
};
</script>

<style>
.gradient-background {
  background: linear-gradient(-45deg, #ee7752, #c55982, #538ba0, #42e6bf);
  background-size: 600% 600%;
  animation: gradient 15s ease infinite;
  /* background: url("../assets/quiz-background4.jpg"); */
}
.quiz {
  color: white;
  overflow-wrap: break-word;
  width: 100%;
  height: 100%;
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
  overflow: hidden;

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
  text-align: center;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
}
.final-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5%;
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
  min-width: 100%;
}
.con-content-nickname .vs-input-content {
  font-size: 32px;
  min-width: 100%;
}
.con-content-nickname .vs-input__label {
  font-size: 32px;
}
.progress {
  position: absolute;
  bottom: 5%;
  width: 100%;
}
.vue-simple-progress {
  background: none;
}
.volume-control {
  background-color: rgb(24, 24, 24);
  opacity: 0.5;
  border-radius: 5px;
  padding: 5px;
  position: fixed;
  right: 1%;
  top: 1%;
}
.quiz-loader {
  width: 75px;
  height: 75px;
}
.quiz-result-img {
  width: 250px;
  height: 250px;
}
</style>
