<template>
  <vs-dialog width="300px" @close="$emit('handleClose')" not-center v-model="isShown">
    <template #header>
      <h4 class="not-margin">Create new <b>Event</b></h4>
    </template>

    <div class="con-content">
      <vs-input v-if="!eventCreated" v-model="eventName" placeholder="Event name">
        <template v-if="eventName.length < 6 && eventName.length !== 0" #message-danger>
          At least 6 symbols
        </template>
      </vs-input>
      <div v-else class="event-info-after">
        <h2>Event was succesfully created!</h2>
        <h3>Your event ID: <router-link :to="'/qa/events/' + newEvent.pk"><b>{{newEvent.pk}}</b></router-link></h3>
      </div>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button v-if="!eventCreated"  @click="handleEventCreate" success flat> Create </vs-button>
        <vs-button @click="$emit('handleClose')" danger flat>
          Cancel
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import {createEvent} from '../../api/items/events.api'
export default {
    props: {
        isShown: Boolean
    },
    data: () => {
        return {
            eventName: '',
            newEvent: null,
            eventCreated: false
        }
    },
    methods: {
        async handleEventCreate() {
            if(this.eventName.length > 6) {
              this.newEvent = await (await createEvent(this.eventName)).data
              this.eventName = ''
              this.eventCreated = true
              console.log(this.newEvent)
            }

        }
    }
}
</script>

<style>
.con-content .vs-input {
    width: 100%;
}
.con-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
