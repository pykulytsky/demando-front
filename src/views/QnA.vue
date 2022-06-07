<template>
  <div class="qa-main">
    <div
      :class=" currentTheme == 'light' ? 'qa-header': 'qa-header-dark'"
        v-rellax="{
          speed: -6,
        }"
    >
      <h1
        :class="$mq !== 'mobile'? 'polls-header-title': 'polls-header-title-small'"
        v-rellax="{
          speed: 4,
        }"
      >Create events, where other people can ask questions to you, or join to events witch was created by other users!</h1>
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
          <unicon  name="arrow-down" />
      </vs-button>
    </div>
    <div
      :class="{
        'event-search': $mq !== 'mobile' && currentTheme == 'light',
        'event-search-small': $mq == 'mobile' && currentTheme == 'light',
        'event-search-dark': $mq !== 'mobile' && currentTheme == 'dark',
        'event-search-small-dark': $mq == 'mobile' && currentTheme == 'dark'
      }"
      v-motion-pop-visible-once
    >
      <h1>Enter identifier of event</h1>
      <vs-row align="center" justify="center">
        <vs-col w="9">
          <vs-input
            id="event-search"
            placeholder="Enter id of event..."
            shadow
            v-model="eventId"
            color="primary"
            class="event-input"
            @keydown.enter="goToEvent"
          />
        </vs-col>
        <vs-col w="1">
          <vs-button @click="goToEvent" icon size="xl" class="go-btn">
            <unicon
              class="arrow-btn"
              circle
              name="arrow-right"
              height="27"
              width="27"
              fill="white"
            />
          </vs-button>
        </vs-col>
      </vs-row>
    </div>
    <div v-if="!isLogined" class="alert">
      <vs-alert gradient>
        <template #icon>
          <unicon name="exclamation-triangle" />
        </template>
        <template #title> Wants to create your own event? </template>
        To create your own event where other users can ask questions, you need
        to <router-link to="/login">log in</router-link> or
        <router-link to="/register">register</router-link> if you do not already
        have an account.
        <template #footer>
          <vs-button-group>
            <vs-button flat to="/login">Login</vs-button>
            <vs-button flat to="/register">Register</vs-button>
          </vs-button-group>
        </template>
      </vs-alert>
    </div>
    <event-table v-if="$mq !== 'mobile'" :events="events"></event-table>
<div class="events explore-items">
      <div class="explore-events">
        <h1
          class="explore-head"
          id="events"
          v-rellax="{
            speed: $mq !== 'mobile'? -0.2: 0,
          }"
        >
          Q&A Events
        </h1>
        <div
          :class="$mq == 'mobile' ? 'explore-item-small' : 'explore-item'"
          id="events-typer"
          v-view.once="typerViewHandler"
        >
          <div
            :class="
              $mq !== 'mobile' ? 'explore-caption' : 'explore-caption-small'
            "
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

          <!-- <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/bruce-mars-FWVMhUa_wbY-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
          <lottie-animation
            ref="anim"
            :animationData="require('@/assets/lottie/80600-social-123.json')"
            :loop="true"
          />
        </div>
        <div
          :class="{
            'blob-light': currentTheme == 'light',
            'blob-dark': currentTheme == 'dark',
            'explore-item-small': $mq == 'mobile',
            'explore-item': ['tablet', 'laptop', 'desktop'].includes($mq),
          }"
          id="opinion-typer"
          v-view.once="typerViewHandler"
        >
          <!-- <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/karsten-winegeart-60GsdOMRFGc-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
          <lottie-animation
            ref="anim"
            :animationData="require('@/assets/lottie/67908-duck.json')"
            :loop="true"
            :width="$mq == 'mobile' ? '150%' : '50%'"
          />
          <div
            :class="
              $mq !== 'mobile'
                ? 'explore-caption-right'
                : 'explore-caption-right-small'
            "
            v-motion-fade-visible
          >
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
    </div>
    <vs-button
      v-if="isLogined"
      class="add-event-btn"
      circle
      icon
      floating
      @click="newEventIsShown = true"
    >
      <unicon name="plus" fill="white" />
    </vs-button>
    <new-event-dialog
      @handleCreate="fetchEvents"
      @handleClose="newEventIsShown = false"
      :isShown="newEventIsShown"
    />
  </div>
</template>

<script>
import EventTable from "../components/events/EventTable.vue";
import NewEventDialog from "../components/events/NewEventDialog.vue";
import { getEvent, getEvents } from "../api/items/events.api";
import { mapActions, mapGetters } from "vuex";
import LottieAnimation from "lottie-web-vue";
import { VueTyper } from "vue-typer";
export default {
  name: "QnA",
  metaInfo: {
    title: "Q&A",
  },
  data: () => {
    return {
      events: [],
      eventId: null,
      newEventIsShown: false,

      eventsIsVisible: false,
      opinionIsVisible: false,
    };
  },
  components: {
    EventTable,
    NewEventDialog,
    LottieAnimation,
    VueTyper
  },

  computed: {
    ...mapGetters(["isLogined", "currentTheme"]),
  },

  methods: {
    ...mapActions(["setLoading"]),
    async goToEvent() {
      this.setLoading(true);
      try {
        await (
          await getEvent(this.eventId)
        ).data;
        this.$router.push("/qa/events/" + this.eventId);
      } catch (e) {
        this.$vs.notification({
          color: "danger",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          title: "No event with such id was found",
          text: "We could not find an event with such data, please try again!",
        });
      }

      this.setLoading(false);
    },
    async fetchEvents() {
      this.events = await (await getEvents(5, "created", true)).data;
    },
    typerViewHandler(e) {
      switch (e.target.element.id) {
        case "events-typer":
          this.eventsIsVisible = true;
          break;
        case "opinion-typer":
          this.opinionIsVisible = true;
          break;
      }
    },
  },
  async created() {
    await this.fetchEvents();
  },
};
</script>

<style>
.qa-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vs-button {
  margin-top: 12px;
}

.event-search .vs-input {
  font-size: 24px;
  width: 25vw;
}
.event-search .vs-input-content {
  font-size: 24px;
  background-color: #a8adb7;
  width: 28vw;
}

.event-search-small .vs-input {
  font-size: 24px;
  width: 72vw;
}
.event-search-small .vs-input-content {
  font-size: 24px;
  background-color: #a8adb7;
  width: 73vw;
}
.event-search-dark .vs-input {
  font-size: 24px;
  width: 25vw;
}
.event-search-dark .vs-input-content {
  font-size: 24px;
  background-color: #1e2023;
  width: 28vw;
}

.event-search-small-dark .vs-input {
  font-size: 24px;
  width: 72vw;
}
.event-search-small-dark .vs-input-content {
  font-size: 24px;
  background-color: #1e2023;
  width: 73vw;
}

.alert {
  margin-top: 100px;
}

.alert .vs-alert {
  max-width: 850px;
  height: 120px;
  font-family: "Poppins", sans-serif;
}
.qa-main .add-event-btn {
  position: fixed;
  right: 5%;
  bottom: 5%;
  padding: 7px 8px;
  border-radius: 50px;
}
.qa-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 650px;
  padding: 0 10vw;
  padding-bottom: 100px;
  position: relative;
  background: url("../assets/polls-background-light3.svg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
.qa-header-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 650px;
  padding: 0 10vw;
  padding-bottom: 100px;
  position: relative;
  background: url("../assets/polls-background-dark3.svg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
.qa-title-header {
  font-size: 50px;
  color: white;
}
.qa-header .vs-button {
  width: 50px;
}
.qa-header .vs-button__content {
  font-size: 40px;
}
/* @media screen and (max-width: 400px) {
  .event-search .vs-input__content {
    font-size: 24px;
    max-width: 45%;
  }
  .qa-header {
    padding-left: 0%;
    margin-left: 0%;
    padding-right: 0%;
    margin-right: 0;
  }
}
.vs-input-parent--shadow .vs-input-content .vs-input {
    background: transparent;
    border-radius: 0px;
    border: 2px solid transparent;
    width: 100%;
} */
.event-search h1 {
  text-align: center;
}
</style>
