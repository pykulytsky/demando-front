<template>
  <vs-row>
    <vs-col w="6" v-responsive.lg.xl >
      <create-quiz-alert/>
    </vs-col>
    <vs-col w="6" v-responsive.lg.xl>
      <code-input-form />
    </vs-col>
      <code-input-form v-responsive.sm.xs />
    <div class="quizzes explore-items">
      <div class="explore-events">
        <h1
          class="explore-head"
          id="quizzes"
          v-rellax="{
            speed: $mq !== 'mobile'? -0.2: 0,
          }"
        >
          Quizzes
        </h1>
        <div
          :class="$mq == 'mobile' ? 'explore-item-small' : 'explore-item'"
          id="quiz-typer"
          v-view.once="typerViewHandler"
        >
          <div
            :class="
              $mq !== 'mobile' ? 'explore-caption' : 'explore-caption-small'
            "
            v-motion-fade-visible
          >
            <vue-typer
              v-if="quizzesIsVisible"
              text="Live Quizzes"
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
              Create your live online quiz and let your participants vote from
              any device using a link or QR code. You can join quiz without
              account, or login to save your results.
            </h2>
          </div>

          <!-- <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/jeshoots-com-5EKw8Z7CgE4-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
          <lottie-animation
            ref="anim"
            :animationData="
              require('@/assets/lottie/69395-man-working-on-system.json')
            "
            :loop="true"
            width="500px"
          />
        </div>
        <div
          :class="{
            'blob-light': currentTheme == 'light',
            'blob-dark': currentTheme == 'dark',
            'explore-item-small': $mq == 'mobile',
            'explore-item': ['tablet', 'laptop', 'desktop'].includes($mq),
          }"
          id="learn"
          v-view.once="typerViewHandler"
        >
          <!-- <img
            v-motion-slide-visible-once-left
            class="explore-image"
            src="../assets/chris-montgomery-smgTvepind4-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
          <lottie-animation
            ref="anim"
            :animationData="
              require('@/assets/lottie/69837-grmmarly-animation-1.json')
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
              v-if="learnIsVisible"
              text="Make your learning process  interactive"
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
              Design a quiz with questions that fit the topic of your
              presentation or training. Add options and mark the correct
              answers.
            </h2>
          </div>
        </div>
        <div
          :class="$mq == 'mobile' ? 'explore-item-small' : 'explore-item'"
          id="fun"
          v-view.once="typerViewHandler"
        >
          <div
            :class="
              $mq !== 'mobile' ? 'explore-caption' : 'explore-caption-small'
            "
            v-motion-fade-visible
          >
            <vue-typer
              v-if="funIsVisible"
              text="Useful tool"
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
              Use our quizzes for online lessons, meetings, lectures and
              trainings. With it, your learning will never be boring again.
            </h2>
          </div>

          <!-- <img
            v-motion-slide-visible-once-right
            class="explore-image"
            src="../assets/priscilla-du-preez-XkKCui44iM0-unsplash.jpg"
            :width="$mq == 'mobile' ? '100%' : '50%'"
            alt=""
          /> -->
          <lottie-animation
            ref="anim"
            :animationData="
              require('@/assets/lottie/72178-man-working-under-lamp-light.json')
            "
            :loop="true"
            width="500px"
          />
        </div>
      </div>
    </div>
  </vs-row>
</template>

<script>
import CodeInputForm from "../components/quizzes/CodeInputForm.vue";
import CreateQuizAlert from "../components/quizzes/CreateQuizAlert.vue";
import LottieAnimation from "lottie-web-vue";
import { VueTyper } from "vue-typer";
import {mapGetters} from "vuex";
export default {
  name: "Quizzes",
  metaInfo: {
    title: "Quizzes",
  },
  components: {
    CodeInputForm,
    CreateQuizAlert,
    LottieAnimation,
    VueTyper,
  },
  data: () => {
    return {
      quizzesIsVisible: false,
      learnIsVisible: false,
      funIsVisible: false,
    }
  },
  computed: {
    ...mapGetters(["currentTheme"])
  },
  methods: {
    typerViewHandler(e) {
      switch (e.target.element.id) {
        case "quiz-typer":
          this.quizzesIsVisible = true;
          break;
        case "learn":
          this.learnIsVisible = true;
          break;
        case "fun":
          this.funIsVisible = true;
          break;
      }
    },
  }
};
</script>

<style>
.blob-light {
  background: url("../assets/blob-light.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.blob-dark {
  background: url("../assets/blob-dark.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
