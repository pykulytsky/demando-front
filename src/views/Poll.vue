<template>
  <div class="poll">
    <div class="poll-header">
      <h1>{{ poll.name }}</h1>
    </div>
    <div class="progress-item" v-for="option in poll.options" :key="option.pk">
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
            text-fg-color="white"
            :text="getPercent(option).toString() + '%'"
            :font-size="25"
            :bar-border-radius="50"
            :val="getPercent(option)"
          ></progress-bar>
          <h2 v-else>{{ option.name }}</h2>
        </vs-col>
        <vs-col w="2">
          <h4 v-if="voted" class="option-percent">
            {{ option.votes.length }} votes
          </h4>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { getPoll } from "../api/items/polls.api";
import { mapGetters } from "vuex";
import ProgressBar from "vue-simple-progress";
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
    };
  },
  computed: {
    ...mapGetters(["token", "currentTheme", "currentUser"]),
  },
  methods: {
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
      this.sendWithWebsocket(optionID);
      this.voted = true;
    },
    getPercent(option) {
      let percent = Math.round(
        (option.votes.length / this.poll.votes.length) * 100
      );
      return !isNaN(percent) ? percent : 0;
    },
  },
  async created() {
    this.pollId = this.$route.params.pk;
    this.poll = await (await getPoll(this.pollId)).data;
    this.poll.votes.forEach((vote) => {
      if (vote.owner.pk == this.currentUser.pk) {
        this.voted = true;
      }
    });

    this.connection = new WebSocket(
      "ws://localhost:8000/ws/vote/" + this.pollId
    );
    this.connection.onmessage = (event) => {
      this.poll = JSON.parse(event.data);
    };
    this.connection.onopen = () => {
      console.log("Successfully connected to the echo websocket server...");
    };
  },
};
</script>

<style scoped>
.poll {
  margin-top: 50px;
  width: 60%;
}
.progress-item {
  margin-top: 45px;
}

.option-percent {
  margin-left: 10px;
  color: rgb(90, 90, 90);
}
.poll-header h1 {
  text-align: center;
}
</style>
