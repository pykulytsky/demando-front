<template>
  <div class="question-item">
    <vs-row justify="space-between">
      <vs-col w="2">
        <unicon name="user" height="15" width="18" fill="royalblue" />
        <i>{{ question.author.username }}</i>
      </vs-col>
      <vs-col w="2">
        <vs-row>
          <vs-col w="10">
            <unicon name="calender" :fill="iconColor" />
            {{ question.created }} ago
          </vs-col>
          <vs-col w="2">
            <vs-tooltip
              v-if="currentUser.pk == question.author.pk"
              bottom
              shadow
              not-hover
              v-model="activeActions"
            >
              <unicon
                @click="activeActions = !activeActions"
                name="ellipsis-v"
                :fill="iconColor"
              />
              <template #tooltip>
                <div class="content-tooltip">
                  <vs-button
                    square
                    transparent
                    dark
                    block

                  > Edit </vs-button>
                  <vs-button
                    square
                    transparent
                    dark
                    block
                    @click="handleDeleteQuestion"
                  > Delete </vs-button>
                </div>
              </template>
            </vs-tooltip>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
    <vs-row>
      <h2>{{ question.body }}</h2>
    </vs-row>
    <vs-row justify="flex-end" align="center">
      <unicon @click="updateLikes(-1)" name="thumbs-down" :fill="iconColor" />
      {{ question.likes_count }}
      <unicon @click="updateLikes(1)" name="thumbs-up" :fill="iconColor" />
    </vs-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { patchQuestion, deleteQuestion } from "../../api/items/questions.api";

export default {
  props: {
    question: Object,
  },
  data: () => {
    return {
      activeActions: false,
    };
  },

  computed: {
    ...mapGetters(["iconColor", "currentUser"]),
  },

  methods: {
    async updateLikes(step) {
      await patchQuestion(
        {
          likes_count: this.question.likes_count + step,
        },
        this.question.pk
      );
      this.$emit("updateQuestions");
    },
    async handleDeleteQuestion() {
      await deleteQuestion(this.question.pk)
      this.$emit('updateQuestions')
      this.activeActions = false
    }
  },
};
</script>

<style>
.question-item {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  min-width: 100%;
  max-width: 900px;
  border: 3px royalblue solid;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.question-item i {
  color: royalblue;
}

.question-item .unicon:hover {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.question-item .vs-tooltip-content {
  max-width: 10px;
  width: 10px;
}
.content-tooltip .vs-button {
  width: 100px;
  min-width: 100%;
  margin-left: 0;
}
.vs-tooltip {
  padding: 0;
}
</style>
