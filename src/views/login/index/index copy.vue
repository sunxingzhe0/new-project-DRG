<template>
  <div class="login-page">
    登录中...
    <el-button @click="confirmLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  async created() {},
  methods: {
    confirmLogin() {
      // await this.$store.dispatch("app/handelLogin");
      this.$router.push("/baseConfig/dataSource");
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
