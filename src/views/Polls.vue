<template>
  <div class="polls-main">
    <div
      v-rellax="{
        speed: -6
      }"
      :class="currentTheme == 'light' ? 'polls-header' : 'polls-header-dark'"
    >
      <h1
        :class="$mq !== 'mobile'? 'polls-header-title': 'polls-header-title-small'"
        v-rellax="{
          speed: 5,
        }"
      >
        Polls are very useful tool in lectures, meatings and other activities.
        Make your meetings more interactive, choose topics to discuss, speakers
        and so on.
      </h1>
    </div>
    <div class="polls-content">
    <div
      :class="{
        'event-search': $mq !== 'mobile' && currentTheme == 'light',
        'event-search-small': $mq == 'mobile' && currentTheme == 'light',
        'event-search-dark': $mq !== 'mobile' && currentTheme == 'dark',
        'event-search-small-dark': $mq == 'mobile' && currentTheme == 'dark'
      }"
      v-motion-pop-visible
    >
      <h1>Enter poll identifier</h1>
      <vs-row align="center" justify="center">
        <vs-col w="9">
          <vs-input
            id="event-search"
            placeholder="Enter id of poll..."
            shadow
            v-model="pollId"
            color="primary"
            class="event-input"
            @keydown.enter="goToPoll"
          />
        </vs-col>
        <vs-col w="1">
          <vs-button @click="goToPoll" icon size="xl" class="go-btn">
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
      </vs-row>
    </div>
      <vs-button
        v-if="isLogined"
        success
        size="xl"
        @click="createPollDialog = true"
        >Create poll</vs-button
      >

      <div class="polls explore-items">
        <div class="explore-events">
          <div
            :class="$mq == 'mobile' ? 'explore-item-small' : 'explore-item'"
            id="polls-typer"
            v-view.once="typerViewHandler"
          >
            <div
              :class="
                $mq !== 'mobile' ? 'explore-caption' : 'explore-caption-small'
              "
              v-motion-fade-visible
              :enter="{
                transition: {
                  delay: 2000,
                },
              }"
            >
              <vue-typer
                v-if="pollsIsVisible"
                text="Live Polls"
                :repeat="0"
                :shuffle="false"
                initial-action="typing"
                :pre-type-delay="1500"
                :type-delay="70"
                :pre-erase-delay="2000"
                :erase-delay="250"
                erase-style="select-all"
                :erase-on-complete="false"
                caret-animation="phase"
              ></vue-typer>
              <h2>
                Wellcome to our live polls where you can find out other people's
                opinions. Make your meetings more interactive, choose topics to
                discuss, speakers and so on.
              </h2>
            </div>

            <!-- <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/christin-hume-Hcfwew744z4-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
            <lottie-animation
              ref="anim"
              :animationData="
                require('@/assets/lottie/100842-user-interface-website-design-animations.json')
              "
              :loop="true"
              width="500px"
            />
          </div>
          <!-- <vs-row>
          <vs-col w="10">
      <lottie-animation
        ref="anim"
        :animationData="require('@/assets/lottie/101045-human-move.json')"
        :loop="true"
        width="500px"
      />
          </vs-col>
          <vs-col w="2">
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, dolorum!</h1>
          </vs-col>
        </vs-row> -->
          <div
            :class="{
              'blob-light': currentTheme == 'light',
              'blob-dark': currentTheme == 'dark',
              'explore-item-small': $mq == 'mobile',
              'explore-item': ['tablet', 'laptop', 'desktop'].includes($mq),
            }"
            id="device"
            v-view.once="typerViewHandler"
          >
            <!-- <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/brett-jordan--qUp3bejuzs-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
            <lottie-animation
              ref="anim"
              :animationData="
                require('@/assets/lottie/25992-hand-scrolls-the-messages-on-the-phone.json')
              "
              :loop="true"
              width="500px"
            />
            <div
              :class="
                $mq !== 'mobile'
                  ? 'explore-caption-right'
                  : 'explore-caption-right-small'
              "
              v-motion-fade-visible
            >
              <vue-typer
                v-if="deviceIsVisible"
                text="Any device"
                :repeat="0"
                :shuffle="false"
                initial-action="typing"
                :pre-type-delay="1500"
                :type-delay="70"
                :pre-erase-delay="2000"
                :erase-delay="250"
                erase-style="select-all"
                :erase-on-complete="false"
                caret-animation="phase"
              ></vue-typer>
              <h2>
                Participate anywhere! Participants can vote using QR-code from
                any device and display the results in real-time. No login is
                needed as well.
              </h2>
            </div>
          </div>
          <div
            :class="$mq == 'mobile' ? 'explore-item-small' : 'explore-item'"
            id="poll-features"
            v-view.once="typerViewHandler"
          >
            <div
              :class="
                $mq !== 'mobile' ? 'explore-caption' : 'explore-caption-small'
              "
              v-motion-fade-visible
            >
              <vue-typer
                v-if="featuresIsVisible"
                text="Key features"
                :repeat="0"
                :shuffle="false"
                initial-action="typing"
                :pre-type-delay="1500"
                :type-delay="70"
                :pre-erase-delay="2000"
                :erase-delay="250"
                erase-style="select-all"
                :erase-on-complete="false"
                caret-animation="phase"
              ></vue-typer>
              <h2>
                Set your own conditions! You can create polls with time limit,
                with multiple choice and other key features to diversify polling
                process.
              </h2>
            </div>
            <img
              class="explore-image"
              src="../assets/poll.gif"
              :width="$mq == 'mobile' ? '100%' : '50%'"
              alt=""
            />
          </div>
        </div>
      </div>
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
        <hr />
        <div class="poll-params">
          <div class="mult">
            <vs-switch id="mlt" v-model="multipleChoice">
              Multiple choice
            </vs-switch>
            <vue-numeric-input
              v-if="multipleChoice"
              v-model="choices"
              :min="1"
              :max="5"
              :step="1"
            ></vue-numeric-input>
          </div>
          <div class="mult">
            <vs-switch v-model="timeLimit"> Time limit </vs-switch>
            <datetime
              type="datetime"
              v-if="timeLimit"
              v-model="dueTo"
            ></datetime>
          </div>
        </div>

        <h3 class="steps-header">
          <b>Options</b>
        </h3>
        <div class="options-constructor">
          <div
            :class="i !== options.length - 1 ? 'option-con-item' : ''"
            v-for="(option, i) in options"
            :key="i"
          >
            <vs-input @input="handleInput(i)" v-model="options[i]"></vs-input>
            <unicon
              v-if="i !== options.length - 1"
              name="times"
              @click="removeOption(option)"
            />
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
import { mapGetters, mapActions } from "vuex";
import VueNumericInput from "vue-numeric-input";
import { Datetime } from "vue-datetime";
import { createPoll, createOption, getPoll } from "../api/items/polls.api";
import LottieAnimation from "lottie-web-vue";
import { VueTyper } from "vue-typer";
export default {
  name: "Polls",
  metaInfo: {
    title: "Polls",
  },
  components: {
    VueNumericInput,
    datetime: Datetime,
    LottieAnimation,
    VueTyper,
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
      dueTo: null,

      pollsIsVisible: false,
      deviceIsVisible: false,
      featuresIsVisible: false,

      pollId: null
    };
  },
  methods: {
    ...mapActions(['setLoading']),
    async goToPoll() {
      this.setLoading(true);
      getPoll(this.pollId)
      .then(() => {
        this.$router.push("/polls/" + this.pollId);
      })
      .catch(() => {
        this.$vs.notification({
          color: "danger",
          icon: '<unicon name="exclamation-triangle" fill="white"/>',
          position: "bottom-center",
          title: "No poll with such id was found",
          text: "We could not find an poll with such data, please try again!",
        })
      })

      this.setLoading(false);
    },
    addOption() {
      this.options.push(this.currentOption);
      this.currentOption = "";
    },
    removeOption(option) {
      this.options.splice(this.options.indexOf(option), 1);
    },
    handleInput(currentIndex) {
      if (currentIndex == this.options.length - 1) {
        this.options.push("");
      }
    },
    typerViewHandler(e) {
      switch (e.target.element.id) {
        case "polls-typer":
          this.pollsIsVisible = true;
          break;
        case "device":
          this.deviceIsVisible = true;
          break;
        case "poll-features":
          this.featuresIsVisible = true;
          break;
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
      } else {
        if (this.dueTo) {
          createPoll(this.pollName, this.dueTo, this.choices).then(
            (response) => {
              this.options.forEach((option) => {
                if (option !== "") {
                  createOption(option, response.data.pk).then(() => {
                    this.$router.push("/polls/" + response.data.pk);
                  });
                }
              });
            }
          );
        } else {
          createPoll(this.pollName, this.dueTo, this.choices).then(
            (response) => {
              this.options.forEach((option) => {
                if (option !== "") {
                  createOption(option, response.data.pk).then(() => {
                    this.$router.push("/polls/" + response.data.pk);
                  });
                }
              });
            }
          );
        }
      }
    },
  },
  computed: {
    ...mapGetters(["currentTheme", "isLogined"]),
  },
};
</script>
<style>
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
.polls-header-title-small {
  font-size: 30px;
  color: white;
}
.polls-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.polls-content .vs-button--size-xl .vs-button__content {
  font-size: 2rem;
}
.poll-name .vs-input-content,
.vs-input,
.vs-input__label {
  font-size: 2rem;
}
.coptions-constructor .vs-button--size-xl .vs-button__content {
  font-size: 1.5rem;
}
.options-contstructor .vs-input-content,
.vs-input,
.vs-input__label {
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
.mult .vs-input-content,
.vs-input,
.vs-input__label {
  margin-top: 10px;
}
.vdatetime {
  margin-top: 15px;
}
.vue-numeric-input {
  margin-top: 20px;
}
</style>
