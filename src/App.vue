<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from'./storage/index.js'
export default {
  name: 'App',
  components: {
  },
  data () {
    return{
      res: {
      }
    }
  },
  mounted () {
    // storage.setItem('a', 1)
    // storage.setItem('abc',{a:1},'user')
    // storage.clear('a')
    // this.axios.get('/user/login').then((res) => {
    //   this.res = res
    // })
      if(this.$cookie.set("userId")){
        this.getUser()
        this.getCartCount()
      }   
  },
  methods: {
    getUser(){
      this.axios.get("/user").then((res={}) => {
      this.$store.dispatch("saveUserName",res.username)
      })
    },
    getCartCount(){
      this.axios.get("/carts/products/sum").then((res=0) => {
      this.$store.dispatch("cartCount",res)
      })
    }
  }
}
</script>

<style>
@import './assets/scss/reset.scss';
@import './assets/scss/base.scss';
@import './assets/scss/btn.scss';

</style>