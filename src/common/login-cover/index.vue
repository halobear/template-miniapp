<template>
  <button v-if="hasAuth" class="login-cover" type="primary" @tap="handleClick" />
  <button class="login-cover" v-else-if="useProfile && type !== 'getPhoneNumber'" @tap="doDecodeUserProfile"></button>
  <button
    v-else
    class="login-cover"
    type="primary"
    :open-type="type"
    @getPhoneNumber="decodeUser"
    @getUserInfo="decodeUser"
  />
</template>

<script>
import Taro from "@tarojs/taro";
import router from "@/utils/router";
import { loading, toast } from "@/utils/feedback";
import { toDecode, codeLogin, decodeUserProfile } from "@/utils/login";

export default {
  props: {
    type: {
      type: String,
      default: "getPhoneNumber" // getUserInfo
    },
    create: {
      type: Number,
      default: 1
    },
    cb: {
      type: Function
    }
  },
  data() {
    return {
      useProfile: Taro.canIUse("getUserProfile")
    };
  },
  computed: {
    hasAuth() {
      const { user } = this.$store.state.user;
      const hasAuth = this.type === "getPhoneNumber" ? !!user.phone : !!(user.nickName || user.nickname);
      return hasAuth;
    }
  },
  async mounted() {
    loading.show();
    await codeLogin()
      .then(loading.hide)
      .catch(loading.hide);
    const { user } = this.$store.state.user;
    if (user.phone) {
      this.$emit("success", user);
      if (this.cb) this.cb();
    }
  },
  methods: {
    async doDecodeUserProfile() {
      Taro.showLoading();
      try {
        await decodeUserProfile();
        this.$emit("tap");
      } catch (e) {
        this.props.onError(e);
      }
      Taro.hideLoading();
    },
    async handleClick() {
      this.$emit("tap");
      if (this.cb) this.cb();
    },
    async decodeUser(e) {
      loading.show();
      try {
        const { encryptedData, iv } = e.target;
        if (!encryptedData) {
          return toast("微信授权失败");
        }
        await toDecode({ encrypted_data: encryptedData, iv, is_create_track: this.create });
        this.handleClick();
        loading.hide();
      } catch (err) {
        console.log(err);
        toast(err.message || "登录失败");
        if (err.statusCode === 401) {
          router.redirectLogin();
        }
      }
    }
  }
};
</script>

<style>
.login-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10000;
}
</style>
