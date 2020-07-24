<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="munu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul class="item-list" v-for="(item, i) in menuList" :key="i">
                  <li v-for="(item, j) in item" :key="j">
                    <a :href="'/#/product/'+item.id" class="menu-a">
                      <img :src="item?item.img:'/imgs/item-box-1.png'" alt />
                      <span>{{ item?item.name:'RedMi9' }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children"></div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">笔记本 平板</a>
              <div class="children"></div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children"></div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children"></div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">耳机 音箱</a>
              <div class="children"></div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children"></div>
            </li>
            <li class="munu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children"></div>
            </li>
          </ul>
        </div>
        <Swiper :options="swiperOptions">
          <SwiperSlide v-for="( item, index) in imgList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" />
            </a>
          </SwiperSlide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
      </div>
      <div class="ads">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a :href="'/#/product/30'">
          <img v-lazy="'/imgs/banner-1.png'" />
        </a>
      </div>
    </div>
    <div class="big-container">
      <div class="container">
        <div class="product-box">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="wrapper-left">
              <a :href="'/#/product/30'">
                <img v-lazy="'/imgs/mix-alpha.jpg'" />
              </a>
            </div>
            <div class="big-wrapper-right">
              <div class="wrapper-right" v-for="(item,i) in productList" :key="i">
                <div class="phone-detail" v-for="(item,j) in item" :key="j">
                  <span :class="{'new-pro':j%2==0 }">新品</span>
                  <div class="product-img">
                    <img v-lazy="item.mainImage">
                  </div>
                  <div class="product-info">
                    <h3>{{ item.name }}</h3>
                    <p class="detail">{{ item.subtitle }}</p>
                    <p class="price" @click="addCart( item.id )">{{ item.price }}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <Modal
      title="提示"
      modalType="middle"
      btnType="1"
      sureText="查看购物车"
      :showModal="showModal"
      @cancel="cancel"
      @sumit="sumit"
    >
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </Modal>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ServiceBar from "./../components/ServiceBar";
import Modal from "./../components/modal";
export default {
  name: "index",
  data() {
    return {
      imgList: [
        {
          id: 42,
          img: "/imgs/slide-1.jpg"
        },
        {
          id: 45,
          img: "/imgs/slide-2.jpg"
        },
        {
          id: 46,
          img: "/imgs/slide-3.jpg"
        },
        {
          id: "",
          img: "/imgs/slide-4.jpg"
        },
        {
          id: "",
          img: "/imgs/slide-5.jpg"
        }
      ],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        effect: "cube",
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      menuList: [
        [
          { id: 30, img: "/imgs/item-box-1.png", name: "RedMi9" },
          { id: 31, img: "/imgs/item-box-2.png", name: "RedMi9" },
          { id: 32, img: "/imgs/item-box-3.jpg", name: "RedMi9" },
          { id: 33, img: "/imgs/item-box-4.jpg", name: "移动4G+专区" }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        { id: 33, img: "/imgs/ads-1.png" },
        { id: 48, img: "/imgs/ads-2.jpg" },
        { id: 45, img: "/imgs/ads-3.png" },
        { id: 47, img: "/imgs/ads-4.jpg" }
      ],
      productList: [],
      showModal: false
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar,
    Modal
  },
  mounted() {
    this.phoneList();
  },
  methods: {
    phoneList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14
          }
        })
        .then(res => {
          res.list = res.list.slice(6, 14);
          this.productList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        });
    },
    addCart(id) {
      this.axios.post("/carts",{
        productId: id,
        selected: true
      }).then( res => {
        this.$store.dispatch("cartCount",res.cartTotalQuantity)
        this.showModal = true
      })
    },
    cancel() {
      this.showModal = false
    },
    sumit(){
      this.$router.push("/cart")
    }
  },
  directives: {
    swiper: directive
  }
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";

.index {
  .container {
    .swiper-box {
      .swiper-container {
        height: 451px;
        .swiper-button-prev {
          left: 274px;
        }
      }
      .nav-menu {
        position: absolute;
        z-index: 9;
        width: 264px;
        height: 451px;
        background-color: #55585a85;
        .menu-wrap {
          margin: 26px 0;
          .munu-item {
            height: 50px;
            line-height: 50px;
            a {
              position: relative;
              display: block;
              color: #fff;
              font-size: 16px;
              padding: 0 30px;

              &::after {
                content: "";
                @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
                position: absolute;
                right: 30px;
                top: 34%;
                // transform: translateY(50%);
              }
            }
            &:hover {
              background-color: $colorA;
              .children {
                display: block;
              }
            }
            .children {
              display: none;
              width: 964px;
              height: 450px;
              position: absolute;
              left: 264px;
              top: 0;
              z-index: 8;
              border: 1px solid #e5e5e5;
              box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.2);
              .item-list {
                height: 75px;
                line-height: 75px;
                width: 964px;
                display: flex;
                justify-content: space-between;
                background-color: #fff;
                li {
                  float: left;
                  .menu-a {
                    color: $colorB;
                    font-size: $fontJ;
                    img {
                      width: 35px;
                      vertical-align: middle;
                    }
                    span {
                      display: inline-block;
                      margin-left: 15px;
                    }
                    &::after {
                      display: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
    .ads {
      @include flex();
      margin: 14px 0 31px;
      a {
        width: 296px;
        height: 197px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner {
      margin-bottom: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .container {
      background-color: #bfa;
      .product-box {
        padding: 30px 0 20px;
      }
    }
  }
  .big-container {
    background-color: #f5f5f5;
    .container {
      .product-box {
        padding: 30px 0 20px;
        h2 {
          margin-bottom: 20px;
        }
        .wrapper {
          display: flex;
          .wrapper-left {
            margin-right: 16px;
            img {
              width: 224px;
              height: 619px;
            }
          }
          .big-wrapper-right {
            width: 986px;
            .wrapper-right {
              @include flex();
              margin-bottom: 14px;
              .phone-detail {
                cursor: pointer;
                // display: flex;
                background-color: #fff;
                width: 236px;
                height: 302px;
                span {
                  display: block;
                  width: 67px;
                  height: 24px;
                  margin: 0 auto;
                  text-align: center;
                  padding-top: 2px;
                  box-sizing: border-box;
                  color: #fff;
                  font-size: 14px;
                  &.new-pro {
                    background-color: #7ecf68;
                  }
                  &.kill-pro {
                    background-color: #e82626;
                  }
                }
                .product-img {
                  display: flex;
                  vertical-align: middle;
                  align-items: center;
                  width: 190px;
                  height: 195px;
                  margin: 0 auto;
                  img {
                    width: 100%;
                  }
                }
                .product-info {
                  text-align: center;
                  h3 {
                    width: 236px;
                    line-height: 24px;
                  }
                  .detail {
                    margin-bottom: 10px;
                    color: #999999;
                  }
                  .price {
                    font-size: 14px;
                    color: #f20a0a;
                    font-weight: bold;
                    &::after {
                      content: "";
                      @include bgImg(18px, 18px, "/imgs/cart.png");
                      margin-left: 5px;
                      vertical-align: middle;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>