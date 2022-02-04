<template>
  <vs-row class="new-question" align="center" justify="center">
    <vs-col w="10">
      <vs-input
        placeholder="Enter your question..."
        shadow
        v-model="questionName"
        color="primary"
        class="question-input"
        @keydown.enter="handleCreateQuestion"
      />
    </vs-col>
    <vs-col w="1">
      <vs-button @click="handleCreateQuestion" icon size="xl" class="go-btn">
        <unicon
          class="arrow-btn"
          circle
          name="arrow-right"
          height="27"
          width="27"
          fill="white"
        />
      </vs-button>
    </vs-col>
    <vs-col class="cancel-btn" w="1">
      <unicon class="close__new__question" @click="$emit('handleIsShown')" name="times" />
    </vs-col>
  </vs-row>
</template>

<script>
import { mapGetters } from "vuex";
import {createQuestion} from '../../api/items/questions.api'
export default {
    props: {
        eventId: String
    },
    data: () => {
        return {
            questionName: ''
        }
    },
    computed: {...mapGetters(['iconColor'])},
    methods: {
        async handleCreateQuestion() {
            await createQuestion(this.eventId, this.questionName)

            this.$emit('handleIsShown')
            this.$emit('updateQuestions')
        }
    }
}
</script>

<style>
.new-question {
    margin-top: 40px;
}
.new-question .vs-input {
    font-size: 24px;
}
.new-question input {
  min-width: 100%;
}
.cancel-btn .unicon {
  margin-top: 10px;
  cursor: pointer;
}

.close__new__question {
  transition: transform 0.3s ease-in-out;
}
.close__new__question:hover {
  transform: rotate(90deg);
}
</style>
