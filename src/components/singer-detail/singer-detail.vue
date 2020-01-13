<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { getSingerDetail } from 'api/singer'

export default {
  computed: {
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
        } else {
          console.log(123)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
