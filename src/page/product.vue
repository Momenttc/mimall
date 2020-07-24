/* eslint-disable vue/no-parsing-error */
<template>
  <div class="product">
    <product-params :title="productInfo.name">
      <template v-slot:pro-btn>
        <button class="btn" @click="goToCart">立即购买</button>
      </template>
    </product-params>
    <div class="pro-ads1">
      <div class="info">
        <h1>{{productInfo.name}}</h1>
        <p>{{productInfo.subtitle}}</p>
        <div class="detail">
          <span>全球首款双频GP</span>
          <span class="separate">|</span>
          <span>骁龙845</span>
          <span class="separate">|</span>
          <span>AI变焦双摄</span>
          <span class="separate">|</span>
          <span>红外人脸识别</span>
        </div>
        <h2>¥{{productInfo.price}}</h2>
      </div>
      <img v-lazy="'/imgs/product-bg-1.png'" />
    </div>
    <div class="container">
      <div class="pro-ads2">
        <img v-lazy="'/imgs/product-bg-2.png'" />
      </div>
    </div>
    <div class="pro-ads3">
      <img v-lazy="'/imgs/product-bg-3.png'" />
    </div>
    <div class="swiper">
      <Swiper :options="swiperOptions">
        <SwiperSlide v-for="(item,index) in proList" :key="index">
          <img v-lazy="item" class="swiper-imgs" />
        </SwiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
      </Swiper>
      <h3>{{productInfo.name}} AI变焦双摄拍摄</h3>
    </div>
    <div class="pro-ad4">
      <div class="ad4">
        <div class="ad-title1">
          <h1>60帧超慢动作</h1>
          <h1>慢慢回味每一瞬间的精彩</h1>
        </div>
        <div class="ad-title2">
          <h2>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！更能AI 精准分析视频内容，15个场景智能匹配背景音效。</h2>
        </div>
        <div class="video-img container" @click="showVideo=true">
          <img v-lazy="'/imgs/gallery-1.png'" />
        </div>
        <div class="video-box">
          <div class="overlay" v-if="showVideo"></div>
          <div class="video" :class="{showVideo: showVideo}">
            <span class="icon-close" @click="showVideo=false"></span>
            <video src="/imgs/video.mp4" controls="controls" muted autoplay></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ProductParams from "./../components/ProductParams";
export default {
  name: "product",
  data() {
    return {
      // title: '',
      showVideo: false,
      productInfo: {},
      swiperOptions: {
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 3,
        spaceBetween: 5,
        // slidesPerGroup: 3,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },

      proList: [
        "/imgs/gallery-2.png",
        "/imgs/gallery-3.png",
        "/imgs/gallery-4.png",
        "/imgs/gallery-5.jpg",
        "/imgs/gallery-6.jpg"
      ]
    };
  },
  components: {
    ProductParams,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  mounted(){
    this.getProductInfo()
  },
  methods:{
    getProductInfo(){
      let id = this.$route.params.id
      this.axios.get(`/products/${id}`).then(res => {
        this.productInfo = res
      })
    },
    goToCart(){
      let id = this.$route.params.id
      this.$router.push(`/detail/${id}`)
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/mixin.scss";
.product {
  width: 100%;
  .h {
    height: 150px;
    background-color: lightpink;
  }
  button {
    margin-left: 11px;
  }
  .pro-ads1 {
    margin-bottom: 38px;
    position: relative;
    cursor: pointer;
    .info {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      h1 {
        font-size: 80px;
        font-weight: normal;
      }
      p {
        // width: 216px;
        margin: 0 auto;
        text-align-last: justify;
        font-weight: normal;
        font-size: 24px;
      }
      h2{
        font-size: 38px;
      }
      .detail {
        margin-bottom: 20px;
        margin-top: 10px;
        
        .separate {
          margin: 0 15px;
        }
      }
    }
    img {
      width: 100%;
      
    }
  }
  .pro-ads2 {
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .pro-ads3 {
    margin-top: 45px;
    img {
      width: 100%;
      cursor: pointer;
    }
  }
  .swiper {
    text-align: center;
    margin-top: 35px;
    cursor: pointer;
    // margin-bottom: 128px;
    .swiper-slide {
      height: 356px;
      .swiper-imgs {
        height: 100%;
      }
    }
    h3 {
      margin: 25px 0 52px;
      font-size: 18px;
    }
  }
  .pro-ad4 {
    position: relative;
    background-color: #070708;
    margin-bottom: 50px;
    .ad-title1 {
      position: absolute;
      width: 686px;
      height: 137px;
      left: 50%;
      transform: translateX(-50%);
      margin: 82px 0 47px;
      h1 {
        font-size: 60px;
        color: #fff;
        line-height: 80px;
        text-align: center;
        font-weight: normal;
      }
    }
    .ad-title2 {
      position: absolute;
      width: 732px;
      height: 60px;
      top: 200px;
      left: 50%;
      transform: translateX(-50%);
      margin: 82px 0 47px;
      h2 {
        font-size: 24px;
        color: #fff;
        line-height: 36px;
        text-align: center;
        font-weight: normal;
      }
    }
    .container {
      img {
        width: 100%;
        margin-top: 384px;
        margin-bottom: 90px;
        cursor: pointer;
      }
    }
  }
  .video-box {
    .overlay {
      @include position(fixed);
      background-color: #333;
      opacity: 0.4;
      z-index: 12;
    }
    .video {
      @include position(fixed, -50%, 50%);
      z-index: 13;
      transform: translate(-50%, -50%);
      width: 1000px;
      height: 536px;
      opacity: 0;
      transition: all 0.5s;
      &.showVideo {
        top: 50%;
        opacity: 1;
      }
      .icon-close {
        @include bgImg(20px, 20px, "/imgs/icon-close.png");
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 14;
        cursor: pointer;
      }
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        outline: none;
      }
    }
  }
}
</style>