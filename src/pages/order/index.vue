<template>
  <div>
    <div>
      <div class="tabs">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部">
            <div class="noGoods-panel" v-if="!hasOrder" v-text="noOrders"></div>
            <div v-if="hasOrder">
            <view v-for="item in orderList" :key="item">
              <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                <view>
                  <van-card
                      :num="item.card.num"
                      :price="item.card.price"
                      :desc="item.card.desc"
                      :title="item.card.title"
                      :thumb="item.card.thumb"
                      :thumb-link ="link+item.panel.order_id"
                    >
                      <view slot="footer" >
                            <van-button size="small" round="true">评价订单</van-button>
                            <van-button size="small" round="true">删除订单</van-button>
                      </view>
                  </van-card>
                </view>
              </van-panel>
            </view>
            </div>
            <div class="noMoreOrders-panel" v-if="isNoMore" v-text="noMoreOrders"></div>
          </van-tab>
      
 
          <van-tab title="待付款">
            <div class="noOrders-panel" v-if="!hasOrder" v-text="noOrders"></div>
            <div v-if="hasOrder">
            <view v-for="item in orderList" :key="item">
              <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                <view>
                  <van-card
                      :num="item.card.num"
                      :price="item.card.price"
                      :desc="item.card.desc"
                      :title="item.card.title"
                      :thumb="item.card.thumb"
                      :thumb-link ="link+item.panel.order_id"
                    >
                      <view slot="footer" >
                            <van-button size="small" round="true">评价订单</van-button>
                            <van-button size="small" round="true">删除订单</van-button>
                      </view>
                  </van-card>
                </view>
              </van-panel>
            </view>
            </div>
            <div class="noMoreOrders-panel" v-if="isNoMore" v-text="noMoreOrders"></div>
          </van-tab>


          <van-tab title="待发货">
            <div class="noOrders-panel" v-if="!hasOrder" v-text="noOrders"></div>
            <div v-if="hasOrder">
              <view v-for="item in orderList" :key="item">
                <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                  <view>
                    <van-card
                        :num="item.card.num"
                        :price="item.card.price"
                        :desc="item.card.desc"
                        :title="item.card.title"
                        :thumb="item.card.thumb"
                        :thumb-link ="link+item.panel.order_id"
                      >
                        <view slot="footer" >
                              <van-button size="small" round="true">评价订单</van-button>
                              <van-button size="small" round="true">删除订单</van-button>
                        </view>
                    </van-card>
                  </view>
                </van-panel>
              </view>
            </div>
            <div class="noMoreOrders-panel" v-if="isNoMore" v-text="noMoreOrders"></div>
          </van-tab>


          <van-tab title="待收货">
            <div class="noOrders-panel" v-if="!hasOrder" v-text="noOrders"></div>
            <div v-if="hasOrder">
              <view v-for="item in orderList" :key="item">
                <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                  <view>
                    <van-card
                        :num="item.card.num"
                        :price="item.card.price"
                        :desc="item.card.desc"
                        :title="item.card.title"
                        :thumb="item.card.thumb"
                        :thumb-link ="link+item.panel.order_id"
                      >
                        <view slot="footer" >
                              <van-button size="small" round="true">评价订单</van-button>
                              <van-button size="small" round="true">删除订单</van-button>
                        </view>
                    </van-card>
                  </view>
                </van-panel>
              </view>
            </div>
            <div class="noMoreOrders-panel" v-if="isNoMore" v-text="noMoreOrders"></div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../index/store'
export default {
  components: {

  },

  data () {
    return {
      link: '../orderDetail/main?orderId=',
      noOrders: '暂时没有订单，过会再来吧~',
      noMoreOrders: '没有更多订单啦~',
      active: 0,
      pageSize: 10,
      ordersList: [
        {
          panel: {
            title: '南开学子',
            desc: '专业卖二手',
            status: '已完成'
          },
          card: {
            num: 100,
            price: 2.00,
            desc: '换新手机，淘汰旧手机了，这个手机屏幕正常，功能正常，可玩游戏，用了大概1年，就便宜处理了吧',
            title: '手机',
            thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
          }
        },
        {
          panel: {
            title: '南开学子',
            desc: '专业卖二手',
            status: '待发货'
          },
          card: {
            num: 100,
            price: 2.00,
            desc: '换新手机，淘汰旧手机了，这个手机屏幕正常，功能正常，可玩游戏，用了大概1年，就便宜处理了吧',
            title: '手机',
            thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
          }
        },
        {
          panel: {
            title: '南开学子',
            desc: '专业卖二手',
            status: '待收货'
          },
          card: {
            num: 100,
            price: 2.00,
            desc: '换新手机，淘汰旧手机了，这个手机屏幕正常，功能正常，可玩游戏，用了大概1年，就便宜处理了吧',
            title: '手机',
            thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
          }
        },
        {
          panel: {
            title: '卖家名称',
            desc: '描述信息',
            status: '待付款'
          },
          card: {
            num: 100,
            price: 2.00,
            desc: '描述信息',
            title: '商品标题',
            thumb: 'cloud://idwc.6964-idwc/static/images/user.png'
          }
        }
      ],
      orderList: [

      ],
      hasOrder: false,
      isNoMore: false,
      amount: 0
    }
  },
  computed: {
    orderStatusFinish: function () {
      return this.ordersList.filter(function (item) {
        return item.panel.status === '已完成'
      })
    },
    orderStatusUnpaid: function () {
      return this.ordersList.filter(function (item) {
        return item.panel.status === '待付款'
      })
    },
    orderStatusUndelivery: function () {
      return this.ordersList.filter(function (item) {
        return item.panel.status === '待发货'
      })
    },
    orderStatusUnreceived: function () {
      return this.ordersList.filter(function (item) {
        return item.panel.status === '待收货'
      })
    }
  },
  created () {

  },
  onUnload () {
    // this.clearCache()
  },
  onLoad (options) {
    this.active = options.active
    let temp = this.active
    switch (parseInt(temp)) {
      case 0:
        this.getMyOrders()
        break
      case 1:
        this.getOrders('待付款')
        break
      case 2:
        this.getOrders('待发货')
        break
      case 3:
        this.getOrders('待收货')
        break
    }
  },

  onReachBottom () {
    switch (parseInt(this.active)) {
      case 0:
        this.getMyOrders()
        break
      case 1:
        this.getOrders('待付款')
        break
      case 2:
        this.getOrders('待发货')
        break
      case 3:
        this.getOrders('待收货')
        break
    }
  },

  methods: {
    /**
     * @function
     * 清除页面加载的数据
     */
    clearCache () {
      this.orderList = []
      this.hasOrder = false
      this.isNoMore = false
      this.amount = 0
    },
    /**
     * @function
     * 每次变化时要请求数据？
     * 或者打开这个页面的时候请求一次
     * 不同的tab使用filter从orderlist中选取
     */
    onChange (event) {
      let index = event.target.index
      this.clearCache()
      switch (index) {
        case 0:
          this.getMyOrders()
          break
        case 1:
          this.getOrders('待付款')
          break
        case 2:
          this.getOrders('待发货')
          break
        case 3:
          this.getOrders('待收货')
          break
      }
    },
    /**
     * @function
     * 获得所有订单
     */
    getMyOrders () {
      let that = this
      const userId = store.state.userId
      const db = wx.cloud.database()
      db.collection('order').where({
        buyer_id: userId
      }).skip(this.amount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            if (res.data.length > 0) {
              that.hasOrder = true
              this.getGoods(res.data)
            }
          }
        )
    },
    getOrders (type) {
      let that = this
      const userId = store.state.userId
      const db = wx.cloud.database()
      db.collection('order').where({
        buyer_id: userId,
        order_state: type
      }).skip(this.amount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            if (res.data.length > 0) {
              that.hasOrder = true
              this.getGoods(res.data)
            }
          }
        )
    },
    getGoods (data) {
      const db = wx.cloud.database()
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          db.collection('goods').where({
            _id: data[i]['goods_id']
          }).get().then(res => {
            this.orderList.push({
              'card': {
                'desc': res.data[0]['detail'],
                'title': res.data[0]['type'],
                'thumb': res.data[0]['imgs'][0],
                'price': res.data[0]['price'],
                'num': 1
              },
              'panel': {

              }
            })
            this.amount++
            this.getSellerInfo(data, i)
          })
        }
      } else {
        this.isNoMore = true
      }
    },
    getSellerInfo (data, i) {
      console.log('entry get sellerINfo')
      const db = wx.cloud.database()
      if (data.length > 0) {
        db.collection('user').where({
          _id: data[i]['seller_id']
        }).get().then(res => {
          this.orderList[i]['panel'] = {
            'title': res.data[0]['nickName'],
            'desc': '暂无',
            'status': data[i]['order_state'],
            'order_id': data[i]['_id']
          }
        })
      } else {
        this.isNoMore = true
      }
    }
  }

}
</script>

<style>

.noOrders-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 200px;
  margin-top: 50px;
}

.noMoreOrders-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 50px;
  margin-top: 20px;
  font-size: 15px;
}
</style>
