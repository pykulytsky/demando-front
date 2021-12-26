<template>
  <div id="app">
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

export default {
  components: {
    navBar: Navbar,
  },
  data: () => {
    return {
      sidebar: false,
      active: true
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'currentTheme'])
  },
  methods: {
    ...mapActions(['loadAllUsers', 'setTheme', 'setDefaultTheme']),
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    toggleTheme() {
      const returnTheme = this.$vs.toggleTheme()
      this.setTheme(returnTheme)

      if (returnTheme == 'dark') {
        document.body.classList.remove('light-color')
        document.body.classList.add('darken', 'dark-color')
      } else {
        document.body.classList.remove('darken')
        document.body.classList.add('light-color')
      }
   }
  },

  async created() {
    // this.setDefaultTheme()
    await this.loadAllUsers()
    console.log(this.getUsers[0].username)
    console.log(this.currentTheme)
  }

}
</script>

<style>
body {
  /* background-color: #18191c;
  color: aliceblue; */
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
