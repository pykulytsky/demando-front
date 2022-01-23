<template>
    <div class="new-event">
        <transition name="fade">
            <a v-if="!formIsShown" href="#" @click="formIsShown = true">
                Create your own event
            </a>
            <div v-else class="event-create">
                <vs-input />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            formIsShown: false
        }
    }
}
</script>

<style>
.new-event {
    margin-top: 55px;
}

.fade-enter, .fade-leave-to {
  transition: opacity .1s;
}
</style>
