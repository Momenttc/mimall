<template>
  <div class="no-data">
    <img v-lazy="'/imgs/icon-no-data.png'" >
    <p>当前暂无提交记录</p>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
.no-data{
  text-align: center;
  font-size: 20px;
  color: #999;
  p{
    margin: 50px 0;
  }
  img{
    width: 240px;
    height: 180px;
    margin: 40px 0;
  }
}
</style>