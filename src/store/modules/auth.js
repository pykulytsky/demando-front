import {
    getUsers,
    getMe,
    refreshToken,
    register
} from "../../api/auth.api"

export default {
  state: {
      users: [],
      currentUser: null,
      token: null
  },
  mutations: {
      SET_USERS(state, data) {
          state.users = data
      },
      SET_CURRENT_USER(state, data) {
          state.currentUser = data
      },
      SET_TOKEN(state, data) {
          state.token = data
          localStorage.setItem('token', data)
      }
  },
  actions: {
      async loadAllUsers({commit}) {
        commit('SET_LOADING', true)
        try {
            const response = await getUsers()
            commit('SET_USERS', response.data)
        }
        catch (error) {
            console.log(error)
        }
        commit('SET_LOADING', true)
      },
      async loadCurrentUser({commit}) {
        commit('SET_LOADING', true)
        try {
            const response = await getMe()
            commit ('SET_CURRENT_USER', response.data)
        }
        catch(error) {
            console.log(error)
        }
        commit('SET_LOADING', false)
      },
      async login({commit}, payload) {
          commit('SET_LOADING', true)
          const response = await refreshToken(payload.password, payload.username, payload.isEmail)
          commit('SET_TOKEN', response.data)
          this.loadCurrentUser()
          commit('SET_LOADING', false)
      },
      async register({commit}, payload) {
          commit('SET_LOADING', true)
          const response = await register(
              payload.username,
              payload.email,
              payload.password
        )
          commit('SET_TOKEN', response.data)
          commit('SET_LOADING', false)
      }

  },
  getters: {
      getUsers(state) {
          return state.users
      },
      getCurrentUser(state) {
          return state.currentUser
      },
      isLogined(state) {
          return (state.currentUser ? true : false)
      }

  }
}
