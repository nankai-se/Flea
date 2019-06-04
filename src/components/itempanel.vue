<template>
  <view class="panel">
    <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
    <div v-if="hasGoods" @click="handle">
      <itemcard
        v-for="goods in goodsLists"
        :key="goods.id"
        :img="goods['img']"
        :price="goods['price']"
        :detail="goods['detail']"
        :id="goods['id']"
        :favorite="goods['favorite']"></itemcard>
    </div>
    <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div>
  </view>
</template>

<script>
import itemcard from './itemcard.vue'
import store from '../pages/index/store'
export default {
  props: {
    searchValue: ['searchValue'],
    type: String
  },
  data () {
    return {
      noGoods: '暂时没有商品，过会再来吧~',
      hasGoods: false,
      noMoreGoods: '没有更多商品啦~',
      amount: 0,
      goodsLists: [],
      favoriteLists: [],
      isNoMore: false,
      pageSize: 12
    }
  },
  components: {
    itemcard
  },
  onLoad () {
    wx.cloud.init({
      env: 'idwc',
      traceUser: true
    })
    this.getGoods(0)
    console.log('props', this.searchValue)
  },
  onUnload () {
    this.clearCache()
  },
  onPullDownRefresh () {
    this.clearCache()
    this.getGoods(this.amount)
  },
  onReachBottom () {
    this.getGoods(this.amount)
  },
  methods: {
    clearCache () {
      this.amount = 0
      this.goodsLists = []
    },
    getGoods (amount) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        type: this.type
      }).orderBy('release_time', 'asc').skip(amount).limit(this.pageSize)
        .get()
        .then(res => {
          console.log('goodsget: ', res)
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.goodsLists.push({
                'id': res.data[i]['_id'],
                'img': res.data[i]['headimg'],
                'price': res.data[i]['price'],
                'detail': res.data[i]['detail'],
                'favorite': res.data[i]['favorite']
              })
            }
            this.amount += res.data.length
          } else {
            this.isNoMore = true
          }
          this.hasGoods = this.amount > 0
        })
        .catch(err => {
          console.error(err)
        })
    },
    handle () {
      // console.log(e)
      // console.log('set! ', 'a0ffb1cb-bb56-472d-b97d-6c4b39ddd1cd')
      store.commit('setCurGoodId', '2e48e918-3c64-438d-a644-f0f894916912')
    }
  }
}
</script>

<style>
.noGoods-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 200px;
  margin-top: 50px;
}

.noMoreGoods-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 50px;
  margin-top: 20px;
  font-size: 15px;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(249, 250, 250);
}
</style>
