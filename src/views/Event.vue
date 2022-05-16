<template>
  <div class="event-main" v-if="!!event">
    <div class="event-header">
      <vs-row justify="space-around">
        <vs-col w="3" justify="center" align="center">
          <vs-row>
            <vs-col>
              <qrcode-vue class="qr-code" :value="link" :size="150" level="H" />
            </vs-col>
            <vs-col>
              <vs-row>
                <vs-col w="5">
                  <vs-tooltip bottom>
                    <unicon
                      class="share-btn hvr-pulse-shrink"
                      name="share-alt"
                      fill="white"
                      width="30"
                      height="30"
                      @click="copyToClipBoard"
                    />
                    <template #tooltip> Share </template>
                  </vs-tooltip>
                </vs-col>
                <vs-col w="5">
                  <vs-tooltip bottom>
                    <unicon
                      class="settings-btn"
                      name="setting"
                      fill="white"
                      width="30"
                      height="30"
                      @click="actionsIsShown = true"
                    />
                    <template #tooltip> Actions </template>
                  </vs-tooltip>
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col w="6" justify="center">
          <vs-row>
            <vs-col vs-justify="flex-end">
              <h1 class="event-name">{{ event.name }}</h1>
              <h2 class="event-code"><span>#{{event.pk}}</span></h2>
            </vs-col>
            <vs-col>
              <vs-row justity="space-around">
                <vs-col w="5">
                  <vs-row flex-direction="column">
                    <vs-col>
                      <unicon
                        class="user-icon hvr-pulse-shrink"
                        name="user"
                        fill="white"
                      ></unicon>
                      {{ event.owner.username }}
                    </vs-col>
                    <vs-col>
                      <unicon
                        name="comments"
                        fill="white"
                        class="hvr-pulse-shrink"
                      />
                      {{ event.questions.length }}
                    </vs-col>
                  </vs-row>
                </vs-col>

                <vs-col class="info-second" w="5">
                  <vs-row flex-direction="column">
                    <vs-col>
                      <unicon
                        name="lightbulb-alt"
                        fill="white"
                        class="hvr-pulse-shrink"
                      />
                      {{ event.created.toLocaleDateString() }}
                    </vs-col>
                    <vs-col>
                      <unicon
                        name="pen"
                        fill="white"
                        class="hvr-pulse-shrink"
                      />
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
    <div class="event-content" v-if="event.questions.length > 0">
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
    <vs-row justify="center" v-else class="no-questions">
      <h2 class="no-questions-header">
        There are no questions yet, you have the chance to be first )
      </h2>
    </vs-row>

    <event-actions
      @handleClose="actionsIsShown = false"
      :isShown="actionsIsShown"
      :isCurrentUserOwner="!!currentUser && event.owner.pk == currentUser.pk"
      :eventId="eventId"
      :eventName="event.name"
    />
    <qr-code-dialog
      @handleClose="qrCodeDialogIsShown = false"
      :link="link"
      :isShown="qrCodeDialogIsShown"
    />

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
import EventActions from "../components/events/EventActions.vue";
import QRCodeDialog from "../components/events/QRCodeDialog.vue";

export default {
  name: "Event",
  metaInfo() {
    return {
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  },
  data: () => {
    return {
      eventId: null,
      event: null,
      link: "",
      newQuestionIsShown: false,
      description: undefined,
      actionsIsShown: false,
      qrCodeDialogIsShown: false,
    };
  },
  components: {
    QrcodeVue,
    QuestionItem,
    NewQuestion,
    EventActions,
    qrCodeDialog: QRCodeDialog,
  },
  computed: { ...mapGetters(["isLogined", "currentUser"]) },
  methods: {
    ...mapActions(["setLoading"]),

    async copyToClipBoard() {
      await navigator.clipboard.writeText(window.location.href);
      this.$vs.notification({
        icon: "<unicon name='share' fill='white' />",
        position: "bottom-right",
        duration: 1000,
        title: "Copied to clipboard",
        text: "Link to this event was succesfully copied to your clipboard, you can share it as you want!",
      });
    },

    async updateQuestions() {
      this.event = await (await getEvent(this.eventId)).data;
      this.event.created = new Date(this.event.created);
      this.event.updated = new Date(this.event.updated);
      this.event.questions.forEach((question) => {
        this.parseTime(question);
      });
    },

    async showActions() {},

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
    async event() {
      this.title = this.title + " " + this.event.name;
    },
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
.event-main {
  width: 85%;
}
.event-header {
  margin-top: 75px;
  border-radius: 15px;
  padding-top: 15px;
  color: white;
  background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  -webkit-animation: gradient 15s ease infinite;
  -moz-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.event-header .vs-col {
  margin: 10px 5px;
}
.event-content {
  margin-top: 55px;
}

.no-questions {
  margin-top: 120px;
}

.no-questions-header {
  color: grey;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
}

canvas {
  border-radius: 12px;
}
canvas:hover {
  cursor: pointer;
}
.event-name {
  text-align: center;
  text-shadow: 3px 4px 7px rgba(81, 67, 21, 0.8);
}
.access-code {
  text-align: center;
  padding: 5px;
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
  padding: 7px 8px;
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
.settings-btn,
.share-btn {
  margin-left: 8px;
  padding: 5px;
  padding-left: 7px;
  padding-right: 7px;
  transition: transform 0.3s ease-in-out;
}
.share-btn:hover {
  cursor: pointer;
}
.settings-btn:hover {
  cursor: pointer;
  transform: rotate(90deg);
}
@-webkit-keyframes hvr-pulse-shrink {
  to {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}
@keyframes hvr-pulse-shrink {
  to {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}
.hvr-pulse-shrink {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-pulse-shrink:hover,
.hvr-pulse-shrink:focus,
.hvr-pulse-shrink:active {
  -webkit-animation-name: hvr-pulse-shrink;
  animation-name: hvr-pulse-shrink;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-webkit-keyframes gradient {
  0% {
    background-position: 0% 9%;
  }
  50% {
    background-position: 100% 92%;
  }
  100% {
    background-position: 0% 9%;
  }
}
@-moz-keyframes gradient {
  0% {
    background-position: 0% 9%;
  }
  50% {
    background-position: 100% 92%;
  }
}
.event-code {
  cursor: pointer;
  font-size: 1.5rem;
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
</style>
