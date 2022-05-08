<template>
  <vs-dialog
    @close="$emit('handleClose')"
    overflow-hidden
    blur
    v-model="isShown"
  >
    <template #header>
      <h3 class="text-center">Actions</h3>
    </template>
    <vs-button flat block @click="copyToClipBoard">Share</vs-button>
    <vs-button flat block>Info</vs-button>
    <vs-button flat block @click="qrCodeIsShown = true">QR Code</vs-button>
    <div v-if="isCurrentUserOwner">
      <vs-button flat warn block>Edit</vs-button>
      <vs-button flat danger block @click="deleteEventIsShown = true">Delete</vs-button>
    </div>
    <qr-code-dialog
      @handleClose="qrCodeIsShown = false"
      :isShown="qrCodeIsShown"
    ></qr-code-dialog>

    <delete-event-dialog
      @handleClose="deleteEventIsShown = false"
      @handleCloseSuccess="handleDeleteEvent"
      :eventId="eventId"
      :eventName="eventName"
      :isShown="deleteEventIsShown"
    />
  </vs-dialog>
</template>

<script>
import QRCodeDialog from "./QRCodeDialog.vue";
import DeleteEvent from "./DeleteEvent.vue";
export default {
  props: {
    isShown: Boolean,
    isCurrentUserOwner: {
      type: Boolean,
      default: false,
    },
    eventId: String,
    eventName: String,
  },
  components: {
    qrCodeDialog: QRCodeDialog,
    deleteEventDialog: DeleteEvent,
  },
  data: () => {
    return {
      qrCodeIsShown: false,
      deleteEventIsShown: false,
    };
  },
  methods: {
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

    async handleDeleteEvent() {
      this.$router.push("/qa");
      this.$vs.notification({
        icon: "<unicon name='share' fill='white' />",
        position: "bottom-right",
        duration: 2000,
        title: "Event was successfully deleted",
      });
    },
  },
};
</script>
