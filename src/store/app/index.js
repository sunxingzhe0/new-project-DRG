import { apiLogin, apiLoginOut } from "@/api/baseConfig/index";
import { setToken, removeToken } from "@/utils/auth";
export default {
  namespaced: true,
  state: {
    token: "",
    userInfo: window.sessionStorage.getItem("userInfo")
  },
  actions: {
    handelLogin({ commit }, { userName, password }) {
      return new Promise(async (resolve, reject) => {
        // const { username, password } = userInfo; //用户输入信息
        try {
          const res = await apiLogin({
            username,
            password
          });
          commit("SET_TOKEN", res.token);
          setToken(res.token);
          commit("SET_USERINFO", res ? JSON.stringify(res) : "");
          window.sessionStorage.setItem(
            "userInfo",
            res ? JSON.stringify(res) : ""
          );
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
    loginOut({ commit }, palod) {
      return new Promise(async (resolve, reject) => {
        resolve(palod);
        // try {
        //   await apiLoginOut({});
        //   commit("SET_TOKEN", "");
        //   commit("SET_USERINFO", null);
        //   removeToken();
        //   window.sessionStorage.clear();
        //   resolve(palod);
        // } catch (error) {
        //   reject(error);
        // }
      });
    }
  },
  mutations: {
    SET_TOKEN: (state, palod) => {
      state.token = palod;
    },
    SET_USERINFO: (state, palod) => {
      state.userInfo = palod;
    }
  }
};
