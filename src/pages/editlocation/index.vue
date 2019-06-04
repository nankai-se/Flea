<template>
  <div class="panel">
    <van-toast id="van-toast" />
    <van-cell-group>
      <van-field
        :value="name"
        required
        clearable
        label="姓名"
        placeholder="请输入收件人姓名"
        @change="onName"
        bind:click-icon="onClickIcon"
      />
      <van-field
        :value="phone"
        required
        clearable
        label="手机"
        placeholder="请输入收件人手机号"
        @change="onPhone"
        bind:click-icon="onClickIcon"
      />
      <van-field
        :value="province"
        required
        clearable
        label="省"
        placeholder="请输入省"
        @change="onProvince"
        bind:click-icon="onClickIcon"
      />
      <van-field
        :value="city"
        label="市"
        clearable
        placeholder="请输入市"
        @change="onCity"
        required
        border=false
      />
      <van-field
        :value="district"
        label="区"
        clearable
        placeholder="请输入区"
        @change="onDistrict"
        border=false
      />
      <van-field
        :value="specific"
        placeholder="请输入详细地址"
        @change="onSpecific"
        border=false
        bind:change="onChange"
      />
    </van-cell-group>
    <div class="followpanel">
      <van-button v-if=addrId type="primary" @click="editLocation">确认修改</van-button>
      <van-button v-if=!addrId type="primary" @click="createLocation">确认创建</van-button>
    </div>

  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  data () {
    return {
      province: '',
      city: '',
      district: '',
      specific: '',
      showSuccess: false,
      showFail: false,
      addrId: '',
      name: '',
      phone: '',
      success: '操作成功',
      fail: '操作失败'
    }
  },
  onLoad (opp) {
    if (opp.addrId !== '') {
      console.log('opp:', opp.addrId)
      console.log('opp a:', opp.addrId !== undefined)
      this.addrId = opp.addrId
      this.getLocationInfo(opp.addrId)
    }
    // this.addrId = 'b77505b4-72f4-477f-8d41-8480a2ac9fb8'
    // this.getLocationInfo(this.addrId)
  },
  onUnload () {
    this.clearCache()
  },
  methods: {
    clearCache () {
      this.amount = 0
      this.goodsLists = []
    },
    onName (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.name = value
    },
    onPhone (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.phone = value
    },
    onProvince (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.province = value
    },
    onCity (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.city = value
    },
    onDistrict (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.district = value
    },
    onSpecific (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.specific = value
    },
    editLocation () {
      const db = wx.cloud.database()
      console.log('addrId:', this.addrId)
      db.collection('location').doc(this.addrId).update({
        data: {
          province: this.province,
          city: this.city,
          district: this.district,
          specific: this.specific,
          receiverName: this.name,
          receiverPhone: this.phone
        }
      }).then(res => {
        console.log(res)
        Toast.success({
          message: this.success,
          duration: 1000})
        const url = `/pages/myLocation/main`
        mpvue.navigateTo({
          url
        })
      }).catch(err => {
        console.log(err)
        Toast.fail({
          message: this.fail,
          duration: 1000
        })
      })
    },
    createLocation () {
      const db = wx.cloud.database()
      db.collection('location').add({
        data: {
          province: this.province,
          city: this.city,
          district: this.district,
          specific: this.specific,
          receiverName: this.name,
          receiverPhone: this.phone
        }
      }).then(res => {
        console.log('then res:', res)
        Toast.success({
          message: this.success,
          duration: 1000})
        const url = `/pages/myLocation/main`
        mpvue.navigateTo({
          url
        })
      }).catch(err => {
        console.log('then err', err)
        Toast.fail({
          message: this.fail,
          duration: 1000
        })
      })
    },
    getLocationInfo (addrId) {
      const db = wx.cloud.database()
      db.collection('location').where({
        _id: addrId
      }).get()
        .then(res => {
          console.log('get res:', res)
          this.province = res.data[0]['province']
          this.city = res.data[0]['city']
          this.district = res.data[0]['district']
          this.specific = res.data[0]['specific']
          this.name = res.data[0]['receiverName']
          this.phone = res.data[0]['receiverPhone']
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.panel {
  margin-top: 10%;
  align-items: center;
  justify-content: center;
  background: rgb(249, 250, 250);
}

.followpanel {
  background: rgb(249, 250, 250);
  margin-top: 5%;
  margin-bottom: 10%;
}
</style>
