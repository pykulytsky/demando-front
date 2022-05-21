<template>
  <div class="explore">
    <div class="explore-header" v-responsive.lg.xl>
      <h1 class="explore-title-header" v-motion-fade>
        Create or participate in polls, quizzes or events where you can ask
        question. Explore events to find out one you are interested in.
      </h1>
      <div class="header-buttons" v-motion-fade>
        <vs-button
          size="xl"
          flat
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
    <div class="events explore-items">
      <div class="explore-events">
        <h1 class="explore-head" id="events">Events</h1>
        <div class="explore-item">
          <div class="explore-caption" v-motion-fade-visible>
            <h1>Q&A Events</h1>
            <h2>
              Create events, where other people can ask questions to you, or
              join to events witch was created by other users!
            </h2>
          </div>

          <img
            v-motion-slide-visible-right
            class="explore-image"
            src="../assets/bruce-mars-FWVMhUa_wbY-unsplash.jpg"
            width="550"
            alt=""
          />
        </div>
        <div class="explore-item">
          <img
            v-motion-slide-visible-left
            class="explore-image"
            src="../assets/karsten-winegeart-60GsdOMRFGc-unsplash.jpg"
            width="550"
            alt=""
          />
          <div class="explore-caption-right" v-motion-fade-visible>
            <h1>Express your own opinion</h1>
            <h2>
              You can not only ask your own questions, but also mark the questions you like and raise them up.
            </h2>
          </div>
        </div>
        <vs-button circle v-motion-pop-visible-once class="create-event-btn" size="xl">Create your first Q&A event</vs-button>
      </div>
      <vs-card-group>
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
    <div class="quizzes explore-items">
      <div class="explore-events">
        <h1 class="explore-head" id="quizzes">Quizzes</h1>
        <div class="explore-item">
          <div class="explore-caption" v-motion-fade-visible>
            <h1>Live Quizzes</h1>
            <h2>
              Create your live online quiz and let your participants vote from any device using a link or QR code. You can join quiz without account, or login to save your results.
            </h2>
          </div>

          <img
            v-motion-slide-visible-right
            class="explore-image"
            src="../assets/jeshoots-com-5EKw8Z7CgE4-unsplash.jpg"
            width="550"
            alt=""
          />
        </div>
        <div class="explore-item">
          <img
            v-motion-slide-visible-left
            class="explore-image"
            src="../assets/chris-montgomery-smgTvepind4-unsplash.jpg"
            width="550"
            alt=""
          />
          <div class="explore-caption-right" v-motion-fade-visible>
            <h1>Make your learning process fun and interactive</h1>
            <h2>
              Design a quiz with questions that fit the topic of your presentation or training. Add options and mark the correct answers.
            </h2>
          </div>
        </div>
        <div class="explore-item">
          <div class="explore-caption" v-motion-fade-visible>
            <h1>Useful tool</h1>
            <h2>
              Use our quizzes for online lessons, meetings, lectures and trainings. With it, your learning will never be boring again.
            </h2>
          </div>

          <img
            v-motion-slide-visible-right
            class="explore-image"
            src="../assets/priscilla-du-preez-XkKCui44iM0-unsplash.jpg"
            width="550"
            alt=""
          />
        </div>
      </div>
      <vs-card-group>
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
    <div class="polls explore-items">
      <h1 class="explore-head" id="polls">Polls</h1>
      <vs-card-group>
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
  </div>
</template>

<script>
import { getQuizzes } from "../api/items/quizzes.api";
import { getEvents } from "../api/items/events.api";
import { getPolls } from "../api/items/polls.api";
export default {
  name: "Home",
  metaInfo: {
    title: "Home",
  },
  data: () => {
    return {
      events: null,
      quizzes: null,
      polls: null,
    };
  },
  methods: {
    randomPollImage(index) {
      console.log(index);
      let min = Math.ceil(1);
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
  background: linear-gradient(-45deg, #ee7752, #c55982, #538ba0, #42e6bf);
  animation: gradient 15s ease infinite;
  text-align: center;
  display: flex;

  padding-left: 12.5%;
  margin-left: -12.5%;
  padding-right: 12.5%;
  margin-right: 0;
  flex-direction: column;
  padding-top: 15%;
  padding-bottom: 15%;
  justify-content: center;
  align-items: center;
}
.explore-title-header {
  font-size: 50px;
  margin: 5%;
  margin-left: 20%;
}

.explore-header .vs-button__content {
  font-size: 40px;
}
.explore .vs-card__group-cards {
  max-width: 1300px;
}
.header-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12%;
}
.explore-items {
  padding: 10px 10%;
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
}
.explore-caption {
  text-align: left;
}
.explore-caption-right {
  text-align: right;
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
</style>
