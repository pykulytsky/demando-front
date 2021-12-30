<template>
    <div class="qa-main">
        <div class="grid event-search">
            <vs-row align="center" justify="center">
                <h1>Enter name of event</h1>
            </vs-row>
            <vs-row  align="center" justify="center">
                <vs-col w="11">
                    <vs-input class="event-input"></vs-input>
                </vs-col>
                <vs-col w="1">
                    <vs-button icon size="xl" class="go-btn">
                        <unicon class="arrow-btn" circle name="arrow-right" height="27" width="27" fill="white" />
                    </vs-button>
                </vs-col>
            </vs-row>

        </div>
        <div class="events-table">
            <h2>Avaliable events</h2>
            <vs-table>
                <template #thead>
                    <vs-tr>
                        <vs-th>Name</vs-th>
                        <vs-th>Owner</vs-th>
                        <vs-th>Total questions</vs-th>
                        <vs-th></vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr
                      v-for="event in events"
                      :key="event.id"
                      :data="event"
                    >
                        <vs-td>{{event.name}}</vs-td>
                        <vs-td>{{event.owner.username}}</vs-td>
                        <vs-td>{{ event.questions.length}}</vs-td>
                        <vs-td><vs-button
                            icon
                            border
                            circle
                            :active="false"
                        >
                           <unicon name="angle-double-right" height="20" width="20" fill="royalblue" />
                        </vs-button></vs-td>
                    </vs-tr>
                </template>
            </vs-table>
        </div>
    </div>
</template>

<script>
import {getEvents} from '../api/events.api'
export default {
    data: () => {
        return {
            events: []
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

.events-table {
    display: flex;
    flex-direction: column;;
    margin-top: 250px;
    padding: 100px;
    width: 1000px;
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

</style>
