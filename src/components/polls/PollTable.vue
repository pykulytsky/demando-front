<template>
  <div :class="onProfile ? '': 'events-table'">
    <h2 v-if="!onProfile">Explore polls</h2>
    <vs-table striped>
      <template #header>
        <vs-input v-model="searchPoll" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="polls = $vs.sortData($event, polls, 'name')"
            >Name</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && !onProfile"
            sort
            @click="polls = $vs.sortData($event, polls, 'owner.username')"
            >Owner</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && onProfile"
            sort
            @click="polls = $vs.sortData($event, polls, 'allowed_votes')"
            >Allowed votes</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && !onProfile"
            sort
            @click="polls = $vs.sortData($event, polls, 'votes.length')"
            >Total votes</vs-th
          >
          <vs-th></vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="poll in $vs.getPage($vs.getSearch(polls, searchPoll), page, max)"
          :key="poll.pk"
          :data="poll"
        >
          <vs-td>{{ poll.name }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile' && !onProfile"
          >{{ poll.owner.username }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile' && onProfile"
          >{{ poll.allowed_votes }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile' && !onProfile"
          >{{ poll.votes.length }}</vs-td>
          <vs-td
            ><vs-button icon border circle :to="'/polls/' + poll.pk">
              <unicon
                name="angle-double-right"
                height="20"
                width="20"
              /> </vs-button
          ></vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(polls, max)" />
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  props: {
    polls: Array,
    onProfile: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      searchPoll: "",
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
  width: 80vw;
}
.events-table-profile {
  display: flex;
  flex-direction: column;
  width: 95vw;
}

.vs-table__tr:first-of-type .vs-table__td:first-child {
    border-radius: 0px 0px 0px 15px;
    width: 45%;
}

.vs-table__td:last-child {
    border-radius: 0px 15px 15px 0px;
    align-items:flex-start;
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
