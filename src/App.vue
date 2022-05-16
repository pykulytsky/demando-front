<template>
  <div id="app">
    <loading v-if="isLoading" />
    <div class="hidden">
      <vs-sidebar absolute  :open.sync="sidebar">
        <template #logo>
          <img src="./assets/logo1-d.png" alt="" />
        </template>
        <vs-sidebar-item id="explore">
          <template #icon>
            <unicon name="search" fill="royalblue" width="30" height="30" />
          </template>
          Explore
        </vs-sidebar-item>
        <vs-sidebar-item id="home">
          <template #icon>
            <unicon name="estate" fill="royalblue" width="30" height="30" />
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item id="qna">
          <template #icon>
            <unicon name="question" fill="royalblue" width="50" height="50" />
          </template>
          Q&A
        </vs-sidebar-item>
        <vs-sidebar-item id="polls">
          <template #icon>
            <unicon name="thumbs-up" fill="royalblue" width="30" height="30" />
          </template>
          Polls
        </vs-sidebar-item>
        <vs-sidebar-item id="quizzes">
          <template #icon>
            <unicon name="comment-question" fill="royalblue" width="30" height="30" />
          </template>
          Quizzes
        </vs-sidebar-item>
    <template #footer>
      <vs-row justify="space-between">
        <vs-avatar>
          <img src="/avatars/avatar-5.png" alt="" />
        </vs-avatar>

        <vs-switch></vs-switch>
      </vs-row>
    </template>
      </vs-sidebar>
    </div>
    <nav-bar
      v-if="!['Login', 'Register', 'NotFound', 'Quiz'].includes($route.name)"
      @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme"
    />
    <div class="main" id="scroll-main">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <Footer
      v-if="!['Login', 'Register', 'NotFound', 'Quiz'].includes($route.name)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "./components/core/Navbar.vue";
import Footer from "./components/core/Footer.vue";
import Loader from "./components/core/Loader.vue";

export default {
  name: "App",
  metaInfo: {
    title: "Demando",
    titleTemplate: "%s | Demando",
  },
  components: {
    navBar: Navbar,
    loading: Loader,
    Footer,
  },
  data: () => {
    return {
      sidebar: false,
      active: true,
      footerNotRequiredPages: ["Login", "Register", "Logout"],
    };
  },
  computed: {
    ...mapGetters(["currentTheme", "isLoading", "error", "currentUser"]),
    activeRoute() {
      return this.$route.name
    }
  },
  methods: {
    ...mapActions([
      "setTheme",
      "setDefaultTheme",
      "setLoading",
      "loadCurrentUser",
    ]),
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
    toggleTheme() {
      let returnTheme = this.$vs.toggleTheme();
      if (returnTheme !== this.currentTheme) {
        returnTheme = this.$vs.toggleTheme();
      }
      if (returnTheme == "dark") {
        document.body.classList.remove("light-color");
        document.body.classList.add("darken", "dark-color");
      } else {
        document.body.classList.remove("darken", "dark-color");
        document.body.classList.add("light-color");
      }
    },
  },
  watch: {
    error() {
      if (this.error !== null) {
        console.log(this.error);
      }
    },
  },

  async created() {
    this.setDefaultTheme();
    await this.loadCurrentUser();
  },
};
</script>

<style>
* {
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
  margin-left: 0;
  margin-right: 0;
}

h1 {
  font-weight: 900;
}

.dark-color {
  background-color: #18191c;
  color: aliceblue;
}

.light-color {
  background-color: #ffff;
  color: #18191c;
}

.vs-input {
}
.navb {
  margin-bottom: 150px;
}

.main {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
