<template>
  <div class="nav-bar" :class="{'is_fix': isFixed}">
    <div class="container">
      <div class="pro-title">
        <h2>{{title}}</h2>
      </div>
      <div class="pro-params">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="pro-btn"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  props:{
    title:String
  },
  data() {
    return {
      isFixed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initpro);
  },
  methods: {
    initpro() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    }
  },
  destroyed(){
    window.removeEventListener("scroll", this.initpro,false);
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.nav-bar {
  height: 70px;
  line-height: 70px;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  &.is_fix{
      position: fixed;
      z-index: 10;
      top: 0;
      width: 100%;
      box-shadow: 0 5px 5px $colorE;
    }  
  .container {
    @include flex();
    .pro-title {
      h2 {
        font-size: $fontH;
      }
    }
    .pro-params {
      span {
        margin: 0 11px;
      }
      a {
        font-size: $fontJ;
        color: $colorC;
        font-weight: bold;
      }
    }
  }
}
</style>