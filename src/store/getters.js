const getters = {
  avatar: state => {
    return "http://localhost:8081/avatar/" + state.user.avatar
  },
  nickname: state => {
    return state.user.nickname
  }
}
export default getters
