<template>
  <div>
    <view class="panel">
      <itempanel :goodsLists="goodsLists" @goGoodsDetail="goGoodsDetail"></itempanel>
    </view>
  </div>
</template>

<script>
import itempanel from '../../components/itempanel.vue'
import search from '../../components/search.vue'

export default {
  name: 'goodslist',
  components: {
    itempanel,
    search
  },
  data () {
    return {
      type: '',
      goodsLists: [],
      amount: 0,
      pageSize: 12
    }
  },
  onLoad: function (options) {
    console.log(options.type)
    this.getTypeResults(options.type, this.amount)
    this.type = options.type
  },
  onReachBottom () {
    this.getTypeResults(this.type, this.amount)
  },
  methods: {
    goGoodsDetail (id) {
      console.log('emit again:', id)
      const url = `/pages/goodsdetail/main?goodId=${id}`
      mpvue.navigateTo({
        url
      })
    },
    getTypeResults (type, amount) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        type: type
      }).orderBy('release_time', 'asc')
        .skip(amount).limit(this.pageSize)
        .get()
        .then(res => {
          console.log('res: ', res)
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
    }
  }
}
</script>

<style>
.search {
  padding-bottom:15%
}
.panel {
  margin-top: 10%;
  align-items: center;
  justify-content: center;
}
</style>
