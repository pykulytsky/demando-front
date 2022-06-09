<template>
  <div class="events-table">
    <h2>Related polls</h2>
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
            v-if="$mq !== 'mobile'"
            sort
            @click="polls = $vs.sortData($event, polls, 'owner.username')"
            >Owner</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile'"
            sort
            @click="polls = $vs.sortData($event, polls, 'votes.length')"
            >Total votes</vs-th
          >
          <vs-th></vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="poll in $vs.getSearch(polls, searchPoll)"
          :key="poll.pk"
          :data="poll"
        >
          <vs-td>{{ poll.name }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile'"
          >{{ poll.owner.username }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile'"
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
    </vs-table>
  </div>
</template>

<script>
export default {
  props: {
    polls: Array,
  },
  data: () => {
    return {
      searchPoll: "",
    };
  },
};
</script>

<style>
.events-table {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  width: 80vw;
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
