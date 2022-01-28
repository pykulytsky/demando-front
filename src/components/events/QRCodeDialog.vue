<template>
    <vs-dialog @close="$emit('handleClose')" v-model="isShown">
        <qrcode-vue class="qr-code__dialog" :value="link" :size="450" level="H" />
    </vs-dialog>
</template>

<script>
import QrcodeVue from "qrcode.vue";
export default {
    components: {
        QrcodeVue
    },
    props: {
        link: String,
        isShown: Boolean,
    }
}
</script>

<style scoped>
.qr-code__dialog {
    padding: 11px;
    padding-bottom: 0;
}
</style>
