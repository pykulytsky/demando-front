<template>
    <vs-navbar center-collapsed square not-line v-model="active">
        <template #left>
          <vs-navbar-item @click="emitToggleSidebar">
            <unicon name="align-justify" fill="royalblue"/>
          </vs-navbar-item>
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
          <vs-switch v-model="theme">
            <template #circle>
              <unicon v-if="theme" name="moon" height="20" width="20" fill="white" />
              <unicon v-else name="brightness" />
            </template>
          </vs-switch>
          <vs-button flat >Login</vs-button>
          <vs-button>Get Started</vs-button>
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
    ...mapGetters(['currentTheme']),
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
    mounted() {
        if (this.currentTheme) {
            this.theme = true
        }
        else {
            this.them = false
        }
    }
}
</script>
