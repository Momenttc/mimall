<template>
  <div class="order-header">
    <div class="container">
      <div class="wrapper-left">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="title">
          <h1>{{ title }}</h1>
          <slot name="title"></slot>
        </div>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "order-header",
  props:{
    title:String
  },
  computed:{
    username(){
      return this.$store.state.username
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .container {
    @include flex();
    .wrapper-left {
      @include flex();
      .title {
        margin-left: 54px;
        h1 {
          display: inline-block;
          font-size: 28px;
          color: #333;
          margin-right: 17px;
        }
        span {
          font-size: 14px;
          color: #999999;
        }
      }
    }
  }
  .username {
    a {
      display: inline-block;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>