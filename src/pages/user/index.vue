<template>
  <div class="panel">
    <div class="user_info">
      <div class="user_name">
        {{userName}}
      </div>
      <div class="user_head">
        <image id="user_head_img" :src="userheadPortrait"></image>
      </div>
    </div>
    <div class="middle_panel">
      <div class="wanted" @click="showWantedList()">
        <van-icon class="icon" name="goods-collect-o" size="30px"/>
        心愿单
      </div>
      <div class="wanted">
        <van-icon class="icon" name="bill-o" size="30px"/>
        优惠券
      </div>
      <div class="wanted">
        <div id="credit">
          100
        </div>
        积分
      </div>
    </div>
    <div class="order">
      <view class="unfin" @click="showOrder(1)">
        <van-icon class="icon" name="paid" size="30px"/>
        未付款
      </view>
      <div class="unfin" @click="showOrder(2)">
        <van-icon name="logistics" class="icon" size="30px"/>
        待收货
      </div>
      <div class="unfin"  @click="showOrder(3)">
        <van-icon name="contact" class="icon" size="30px"/>
        退货/退款
      </div>
      <div class="unfin" @click="showOrder(0)">
        <van-icon name="description" class="icon" size="30px"/>
        全部订单
      </div>
    </div>
    <div class="sell">
      <view class="sell-relative" @click="showObject(1)">
        <van-icon class="icon" name="shop-o" size="30px"/>
        待售出
      </view>
      <div class="sell-relative" @click="showObject(2)">
        <van-icon name="balance-o" class="icon" size="30px"/>
        已售出
      </div>
      <div class="sell-relative" @click="showObject(3)">
        <van-icon name="failure" class="icon" size="30px"/>
        下架
      </div>
      <div class="sell-relative" @click="showObject(0)">
        <van-icon name="other-pay" class="icon" size="30px"/>
        全部物品
      </div>
    </div>
    <div class="bottom-popup">
      <van-cell title="我的地址" is-link url="../myLocation/main" link-type="navigateTo"/>
      <!-- <van-cell title="隐私政策" is-link url="../myLocation/main" link-type="navigateTo"/>
      <van-cell title="用户协议" is-link url="../myLocation/main" link-type="navigateTo"/>
      <van-cell title="帮助中心" is-link url="../myLocation/main" link-type="navigateTo"/> -->
    </div>
    <!-- <div class="setting">
      <van-cell title="设置" is-link url="../myLocation/main" link-type="navigateTo"/>
    </div> -->
  </div>
</template>

<script>
import store from '../index/store'
export default {
  components: {

  },

  data () {
    return {
      isShow: false,
      userId: store.state.userId,
      userName: store.state.userInfo.username,
      userheadPortrait: store.state.userInfo.userheadPortrait
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
  /**
   * 注意在设置url进行页面跳转时
   * url不能和tarBar中的页面地址相同否则没有效果
   *
   */
  methods: {
    showOrder (index) {
      wx.navigateTo({
        url: '../order/main?active=' + index
      })
    },
    showObject (index) {
      wx.navigateTo({
        url: '../object/main?active=' + index
      })
    },
    showWantedList () {
      wx.navigateTo({
        url: '../favoriteslist/main'
      })
    }

  }
}
</script>

<style>
.panel {
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 247, 247);
  z-index:-1;
}

.unpaid {
  width:60px;
  height:60px;
}

.user_info {
  display: flex;
  height: 120px;
  width: 100%;
  background-color: rgb(109, 255, 89);
  z-index: 0;
}
.user_name {
  display: flex; 
  font-size: 25px;
  height: 80px;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.user_head {
  margin-top:10px;
  text-align:center;
  height: 70px;
  width: 50%;
}

#user_head_img {
  height:70px;
  width:70px;
  border-radius: 35px;
}
.middle_panel {
  position: absolute;
  align-self: center;
  display: flex;
  top: 100px;
  left: 10%;
  height:60px;
  width:80%;
  background-color: aqua
}
.wanted {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
  background-color: rgb(255, 255, 255);
}
.order {
  align-self: center;
  height: 120px;
  width:90%;
  display: flex;
}
.unfin {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 60px;
  flex-grow: 1;
  background-color: rgb(255, 255, 255);
}

.sell {
  margin-top: 5px;
  align-self: center;
  height: 80px;
  width:90%;
  display: flex;
}
.sell-relative {
  margin-top: 15px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-grow: 1;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
#icon1 {
  size: 60px;
}
#icon-box {
  width: 60px;
  height: 60px;
}
.bottom-popup {
  margin-top: 20px;
  width:100%;
}
.setting {
  margin-top: 20px;
  width: 100%;
}
#credit {
  font-size:30px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
