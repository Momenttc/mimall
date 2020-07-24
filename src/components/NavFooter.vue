<template>
  <div class='footer'>
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">小米天猫店</a><span>|</span>  
      <a href="javascript:;">政企服务</a><span>|</span>   
      <a href="javascript:;">问题反馈</a><span>|</span>   
      <a href="javascript:;">Select Location</a>  
    </div>
    <div class="copyright">
      © mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer"
}
</script>

<style lang="scss">
  .footer {
    height: 234px;
    background-color: #333;;
    color:#999;
    text-align: center;
    border-top: 4px solid #FF6600;
    font-size: 16px;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 53px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: #999;
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
      margin-bottom: 13px;
    }
  }
</style>