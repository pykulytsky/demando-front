<template>
  <vs-dialog v-model="isShown">
    <template #header>
      <h4 class="not-margin">
        Are you shure you want to delete event <strong>{{ eventName }}</strong>
      </h4>
    </template>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="handleDeleteEvent" transparent> Yes </vs-button>
        <vs-button @click="emit('handleClose')" danger transparent>
          No
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

>
<script>
import {deleteEvent} from '../../api/items/events.api'
export default {
  props: {
    isShown: Boolean,
    eventId: String,
    eventName: String,
  },
  methods: {
    async handleDeleteEvent() {
      await deleteEvent(this.eventId)
      this.$emit('handleCloseSuccess')
    }
  }
};
</script>
