<template>
  <div id="app">
    <loading v-if="isLoading" />
    <div class="hidden">
      <vs-sidebar
        absolute
        :open.sync="sidebar"
      >
      </vs-sidebar>
    </div>
    <nav-bar
      @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme"
    />
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from './components/core/Navbar.vue'
import Loader from './components/core/Loader.vue'

export default {
  components: {
    navBar: Navbar,
    loading: Loader
  },
  data: () => {
    return {
      sidebar: false,
      active: true
    }
  },
  computed: {
    ...mapGetters(['currentTheme', 'isLoading'])
  },
  methods: {
    ...mapActions([
      'setTheme',
      'setDefaultTheme',
      'setLoading'
      ]),
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    toggleTheme() {
      let returnTheme = this.$vs.toggleTheme()
      // this.setTheme(returnTheme)
      console.log("vs theme: ", returnTheme)
      console.log("store theme: ", this.currentTheme)
      if (returnTheme !== this.currentTheme) {
        returnTheme = this.$vs.toggleTheme()
      }
      if (returnTheme == 'dark') {
        document.body.classList.remove('light-color')
        document.body.classList.add('darken', 'dark-color')
      } else {
        document.body.classList.remove('darken', 'dark-color')
        document.body.classList.add('light-color')
      }
   }
  },

  created() {
    this.setDefaultTheme()
  },
}
</script>

<style>
body {
  font-size: 14px;
}

* {
    font-family: 'Montserrat';
}

.dark-color {
  background-color: #18191c;
  color: aliceblue;
}

.light-color {
  background-color: #ffff;
  color: #18191c;
}

h1 {
  font-family: 'Montserrat', sans-serif;
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
</style>
