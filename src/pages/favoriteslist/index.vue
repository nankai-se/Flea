<template>
  <div>
    <view class="panel">
      <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
      <div v-if="hasGoods">
      <itempanel :goodsLists="goodsLists"></itempanel>
      </div>
      <div class="noMoreGoods-panel" v-if="hasGoods&&isNoMore" v-text="noMoreGoods"></div>
    </view>
  </div>
</template>

<script>
import itempanel from '../../components/itempanel.vue'
import search from '../../components/search.vue'
import store from '../index/store'

export default {
  data () {
    return {
      searchValue: '',
      fromValue: '',
      goodsLists: [],
      noGoods: '暂时没有心愿商品哦~ 快去首页看看吧~',
      hasGoods: false,
      noMoreGoods: '没有更多想买的啦~',
      isNoMore: false,
      amount: 0,
      pageSize: 16
    }
  },
  components: {
    itempanel,
    search
  },
  onLoad () {
    this.getFavorites(this.amount)
  },
  onUnload () {
    this.clearCache()
  },
  onPullDownRefresh () {
    this.clearCache()
    let value = this.searchVaule
    if (!value) {
      value = this.fromValue
    }
    this.getSearchResults(value, this.amount)
  },
  onReachBottom () {
    this.getSearchResults(this.searchValue, this.amount)
  },
  methods: {
    clearCache () {
      this.amount = 0
      this.goodsLists = []
    },
    getFavorites (amount) {
      const db = wx.cloud.database()
      console.log('amount:', amount)
      const userId = store.state.userId
      console.log('userId:', userId)
      db.collection('favorites').where({
        user_id: userId
      }).skip(amount).limit(this.pageSize)
        .get()
        .then(res => {
          if (res.data[0].goods_id.length > 0) {
            this.getGoods(res.data[0].goods_id)
            this.hasGoods = true
          }
        })
    },
    getGoods (goodIds) {
      const db = wx.cloud.database()
      console.log('goodsid:', goodIds)
      if (goodIds.length > 0) {
        for (let i = 0; i < goodIds.length; i++) {
          db.collection('goods').where({
            _id: goodIds[i]
          }).get().then(res => {
            console.log('goods:', res)
            console.log('type:', typeof this.goodsLists)
            this.goodsLists.push({
              'img': res.data[0]['fileID'],
              'price': res.data[0]['price']
            })
            this.amount++
            console.log('after:', this.goodsLists)
          })
        }
      } else {
        this.isNoMore = true
      }
    }
  }
}
</script>

<style scoped>
.noGoods-panel {
  color: rgb(177, 177, 177);
  height: 200px;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
}

.noMoreGoods-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 50px;
  margin-top: 20px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
}

.panel {
  margin-top: 10%;
  align-items: center;
  justify-content: center;
}

</style>
