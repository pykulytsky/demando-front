<template>
  <div class="question-item">
    <vs-row justify="space-between">
      <vs-col w="2">
        <unicon name="user" height="15" width="18" />
        <i>{{ question.author.username }}</i>
      </vs-col>
      <vs-col w="2">
        <vs-row>
          <vs-col w="11">
            <unicon name="clock-five" :fill="iconColor" />
            {{ question.created }} ago
          </vs-col>
          <vs-col w="1">
            <vs-tooltip
              v-if="user"
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
                    flat
                    warn
                    block

                  > Edit </vs-button>
                  <vs-button
                    flat
                    danger
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
      <unicon class="hvr-bob" @click="updateLikes(-1)" name="thumbs-down" :fill="iconColor" />
      {{ question.likes_count }}
      <unicon class="hvr-bob" @click="updateLikes(1)" name="thumbs-up" :fill="iconColor" />
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
    user() {
      if(this.currentUser) {
        return this.currentUser.pk == this.question.author.pk
      }
      else {
        return false
      }
    }
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
  border: 3px #0ec4a6 solid;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.question-item i {
  color: #0ec4a6;
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
@-webkit-keyframes hvr-bob {
  0% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
  50% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
  }
  100% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}
@keyframes hvr-bob {
  0% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
  50% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
  }
  100% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}
@-webkit-keyframes hvr-bob-float {
  100% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}
@keyframes hvr-bob-float {
  100% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}
.hvr-bob {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-bob:hover, .hvr-bob:focus, .hvr-bob:active {
  -webkit-animation-name: hvr-bob-float, hvr-bob;
  animation-name: hvr-bob-float, hvr-bob;
  -webkit-animation-duration: .3s, 1.5s;
  animation-duration: .3s, 1.5s;
  -webkit-animation-delay: 0s, .3s;
  animation-delay: 0s, .3s;
  -webkit-animation-timing-function: ease-out, ease-in-out;
  animation-timing-function: ease-out, ease-in-out;
  -webkit-animation-iteration-count: 1, infinite;
  animation-iteration-count: 1, infinite;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-direction: normal, alternate;
  animation-direction: normal, alternate;
}
</style>
