<template>
   <div class="events-table">
        <h2>Avaliable events</h2>
        <vs-table striped>
            <template #header>
                <vs-input v-model="searchEvent" border placeholder="Search" />
            </template>
            <template #thead>
                <vs-tr>
                    <vs-th sort @click="events = $vs.sortData($event, events, 'name')">Name</vs-th>
                    <vs-th sort @click="events = $vs.sortData($event, events, 'owner.username')">Owner</vs-th>
                    <vs-th sort @click="events = $vs.sortData($event ,events, 'questions.length')">Total questions</vs-th>
                    <vs-th></vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr
                    v-for="event in $vs.getSearch(events, searchEvent)"
                    :key="event.pk"
                    :data="event"
                >
                    <vs-td>{{event.name}}</vs-td>
                    <vs-td>{{event.owner.username}}</vs-td>
                    <vs-td>{{ event.questions.length}}</vs-td>
                    <vs-td><vs-button
                        icon
                        border
                        circle
                        :to="'/qa/events/'+ event.pk"
                    >
                        <unicon name="angle-double-right" height="20" width="20" fill="royalblue" />
                    </vs-button></vs-td>
                </vs-tr>
            </template>
        </vs-table>
    </div>
</template>

<script>
export default {
    props: {
        events: Array
    },
    data: () => {
        return {
            searchEvent: ''
        }
    }
}
</script>

<style>
.events-table {
    display: flex;
    flex-direction: column;;
    margin-top: 150px;
    padding: 100px;
    width: 1000px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
