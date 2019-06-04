<template>
  <div>
    <div class="state">
      订单状态: {{orderDetail.orderState}}
    </div>
    <view>
      <van-panel :title="receiverInfo.name" :desc="receiverInfo.phone">
        <view class="content">
          {{receiverInfo.province}} {{receiverInfo.city}} {{receiverInfo.district}} {{receiverInfo.specific}}
          <!-- <van-button size="small" hairline="true" class="foot-button">编辑</van-button> -->
        </view>
      </van-panel>
    </view>
    <view class="goods">
      <van-panel :title="userInfo.title" :desc="userInfo.desc">
      <van-card
          :num="goodsInfo.num"
          :price="goodsInfo.price"
          :desc="goodsInfo.desc"
          :title="goodsInfo.title"
          :thumb="goodsInfo.thumb"
          :tag="goodsInfo.tag"
        >
      </van-card>
      </van-panel>
    </view>
    <view>
      <div>
        <view class="info">
        订单信息
        </view>
        <view>
          <van-cell title="订单编号" :value="orderId" size="large" />
          <van-cell title="创建时间" :value="orderDetail.orderTime" size="large" />
          <van-cell title="买家留言" :value="orderDetail.note" size="large" />
        </view>
      </div>
    </view>
  </div>
</template>

<script>

export default {
  components: {

  },

  data () {
    return {
      orderId: '',
      userInfo: {

      },
      orderDetail: {

      },
      receiverInfo: {
        name: '跳蚤街',
        phone: '12345678910',
        province: 'Tianjin',
        city: 'Tianjin',
        district: 'binhaixinqu',
        specific: '第三大街泰达丰巢快递柜'
      },
      goodsInfo: {

      }
    }
  },

  created () {

  },
  onLoad (options) {
    this.orderId = options.orderId
    console.log('orderId: ', this.orderId)
    this.getOrder()
  },
  methods: {
    getOrder () {
      const db = wx.cloud.database()
      db.collection('order').where({
        _id: this.orderId
      }).get()
        .then(
          res => {
            console.log('order red: ', res)
            this.orderDetail = {
              'orderState': res.data[0]['order_state'],
              'goodsId': res.data[0]['goods_id'],
              'locationId': res.data[0]['receive_location_id'],
              'userId': res.data[0]['buyer_id'],
              'orderTime': res.data[0]['order_time'],
              'note': res.data[0]['buyer_note']
            }
            this.getGoods()
            this.getLocation()
            this.getUser()
          }
        )
    },
    getLocation () {
      const db = wx.cloud.database()
      db.collection('location').where({
        _id: this.orderDetail.locationId
      }).get()
        .then(
          res => {
            console.log('location res: ', res)
            this.receiverInfo = {
              'name': res.data[0]['receiverName'],
              'phone': res.data[0]['receiverPhone'],
              'province': res.data[0]['province'],
              'city': res.data[0]['city'],
              'district': res.data[0]['district'],
              'specific': res.data[0]['specific']
            }
          }
        )
    },
    getGoods () {
      const db = wx.cloud.database()
      console.log('goods_id: ', this.orderDetail.goodsId)
      db.collection('goods').where({
        _id: this.orderDetail.goodsId
      }).get()
        .then(res => {
          console.log('goods res: ', res)
          this.goodsInfo = {
            'desc': res.data[0]['detail'],
            'title': res.data[0]['type'],
            'thumb': res.data[0]['imgs'][0],
            'price': res.data[0]['price'],
            'num': 1
          }
        })
    },
    getUser () {
      const db = wx.cloud.database()
      db.collection('user').where({
        _id: this.orderDetail.userId
      }).get().then(res => {
        this.userInfo = {
          'title': res.data[0]['nickName'],
          'desc': '暂无'
        }
      })
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
.state {
  text-align: center;
  height: 50px;
  width: 100%;
}

.foot-button {
  float:right;
  margin-top:10px;
  margin-left:10px;
  margin-right:10px;
}
.content {
  display: flex;
  margin-left: 15px;
  padding-bottom:10px; 
  padding-top:10px;
}
.goods {
  margin-top: 10px;
}
.info {
  margin-top: 10px;
  text-align: center
}
</style>
