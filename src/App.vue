<template>
  <div id="app">
    <div class="hidden">
      <vs-sidebar
        absol ute
        :open.sync="sidebar"
        >
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <i class='bx bx-home'></i>
          </template>
          Home
        </vs-sidebar-item>
        <vs-sidebar-item id="market">
          <template #icon>
            <i class='bx bx-grid-alt'></i>
          </template>
          Market Overview
        </vs-sidebar-item>
        <vs-sidebar-item id="Music">
          <template #icon>
            <i class='bx bxs-music'></i>
          </template>
          Music
        </vs-sidebar-item>
        <vs-sidebar-item id="donate">
          <template #icon>
            <i class='bx bxs-donate-heart' ></i>
          </template>
          Donate
        </vs-sidebar-item>
        <vs-sidebar-item id="drink">
          <template #icon>
            <i class='bx bx-drink'></i>
          </template>
          Drink
        </vs-sidebar-item>
        <vs-sidebar-item id="shopping">
          <template #icon>
            <i class='bx bxs-shopping-bags'></i>
          </template>
          Shopping
        </vs-sidebar-item>
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class='bx bx-chat' ></i>
          </template>
          Chat
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <img src="/avatars/avatar-5.png" alt="">
            </vs-avatar>

            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>

              <template #badge>
                28
              </template>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
    <vs-navbar center-collapsed square not-line v-model="active">
        <template #left>
          <img src="/logo2.png" alt="">
        </template>
        <vs-navbar-item @click="toggleSidebar" :active="active == 'guide'" id="guide">
          Guide
        </vs-navbar-item>
        <vs-navbar-item @click="toggleTheme" :active="active == 'docs'" id="docs">
          Documents
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'components'" id="components">
          Components
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'license'" id="license">
          license
        </vs-navbar-item>
        <template #right>
          <vs-button flat >Login</vs-button>
          <vs-button>Get Started</vs-button>
        </template>
      </vs-navbar>
      <div class="main">
       <router-view/>
      </div>

  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sidebar: false
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    toggleTheme() {
      const returnTheme = this.$vs.toggleTheme()
      console.log(returnTheme)
      if (returnTheme == 'dark') {
        document.body.classList.remove('light-color')
        document.body.classList.add('darken', 'dark-color')
      } else {
        document.body.classList.remove('darken')
        document.body.classList.add('light-color')
      }
   }
  },
  // beforeCreate() {
  //   this.$vs.setTheme('dark')
  //   document.body.classList.add('darken')
  // }
}

</script>

<style>
body {
  /* background-color: #18191c;
  color: aliceblue; */
  font-size: 14px;
}

.dark-color {
  background-color: #18191c;
  color: aliceblue;
}

.light-color {
  background-color: #ffff;
  color: #18191c;
}

h1.main-header {
  font-family: 'Roboto Slab', serif;
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
