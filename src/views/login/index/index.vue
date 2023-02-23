<template>
  <div class="login-container">
    <div class="login-wrapper" type="flex">
      <div :md="10" class="login-aside"></div>
      <div :md="14" class="login-box">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">{{ "DRGs管理系统" }}</h3>
          </div>

          <el-form-item prop="account">
            <el-input
              ref="account"
              prefix-icon="el-icon-user"
              v-model="loginForm.account"
              placeholder="请填写登录账号"
              name="account"
              type="text"
              tabindex="1"
              autocomplete="on"
              @input="inputChange"
              @change="accountChange"
            >
            </el-input>
          </el-form-item>

          <el-tooltip
            v-model="capsTooltip"
            content="大写锁定打开"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              >
                <template v-slot:suffix>
                  <i
                    @click="showPwd"
                    :class="
                      passwordType === 'password'
                        ? 'eyes el-icon-more'
                        : 'eyes el-icon-view'
                    "
                  ></i>
                </template>
              </el-input>
            </el-form-item>
          </el-tooltip>

          <el-button
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
    <div class="msg-bottom">重庆XXX医院 使用权所有©2023-2024</div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      capsTooltip: false, //大写
      passwordType: "password",
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空"
          }
        ]
      }
    };
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    accountChange() {},
    inputChange() {
      this.loginForm.password = "";
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // await this.$store.dispatch("app/handelLogin");
          this.$router.push("/baseConfig/dataSource");
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/variables.scss";

$dark_gray: #889aa4;

.login-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: url("~@/assets/img/common/background.png") no-repeat 0 / cover; */
  background-color: #315c7c;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .login-wrapper {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    width: 940px;
    height: 440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background: $--color-white; */
  }

  .login-aside {
    /* background: url("~@/assets/img/common/login-form-aside.png") no-repeat 50% /
      cover; */
    background-color: #315c7c;
    border: 1px solid #ccc;
    width: 500px;
    height: 440px;
  }
  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    margin: 0 auto;
    width: 380px;
    max-width: 100%;
    height: 380px;
    padding: 6%;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
  }

  .el-input__prefix {
    left: 11px;
    color: #5e6875;
  }

  .el-input__suffix {
    right: 11px;
  }

  .el-input--prefix .el-input__inner {
    padding-left: 50px;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 36px;
  }

  .login-form__code {
    .el-input__suffix {
      img {
        padding-top: 1px;
        width: 89px;
        height: 34px;
      }
    }

    .el-input--suffix .el-input__inner {
      padding-right: 100px;
    }
  }

  .svg-container {
    color: $--color-primary;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      margin: 0px auto 6%;
      font-size: 20px;
      color: #333;
      text-align: center;
      /* font-weight: bold; */
      & + .is-center {
        font-size: 14px;
      }
    }
  }

  .show-pwd {
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.eyes {
  cursor: pointer;
}
.msg-bottom {
  position: fixed;
  bottom: 50px;
  font-size: 12px;
  left: 50%;
  color: rgb(203, 203, 203);
  transform: translate(-50%, 0);
}
</style>
