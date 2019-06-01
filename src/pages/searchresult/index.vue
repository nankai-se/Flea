<template>
  <div>
    <view class="search-wrapper">
      <van-search :value="searchValue"
        placeholder="请输入搜索关键词"
        use-action-slot
        :search="onSearch">
        <view class="searchButton" slot="action" @click="onSearch">搜索</view>
      </van-search>
    </view>
    <itempanel :searchValue="searchValue"></itempanel>
  </div>
</template>

<script>
import itempanel from '../../components/itempanel.vue'

export default {
  data () {
    return {
      searchValue: ''
    }
  },
  components: {
    itempanel
  },
  onLoad (opp) {
    this.searchValue = opp.searchValue
    this.getSearchResults(this.searchValue, this.amount)
  },
  onUnload () {
    this.clearCache()
  },
  onPullDownRefresh () {
    this.clearCache()
    this.getGoods(0)
  },
  onReachBottom () {
    this.getGoods(this.amount)
  },
  methods: {
    clearCache () {
      this.amount = 0
      this.goodsLists = []
    },
    getSearchResults (value) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        detail: db.RegExp({
          regexp: value,
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
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.search-wrapper {
  position: fixed;
  top: 0px;
  left: 0;
  width: 95%;
  z-index: 999;
  margin-left: calc(2.5%);
}
.swiper-view {
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  z-index: 0;
}

swiper-item image {
  width: 100%;
  align-items: center;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(249, 250, 250);
}

.theme-panel {
  width: 95%;
  margin-top: -7px;
  z-index: 1;
  border-radius: 3%;
  background-color: white;
}

.theme-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.theme-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.theme-img {
  max-height: 60px;
  max-width: 60px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
}

.theme-title {
  color: rgb(77, 77, 77);
  font-size: 15px;
  margin-left: 29px;
  margin-right: 29px;
  margin-bottom: 5px;
}

.beforeItem {
  margin-top: 10px;
  font-size: 18px;
  color:rgb(200, 67, 67);
}

.item-panel {
  width: 95%;
}

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


#gift_package {
  max-height: 50px;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
