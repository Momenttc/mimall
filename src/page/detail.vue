<template>
  <div class="detail">
    <product-params :title="productInfo.name"></product-params>
    <div class="container">
      <div class="wrapper-left">
        <Swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in swiperImg" :key="index">
            <img v-lazy="item" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
      </div>
      <div class="wrapper-right">
        <div class="header">
          <h2>{{productInfo.name}}</h2>
          <p
            class="detail"
          >相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
          <p class="mi">小米自营</p>
          <p class="price">{{productInfo.price}}元</p>
        </div>
        <div class="address">
          <div class="loc">
            <span class='icon-loc'></span>
            <span class="detail-loc">北京 北京市 朝阳区 安定门街道</span>
            <a href="javascript:;" class="change">修改</a>
          </div>
          <p>有现货</p>
        </div>
        <div class="version ">
          <h2>选择版本</h2>
          <div class="btn-group">
            <div class="btn btn-large btn-default2" @click="showChecked=1" :class="{checked:showChecked==1}">6GB+64GB 全网通</div>
            <div class="btn btn-large btn-default2" @click="showChecked=2" :class="{checked:showChecked==2}">4GB+64GB 移动4G</div>
          </div>
        </div>
        <div class="color">
          <h2>选择颜色</h2>
          <div class="btn btn-large btn-default2 checked">
            <span class="color-box"></span>
            深空灰
          </div>
        </div>
        <div class="sum">
          <div class="detail">
            <span>{{productInfo.name}} {{showChecked==1?"6GB+64GB 全网通":"4GB+64GB 移动4G"}} 深灰色</span>
            <span>{{productInfo.price}}元</span>
          </div>
          <div class="total">
            <h2>总计：{{productInfo.price}}元</h2>
          </div>
        </div>
        <div class="btn-group">
          <div class="btn btn-huge" @click="addCart">加入购物车</div>
          <div class="btn btn-default">
            喜欢
          </div>
        </div>
      </div>
    </div>
    <div class="explain">
      <div class="container"></div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import ServiceBar from "./../components/ServiceBar";
import ProductParams from "./../components/ProductParams";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "detail",
  data() {
    return {
      showChecked: 1,
      id: this.$route.params.id,
      productInfo: {},
      swiperImg: [
        "/imgs/phone-1.jpg",
        "/imgs/phone-2.jpg",
        "/imgs/phone-3.jpg",
        "/imgs/phone-4.jpg"
      ],
      swiperOptions: {
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  components: {
    ServiceBar,
    ProductParams,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then(res => {
        this.productInfo = res;
      });
    },
    addCart(){
      
      this.axios.post("/carts",{
        productId: this.id,
        selected: true
      }).then( (res={}) => {
        this.$store.dispatch("cartCount",res.cartTotalQuantity)
        this.$router.push("/cart")
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.container {
  @include flex();
  .wrapper-left {
    margin-top: -50px;
    width: 384px;
    img {
      width: 100%;
    }
  }
  .wrapper-right {
    width: 584px;
    margin-top: 50px;
    margin-bottom: 50px;
    .checked{
        border-color: $colorA;
        color: $colorA;
      }
    .header {
      border-bottom: 1px solid $colorH;
      h2 {
        font-size: 28px;
        margin-bottom: 16px;
      }
      .detail {
        font-size: 14px;
        // font-weight: bold;
        line-height: 22px;
        color: $colorD;
        margin-bottom: 26px;
      }
      .mi {
        font-size: 16px;
        color: $colorA;
        margin-bottom: 14px;
      }
      .price {
        font-size: 20px;
        color: $colorA;
        margin-bottom: 25px;
      }
    }
    .address{
      height: 108px;
      margin: 20px 0 30px;
      border: 1px solid $colorH;
      .loc{
        margin-top: 27px;
        margin-left: 34px;
        .icon-loc{
          @include bgImg(22px, 22px, "/imgs/icon-loc.png")
        }
        .detail-loc{
          display: inline-block;
          color: $colorC;
          margin: 0 20px 0 10px;
          font-weight: bold;
          vertical-align: super;
        }
        .change{
          color: $colorA;
          font-weight: bold;
          vertical-align: super;
          
        }
      }
      p{
        color: $colorA;
        font-weight: bold;
        margin-top: 11px;
        margin-left: 64px;
      }
    }
    .version{
      h2{
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
    .color{
      margin-bottom: 50px;
      h2{
          margin: 30px 0 20px;
        }
      .color-box{
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: $colorC;
      }
    }
    .sum{
      background-color: #FAFAFA;
      margin-bottom: 30px;
      .detail{
        @include flex();
        span{
          font-size: 14px;
          font-weight: bold;
          display: inline-block;
          margin-top: 24px;
        }
      }
      .total{
        margin-top: 18px;
        padding-bottom: 29px;
        font-size: 24px;
        color: $colorA;
      }
      
    }
    .btn-default{
        height: 54px;
        width: 142px;
        line-height: 54px;
        font-size: 16px;
      }
  }
}
.explain{
  background-color: #F3F3F3;
  height: 340px;
  text-align: center;
   .container{
    @include bgImg(1226px,189px,"/imgs/item-price.jpeg");
    margin: 0 auto;
    margin-top: 90px;
  }
}
</style>