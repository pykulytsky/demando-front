<template>
  <vs-dialog width="300px" @close="$emit('handleClose')" not-center v-model="isShown">
    <template #header>
      <h4 class="not-margin">Create new <b>Event</b></h4>
    </template>

    <div class="con-content">
      <vs-input v-model="eventName" placeholder="Event name"></vs-input>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="handleEventCreate" success flat> Create </vs-button>
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
            eventName: ''
        }
    },
    methods: {
        async handleEventCreate() {
            await createEvent(this.eventName)
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
