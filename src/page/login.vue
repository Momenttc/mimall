<template>
  <div class="login">
    <div class="container">
      <div class="login-header">
        <div class="wrapper"></div>
      </div>
    </div>
    <div class="body-container">
      <div class="container">
        <div class="body">
          <div class="form-wrapper">
            <div class="form-header">
              <span><a href="javascript:;" class="account">账号登录</a></span>
              <span class="separate">|</span>
              <span><a href="javascript:;" class="code">扫码登录</a></span>
            </div>
            <div class="form-body">
                <input type="text" name="userinfo" class="userinfo" placeholder="邮箱/手机号码/小米ID" v-model="username">
                <input type="password" name="password" class="password" placeholder="密码" v-model="password"> 
            </div>
            <div class="btn-wrapper">
              <div class="btn btn-huge" @click="login">登录</div>
            </div>
            <div class="form-footer">
              <div class="wrapper-left">
                <a href="javascript:;">手机短信登录</a>
                <span>/</span>
                <a href="javascript:;">注册</a>
              </div>
              <div class="wrapper-right">
                <a href="javascript:;">立即注册</a>
                <span>|</span>
                <a href="javascript:;">忘记密码？</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="login-footer">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"login",
  data(){
    return{
      username: "",
      password: "",
      userId: ''
    }
  },
  
  methods:{
    login(){
      let { username,password } = this
      this.axios.post("/user/login",{
        username,
        password
      }).then( (res={}) => {
        this.$cookie.set("userId", res.id, { expires:"Session"})
        this.$store.dispatch("saveUserName", res.username) 
        this.$router.push({
          name:"index",
          params:{
            from:"login"
          }
        })
      })
    }
    },
    // register(){
    //   this.axios.post("/user/register",{
    //     username: "aaqq",
    //     password: "admin1",
    //     email: "admin1@qqqq.com"
    //   }).then( () => {
         
    //     alert("注册成功")
    //   })
    // }
  }
</script>
<style lang="scss" scoped>
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
.login{
    .container{
      text-align: left;
      .login-header{
        height: 103px;
        line-height: 103px;
        .wrapper{
          @include bgImg(204px, 80px, "/imgs/login-logo.png");
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .body-container{
      @include bgImg(100%, 444px, "/imgs/login-bg2.jpg");
      .container{
        position: relative;
        text-align: center;
        .body{
          .form-wrapper{
            position: absolute;
            right: 0;
            width: 410px;
            height: 378px;
            margin: 37px 0 29px;
            background-color: #fff;
            .form-header{
              padding: 30px 73px 0;
              text-align: center;
              span{
                font-size: 18px;
                color:$colorC;
                a.account{
                  color: $colorA;
                }
                a.code{
                  color:$colorC
                }
              }
              .separate{
                color: $colorF;
                margin: 0 35px;
              }
            }
            .form-body{
              // padding: 40px 30px 25px;
              line-height: 1;
              .userinfo{
                height: 50px;
                width: 348px;
                border: 1px solid #E5E5E5;
                margin-bottom: 20px;
                padding-left: 5px;
              }
              .password{
                border: 1px solid #E5E5E5;
                width: 348px;
                height: 50px;
                padding-left: 5px;
                margin-bottom: 20px;
              }
            }
            .btn-wrapper{
              text-align: center;
              line-height: 1;
            }
            .form-footer{
              @include flex();
              padding: 14px 30px;
              font-size: 14px;
              line-height: 1;
              span{
                  margin: 0 5px;
                }
              .wrapper-left{
                a,span{
                  color: $colorA;
                }
              }
              .wrapper-right{
                a,span{
                  color: $colorD;
                }
                
              }
            }
          }
        }
      }
    }

  }
</style>