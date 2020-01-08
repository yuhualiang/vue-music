<template>
  <div class="recommend">
    <div v-if="recommends.length" class="recommend-content">
      <div class="slider-wrapper">
        <slider>
          <div v-for="(item, ke) in recommends" :key="ke">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="#">
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>
<script>
import Slider from 'base/slider/slider'

export default {
  data() {
    return {
      recommends: [
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
          linkUrl: 'https://y.qq.com/n/yqq/album/000BRYLE470IlC.html',
          picUrl:
            'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1949357.jpeg'
        }
      ]
    }
  },
  components: { Slider }
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