export default {
  saveUserName( context, username){
    context.commit("saveUserName", username)
  },
  cartCount( context, cartCount){
    context.commit("cartCount", cartCount)
  }
}