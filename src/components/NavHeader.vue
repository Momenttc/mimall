/* eslint-disable vue/no-dupe-keys */
<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-munu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="cart" @click="goToCart">
            <span class="icon-cart"></span>
            购物车({{ cartCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item, index) in phoneList" :key="index">
                  <a href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" alt />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui';
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: []
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cartCount;
    }
  },
  filters: {
    currency(val) {
      if (!val) return 0.0;
      return val.toFixed(2) + "元";
    }
  },
  mounted() {
    this.getPhoneList();
    let params = this.$route.params
    if(params && params.from == "login"){
      this.getCartCount()
    }
    
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    logout(){
      this.axios.post("/user/logout").then( 
        () => {
        Message.warning("退出成功")
        this.$cookie.set("userId", "", { expires:"-1"})
        this.$store.dispatch("saveUserName", "")
        this.$store.dispatch("cartCount",0)
        } 
      )
    },
    getCartCount(){
      this.axios.get("/carts/products/sum").then((res=0) => {
      this.$store.dispatch("cartCount",res)
      })
    },
    getPhoneList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012"
          }
        })
        .then(res => {
          if (res.list.length > 6) {
            this.phoneList = res.list.slice(0, 6);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToCart() {
      this.$router.push("/cart");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/base.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    .container {
      @include flex();
      a {
        display: inline-block;
        margin-right: 17px;
        color: #b0b0b0;
        font-size: 12px;
      }
      .cart {
        width: 110px;
        margin-right: 0;
        background-color: #ff6600;
        text-align: center;
        color: #fff;
        .icon-cart {
          @include bgImg(16px, 16px, "/imgs/white-cart.png");
          margin-right: 4px;
          vertical-align: middle;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-menu {
        padding-left: 209px;
        width: 643px;
        height: 112px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            z-index: 10;
            background-color: white;
            top: 112px;
            width: 1226px;
            left: 0;
            height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s;
            // border-top: 1px solid #E5E5E5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            .product {
              width: 16.6%;
              height: 220px;
              float: left;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              position: relative;
              &::before {
                content: "";
                height: 100px;
                width: 1px;
                top: 28px;
                right: 0;
                border-right: 1px solid $colorF;
                position: absolute;
              }
              &:last-child::before {
                display: none;
              }
              a {
                display: block;
              }
              .pro-img {
                height: 137px;
              }
              img {
                height: 111px;
                margin-top: 26px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          line-height: 50px;
          border: 1px solid #e0e0e0;
          input {
            box-sizing: border-box;
            height: 50px;
            width: 264px;
            border: none;
            border-right: 1px solid #e0e0e0;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 19px;
            margin-bottom: -3px;
          }
        }
      }
    }
  }
}
</style>