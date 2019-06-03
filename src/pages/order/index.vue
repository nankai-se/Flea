<template>
  <div>
    <div>
      <div class="tabs">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部">
            <view v-for="item in ordersList" :key="item">
              <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                <view>
                  <van-card
                      :num="item.card.num"
                      :price="item.card.price"
                      :desc="item.card.desc"
                      :title="item.card.title"
                      :thumb="item.card.thumb"
                    >
                      <view slot="footer" >
                            <van-button size="small" round="true">评价订单</van-button>
                            <van-button size="small" round="true">删除订单</van-button>
                      </view>
                  </van-card>

                </view>
              </van-panel>
            </view>
          </van-tab>
      
 
          <van-tab title="待付款">
            <view v-for="item in orderStatusUnpaid" :key="item">
              <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                <view>
                  <van-card
                      :num="item.card.num"
                      :price="item.card.price"
                      :desc="item.card.desc"
                      :title="item.card.title"
                      :thumb="item.card.thumb"
                    >
                      <view slot="footer" >
                            <van-button size="small" round="true">评价订单</van-button>
                            <van-button size="small" round="true">删除订单</van-button>
                      </view>
                  </van-card>
                </view>
              </van-panel>
            </view>
          </van-tab>


          <van-tab title="待发货">
            <view v-for="item in orderStatusUndelivery" :key="item">
              <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                <view>
                  <van-card
                      :num="item.card.num"
                      :price="item.card.price"
                      :desc="item.card.desc"
                      :title="item.card.title"
                      :thumb="item.card.thumb"
                    >
                      <view slot="footer" >
                            <van-button size="small" round="true">评价订单</van-button>
                            <van-button size="small" round="true">删除订单</van-button>
                      </view>
                  </van-card>
                </view>
              </van-panel>
            </view>
          </van-tab>


          <van-tab title="待收货">
            <view v-for="item in orderStatusUnreceived" :key="item">
              <van-panel :title="item.panel.title" :desc="item.panel.desc" :status="item.panel.status" use-footer-slot>
                <view>
                  <van-card
                      :num="item.card.num"
                      :price="item.card.price"
                      :desc="item.card.desc"
                      :title="item.card.title"
                      :thumb="item.card.thumb"
                    >
                      <view slot="footer" >
                            <van-button size="small" round="true">评价订单</van-button>
                            <van-button size="small" round="true">删除订单</van-button>
                      </view>
                  </van-card>
                </view>
              </van-panel>
            </view>
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
      active: 0,
      userId: '',
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
      unpaidOrderList: [

      ],
      undeliveryOrderList: [

      ],
      unreceivedOrderList: [

      ],
      order: {
        all: this.orderList,
        unpaid: this.unpaidOrderList,
        undelivery: this.undeliveryOrderList,
        unreceived: this.unreceivedOrderList
      },
      orderAmount: 0,
      unpaidAmount: 0,
      undeliveryAmount: 0,
      unreceivedAmount: 0,
      hasOrder: false,
      hasUnpaidOrder: false,
      hasUndeliveryOrder: false,
      hasUnreceivedOrder: false,
      orderIsNomore: false,
      unpaidIsNoMore: false,
      undeliveryIsNoMore: false,
      unreceivedIsNoMore: false
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
  onLoad (options) {
    this.active = options.active
    switch (this.active) {
      case 0:
        this.getMyOrders(this.orderAmount, 'all', this.hasOrder, this.orderIsNomore)
        break
      case 1:
        this.getOrders(this.unpaidAmount, 'unpaid', this.hasUnpaidOrder, this.unpaidIsNoMore)
        break
      case 2:
        this.getOrders(this.undeliveryAmount, 'undelivery', this.hasUndeliveryOrder, this.undeliveryIsNoMore)
        break
      case 3:
        this.getOrdes(this.unreceivedAmount, 'unreceived', this.hasUnreceivedOrder, this.unreceivedIsNoMore)
        break
    }
  },

  onReachBottom () {
    switch (this.active) {
      case 0:
        this.getMyOrders(this.orderAmount, 'all', this.hasOrder, this.orderIsNomore)
        break
      case 1:
        this.getOrders(this.unpaidAmount, 'unpaid', this.hasUnpaidOrder, this.unpaidIsNoMore)
        break
      case 2:
        this.getOrders(this.undeliveryAmount, 'undelivery', this.hasUndeliveryOrder, this.undeliveryIsNoMore)
        break
      case 3:
        this.getOrdes(this.unreceivedAmount, 'unreceived', this.hasUnreceivedOrder, this.unreceivedIsNoMore)
        break
    }
  },

  methods: {
    /**
     * @function
     * 每次变化时要请求数据？
     * 或者打开这个页面的时候请求一次
     * 不同的tab使用filter从orderlist中选取
     */
    onChange (e) {
      let index = e.detail.index
      switch (index) {
        case 0:
          this.getMyOrders(this.orderAmount, 'all', this.hasOrder, this.orderIsNomore)
          break
        case 1:
          this.getOrders(this.unpaidAmount, 'unpaid', this.hasUnpaidOrder, this.unpaidIsNoMore)
          break
        case 2:
          this.getOrders(this.undeliveryAmount, 'undelivery', this.hasUndeliveryOrder, this.undeliveryIsNoMore)
          break
        case 3:
          this.getOrdes(this.unreceivedAmount, 'unreceived', this.hasUnreceivedOrder, this.unreceivedIsNoMore)
          break
      }
    },
    /**
     * @function
     * 获得所有订单
     */
    getMyOrders (amount, type, hasOrder, isNoMore) {
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
              hasOrder = true
              for (let i = 0; i < res.data.length; i++) {
                this.order[type].panel.push({
                  'status': res.data[i]['order_state'],
                  'order_id': res.data[i]['_id']
                })
              }
              this.getGoods(res.data, isNoMore, amount, type)
              this.getSellerInfo(res.data, isNoMore, amount, type)
            }
          }
        )
    },

    getOrders (amount, type, hasOrder, isNoMore) {
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
              hasOrder = true
              for (let i = 0; i < res.data.length; i++) {
                this.order[type].panel.push({
                  'status': res.data[i]['order_state'],
                  'order_id': res.data[i]['_id']
                })
              }
              this.getGoods(res.data, isNoMore, amount, type)
              this.getSellerInfo(res.data, isNoMore, amount, type)
            }
          }
        )
    },
    getGoods (goodIds, isNoMore, amount, type) {
      const db = wx.cloud.database()
      console.log('goodsid:', goodIds)
      if (goodIds.length > 0) {
        for (let i = 0; i < goodIds.length; i++) {
          db.collection('goods').where({
            _id: goodIds[i]['goods_id']
          }).get().then(res => {
            console.log('goods:', res)
            console.log('type:', typeof this.goodsLists)
            this.order[type].card.push({
              'desc': res.data[i]['detail'],
              'title': res.data[i]['type'],
              'thumb': res.data[i]['imgs'][0],
              'price': res.data[0]['price'],
              'num': 1
            })
            amount++
          })
        }
      } else {
        isNoMore = true
      }
    },
    getSellerInfo (sellerIds, isNoMore, amount, type) {
      const db = wx.cloud.database()
      if (sellerIds.length > 0) {
        for (let i = 0; i < sellerIds.length; i++) {
          db.collection('user').where({
            _id: sellerIds[i]['seller_id']
          }).get().then(res => {
            this.order[type].panel.push({
              'title': res.data[i]['nickName'],
              'desc': '暂无'
            })
          })
        }
      } else {
        isNoMore = true
      }
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
</style>
