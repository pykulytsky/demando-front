<template>
  <div :class="onProfile? '': 'quizzes-table'">
    <h2 v-if="!onProfile">Explore quizzes</h2>
    <vs-table striped>
      <template #header>
        <vs-input v-model="searchQuiz" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th sort @click="quizzes = $vs.sortData($event, quizzes, 'name')"
            >Name</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && !onProfile"
            sort
            @click="quizzes = $vs.sortData($event, quizzes, 'owner.username')"
            >Owner</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && !onProfile"
            sort
            @click="quizzes = $vs.sortData($event, quizzes, 'steps.length')"
            >Total questions</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && onProfile"
            sort
            @click="quizzes = $vs.sortData($event, quizzes, 'done')"
            >Done</vs-th
          >
          <vs-th
            v-if="$mq !== 'mobile' && onProfile"
            sort
            @click="quizzes = $vs.sortData($event, quizzes, 'enter_code')"
            >PIN code</vs-th
          >
          <vs-th></vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="quiz in $vs.getPage($vs.getSearch(quizzes, searchQuiz), page, max)"
          :key="quiz.pk"
          :data="quiz"
        >
          <vs-td>{{ quiz.name }}</vs-td>
          <vs-td

            v-if="$mq !== 'mobile' && !onProfile"
          >{{ quiz.owner.username }}</vs-td>
          <vs-td
            v-if="$mq !== 'mobile' && !onProfile"
          >{{ quiz.steps.length }}</vs-td>
          <vs-td
            v-if="onProfile"
          >{{ quiz.done }}</vs-td>
          <vs-td
            v-if="onProfile"
          >{{ quiz.enter_code }}</vs-td>
          <vs-td
            ><vs-button icon border circle :to="'/quizzes/quiz/' + quiz.pk">
              <unicon
                name="angle-double-right"
                height="20"
                width="20"
              /> </vs-button
          ></vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(quizzes, max)" />
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  props: {
    quizzes: Array,
    onProfile: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      searchQuiz: "",
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
.quizzes-table {
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  width: 80vw;
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
