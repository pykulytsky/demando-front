<template>
  <div :class="onProfile ? '': 'events-table'">
    <h2 v-if="!onProfile">Explore events</h2>
    <vs-table striped>
      <template #header>
        <vs-input v-model="searchEvent" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="events = $vs.sortData($event, events, 'name')"
            >Name</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && !onProfile"
            sort
            @click="events = $vs.sortData($event, events, 'owner.username')"
            >Owner</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && !onProfile"
            sort
            @click="events = $vs.sortData($event, events, 'questions.length')"
            >Total questions</vs-th
          >
          <vs-th></vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="event in $vs.getPage($vs.getSearch(events, searchEvent), page, max)"
          :key="event.pk"
          :data="event"
        >
          <vs-td>{{ event.name }}</vs-td>
          <vs-td

            v-if="$mq !== 'mobile' && !onProfile"
          >{{ event.owner.username }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile' && !onProfile"
          >{{ event.questions.length }}</vs-td>
          <vs-td
            ><vs-button icon border circle :to="'/qa/events/' + event.pk">
              <unicon
                name="angle-double-right"
                height="20"
                width="20"
              /> </vs-button
          ></vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(events, max)" />
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  props: {
    events: Array,
    onProfile: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      searchEvent: "",
      page: 1,
      max: 10,
    };
  },
  created() {
    if(this.onProfile) {
      this.max = 5
    } else {
      this.max = 10
    }
  }
};
</script>

<style>
.events-table {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  width: 70%;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
