<template>
  <div class="explore">
    <div class="explore-header">
      <h1 class="explore-title-header">
        Create or participate in polls, quizzes or events where you can ask
        question. Explore events to find out one you are interested in.
      </h1>
      <vs-button
        size="xl"
        flat
        icon
        circle
        v-scroll-to="{
          el: '#event-search',
          offset: -80,
          easing: 'ease-in-out',
        }"
      >
        <unicon name="arrow-down" />
      </vs-button>
    </div>
    <div class="events">
      <h2>Events</h2>
      <vs-card-group>
        <vs-card v-for="event in events" :key="event.pk" @click="$router.push('/qa/events/' + event.pk)">
          <template #title>
            <h3>{{ event.name }}</h3>
          </template>
          <template #img>
            <img :src="randomImage(event.pk)" alt="" />
          </template>
          <template #text>
            <p>#{{ event.pk }}</p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class="bx bx-chat"></i>
              <span class="span"> 54 </span>
            </vs-button>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
    <div class="quizzes">
      <h2>Quizzes</h2>
      <vs-card-group>
        <vs-card v-for="event in quizzes" :key="event.pk" @click="$router.push('/quizzes/quiz/' + event.pk)">
          <template #title>
            <h3>{{ event.name }}</h3>
          </template>
          <template #img>
            <img :src="randomImage(event.pk)" alt="" />
          </template>
          <template #text>
            <p>#{{ event.pk }}</p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class="bx bx-chat"></i>
              <span class="span"> 54 </span>
            </vs-button>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
    <div class="polls">
      <h2>Polls</h2>
      <vs-card-group>
        <vs-card v-for="event in polls" :key="event.pk" @click="$router.push('/polls/' + event.pk)">
          <template #title>
            <h3>{{ event.name }}</h3>
          </template>
          <template #img>
            <img :src="randomPollImage(event.pk)" alt="" />
          </template>
          <template #text>
            <p>#{{ event.pk }}</p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class="bx bx-chat"></i>
              <span class="span"> 54 </span>
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
      console.log(index)
      let min = Math.ceil(1);
      let max = Math.floor(6);
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      return require("../assets/poll/poll-" + num.toString() + ".jpg");
    },
    randomImage(index) {
      console.log(index)
      let min = Math.ceil(1);
      let max = Math.floor(9);
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      return require("../assets/quiz/quiz-" + num.toString() + ".jpg");
    },
  },
  created() {
    getQuizzes().then((response) => {
      this.quizzes = response.data;
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
.explore-header .vs-button {
  width: 50px;
  margin-left: 15%;
}
.explore-header .vs-button__content {
  font-size: 40px;
}
.explore .vs-card__group-cards {
  max-width: 1300px;
}
</style>
