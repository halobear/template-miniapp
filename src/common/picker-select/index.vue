<template>
  <my-dialog @cancel="close" direction="bottom" :visible="visible">
    <view class="picker-select-container" @tap.stop>
      <view class="action">
        <view class="close" @tap="close">取消</view>
        <view class="enter" @tap="enter">确定</view>
      </view>
      <picker-view @pickstart="start" @pickend="end" class="picker-view" :value="[v]" @change="onChange">
        <picker-view-column>
          <view class="name" v-for="it in options" :key="it.id">{{ it.name }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </my-dialog>
</template>

<script>
import myDialog from "../my-dialog";

export default {
  components: {
    myDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      v: this.value,
      scroll: false
    };
  },
  watch: {
    value() {
      this.v = this.value;
    }
  },
  methods: {
    start() {
      this.scroll = true;
    },
    end(e) {
      this.scroll = false;
    },
    onChange(e) {
      let { value } = e.target;
      this.v = value[0];
    },
    close() {
      this.$emit("update:visible", false);
      this.$emit("cancel");
    },
    enter() {
      if (this.scroll) return;
      this.$emit("input", this.v);
      this.close();
    }
  }
};
</script>

<style lang="less">
.picker-select-container {
  background-color: #ffffff;
  width: 750px;
  .action {
    display: flex;
    align-items: center;
    height: 90px;
    font-size: 30px;
    justify-content: space-between;
    padding: 0 30px;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #eee;
    }
    .close {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #68676c;
    }
    .enter {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #07c160;
    }
  }
  .picker-view {
    height: 400px;
    .name {
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>
