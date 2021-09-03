<template>
  <view @tap.stop="cancel" :class="[{ visible: visible }, direction]" class="my-dialog-container">
    <view @tap.stop class="dialog-content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: "center",
    },
  },
  methods: {
    cancel() {
      this.$emit("update:visible", false);
      this.$emit("cancel");
    },
    toOk() {
      this.$emit("update:visible", false);
      this.$emit("ok");
    },
  },
};
</script>
