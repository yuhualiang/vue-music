<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'
const HOT_NAME = '热门'

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          // console.log(res.singerList.data.singerlist)
          this.singers = this._normalizeSinger(res.singerList.data.singerlist)
        } else {
          console.log('error')
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        map.hot.items.push(new Singer({
          name: item.singer_name,
          id: item.singer_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title === HOT_NAME) {
          ret.push(val)
        }
      }
      return hot.concat(ret)
    }
  },
  components: { ListView }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
}
</style>