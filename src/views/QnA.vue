<template>
  <div class="qa-main">
    <div class="qa-header">
      <h1 class="qa-title-header">Create events, where other people can ask questions to you, or join to events witch was created by other users!</h1>
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
    <div class="event-search">
      <vs-row align="center" justify="center">
        <h1>Enter identifier of event</h1>
      </vs-row>
      <vs-row align="center" justify="center">
        <vs-col w="11">
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
    <event-table :events="events"></event-table>
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
    };
  },
  components: {
    EventTable,
    NewEventDialog,
  },

  computed: {
    ...mapGetters(["isLogined"]),
  },

  methods: {
    ...mapActions(["setLoading"]),
    async goToEvent() {
      this.setLoading(true);
      if (this.eventId !== null) {
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
          this.setLoading(false);
        }
      }
    },
    async fetchEvents() {
      this.events = await (await getEvents(5, "created", true)).data;
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
  min-width: 450px;
}
.arrow-btn {
  margin-left: 3px;
  margin-right: 3px;
}

.alert {
  margin-top: 100px;
}

.alert .vs-alert {
  max-width: 850px;
  padding: 15px 15px;
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
  background: linear-gradient(-45deg, #ee7752, #c55982, #538ba0, #42e6bf);
  background-size: 400% 400%;
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
.qa-title-header {
  font-size: 50px;
  margin: 5%;
  margin-left: 20%;
}
.qa-header .vs-button {
  width: 50px;
  margin-left: 15%;
}
.qa-header .vs-button__content {
  font-size: 40px;
}
</style>
