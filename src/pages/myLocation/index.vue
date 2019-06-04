<template>
  <view>
    <div v-if="hasLocation">
      <van-panel
        v-for="location in locLists"
        :key="location.id"
        :title="location['name']"
        :desc="location['phone']"
        :status="location['status']">
        <view class="content">
          {{ location.address }}
          <van-button size="small" hairline="true" class="foot-button" @click="goEditLocation(location.id)">编辑</van-button>
        </view>
      </van-panel>
    </div>
    <van-button id="createloc" type="primary" @click="goEditLocation()">新增地址</van-button>
  </view>
</template>


<script>
// 地址可以使用Panel
// import { formatTime } from '@/utils/index'
import card from '@/components/card'
import store from '../index/store'

export default {
  components: {
    card
  },
  created () {
    wx.cloud.init({
      env: 'idwc',
      traceUser: true
    })
    this.getDefaultLoc()
  },
  onLoad () {
    this.getLocation(this.amount)
  },
  data () {
    return {
      address: '',
      locstatus: '',
      locLists: [],
      hasLocation: false,
      amount: 0,
      pageSize: 12,
      defaultLocation: ''
    }
  },
  methods: {
    goEditLocation (addrId) {
      console.log('id:', addrId)
      // const searchValue = e
      const url = `/pages/editlocation/main?addrId=${addrId}`
      mpvue.redirectTo({
        url
      })
    },
    getLocation (amount) {
      const db = wx.cloud.database()
      db.collection('location')
        .orderBy('release_time', 'asc')
        .skip(amount)
        .limit(this.pageSize)
        .get()
        .then(res => {
          const def = this.defaultLocation
          console.log('res: ', res)
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              let status = ''
              if (res.data[i]['_id'] === def) {
                status = '默认'
              }
              this.locLists.push({
                'name': res.data[i]['receiverName'],
                'phone': res.data[i]['receiverPhone'],
                'address': res.data[i]['province'] + ' ' +
                  res.data[i]['city'] + ' ' +
                  res.data[i]['district'] + ' ' +
                  res.data[i]['specific'],
                'status': status,
                'id': res.data[i]['_id']
              })
            }
            this.amount += res.data.length
            console.log('index loc list:', this.locLists)
          }
          this.hasLocation = this.amount > 0
        })
        .catch(err => {
          console.error(err)
        })
    },
    getDefaultLoc () {
      const db = wx.cloud.database()
      const userId = store.state.userId
      console.log('userId:', userId)
      db.collection('user').where({
        _id: userId
      }).get()
        .then(res => {
          if (res.data[0].defaultLocation) {
            this.defaultLocation = res.data[0].defaultLocation
            console.log('def loc:', this.defaultLocation)
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
