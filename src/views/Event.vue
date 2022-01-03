<template>
    <div class="event-main">
        <div class="event-header">

        </div>
        <div class="event-content">

        </div>
        <div class="event-footer">
            
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data: () => {
        return {
            eventId: null
        }
    },
    methods: {...mapActions(['setLoading'])},
    created() {
        this.eventId = this.$route.params.pk
        this.setLoading(false)
    }
}
</script>
