<template>
  <div class="alipay">
    <div class="form"  v-html="content"></div>
    <Login></Login>
  </div>
</template>
<script>
import Login from "./../components/Login.vue"
export default {
  name: "alipay",
  data(){
    return{
      orderId: this.$route.query.orderId,
      content: ""
    }
  },
  components:{
    Login
  },
  mounted(){
    this.paySubmit()
  },
  methods:{
    paySubmit(){
      this.axios.post("/pay",{
        orderId: this.orderId,
        orderName: "Vue高仿小米商城", //扫码支付时订单名称
        amount: 0.01, //单位元
        payType: 1 //1支付宝，2微信
      }).then( res => {
        this.content = res.content
        setTimeout(() => {
          document.forms[0].submit()
        }, 100);
      })
    }
  }
}
</script>