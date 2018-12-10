const state = {
  loggedIn: undefined,
  user: undefined,
  refreshing: true
}

const getters = {
  isUserRefreshing (state) {
    return state.refreshing
  },
  isUserLoggedIn (state) {
    return state.loggedIn
  },
  getUser (state) {
    return state.user
  }
}

const mutations = {
  setUserRefreshing (state, refreshing) {
    state.refreshing = refreshing
  },
  setUserLoggedIn (state, loggedIn) {
    state.loggedIn = loggedIn
  },
  setUser (state, user) {
    state.user = user
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
