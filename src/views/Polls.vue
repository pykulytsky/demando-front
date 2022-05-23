<template>
  <div class="polls-main">
    <div
      :class="currentTheme == 'light' ? 'polls-header' : 'polls-header-dark'"
    >
      <h1 class="polls-header-title">
        Polls are very useful tool in lectures, meatings and other activities.
        Make your meetings more interactive, choose topics to discuss, speakers
        and so on.
      </h1>
    </div>
    <div class="polls-content">
      <vs-button success size="xl" @click="createPollDialog = true"
        >Create poll</vs-button
      >
    </div>

    <vs-dialog prevent-close not-close blur v-model="createPollDialog">
      <template #header>
        <h3 class="not-margin">
          <b>Poll constructor</b>
        </h3>
      </template>
      <div class="con-content">
        <div class="poll-name">
        <p>Pick up the name of your poll</p>
        <vs-input v-model="pollName" placeholder="Name"></vs-input>
        </div>
        <hr>
        <div class="poll-params">
          <div class="mult">
            <vs-switch id="mlt" v-model="multipleChoice">
              Multiple choice
            </vs-switch>
            <vue-numeric-input v-if="multipleChoice"  v-model="choices" :min="1" :max="5" :step="1"></vue-numeric-input>
          </div>
          <div class="mult">
            <vs-switch v-model="timeLimit">
              Time limit
            </vs-switch>
            <datetime type="datetime" v-if="timeLimit" v-model="dueTo"></datetime>
          </div>
        </div>

        <h3 class="steps-header">
          <b>Options</b>
        </h3>
        <div class="options-constructor">
          <div :class="i !== options.length-1 ? 'option-con-item': ''" v-for="(option, i) in options" :key="i">
            <vs-input @input="handleInput(i)" v-model="options[i]" ></vs-input>
            <unicon v-if="i !== options.length-1" name="times" @click="removeOption(option)" />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="createPoll" transparent> Ok </vs-button>
          <vs-button @click="createPollDialog = false" danger transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueNumericInput from 'vue-numeric-input';
import { Datetime } from 'vue-datetime';
import {createPoll, createOption} from "../api/items/polls.api"
export default {
  name: "Polls",
  metaInfo: {
    title: "Polls",
  },
  components: {
    VueNumericInput,
    datetime: Datetime
  },
  data: () => {
    return {
      createPollDialog: false,
      steps: null,
      currentOption: "",
      nextOption: "",
      pollName: "",
      options: [""],
      multipleChoice: false,
      timeLimit: false,
      choices: 1,
      dueTo: null
    };
  },
  methods: {
    addOption() {
      this.options.push(this.currentOption)
      this.currentOption = ""
    },
    removeOption(option) {
      this.options.splice(this.options.indexOf(option), 1)
    },
    handleInput(currentIndex) {
      if(currentIndex == this.options.length-1) {
        this.options.push("")
      }
    },
    createPoll() {
      if (this.pollName == "" || this.options.length < 2) {
        this.$vs.notification({
          color: "danger",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          duration: 2000,
          title: "Some fields are incorrect",
          text: "Check all the fields, some of them are incorrect, are you shure you filled them?",
        });
      }
      else {
        if(this.dueTo) {
          createPoll(this.pollName, this.dueTo.toDateString, this.choices)
          .then(response => {
            this.options.forEach(option => {
              if(option !== "") {
                createOption(option, response.data.pk)
                .then(() => {
                  this.$router.push("/polls/" + response.data.pk)
                })
              }
            })
          })
        }
        else {
          createPoll(this.pollName, this.dueTo, this.choices)
          .then(response => {
            this.options.forEach(option => {
              if(option !== "") {
                createOption(option, response.data.pk)
                .then(() => {
                  this.$router.push("/polls/" + response.data.pk)
                })
              }
            })
          })
        }
        }

    }
  },
  computed: {
    ...mapGetters(["currentTheme"]),
  },
};
</script>
<style>
.polls {
}
.polls-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 650px;
  padding: 0 10vw;
  padding-bottom: 100px;
  position: relative;
  background: url("../assets/polls-background-light1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
.polls-header-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 650px;
  padding: 0 10vw;
  position: relative;
  background: url("../assets/polls-background-dark1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 100px;
  text-align: center;
}
.curve {
  position: absolute;
  height: 225px;
  width: 100%;
  bottom: 0;
}
.curve::before {
  content: "";
  display: block;
  position: absolute;
  border-radius: 100% 50%;
  width: 55%;
  height: 100%;
  background-color: chocolate;
  transform: translate(85%, 60%);
}
.curve::after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 100% 50%;
  width: 55%;
  height: 100%;
  background-color: chartreuse;
  transform: translate(-4%, 40%);
  z-index: -1;
}
.polls-header-title {
  font-size: 50px;
  color: white;
}
.polls-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.polls-content .vs-button--size-xl .vs-button__content {
  font-size: 2rem;
}
.poll-name .vs-input-content, .vs-input, .vs-input__label {
  font-size: 2rem;
}
.coptions-constructor .vs-button--size-xl .vs-button__content {
  font-size: 1.5rem;
}
.options-contstructor .vs-input-content, .vs-input, .vs-input__label {
  margin-top: 10px;
  font-size: 1.5rem;
}
.steps-header {
  text-align: center;
}
.options-constructor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.option-con-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.option-con-item .unicon {
  display: flex;
  margin-top: 10px;
}
.poll-params {
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: space-around;
}
.mult {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mult .vs-input-content, .vs-input, .vs-input__label {
  margin-top: 10px;
}
.vdatetime {
  margin-top: 15px;
}
.vue-numeric-input {
  margin-top: 20px;
}
</style>
