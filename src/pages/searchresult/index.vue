<template>
  <div>
    <search @goSearch="getSearchResults"></search>
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

export default {
  data () {
    return {
      searchValue: '',
      goodsLists: [],
      noGoods: '暂时没有此类商品哦~ 敬请期待~',
      hasGoods: false,
      noMoreGoods: '没有更多商品啦~',
      isNoMore: false,
      amount: 0,
      pageSize: 16
    }
  },
  components: {
    itempanel,
    search
  },
  onLoad (opp) {
    this.searchValue = opp.searchValue
    console.log('opp', this.searchVaule)
    this.getSearchResults(this.searchValue, this.amount)
  },
  onUnload () {
    this.clearCache()
  },
  onPullDownRefresh () {
    this.clearCache()
    this.getSearchResults(this.amount)
  },
  onReachBottom () {
    this.getSearchResults(this.amount)
  },
  methods: {
    getSearchResults () {
      console.log('get get get', this.searchValue)
      const db = wx.cloud.database()
      db.collection('goods').where({
        detail: db.RegExp({
          regexp: this.searchValue,
          options: 'i'
        })})
        .skip(this.amount).limit(this.pageSize)
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

<style scoped>
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
  margin-top: 10%;
  align-items: center;
  justify-content: center;
}

.search-wrapper {
  position: fixed;
  top: 0px;
  left: 0;
  width: 95%;
  z-index: 999;
  margin-left: calc(2.5%);
}
</style>
