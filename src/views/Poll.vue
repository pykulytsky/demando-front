<template>
  <div class="poll" v-if="!isLoading && poll">
    <div class="poll-header">
      <div class="poll-data">
        <h1>{{ poll.name }}</h1>
        <p>Allowed votes: {{ poll.allowed_votes }}</p>
      </div>
      <div class="poll-info">
        <h1 class="event-code">
          <span>#{{ poll.pk }}</span>
        </h1>

        <qrcode-vue class="qr-code" :value="link" :size="100" level="H" />
      </div>
    </div>
    <div class="vote-item-wrap" v-for="option in poll.options" :key="option.pk">
      <div class="vote-item">
        <h2 v-if="voted">{{ option.name }}</h2>
        <vs-row align="center">
          <vs-col w="1" v-if="!voted">
            <vs-radio
              v-if="!poll.multiply_votes"
              @input="handleVote(option.pk)"
              v-model="vote"
              :val="option.pk"
            ></vs-radio>
            <vs-checkbox v-else v-model="votes" :val="option.pk"> </vs-checkbox>
          </vs-col>
          <vs-col :w="voted ? 11 : 10" v-responsive.lg.xl>
            <progress-bar
              v-if="voted"
              class="option"
              text-position="inside"
              size="30"
              bar-color="#0ec4a6"
              :bg-color="currentTheme == 'dark' ? '#1e2023' : 'white'"
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
          <vs-col :w="voted ? 12: 11" v-responsive.sm.xs>
            <progress-bar
              v-if="voted"
              class="option"
              text-position="inside"
              size="14"
              bar-color="#0ec4a6"
              :bg-color="currentTheme == 'dark' ? '#1e2023' : 'white'"
              text-align="right"
              :text-fg-color="getPercentTextColor(option)"
              :text="getPercent(option).toString() + '%'"
              :font-size="14"
              :bar-border-radius="50"
              :val="getPercent(option)"
            ></progress-bar>
            <h2 class="prevote__header" @click="handleVote(option.pk)" v-else>
              {{ option.name }}
            </h2>
          </vs-col>
          <vs-col w="1" v-responsive.lg.xl>
            <h4 v-if="voted" class="option-percent">
              {{ option.votes.length }} votes
            </h4>
          </vs-col>
        </vs-row>
      </div>
    </div>
    <div class="multiply-vote-btn">
      <vs-button
        size="xl"
        flat
        @click="multiplyVote"
        v-if="
          poll.multiply_votes && !voted && votes.length == poll.allowed_votes
        "
        >Vote</vs-button
      >
    </div>
    <counter
      v-if="poll.limited_time && !!dueToDate"
      :year="dueToDate.year"
      :month="dueToDate.month"
      :day="dueToDate.day"
      :hour="dueToDate.hour"
      :minute="dueToDate.minute"
      :second="dueToDate.second"
      :millisecond="dueToDate.millisecond"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProgressBar from "vue-simple-progress";
import jwt_decode from "jwt-decode";
import QrcodeVue from "qrcode.vue";
import Counter from "../components/core/Counter.vue";
export default {
  components: {
    ProgressBar,
    QrcodeVue,
    Counter
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
      link: "",
      votes: [],
      dueToDate: null
    };
  },
  watch: {
    votes() {
      if (this.votes.length > this.poll.allowed_votes) {
        this.votes = this.votes.slice(this.poll.allowed_votes);
      }
    },
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
      if (this.isLogined) {
        this.connection.send(
          JSON.stringify({
            token: localStorage.getItem("token"),
            poll_id: this.pollId,
            option_id: optionId,
          })
        );
      } else {
        this.connection.send(
          JSON.stringify({
            ip_address: window.location.hostname,
            poll_id: this.pollId,
            option_id: optionId,
          })
        );
      }
    },
    multiplyVote() {
      if (this.isLogined) {
        this.connection.send(
          JSON.stringify({
            token: localStorage.getItem("token"),
            poll_id: this.pollId,
            options: this.votes,
            multiply: true,
          })
        );
      } else {
        this.connection.send(
          JSON.stringify({
            ip_address: window.location.hostname,
            poll_id: this.pollId,
            options: this.votes,
            multiply: true,
          })
        );
      }
    },
    handleVote(optionID) {
      this.sendWithWebsocket(optionID);
      this.voted = true;
    },
    getPercent(option) {
      let percent = (
        (option.votes.length / this.poll.votes.length) *
        100
      ).toFixed();

      return !isNaN(percent) ? percent : 0;
    },
    getPercentTextColor(option) {
      if (this.getPercent(option) == 0 && this.currentTheme == "light") {
        return "black";
      } else {
        return "white";
      }
    },
    connectToWebsocket() {
      this.connection = new WebSocket(
        "ws://" + "localhost:8000" + "/ws/vote/" + this.pollId
      );
      this.connection.onmessage = (event) => {
        this.setLoading(true);
        this.poll = JSON.parse(event.data);
        if(this.poll.limited_time) {
          let date = new Date(Date.parse(this.poll.time_to_vote))
          this.dueToDate = {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDay()-2,
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds()
          }

        }
        try {
          const userPk = jwt_decode(localStorage.getItem("token")).pk;
          this.voted = this.poll.votes.filter((vote) => vote.owner.pk == userPk).length > 0
        }
        catch {
          this.voted = this.poll.votes.filter((vote) => vote.owner_host == window.location.hostname).length > 0
        }
        if(new Date(Date.parse(this.poll.time_to_vote)) < new Date()) {
          this.voted = true
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
    this.link = new URL(this.$route.fullPath, window.location.href).href;
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
  width: 85%;
}

.option-percent {
  color: rgb(90, 90, 90);
  text-align: right;
}
.poll-header h1 {
  text-align: center;
}
.prevote__header:hover {
  cursor: pointer;
}
.poll-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.event-code {
  cursor: pointer;
  text-align: center;
}
.event-code span {
  background-color: rgb(24, 24, 24);
  opacity: 0.5;
  padding: 10px;
  border-radius: 10px;
  font-weight: 700;
  color: white;
}
.multiply-vote-btn {
  display: flex;
  flex-direction: row-reverse;
}
</style>
