<template>
  <view class="panel">
    <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
    <div v-if="hasGoods">
      <itemcard v-for="goods in goodsLists" :key="goods.id" :img="goods['img']" :price="goods['price']"></itemcard>
    </div>
    <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div>
  </view>
</template>

<script>
import itemcard from './itemcard.vue'
export default {
  props: {
    searchValue: ['searchValue']
  },
  data () {
    return {
      noGoods: '暂时没有商品，过会再来吧~',
      hasGoods: false,
      noMoreGoods: '没有更多商品啦~',
      amount: 0,
      goodsLists: [],
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
      db.collection('goods').orderBy('release_time', 'asc').skip(amount).limit(this.pageSize)
        .get()
        .then(res => {
          console.log('res: ', res)
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.goodsLists.push({
                'img': res.data[i]['fileID'],
                'price': res.data[i]['price']
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
