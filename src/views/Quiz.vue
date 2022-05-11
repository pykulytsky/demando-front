<template>
  <div class="quiz">
    <div class="quiz-start-page" v-if="currentStep == 0">
      <h3>Join the game using QR-code bellow</h3>
      <qrcode-vue class="qr-code" :value="link" :size="220" level="H" />
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
    <quiz-step v-else :step="currentStepData" @answer="handleAnswer" />
    {{ timer }}
  </div>
</template>

<script>
import { getQuiz } from "../api/items/quizzes.api";
import { mapGetters, mapActions } from "vuex";
import jwt_decode from "jwt-decode";
import QrcodeVue from "qrcode.vue";
import QuizStep from "../components/quizzes/QuizStep.vue";
export default {
  components: {
    QrcodeVue,
    QuizStep,
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
    timer: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timer--;
          }, 1000);
        } else {
          this.timerEnabled = false;
          this.timer = 30;
          this.setLoading(true);

          this.connection.send(
            JSON.stringify({
              action: "answer",
              answer: this.currentAnswer,
            })
          );
          
          this.setLoading(false);
        }
      },
    },
  },
  computed: { ...mapGetters(["currentUser", "isLoading"]) },
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
        console.log(message);
        let data = JSON.parse(message.data);
        if (data.members) {
          this.members = data.members;
          console.log(this.members);
        } else if (data.step) {
          this.currentStep = data.step_number;
          this.currentStepData = data.step;
          console.log(data.step);
          this.startTimer();
        } else if (data.results) {
          console.log(data.results);
        }
        console.log(data);
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
    getRandomColor() {
      let colors = ["primary", "success", "danger", "warn", "dark"];
      return colors[Math.floor(colors.length * Math.random())];
    },
    handleAnswer(option) {
      console.log("Answer - ", option);
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
        console.log(this.quiz);

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
.quiz-start-page h3 {
  text-align: center;
}
.quiz-start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.members {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.members .vs-avatar-content {
  margin-right: 5px;
}
</style>
