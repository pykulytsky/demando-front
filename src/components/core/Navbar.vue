<template>
  <vs-navbar
    id="navbar"
    class="custom-navbar"
    target-scroll
    center-collapsed
    square
    not-line
    v-model="active"
  >
    <template #left>
      <vs-navbar-item @click="emitToggleSidebar">
        <unicon name="align-justify" />
      </vs-navbar-item>
    </template>
    <vs-navbar-item :active="active == 'qna'"  to="/qa" id="qna"> Q&A </vs-navbar-item>
    <vs-navbar-item :active="active == 'polls'" to="/polls" id="polls"> Polls </vs-navbar-item>
    <vs-navbar-item :active="active == 'quiz'" to="/quizzes" id="quiz"> Quizzes </vs-navbar-item>
    <vs-navbar-item :active="active == 'explore'" to="/" id="explore"> Explore </vs-navbar-item>
    <template #right>
      <!-- <vs-switch
        @mouseover="isSwitchHovered = true"
        @mouseleave="isSwitchHovered = false"
        v-model="theme"
      >
        <template #circle>
          <unicon
            ref="moon"
            :class="{ unicon__moon: true, unicon__hover: isSwitchHovered }"
            v-if="theme"
            name="moon"
            height="18"
            width="18"
          />
          <unicon v-else ref="sun" name="brightness" />
        </template>
      </vs-switch> -->
      <vs-tooltip bottom v-if="currentUser && isLogined" not-hover v-model="activeProfileTooltip">
        <vs-avatar circle primary @click="activeProfileTooltip = !activeProfileTooltip">
          <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="" />
          <unicon v-else name="user" width="50" height="50" />
        </vs-avatar>
        <template #tooltip>
          <p @click="$router.push('/profile')" class="tooltip-item">Profile</p>
          <p class="tooltip-item">Log out</p>
        </template>
      </vs-tooltip>

      <vs-tooltip bottom v-if="!currentUser && isLogined" not-hover v-model="activeProfileTooltip">
        <vs-avatar circle primary @click="activeProfileTooltip = !activeProfileTooltip">
          <unicon  name="user" />
        </vs-avatar>
        <template #tooltip>
          <p class="tooltip-item">Profile</p>
          <p class="tooltip-item">Log out</p>
        </template>
      </vs-tooltip>
      <vs-button to="/login" v-if="!isLogined" flat>Login</vs-button>
      <vs-button to="/register" v-if="!isLogined" flat>Get Started</vs-button>
      <div class="sign-out-btn">
        <unicon
          @click="$router.push('/logout?from=' + $route.fullPath)"
          name="sign-out-alt"
          v-if="isLogined"
        />
      </div>
    </template>
  </vs-navbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      theme: false,
      isSwitchHovered: true,
      active: '',
      activeProfileTooltip: false
    };
  },
  computed: {
    ...mapGetters(["currentTheme", "isLogined", "currentUser"]),
  },
  methods: {
    ...mapActions(["setTheme"]),
    emitToggleSidebar() {
      this.$emit("toggleSidebar");
    },
    emitToggleTheme() {
      this.$emit("toggleTheme");
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
      this.emitToggleTheme();
    },
  },
  created() {
    if (this.currentTheme) {
      if (this.currentTheme == "light") {
        this.theme = false;
      } else {
        this.theme = true;
      }
    } else {
      this.theme = false;
    }
  },
};
</script>

<style>
.sign-out-btn .vs-button {
  padding-top: 3px;
  width: 32px;
  height: 35px;
  border: none;
}

.sign-out-btn .unicon {
  margin-top: 5px;
  margin-left: 15px;
}

.sign-out-btn .unicon:hover {
  cursor: pointer;
}

.vs-switch .unicon__moon {
  margin-top: 4px;
  margin-left: 0.5px;
}

.vs-switch .unicon {
  transition: transform 0.3s ease-in-out;
}

.unicon__hover {
  transform: rotate(30deg);
}
#navbar {
  padding: 10px;
}
#navbar .vs-avatar {
  cursor: pointer;
}
.tooltip-item {
  padding: 5px 15px;
  margin: 0;
  margin-bottom: 5px;
}
.tooltip-item:hover {
  cursor: pointer;
  background-color: aqua;
}
</style>
