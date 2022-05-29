<template>
  <div class="explore">
    <div :class="currentTheme == 'light' ? 'explore-header': 'explore-header-dark'">
      <kinesis-container v-if="['desktop', 'laptop', 'tablet'].includes($mq)">
        <kinesis-element
          type="depth_inv"
          :strength="30"
          tag="h1"
          class="explore-title-header"
        >
          Create or participate in polls, quizzes
        </kinesis-element>
        <kinesis-element
          type="depth_inv"
          :strength="20"
          tag="h1"
          class="explore-title-header"
        >
          or events where you can ask question.
        </kinesis-element>
        <kinesis-element
          type="depth_inv"
          :strength="10"
          tag="h1"
          class="explore-title-header"
        >
          Explore events to find out one you are interested in.
        </kinesis-element>
      </kinesis-container>
      <h1 v-else class="explore-title-header">
       Create or participate in polls, quizzes or events where you can ask question. Explore events to find out one you are interested in.
      </h1>

      <div class="header-buttons" v-motion-fade>
        <vs-button
          flat
          size="xl"
          v-scroll-to="{
            el: '#events',
            easing: 'ease-in-out',
          }"
        >
          Events
        </vs-button>
        <vs-button
          size="xl"
          flat
          v-scroll-to="{
            el: '#quizzes',
            easing: 'ease-in-out',
          }"
        >
          Quizzes
        </vs-button>
        <vs-button
          size="xl"
          flat
          v-scroll-to="{
            el: '#polls',
            easing: 'ease-in-out',
          }"
        >
          Polls
        </vs-button>
      </div>
    </div>
    <div class="polls explore-items">
      <div class="explore-events">
        <h1 class="explore-head" id="polls">Polls</h1>
        <div
          :class="$mq == 'mobile'?  'explore-item-small': 'explore-item'"
          id="polls-typer"
          v-view.once="typerViewHandler"
        >
          <div
            class="explore-caption"
            v-motion-fade-visible
            :enter="{
              transition: {
                delay: 2000,
              },
            }"
          >
            <vue-typer
              v-if="pollsIsVisible"
              text="Live Polls"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              Wellcome to our live polls where you can find out other people's
              opinions. Make your meetings more interactive, choose topics to
              discuss, speakers and so on.
            </h2>
          </div>

          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/christin-hume-Hcfwew744z4-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
        </div>
        <div
          :class="{
            'blob-light': currentTheme == 'light',
            'blob-dark': currentTheme == 'dark',
            'explore-item-small': $mq == 'mobile',
            'explore-item': ['tablet', 'laptop', 'desktop'].includes($mq)
          }"
          id="device"
          v-view.once="typerViewHandler"
        >
          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/brett-jordan--qUp3bejuzs-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
          <div class="explore-caption-right" v-motion-fade-visible>
            <vue-typer
              v-if="deviceIsVisible"
              text="Any device"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              Participants can vote using QR-code from any device and display
              the results in real-time. No login is needed as well.
            </h2>
          </div>
        </div>
        <div
          :class="$mq == 'mobile'?  'explore-item-small': 'explore-item'"
          id="poll-features"
          v-view.once="typerViewHandler"
        >
          <div class="explore-caption-left" v-motion-fade-visible>
            <vue-typer
              v-if="featuresIsVisible"
              text="Key features"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              You can create polls with time limit, with multiple choice and
              other key features to diversify polling process.
            </h2>
          </div>
          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/poll-example.png"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
        </div>
        <vs-button
          circle
          v-motion-pop-visible-once
          class="create-event-btn waypoint"
          size="xl"
          to="/polls"
          >Create your first live poll</vs-button
        >
      </div>
      <vs-card-group v-if="$mq !== 'mobile'">
        <vs-card
          v-for="event in polls"
          :key="event.pk"
          @click="$router.push('/polls/' + event.pk)"
        >
          <template #title>
            <h3>{{ event.name }}</h3>
          </template>
          <template #img>
            <img
              width="200"
              height="200"
              :src="randomPollImage(event.pk)"
              alt=""
            />
          </template>
          <template #text>
            <p>#{{ event.pk }}</p>
          </template>
          <template #interactions>
            <vs-button shadow primary>
              <unicon name="user" width="15" height="15" />
              <span> {{ event.owner.username }}</span>
            </vs-button>
          </template>
        </vs-card>
      </vs-card-group>
    </div>

    <div class="quizzes explore-items">
      <div class="explore-events">
        <h1 class="explore-head" id="quizzes">Quizzes</h1>
        <div
          :class="$mq == 'mobile'?  'explore-item-small': 'explore-item'"
          id="quiz-typer"
          v-view.once="typerViewHandler"
        >
          <div class="explore-caption" v-motion-fade-visible>
            <vue-typer
              v-if="quizzesIsVisible"
              text="Live Quizzes"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              Create your live online quiz and let your participants vote from
              any device using a link or QR code. You can join quiz without
              account, or login to save your results.
            </h2>
          </div>

          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/jeshoots-com-5EKw8Z7CgE4-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
        </div>
        <div
          :class="{
            'blob-light': currentTheme == 'light',
            'blob-dark': currentTheme == 'dark',
            'explore-item-small': $mq == 'mobile',
            'explore-item': ['tablet', 'laptop', 'desktop'].includes($mq)
          }"
          id="learn"
          v-view.once="typerViewHandler"
        >
          <img
            v-motion-slide-visible-once-left
            class="explore-image"
            src="../assets/chris-montgomery-smgTvepind4-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
          <div class="explore-caption-right" v-motion-fade-visible>
            <vue-typer
              v-if="learnIsVisible"
              text="Make your learning process interactive"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              Design a quiz with questions that fit the topic of your
              presentation or training. Add options and mark the correct
              answers.
            </h2>
          </div>
        </div>
        <div
          :class="$mq == 'mobile'?  'explore-item-small': 'explore-item'"
          id="fun"
          v-view.once="typerViewHandler"
        >
          <div class="explore-caption" v-motion-fade-visible>
            <vue-typer
              v-if="funIsVisible"
              text="Useful tool"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              Use our quizzes for online lessons, meetings, lectures and
              trainings. With it, your learning will never be boring again.
            </h2>
          </div>

          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/priscilla-du-preez-XkKCui44iM0-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
        </div>
        <vs-button
          circle
          v-motion-pop-visible-once
          class="create-event-btn waypoint"
          size="xl"
          to="/quizzes"
          >Create your first live quiz</vs-button
        >
      </div>
      <vs-card-group v-if="$mq !== 'mobile'">
        <vs-card
          v-for="event in quizzes"
          :key="event.pk"
          @click="$router.push('/quizzes/quiz/' + event.pk)"
        >
          <template #title>
            <h3>{{ event.name }}</h3>
          </template>
          <template #img>
            <img width="200" height="200" :src="randomImage(event.pk)" alt="" />
          </template>
          <template #text>
            <p>#{{ event.pk }}</p>
          </template>
          <template #interactions>
            <vs-button shadow primary>
              <unicon name="user" width="15" height="15" />
              <span> {{ event.owner.username }}</span>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <unicon width="15" height="15" name="question" />
              <span class="span"> {{ event.steps.length }} </span>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <unicon width="15" height="15" name="dialpad-alt" />
              <span class="span"> {{ event.enter_code }} </span>
            </vs-button>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
    <div class="events explore-items">
      <div class="explore-events">
        <h1 class="explore-head" id="events">Q&A Events</h1>
        <div
          :class="$mq == 'mobile'?  'explore-item-small': 'explore-item'"
          id="events-typer"
          v-view.once="typerViewHandler"
        >
          <div
            class="explore-caption"
            v-motion-fade-visible
            :enter="{
              transition: {
                delay: 2000,
              },
            }"
          >
            <vue-typer
              v-if="eventsIsVisible"
              text="Q&A Events"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              Create events, where other people can ask questions to you, or
              join to events witch was created by other users!
            </h2>
          </div>

          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/bruce-mars-FWVMhUa_wbY-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
        </div>
        <div
          :class="{
            'blob-light': currentTheme == 'light',
            'blob-dark': currentTheme == 'dark',
            'explore-item-small': $mq == 'mobile',
            'explore-item': ['tablet', 'laptop', 'desktop'].includes($mq)
          }"
          id="opinion-typer"
          v-view.once="typerViewHandler"
        >
          <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/karsten-winegeart-60GsdOMRFGc-unsplash.jpg"
            :width="$mq == 'mobile'? '100%': '50%'"
            alt=""
          />
          <div class="explore-caption-right" v-motion-fade-visible>
            <vue-typer
              v-if="opinionIsVisible"
              text="Express your opinion"
              :repeat="0"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="1500"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="select-all"
              :erase-on-complete="false"
              caret-animation="phase"
            ></vue-typer>
            <h2>
              You can not only ask your own questions, but also mark the
              questions you like and raise them up.
            </h2>
          </div>
        </div>
        <vs-button
          circle
          v-motion-pop-visible-once
          class="create-event-btn waypoint"
          size="xl"
          to="/qa"
          >Create your first Q&A event</vs-button
        >
      </div>
      <vs-card-group v-if="$mq !== 'mobile'">
        <vs-card
          v-for="event in events"
          :key="event.pk"
          @click="$router.push('/qa/events/' + event.pk)"
        >
          <template #title>
            <h3>{{ event.name }}</h3>
          </template>
          <template #img>
            <img width="200" height="200" :src="randomImage(event.pk)" alt="" />
          </template>
          <template #text>
            <p>#{{ event.pk }}</p>
          </template>
          <template #interactions>
            <vs-button shadow primary>
              <unicon name="user" width="15" height="15" />
              <span> {{ event.owner.username }}</span>
            </vs-button>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
  </div>
</template>

<script>
import { getQuizzes } from "../api/items/quizzes.api";
import { getEvents } from "../api/items/events.api";
import { getPolls } from "../api/items/polls.api";
import { VueTyper } from "vue-typer";
import { KinesisContainer, KinesisElement } from "vue-kinesis";
import {mapGetters} from "vuex"
export default {
  name: "Home",
  metaInfo: {
    title: "Home",
  },
  components: {
    VueTyper,
    KinesisContainer,
    KinesisElement,
  },
  data: () => {
    return {
      events: null,
      quizzes: null,
      polls: null,

      eventsIsVisible: false,
      opinionIsVisible: false,
      quizzesIsVisible: false,
      learnIsVisible: false,
      funIsVisible: false,
      pollsIsVisible: false,
      deviceIsVisible: false,
      featuresIsVisible: false,
    };
  },
  computed: {
    ...mapGetters(["currentTheme"])
  },
  methods: {
    randomPollImage(index) {
      let min = Math.ceil(index * 0 + 1);
      let max = Math.floor(6);
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      return require("../assets/poll/poll-" + num.toString() + ".jpg");
    },
    randomImage(index) {
      index = 1;
      let min = Math.ceil(index);
      let max = Math.floor(9);
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      return require("../assets/quiz/quiz-" + num.toString() + ".jpg");
    },
    typerViewHandler(e) {
      switch (e.target.element.id) {
        case "events-typer":
          this.eventsIsVisible = true;
          break;
        case "opinion-typer":
          this.opinionIsVisible = true;
          break;
        case "quiz-typer":
          this.quizzesIsVisible = true;
          break;
        case "learn":
          this.learnIsVisible = true;
          break;
        case "fun":
          this.funIsVisible = true;
          break;
        case "polls-typer":
          this.pollsIsVisible = true;
          break;
        case "device":
          this.deviceIsVisible = true;
          break;
        case "poll-features":
          this.featuresIsVisible = true;
          break;
      }
    },
  },
  created() {
    getQuizzes().then((response) => {
      this.quizzes = response.data.filter(
        (quiz) => !quiz.is_private && !quiz.done
      );
    });
    getEvents().then((response) => {
      this.events = response.data;
    });
    getPolls().then((response) => {
      this.polls = response.data;
    });
  },
};
</script>

<style>
.explore-header {
  background: url("../assets/polls-background-light2.svg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  display: flex;

  flex-direction: column;
  padding-top: 15%;
  padding-bottom: 20%;
  justify-content: center;
  align-items: center;
}
.explore-header-dark {
  background: url("../assets/polls-background-dark2.svg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  display: flex;

  flex-direction: column;
  padding-top: 15%;
  padding-bottom: 20%;
  justify-content: center;
  align-items: center;
}
.explore-title-header {
  font-size: 50px;
  color: white;
}

.explore .vs-card__group-cards {
}
.explore .vs-card__group {
  background-size: cover;
  padding: 5% 0;
  width: 90vw;
}
.explore .vs-card__img {
  width: 100%;
}
.header-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
}
.explore-items {
  padding: 10px 0;
}
.explore-events {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15%;

}
.explore-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 75px;
  padding: 10vw;
  padding-right: 10vw;
}
.explore-item-small {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 75px;
  padding: 10vw;
  padding-right: 10vw;
}
.explore-caption {
  text-align: left;
  margin-right: 10%;
}
.explore-caption-right {
  text-align: right;
  margin-left: 10%;
}
.explore-image {
  border-radius: 10px;
}
.create-event-btn {
  margin-bottom: 25%;
}
.explore-head {
  font-size: 3rem;
}
.vue-typer {
  font-size: 32px;
}
.vue-typer-dark {
  font-size: 32px;
  color: white;
}
.blob-light {
  background: url("../assets/blob-light.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.blob-dark {
  background: url("../assets/blob-dark.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.vue-typer .custom.caret {
  width: 15px;
  height: 35px;
  color: inherit;
}
.vue-typer .typed {
  color: inherit;
}
</style>
