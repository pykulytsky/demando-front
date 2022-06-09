<template>
  <div id="app">
    <transition name="fade">
      <loading v-if="isLoading" />
    </transition>
    <div class="hidden">
      <vs-sidebar absolute v-model="sidebarActive" :open.sync="sidebar">
        <template #logo>
          <img height="200" src="./assets/logo1-d.png" alt="" />
        </template>
        <vs-sidebar-item to="/" id="explore">
          <template #icon>
            <unicon name="search" width="30" height="30" />
          </template>
          Explore
        </vs-sidebar-item>
        <vs-sidebar-item to="/" id="home">
          <template #icon>
            <unicon name="estate" width="30" height="30" />
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item to="/qa" id="qna">
          <template #icon>
            <unicon name="comment-chart-line" width="30" height="30" />
          </template>
          Q&A
        </vs-sidebar-item>
        <vs-sidebar-item to="/polls" id="polls">
          <template #icon>
            <unicon name="thumbs-up" width="30" height="30" />
          </template>
          Polls
        </vs-sidebar-item>
        <vs-sidebar-item to="/quizzes" id="quizzes">
          <template #icon>
            <unicon name="comment-question" width="30" height="30" />
          </template>
          Quizzes
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar circle primary v-if="currentUser && isLogined" @click="$router.push('/profile')" >
              <template #text >
                {{currentUser.username}}
              </template>
            </vs-avatar>
            <vs-avatar circle primary v-if="!currentUser && isLogined" @click="$router.push('/profile')"  >
              <template #text >
                {{currentUser.username}}
                <unicon  name="user" />
              </template>
            </vs-avatar>

            <vs-switch
              @mouseover="isSwitchHovered = true"
              @mouseleave="isSwitchHovered = false"
              v-model="theme"
            >
              <template #circle>
                <unicon
                  ref="moon"
                  :class="{
                    unicon__moon: true,
                    unicon__hover: isSwitchHovered,
                  }"
                  v-if="theme"
                  name="moon"
                  height="18"
                  width="18"
                />
                <unicon v-else ref="sun" name="brightness" />
              </template>
            </vs-switch>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
    <nav-bar
      v-if="!['Login', 'Register', 'NotFound', 'Quiz', 'CriticalError'].includes($route.name)"
      @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme"
    />
    <div class="main" id="scroll-main">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <Footer
      v-if="!['Login', 'Register', 'NotFound', 'Quiz', 'CriticalError'].includes($route.name)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "./components/core/Navbar.vue";
import Footer from "./components/core/Footer.vue";
import Loader from "./components/core/Loader.vue";
import httpClient from "./api/axios";
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
      sidebarActive: "explore",
      theme: false,
      isSwitchHovered: true,
      footerNotRequiredPages: ["Login", "Register", "Logout"],
    };
  },
  computed: {
    ...mapGetters(["currentTheme", "isLoading", "error", "currentUser", "isLogined" ]),
    activeRoute() {
      return this.$route.name;
    },
  },
  watch: {
    theme: function (val) {
      this.theme = val;
      if (this.theme) {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
      this.toggleTheme();
    },
    isLoading(val) {
      if (val) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
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

  async created() {
    this.setDefaultTheme();
    await this.loadCurrentUser();

    if (this.currentTheme) {
      if (this.currentTheme == "light") {
        this.theme = false;
      } else {
        this.theme = true;
      }
    } else {
      this.theme = false;
    }


    var docWidth = document.documentElement.offsetWidth;
    [].forEach.call(document.querySelectorAll("*"), function (el) {
      if (el.offsetWidth > docWidth) {
        return null
      }
    });

    this.$router.beforeEach((to, from, next) => {
      this.setLoading(true)
      next()
    })
    this.$router.afterEach(() => {
      setTimeout(() => {
        this.setLoading(false)
      }, 500)
    })

    httpClient.interceptors.response.use((response) => response, (error) => {
      if(error.response.status > 499 && error.response.status < 600 ) {
        this.$router.push("/505")
      }
      console.log(error)
      return Promise.reject(error);
    })
  },
};
</script>

<style>
html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

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
  background-color: #1e2023;
  color: aliceblue;
}

.light-color {
  background-color: #ffff;
  color: #3d4852;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
#load {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
