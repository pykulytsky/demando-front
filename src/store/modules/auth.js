import {
    getMe,
    refreshToken,
    register
} from "../../api/auth.api"

export default {
  state: {
      currentUser: null,
      token: null
  },
  mutations: {
      SET_CURRENT_USER(state, data) {
          state.currentUser = data
      },
      SET_TOKEN(state, data) {
          state.token = data
          if(data === null) {
              localStorage.removeItem('token')
          }
          else{
            localStorage.setItem('token', data)
          }
    }
  },
  actions: {
      async loadCurrentUser({commit}) {
        commit('SET_LOADING', true)
        try{
            if(localStorage.getItem('token') !== null) {
                const response = await getMe()
                commit ('SET_CURRENT_USER', response.data)
            }
            commit('SET_LOADING', false)
        }
        catch(error){
            console.log(error.response.data)
        }
        finally {
            commit('SET_LOADING', false)
        }
    },
      async login({commit, dispatch}, payload) {
          commit('SET_LOADING', true)
          try {
            const response = await refreshToken(payload.password, payload.username, payload.isEmail)
            commit('SET_TOKEN', response.data.token)
            await dispatch('loadCurrentUser')
          }
          catch (error) {
            console.log(error.response.data)
          }
          finally {
            commit('SET_LOADING', false)
          }
      },
      async register({commit, dispatch}, payload) {
          commit('SET_LOADING', true)
          const response = await register(
              payload.username,
              payload.email,
              payload.password)
          commit('SET_TOKEN', response.data.token)
          await dispatch('loadCurrentUser')
          commit('SET_LOADING', false)
      },
      async logout({commit}) {
          commit('SET_LOADING', true)
          commit('SET_TOKEN', null)
          commit('SET_CURRENT_USER', null)
          commit('SET_LOADING', false)
      }


  },
  getters: {
      currentUser(state) {
          return state.currentUser
      },
      isLogined(state) {
          return (state.currentUser ? true : false)
      },
      isEmailVerified(state) {
          return state.currentUser.email_verified
      }

  }
}
