<template>
    <div class="logout">
        <vs-row>
            <h3>Are you sure you want to sign out?</h3>
        </vs-row>
        <vs-row justify="flex-end">
            <vs-col w="3">
                <vs-button @click="onConfirm">Confirm</vs-button>
            </vs-col>
            <vs-col w="4">
                <vs-button>Go back</vs-button>
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
    computed: {
        ...mapGetters(['isLogined'])
    },
    methods: {
        ...mapActions(['logout']),
        async onConfirm() {
            await this.logout()
            this.$router.push('/login')
        }
    },
    beforeCreate() {

    }
}
</script>

<style>
.logout {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    border-radius: 20px;
    background-color: rgb(30, 32, 35);
}
</style>
