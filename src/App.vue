<template>
  <div id="app">
    <loading v-if="isLoading" />
    <div class="hidden">
      <vs-sidebar absolute :open.sync="sidebar"> </vs-sidebar>
    </div>
    <nav-bar @toggleSidebar="toggleSidebar" @toggleTheme="toggleTheme" />
    <div class="main" id="scroll-main">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "./components/core/Navbar.vue";
import Loader from "./components/core/Loader.vue";

export default {
  name: 'App',
  metaInfo: {
    title: 'Demando',
    titleTemplate: '%s | Demando'
  },
  components: {
    navBar: Navbar,
    loading: Loader,
  },
  data: () => {
    return {
      sidebar: false,
      active: true,
    };
  },
  computed: {
    ...mapGetters(["currentTheme", "isLoading", "error"]),
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
        console.log(this.error)
      }
    }
  },

  created() {
    this.setDefaultTheme();

    this.loadCurrentUser();
  },
};
</script>

<style>
* {
  font-family: "Work Sans", sans-serif;
  font-weight: 400;
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

.navb {
  margin-bottom: 150px;
}

.main {
  margin-top: 50px;
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
