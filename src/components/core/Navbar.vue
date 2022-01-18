<template>
    <vs-navbar class="custom-navbar" target-scroll center-collapsed square not-line>
        <template #left>
          <vs-navbar-item @click="emitToggleSidebar">
            <unicon name="align-justify" fill="royalblue"/>
          </vs-navbar-item>
        </template>
        <vs-navbar-item to="/qa" id="qna">
          Q&A
        </vs-navbar-item>
        <vs-navbar-item to="/polls" id="polls">
          Polls
        </vs-navbar-item>
        <vs-navbar-item id="components">
          Components
        </vs-navbar-item>
        <vs-navbar-item id="license">
          license
        </vs-navbar-item>
        <template #right>
          <vs-switch v-model="theme">
            <template #circle>
              <unicon v-if="theme" name="moon" height="18" width="18" fill="royalblue" />
              <unicon v-else name="brightness" />
            </template>
          </vs-switch>
          <vs-button to="/login" v-if="!isLogined" flat >Login</vs-button>
          <vs-button to="/register" v-if="!isLogined">Get Started</vs-button>
          <div class="sign-out-btn">
            <vs-button icon border to="/logout" v-if="isLogined">
              <unicon name="sign-out-alt" fill="royalblue" />
            </vs-button>
          </div>
        </template>
      </vs-navbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data: () => {
        return {
            theme: false
        }
    },
    computed: {
    ...mapGetters(['currentTheme', 'isLogined']),
    },
    methods: {
        ...mapActions(['setTheme']),
        emitToggleSidebar() {
            this.$emit('toggleSidebar')
        },
        emitToggleTheme() {
            this.$emit('toggleTheme')
        }
    },
    watch: {
        theme: function(val) {
            this.theme = val
            if(this.theme) {
                this.setTheme('dark')
            }
            else {
                this.setTheme('light')
            }
            this.emitToggleTheme()
        }
    },
    created() {
        if (this.currentTheme) {
            if(this.currentTheme == 'light') {
              this.theme = false
            }
            else {
              this.theme = true
            }
        }
        else {
            this.theme = false
        }
    }
}
</script>

<style>
.sign-out-btn .vs-button {
  padding: 0;
  width: 32px;
  height: 35px;
}

.custom-navbar .vs-navbar__item {
  font-weight: 500;
}

</style>
