const getters = {
  //"http://localhost:8081/image/avatar/admin/profile.jpg"
  avatar: state => "http://localhost:8081/avatar/" + state.user.avatar,
}
export default getters
