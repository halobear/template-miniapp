<template>
  <video
    class="my-video"
    :id="videoId"
    :direction="90"
    :autoplay="paused || playing || autoplay"
    :controls="paused || playing"
    :src="src"
    :poster="poster"
    :show-center-play-btn="false"
    @play="onPlay()"
    @pause="onPause()"
    @ended="onEnd()"
  >
    <!-- cover-image无法滚动 -->
    <!-- <cover-image v-if="!paused && !playing && poster" :src="poster" mode="aspectFill" class="poster" /> -->
    <image v-if="paused || !playing" :src="require('./images/play_icon.png')" @tap="play" class="play-btn" />
  </video>
</template>

<script>
import Taro from "@tarojs/taro";

import bus from "@/utils/bus";
import getVideoId from "./videoId";

export default {
  props: {
    autoplay: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: "",
    },
    poster: {
      type: String,
      default: "",
    },
    controls: {
      type: Boolean,
      default: true,
    },
    bus: {
      type: Boolean,
      default: true,
    },
    busPlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      videoId: `video-${getVideoId()}`,
      paused: false,
      playing: this.autoplay,
      _video: null,
    };
  },
  computed: {
    video() {
      if (!this._video) {
        this._video = Taro.createVideoContext(this.videoId);
      }
      return this._video;
    },
  },
  mounted() {
    this.bus && bus.$on("playVideo", this.onEnd);
    this.busPlay && bus.$on("busPlay", this.play);
  },
  beforeDestroy() {
    this.bus && bus.$off("playVideo", this.onEnd);
    this.busPlay && bus.$off("busPlay", this.play);
  },
  methods: {
    play() {
      // 停止全部视频再播放
      bus.$emit("playVideo", this.videoId);
      this.playing = true;
      this.paused = false;
      this.video.play();
    },
    pause() {
      this.video.pause();
    },
    onPlay() {
      this.playing = true;
      this.paused = false;
      this.$emit("play");
    },
    onPause() {
      this.playing = false;
      this.paused = true;
      this.$emit("pause");
    },
    onEnd(videoId) {
      if (this.videoId === videoId) return;
      const query = Taro.createSelectorQuery();
      query
        .select(`#${this.videoId}`)
        .context()
        .exec((rect) => {
          rect[0].context.pause();
        });
      this.playing = false;
      this.paused = false;
      this.$emit("pause");
      this.video.exitFullScreen();
    },
    // fullscreenchange(e) {
    //   if (!e.fullScreen) {}
    // }
  },
};
</script>
