<template>

</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions(['setLoading'])
    },
    mounted() {
        this.setLoading(true)
        this.setLoading(false)
    }
}
</script>
