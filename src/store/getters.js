const baseURL = process.env.VUE_APP_BASE_URL

const getters = {
  avatar: state => {
    return baseURL + "/avatar/" + state.user.avatar
  },
  nickname: state => {
    return state.user.nickname
  }
}
export default getters
