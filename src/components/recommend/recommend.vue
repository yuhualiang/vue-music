<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, ke) in recommends" :key="ke">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="#">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, k) in discList" :key="k" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="#">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      discList: [],
      recommends: []
    }
  },
  created() {
    this._getDiscList()
    setTimeout(() => {
      this._getRecommend()
    }, 1000)
  },
  methods: {
    _getRecommend() {
      this.recommends = [
        {
          linkUrl: 'https://y.qq.com/n/yqq/album/001q7Pyj0NHLk3.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1952840.jpg'
        },
        {
          linkUrl: 'https://y.qq.com/n/yqq/album/001X0lH14UaCEd.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1952031.jpg'
        },
        {
          linkUrl: 'https://y.qq.com/n/yqq/album/003ilVgx3NtecU.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1951386.jpg'
        },
        {
          linkUrl: 'https://y.qq.com/n/yqq/album/003ilVgx3NtecU.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1949357.jpeg'
        },
        {
          linkUrl: 'https://y.qq.com/n/yqq/album/https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1&_video=true&mid=000d6fVY1GkGOE&g_f=yqqjiaodian.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1952901.jpg'
        },
        {
          linkUrl: 'https://y.qq.com/n/yqq/album/000BRYLE470IlC.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1951765.jpg'
        }
      ]
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: { Slider, Scroll, Loading }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>