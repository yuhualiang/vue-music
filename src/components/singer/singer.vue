<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <div v-if="!singers.length" class="loading-container">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
// const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: [],
      map: {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.singerList.data.singerlist)
        } else {
          console.log('error')
        }
      })
    },
    _category(ca, item) {
      let map = this.map
      const key = ca
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer({
        name: item.singer_name,
        id: item.singer_mid
      }))
    },
    _normalizeSinger(list) {
      let map = this.map
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push({
            name: item.singer_name,
            id: item.singer_mid,
            avatar: item.singer_pic
          })
        } else if (index < 15) {
          this._category('A', item)
        } else if (index < 22) {
          this._category('B', item)
        } else {
          this._category('C', item)
        }
      })
      let ret = []
      for (let key in map) {
        let val = map[key]
        ret.push(val)
      }
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: { ListView, Loading }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed
  top: 88px
  bottom: 0
  width: 100%

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>