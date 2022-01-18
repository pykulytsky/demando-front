export default {
  state: {
      isLoading: false,
      currentTheme: null
  },
  mutations: {
      SET_LOADING(state, data) {
          state.isLoading = data
      },
      SET_THEME(state, data) {
          state.currentTheme = data
      }
  },
  actions: {
      setLoading({commit}, payload) {
          commit('SET_LOADING', payload)
      },
      setTheme({commit}, payload) {
          localStorage.setItem('theme', payload)
          commit('SET_THEME', payload)
      },
      setDefaultTheme({commit}) {
          const theme = localStorage.getItem('theme')
          if (theme) {
              commit('SET_THEME', theme)
          }
          else {
              commit('SET_THEME', 'light')
          }
      }
  },
  getters: {
    isLoading(state) {
        return state.isLoading
    },
    currentTheme(state) {
        return state.currentTheme
    },
    iconColor(state) {
        if (state.currentTheme == 'light') {
            return 'black'
        }
        else return 'white'
    }
  }
}
