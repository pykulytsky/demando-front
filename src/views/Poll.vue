<template>
  <div class="poll" v-if="!isLoading && poll">
    <div class="poll-header">
      <h1>{{ poll.name }}</h1>
    </div>
    <vs-alert gradient v-if="!isLogined">
      <template #title> Authorization is require </template>
      In order to make any votes, you should log in or create a new account if
      you don't have it yet!
    </vs-alert>
    <div class="vote-item-wrap"  v-for="option in poll.options" :key="option.pk">
      <div class="vote-item">
        <h2 v-if="voted">{{ option.name }}</h2>
        <vs-row align="center">
          <vs-col w="1" v-if="!voted">
            <vs-radio
              @input="handleVote(option.pk)"
              v-model="vote"
              :val="option.pk"
            ></vs-radio>
          </vs-col>
          <vs-col :w="voted ? 10 : 9">
            <progress-bar
              v-if="voted"
              class="option"
              text-position="inside"
              size="30"
              bar-color="#0ec4a6"
              :bg-color="currentTheme == 'dark' ? '#18191c' : 'white'"
              text-align="right"
              :text-fg-color="getPercentTextColor(option)"
              :text="getPercent(option).toString() + '%'"
              :font-size="25"
              :bar-border-radius="50"
              :val="getPercent(option)"
            ></progress-bar>
            <h2 class="prevote__header" @click="handleVote(option.pk)" v-else>
              {{ option.name }}
            </h2>
          </vs-col>
          <vs-col w="2">
            <h4 v-if="voted" class="option-percent">
              {{ option.votes.length }} votes
            </h4>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProgressBar from "vue-simple-progress";
import jwt_decode from "jwt-decode";
export default {
  components: {
    ProgressBar,
  },
  data: () => {
    return {
      pollId: null,
      poll: null,
      value: 10,
      connection: null,
      voted: false,
      vote: -1,
      pollLoaded: false,
    };
  },
  computed: {
    ...mapGetters([
      "token",
      "currentTheme",
      "currentUser",
      "isLoading",
      "isLogined",
    ]),
  },
  methods: {
    ...mapActions(["setLoading"]),
    sendWithWebsocket(optionId) {
      this.connection.send(
        JSON.stringify({
          token: localStorage.getItem("token"),
          poll_id: this.pollId,
          option_id: optionId,
        })
      );
    },
    handleVote(optionID) {
      if (this.isLogined) {
        this.sendWithWebsocket(optionID);
        this.voted = true;
      } else {
        this.$vs.notification({
          color: "warn",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          title: "Authorization is required",
          text: "In order to make any votes, you should log in or create a new account if you don't have it yet!",
        });
      }
    },
    getPercent(option) {
      let percent = ((option.votes.length / this.poll.votes.length) * 100).toFixed()

      return !isNaN(percent) ? percent : 0;
    },
    getPercentTextColor(option) {
      if (this.getPercent(option) === 0 && this.currentTheme == "light") {
        return "black";
      } else {
        return "white";
      }
    },
    connectToWebsocket() {
      this.connection = new WebSocket(
        "ws://localhost:8000/ws/vote/" + this.pollId
      );
      this.connection.onmessage = (event) => {
        this.setLoading(true);
        this.poll = JSON.parse(event.data);
        try {
          const userPk = jwt_decode(localStorage.getItem("token")).pk;
          this.voted  = this.poll.votes.filter(
            (vote) => vote.owner.pk == userPk
          ).length > 0
        } catch {
          this.voted = false;
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
  },
  created() {
    this.setLoading(true);
    this.pollId = this.$route.params.pk;
    this.connectToWebsocket();
    this.setLoading(false);
  },
  destroyed() {
    this.connection.close();
  },
};
</script>

<style scoped>
.poll {
  margin-top: 50px;
  width: 60%;
}

.vote-item {
  margin-top: 5px;
  padding: 10px 0;
}

.option-percent {
  margin-left: 10px;
  color: rgb(90, 90, 90);
}
.poll-header h1 {
  text-align: center;
}
.prevote__header:hover {
  cursor: pointer;
}
</style>
