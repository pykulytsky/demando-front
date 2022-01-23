<template>
  <div class="event-main">
    <div class="event-header">
      <vs-row justify="space-around">
        <vs-col w="5" justify="center" align="center">
          <vs-row>
            <qrcode-vue class="qr-code" :value="link" :size="260" level="H" />
          </vs-row>
        </vs-col>
        <vs-col w="5" justify="center">
          <vs-row>
            <vs-col vs-justify="flex-end">
              <h1 class="event-name">{{ event.name }}</h1>
            </vs-col>
            <vs-col>
              <vs-row justity="space-around">
                <vs-col w="5">
                  <vs-row flex-direction="column">
                    <vs-col>
                      <unicon
                        class="user-icon"
                        name="user"
                        fill="white"
                      ></unicon>
                      {{ event.owner.username }}
                    </vs-col>
                    <vs-col> questions: {{ event.questions.length }} </vs-col>
                  </vs-row>
                </vs-col>

                <vs-col class="info-second" w="5">
                  <vs-row flex-direction="column">
                    <vs-col>
                      <unicon name="calender" fill="white" />
                      {{ event.created.toLocaleDateString("en-US") }}
                    </vs-col>
                    <vs-col>
                      <unicon name="calender" fill="white" />
                      {{ event.updated.toLocaleDateString() }}
                    </vs-col>
                  </vs-row>
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </div>
    <transition name="slide-fade">
      <new-question
        :eventId="eventId"
        @handleIsShown="newQuestionIsShown = false"
        @updateQuestions="updateQuestions"
        v-if="newQuestionIsShown"
        id="new-question"
      />
    </transition>
    <div class="event-content">
      <vs-row
        v-for="question in event.questions"
        :key="question.pk"
        justify="center"
        align="center"
      >
        <question-item
          :question="question"
          @updateQuestions="updateQuestions"
        />
      </vs-row>
    </div>
    <div class="event-footer"></div>
    <vs-button
      v-if="isLogined"
      class="add-event-btn"
      circle
      icon
      floating
      @click="newQuestionIsShown = true"
      v-scroll-to="{
        el: '#new-question',
        offset: -200,
        easing: 'ease-in-out',
      }"
    >
      <unicon name="plus" fill="white" />
    </vs-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getEvent } from "../api/items/events.api";
import QrcodeVue from "qrcode.vue";
import QuestionItem from "../components/questions/QuestionItem.vue";
import NewQuestion from "../components/questions/NewQuestion.vue";

export default {
  name: 'Event',
  metaInfo() {
    return {
      meta: [{
        vmid: 'description',
        name: 'description',
        content: this.description,
      }]
    }
  },
  data: () => {
    return {
      eventId: null,
      event: null,
      link: "",
      newQuestionIsShown: false,
      description: undefined
    };
  },
  components: {
    QrcodeVue,
    QuestionItem,
    NewQuestion,
  },
  computed: { ...mapGetters(["isLogined"]) },
  methods: {
    ...mapActions(["setLoading"]),

    async updateQuestions() {
      this.event = await (await getEvent(this.eventId)).data;
      this.event.created = new Date(this.event.created);
      this.event.updated = new Date(this.event.updated);
      this.event.questions.forEach((question) => {
        this.parseTime(question);
      });
    },

    async parseTime(question) {
      let measureOfTime = " second";
      let diffInSeconds = Math.round(
        (new Date() - new Date(question.created)) / 1000
      );

      if (diffInSeconds < 60) {
        question.created = diffInSeconds;
        measureOfTime = " second";
      } else if (diffInSeconds >= 60 && diffInSeconds < 3600) {
        question.created = Math.round(diffInSeconds / 60);
        measureOfTime = " minute";
      } else if (diffInSeconds >= 3600 && diffInSeconds < 3600 * 24) {
        question.created = Math.round(diffInSeconds / 3600);
        measureOfTime = " hour";
      } else {
        question.created = Math.round(diffInSeconds / (3600 * 24));
        measureOfTime = " day";
      }

      if (question.created > 1) {
        measureOfTime += "s";
      }

      question.created += measureOfTime;
    },
  },
  watch: {
    event() {
      this.title = this.title + ' ' + this.event.name
    }
  },
  async created() {
    this.setLoading(true);
    this.eventId = this.$route.params.pk;
    await this.updateQuestions();
    this.link = "localhost:8080" + this.$route.fullPath;
    this.setLoading(false);
  },
};
</script>

<style>
.event-header {
  margin-top: 75px;
  border: 2px solid royalblue;
  border-radius: 15px;
  padding-top: 15px;
  background-color: royalblue;
  min-width: 750px;
  max-width: 950px;
  color: white;
}
.event-header .vs-col {
  margin: 10px 5px;
}
.event-content {
  margin-top: 55px;
}

canvas {
  border-radius: 12px;
}
.event-name {
  text-align: center;
}

.info-second {
  text-align: right;
}

.unicon {
  display: flex;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.item-move {
  /* applied to the element when moving */
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.event-main .add-event-btn {
  position: fixed;
  right: 5%;
  bottom: 5%;
  padding: 8px;
  border-radius: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
</style>
