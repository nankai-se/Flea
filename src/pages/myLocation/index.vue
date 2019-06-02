<template>
  <div>
    <div>
      <view>
        <van-panel title="跳蚤街" desc="12345678910" status="默认">
          <view class="content">天津 天津 滨海新区 第三大街泰达学院丰巢快递柜
            <van-button size="small" hairline="true" class="foot-button">编辑</van-button>
          </view>
        </van-panel>
        <van-panel title="南开大学" desc="12345678910" >
          <view class="content">天津 天津 滨海新区 第三大街泰达学院丰巢快递柜
            <van-button size="small" hairline="true" class="foot-button">编辑</van-button>
          </view>
        </van-panel>
      </view>
    </div>
  </div>
</template>


<script>
// 地址可以使用Panel
// import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: [],
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ]
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
</style>
