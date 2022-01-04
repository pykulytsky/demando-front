<template>
    <div class="qa-main">
        <div class="grid event-search">
            <vs-row align="center" justify="center">
                <h1>Enter identifier of event</h1>
            </vs-row>
            <vs-row  align="center" justify="center">
                <vs-col w="11">
                    <vs-input shadow v-model="eventId" color="primary" class="event-input"></vs-input>
                </vs-col>
                <vs-col w="1">
                    <vs-button @click="goToEvent" icon size="xl" class="go-btn">
                        <unicon class="arrow-btn" circle name="arrow-right" height="27" width="27" fill="white" />
                    </vs-button>
                </vs-col>
            </vs-row>
        </div>
        <div v-if="!isLogined" class="alert">
            <vs-alert gradient>
                <template #icon>
                    <unicon name="exclamation-triangle" />
                </template>
                <template #title>
                    Wants to create your own event?
                </template>
                To create your own event where other users can ask questions, you need to <router-link to="/login">log in</router-link> or <router-link to="/register">register</router-link> if you do not already have an account.
                <template #footer>
                    <vs-button-group>
                        <vs-button flat to="/login">Login</vs-button>
                        <vs-button flat to="/register">Register</vs-button>
                    </vs-button-group>

                </template>
            </vs-alert>
        </div>
        <div v-else class="create-event">

        </div>
        <event-table :events="events"></event-table>
    </div>
</template>

<script>
import {getEvents} from '../api/events.api'
import EventTable from '../components/events/EventTable.vue'
import {getEvent} from '../api/items/events.api'
import {mapActions, mapGetters} from 'vuex'

export default {
    data: () => {
        return {
            events: [],
            eventId: null
        }
    },
    components: {
        eventTable: EventTable
    },

    computed: {
        ...mapGetters(['isLogined'])
    },

    methods: {
        ...mapActions(['setLoading']),
        async goToEvent () {
            this.setLoading(true)
            if(this.eventId !== null) {
                try {
                    await (await getEvent(this.eventId)).data
                    this.$router.push('/qa/events/' + this.eventId)
                }
                catch(e) {
                    this.$vs.notification({
                        color: 'danger',
                        icon: '<unicon name="exclamation-triangle" fill="white"/>',
                        position: 'bottom-center',
                        title: "No event with such id was found",
                        text: "We could not find an event with such data, please try again!"
                    })
                    this.setLoading(false)
                }
            }
        }
    },
    async created() {
        this.events = await (await getEvents()).data
        console.log(this.events)
    }
}
</script>

<style>
.qa-main {
    display: flex;
    margin-top: 25px;
    flex-direction: column;
    align-items: center;
    padding: 25px;
}
.vs-button {
    margin-top: 12px;
}


.event-search .vs-input {
    font-size: 24px;
    min-width: 450px;
}

.arrow-btn {
    margin-left: 3px;
    margin-right: 3px;
}

.alert {
    margin-top: 100px;
}

.alert .vs-alert {
    max-width: 850px;
    padding: 15px 15px;
    height: 120px;
    font-family: 'Poppins', sans-serif;
}

</style>
