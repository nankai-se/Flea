<template>
  <div>
    <div>
      <div class="tabs">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部">
            <view v-for="item in orderList" :key="item">
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
// import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      active: 0,
      logs: [],
      orderList: [
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
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ]
    }
  },
  computed: {
    orderStatusFinish: function () {
      return this.orderList.filter(function (item) {
        return item.panel.status === '已完成'
      })
    },
    orderStatusUnpaid: function () {
      return this.orderList.filter(function (item) {
        return item.panel.status === '待付款'
      })
    },
    orderStatusUndelivery: function () {
      return this.orderList.filter(function (item) {
        return item.panel.status === '待发货'
      })
    },
    orderStatusUnreceived: function () {
      return this.orderList.filter(function (item) {
        return item.panel.status === '待收货'
      })
    }
  },
  created () {
    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    // }
    // this.logs = logs.map(log => formatTime(new Date(log)))
  },
  onLoad (options) {
    this.active = options.active
  },
  methods: {
    /**
     * @function
     * 每次变化时要请求数据？
     * 或者打开这个页面的时候请求一次
     * 不同的tab使用filter从orderlist中选取
     */
    onChange () {

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
