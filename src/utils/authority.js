import Taro from "@tarojs/taro";

import { isDev } from "@/constants/config";

const key = `wfc2021-${isDev ? "dev" : "production"}`;
const maxAge = 1000 * 60 * 60 * 24 * 29;

// 上次保存的用户信息
let errorUser = "";

const authority = {
  get() {
    try {
      const user = Taro.getStorageSync(key);
      if (!user || user.time + maxAge < new Date().getTime()) {
        return {};
      }
      return user || {};
    } catch (e) {
      return {};
    }
  },
  set(user, refresh = false) {
    if (!user) return {};
    const oldUser = this.get() || {};
    (refresh || !oldUser.time) && (user.time = new Date().getTime());
    const newUser = { ...oldUser, ...user };
    // 保证记录的是最后一次完整的信息
    newUser.openid && (errorUser = newUser);
    Taro.setStorageSync(key, newUser);
    return newUser;
  },
  getErrorUser() {
    return errorUser || this.get();
  },
  clear() {
    const { code = "" } = this.get();
    Taro.removeStorageSync(key);
    this.set({ code });
    return { code };
  }
};

export function authorityPlugins(store) {
  // 新用户状态
  const newState = store.state;
  newState.user && (newState.user.user = authority.get());
  store.replaceState(newState);

  // 自动保存
  store.subscribe((mutation, state = {}) => {
    if (mutation.type === "SET_USER") {
      const { user = {} } = state.user || {};
      authority.set(user);
    }
  });
}

export default authority;
