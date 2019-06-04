<template>
  <div>
    <div>
      <div class="tabs">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部">
            <div class="noGoods-panel" v-if="!hasAllGoods" v-text="noGoods"></div>
            <div v-if="hasAllGoods">
            <view v-for="item in goodsList" :key="item">
              <view>
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb"
                    :tag="item.tag"
                  >
                    <view slot="footer" >
                      <van-button size="mini" round="true">编辑</van-button>
                      <van-button size="mini" round="true">下架</van-button>
                    </view>
                </van-card>
              </view>
            </view>
            </div>
          <div class="noMoreGoods-panel" v-if="allIsNoMore" v-text="noMoreGoods"></div> 
          </van-tab>


          <van-tab title="待售">
            <div class="noGoods-panel" v-if="!hasUnsellGoods" v-text="noGoods"></div>
            <div v-if="hasUnsellGoods">
            <view v-for="item in unSellList" :key="item">
              <view>
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb"
                    :tag="item.tag"
                  >
                    <view slot="footer" >
                      <van-button size="mini" round="true">编辑</van-button>
                      <van-button size="mini" round="true">下架</van-button>
                    </view>
                </van-card>
              </view>
            </view>
            </div>
          <div class="noMoreGoods-panel" v-if="unSellIsNomore" v-text="noMoreGoods"></div> 
          </van-tab>


          <van-tab title="我卖出的">
            <div class="noGoods-panel" v-if="!hasSoldGoods" v-text="noGoods"></div>
            <div v-if="hasSoldGoods">
            <view v-for="item in soldList" :key="item">
              <view>
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb"
                    :tag="item.tag"
                  >
                    <view slot="footer" >
                      <van-button size="mini" round="true" disabled="true">编辑</van-button>
                      <van-button size="mini" round="true" disabled="true">下架</van-button>
                    </view>
                </van-card>
              </view>
            </view>
            </div>
          <div class="noMoreGoods-panel" v-if="soldIsNomore" v-text="noMoreGoods"></div> 
          </van-tab>

          
          <van-tab title="下架商品">
            <div class="noGoods-panel" v-if="!hasRemovedGoods" v-text="noGoods"></div>
            <div v-if="hasRemovedGoods">
              <view v-for="item in removedList" :key="item">
                <view>
                  <van-card
                      :num="item.num"
                      :price="item.price"
                      :desc="item.desc"
                      :title="item.title"
                      :thumb="item.thumb"
                      :tag="item.tag"
                    >
                      <view slot="footer" >
                        <van-button size="mini" round="true">编辑</van-button>
                        <van-button size="mini" round="true" disabled="true">下架</van-button>
                      </view>
                  </van-card>
                </view>
              </view>
            </div>
          <div class="noMoreGoods-panel" v-if="removedIsNoMore" v-text="noMoreGoods"></div> 
          </van-tab>
          </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },

  data () {
    return {
      goodList: [
        {
          tag: '已下架',
          num: 100,
          price: 2.00,
          desc: '描述信息',
          title: '商品标题',
          thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
        },
        {
          tag: '待售',
          num: 5,
          price: 100.00,
          desc: '代码托管网站',
          title: 'github',
          thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
        },
        {
          tag: '已卖出',
          num: 5,
          price: 100.00,
          desc: '代码托管网站',
          title: 'github',
          thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
        }
      ],
      goodsList: [

      ],
      unSellList: [

      ],
      removedList: [

      ],
      soldList: [

      ],
      allAmount: 0,
      unSellAmount: 0,
      soldAmount: 0,
      removedAmount: 0,
      pageSize: 5,
      hasAllGoods: false,
      hasUnsellGoods: false,
      hasSoldGoods: false,
      hasRemovedGoods: false,
      allIsNoMore: false,
      unSellIsNomore: false,
      soldIsNomore: false,
      removedIsNoMore: false,
      owner_id: '1',
      active: 0,
      noGoods: '暂时没有商品，过会再来吧~',
      noMoreGoods: '没有更多商品啦~'
    }
  },
  computed: {
    goodsStatusUnsell: function () {
      return this.goodList.filter(function (item) {
        return item.tag === '待售'
      })
    },
    goodsStatusRemoved: function () {
      return this.goodList.filter(function (item) {
        return item.tag === '已下架'
      })
    },
    goodsStatusSold: function () {
      return this.goodList.filter(function (item) {
        return item.tag === '已卖出'
      })
    }
  },
  created () {

  },
  onReachBottom () {
    switch (parseInt(this.active)) {
      case 0:
        this.getMyGoods()
        break
      case 1:
        this.getMyUnsellGoods()
        break
      case 2:
        this.getMySoldGoods()
        break
      case 3:
        this.getMyRemovedGoods()
        break
    }
  },
  onLoad (options) {
    console.log('entry into onLoad')
    this.active = options.active
    let temp = this.active
    console.log('active: ', this.active)
    switch (parseInt(temp)) {
      case 0:
        console.log('entry into switch')
        this.getMyGoods()
        console.log('我的商品', this.goodsList)
        break
      case 1:
        this.getMyUnsellGoods()
        break
      case 2:
        this.getMySoldGoods()
        break
      case 3:
        this.getMyRemovedGoods()
        break
    }
  },
  onUnload () {
    this.clearCache()
  },
  methods: {
    /**
     * @function
     * 清除页面加载的数据
     */
    clearCache () {
      this.goodsList = []
      this.unSellList = []
      this.soldList = []
      this.removedList = []
      this.allAmount = 0
      this.unSellAmount = 0
      this.soldAmount = 0
      this.removedAmount = 0
      this.hasAllGoods = false
      this.hasUnsellGoods = false
      this.hasSoldGoods = false
      this.hasRemovedGoods = false
      this.allIsNoMore = false
      this.unSellIsNomore = false
      this.soldIsNomore = false
      this.removedIsNoMore = false
    },
    /**
     * @function
     * 每次变化时要请求数据？
     * 或者打开这个页面的时候请求一次
     * 不同的tab使用filter从orderlist中选取
     */
    onChange (event) {
      console.log('event: ', event)
      let index = event.target.index
      console.log('type: ', typeof index)
      switch (parseInt(index)) {
        case 0:
          this.getMyGoods()
          break
        case 1:
          this.getMyUnsellGoods()
          break
        case 2:
          this.getMySoldGoods()
          break
        case 3:
          this.getMyRemovedGoods()
          break
      }
    },

    /**
     * @function
     * 获取我的所有类型商品的列表
     */
    getMyGoods () {
      console.log('what happen')
      const db = wx.cloud.database()
      db.collection('goods').where({
        owner_id: this.owner_id
      }).skip(this.allAmount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            console.log('res: ', res)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.goodsList.push(
                  {
                    'tag': res.data[i]['state'],
                    'price': res.data[i]['price'],
                    'title': res.data[i]['type'],
                    'desc': res.data[i]['detail'],
                    'thumb': res.data[i]['imgs'][0],
                    'goods_id': res.data[i]['_id']
                  }
                )
              }
              this.allAmount += res.data.length
            } else {
              this.allIsNoMore = true
            }
            this.hasAllGoods = this.allAmount > 0
          }
        ).catch(err => {
          console.error(err)
        })
    },
    /**
     * @function
     * 获取待售的商品列表
     */
    getMyUnsellGoods () {
      const db = wx.cloud.database()
      db.collection('goods').where({
        owner_id: this.owner_id,
        state: '待售'
      }).skip(this.unSellAmount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            console.log('res: ', res)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.unSellList.push(
                  {
                    'tag': res.data[i]['state'],
                    'price': res.data[i]['price'],
                    'title': res.data[i]['type'],
                    'desc': res.data[i]['detail'],
                    'thumb': res.data[i]['imgs'][0],
                    'goods_id': res.data[i]['_id']
                  }
                )
              }
              this.unSellAmount += res.data.length
            } else {
              this.unSellIsNoMore = true
            }
            this.hasUnsellGoods = this.unSellAmount > 0
          }
        )
    },
    /**
     * @function
     * 获取已经卖出的商品列表
     */
    getMySoldGoods () {
      const db = wx.cloud.database()
      db.collection('goods').where({
        owner_id: this.owner_id,
        state: '已卖出'
      }).skip(this.soldAmount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            console.log('res: ', res)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.soldList.push(
                  {
                    'tag': res.data[i]['state'],
                    'price': res.data[i]['price'],
                    'title': res.data[i]['type'],
                    'desc': res.data[i]['detail'],
                    'thumb': res.data[i]['imgs'][0],
                    'goods_id': res.data[i]['_id']
                  }
                )
              }
              this.soldAmount += res.data.length
            } else {
              this.soldIsNoMore = true
            }
            this.hasSoldGoods = this.soldAmount > 0
          }
        )
    },
    /**
     * @function
     * 获取下架的商品列表
     */
    getMyRemovedGoods () {
      const db = wx.cloud.database()
      db.collection('goods').where({
        owner_id: this.owner_id,
        state: '下架'
      }).skip(this.removedAmount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            console.log('res: ', res)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.removedList.push(
                  {
                    'tag': res.data[i]['state'],
                    'price': res.data[i]['price'],
                    'title': res.data[i]['type'],
                    'desc': res.data[i]['detail'],
                    'thumb': res.data[i]['imgs'][0],
                    'goods_id': res.data[i]['_id']
                  }
                )
              }
              this.removedAmount += res.data.length
            } else {
              this.removedIsNoMore = true
            }
            this.hasRemovedGoods = this.removedAmount > 0
          }
        )
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
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
  font-size: 15px;
}
</style>
