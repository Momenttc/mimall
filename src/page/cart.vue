/* eslint-disable no-empty */
<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:title>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{checked:selectedAll}" @click="toggleAll"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(items,index) in List" :key="index">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{checked:items.productSelected}"
                  @click="update(items)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="items.productMainImage" alt />
                <span>{{items.productName}} {{items.productSubtitle}}</span>
              </div>
              <div class="item-price">{{items.productPrice}}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="update(items,'-')">-</a>
                  <span>{{items.quantity}}</span>
                  <a href="javascript:;" @click="update(items,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{items.productTotalPrice}}元</div>
              <div class="item-del" @click="proDelete(items)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共
            <span>{{List.length}}</span>件商品，已选择
            <span>{{ selectedNum }}</span>件
          </div>
          <div class="total fr">
            合计：
            <span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="accounts">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from "./../components/OrderHeader";
import NavFooter from "./../components/NavFooter";
import ServiceBar from "./../components/ServiceBar";
import { Message } from 'element-ui';
export default {
  name: "cart",
  data() {
    return {
      List: [],
      selectedAll: false,
      cartTotalPrice: 0,
      selectedNum: 0
    };
  },
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    //获取购物车列表
    getCartList() {
      this.axios.get("/carts").then(res => {
        this.renderData(res);
      });
    },
    //控制全选
    toggleAll() {
      let url = this.selectedAll ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then(res => {
        this.renderData(res);
      });
    },
    //更新操作
    update(items, type) {
      let quantity = items.quantity;
      let selected = items.productSelected
      if (type == "+") {
        if (quantity > items.productStock) {
          Message.warning("购买商品数量不能超过库存");
          return;
        } else {
          quantity++;
        }
      } else if (type == "-") {
        if (quantity == 1) {
          Message.warning("购买商品数量不能少于1件");
          return;
        } else {
          quantity--;
        }
      } else {
        selected = !items.productSelected;
      }
      this.axios
        .put(`/carts/${items.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res)
        });
    },
    //删除操作
    proDelete(items) {
      this.axios.delete(`/carts/${items.productId}`).then(res => {
        this.renderData(res);
      });
    },
    //结算
    accounts() {
      let selectedAll = this.List.every( items => !items.productSelected);
      if(selectedAll){
        Message.warning("至少选中一件商品")
        return
      }
      this.$router.push("/order/confirm")
    },
    //公共赋值
    renderData(res) {
      this.List = res.cartProductVoList || [];
      this.selectedAll = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.selectedNum = this.List.filter(item => {
        return item.productSelected;
      }).length;
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/base.scss";
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>