<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { getSongVkey } from 'api/song'
import { getSingerDetail } from 'api/singer'
import { createSong } from 'common/js/song'
import MusicList from '@/components/music-list/music-list'

export default {
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        getSongVkey(item.mid).then((res) => {
          if (res.code === ERR_OK) {
            const vkey = res.req_0.data.midurlinfo[0].vkey
            // console.log(res.req_0.data.midurlinfo[0].vkey)
            // console.log(res)
            // return
            let { musicData } = item
            if (musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData, vkey))
            }
          }
        })
      })
      return ret
    }
  },
  components: { MusicList }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
