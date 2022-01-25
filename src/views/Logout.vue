<template>
    <div :class="{logout, 'logout-dark': currentTheme === 'dark'}">
        <vs-row>
            <h3>Are you sure you want to sign out?</h3>
        </vs-row>
        <vs-row justify="flex-end">
            <vs-col w="3">
                <vs-button @click="onConfirm">Confirm</vs-button>
            </vs-col>
            <vs-col w="4">
                <vs-button :to="from">Go back</vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Logout',
    metaInfo: {
        title: 'Logout'
    },
    data: () => {
        return {
            from: ''
        }
    },
    computed: {
        ...mapGetters(['isLogined', 'currentTheme'])
    },
    methods: {
        ...mapActions(['logout']),
        async onConfirm() {
            await this.logout()
            this.$router.push('/login')
        }
    },
    created() {
        this.from = this.$route.query.from
    }
}
</script>

<style>
.logout {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    padding: 15px;
    border-radius: 20px;
}
.logout-dark {
    background-color: rgb(30, 32, 35);
}
</style>
