<template>
  <div class="app-header">
    <div class="header-left">
      <div class="app-logo">
        <img src="@/assets/img/login-bg.png" alt="" />
      </div>
      <div class="app-company">
        {{ companyName }}
      </div>
      <div class="app-time">
        <span>{{ now.date }}</span>
        <span>{{ now.time }}</span>
        <span>{{ now.week }}</span>
      </div>
    </div>
    <div class="header-center">
      <div class="app-name">{{ appName }}</div>
    </div>
    <div class="header-right">
      <div class="app-user">
        <div class="user-name">
          <!-- {{ `${userInfo.name || "用户名"}（${userInfo.username || "账号"}）` }} -->
          主管医师：张伟
        </div>
      </div>
      <el-popconfirm title="确认退出登录？" @confirm="loginOut">
        <svg slot="reference" class="iconfont app-logout" aria-hidden="true">
          <use xlink:href="#icon-logout"></use>
        </svg>
      </el-popconfirm>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { appName, companyName } from "@/config";

export default {
  name: "AppHeader",
  data() {
    return {
      now: {
        date: "",
        time: "",
        week: "",
      },
      appName,
      companyName,
      timmer: null,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
        ? JSON.parse(this.$store.state.app.userInfo)
        : {};
    },
  },
  created() {
    this.timmer = setInterval(() => this.updateTime(), 1000);
  },
  beforeDestroy() {
    if (this.timmer) clearInterval(this.timmer);
  },
  methods: {
    updateTime() {
      const now = dayjs();
      this.now = {
        date: now.format("YYYY-MM-DD"),
        time: now.format("HH:mm:ss"),
        week: now.format("dddd"),
      };
    },
    async loginOut(e) {
      await this.$store.dispatch("app/loginOut");
      this.$router.push("/login/index");
    },
  },
};
</script>
<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  color: #9bd4ff;
}
.header-left {
  display: flex;
  align-items: center;
  .app-logo {
    margin-right: 10px;
    img {
      width: 45px;
      height: 45px;
    }
  }
  .app-company {
    height: 14px;
    font-size: 14px;
    line-height: 14px;
    font-family: PingFang SC;
    margin-right: 10px;
  }
}
.header-center {
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  span {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .app-name {
    color: #9bd4ff;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
  }
}
.header-right {
  display: flex;
  align-items: center;
  .app-home {
    width: 20px;
    height: 20px;
    font-size: 20px;
    display: flex;
    cursor: pointer;
    margin-right: 40px;
  }
  .app-user {
    display: flex;
    align-items: center;
    height: 14px;
    font-size: 14px;
    font-family: PingFang SC;
  }
  .app-avatar {
    margin-right: 10px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .app-logout {
    font-size: 20px;
    cursor: pointer;
    margin-left: 30px;
  }
}
</style>
