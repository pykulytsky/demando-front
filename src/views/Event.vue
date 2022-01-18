<template>
  <div class="event-main">
    <div class="event-header">
      <vs-row justify="space-around">
        <vs-col w="5" justify="center" align="center">
          <vs-row>
            <qrcode-vue
              class="qr-code"
              :value="link"
              :size="250"
              level="H"
            />
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
                    <vs-col>
                        questions: {{event.questions.length}}
                    </vs-col>
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
    <div class="event-content">
      <vs-row
        v-for="question in event.questions"
        :key="question.pk"
        justify="center"
        align="center"
      >
        <question-item :question="question" />
      </vs-row>
    </div>
    <div class="event-footer"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getEvent } from "../api/items/events.api";
import QrcodeVue from "qrcode.vue";
import QuestionItem from "../components/questions/QuestionItem.vue";

export default {
  data: () => {
    return {
      eventId: null,
      event: null,
      link: "",
    };
  },
  components: {
    QrcodeVue,
    QuestionItem,
  },
  methods: { ...mapActions(["setLoading"]) },
  async created() {
    this.setLoading(true);
    this.eventId = this.$route.params.pk;
    this.event = await (await getEvent(this.eventId)).data;
    this.event.created = new Date(this.event.created);
    this.event.updated = new Date(this.event.updated);
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
  padding-bottom: 15px;
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
  padding-top: 3px;
}
</style>
