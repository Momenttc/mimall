<template>
  <div class='service'>
    <div class="container">
      <div class="repair">
        <span class='icon-repair'></span>
        <a href="javascript:;">预约维修服务</a>
      </div>
      <div class="7day">
        <span class='icon-7day'></span>
        <a href="javascript:;">7天无理由退货</a>
      </div>
      <div class="15day">
        <span class='icon-15day'></span>
        <a href="javascript:;">15天免费换货</a>
      </div>
      <div class="post">
        <span class='icon-post'></span>
        <a href="javascript:;">满150元包邮</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'service-bar'
}
</script>
<style lang="scss">
@import './../assets/scss/mixin.scss';
  .service{
    .container{
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      // margin-top: 30px;
      div{
        display: inline-block;
        padding-right: 89px;
        border-right: 1px solid #E5E5E5;
        vertical-align: middle;
        &:last-child{
          border-right: none;
        }
      }
      span{
        display: inline-block;
        margin-left: 90px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .icon-repair{
        @include bgImg(20px, 20px, "/imgs/icon-setting.png")
      }
      .icon-7day{
        @include bgImg(20px, 20px, "/imgs/icon-7day.png")
      }
      .icon-15day{
        @include bgImg(20px, 20px, "/imgs/icon-setting.png")
      }
      .icon-post{
        @include bgImg(20px, 20px, "/imgs/icon-post.png")
      }
      a{
        color:#666666;
        font-size: 16px;
      }
    }
  }
</style>