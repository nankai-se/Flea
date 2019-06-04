<template>
  <div>
    <van-popup
      show="{{ showSuccess }}"
      position="top"
      bind:close="onClose"
    >
      操作成功
    </van-popup>
    <van-popup
      show="{{ showFail }}"
      position="top"
      bind:close="onClose"
    >
      操作失败，请重试
    </van-popup>
    <van-cell-group>
      <van-field
        value="{{ province }}"
        required
        clearable
        label="省"
        placeholder="请输入省"
        bind:click-icon="onClickIcon"
      />
      <van-field
        value="{{ city }}"
        label="市"
        clearable
        placeholder="请输入市"
        required
        border="{{ false }}"
      />
      <van-field
        value="{{ block }}"
        label="区"
        clearable
        placeholder="请输入区"
        border="{{ false }}"
      />
      <van-field
        value="{{ detail }}"
        placeholder="请输入详细地址"
        border="{{ false }}"
        bind:change="onChange"
      />
    </van-cell-group>
    <van-button v-if=edit type="primary">确认修改</van-button>
    <van-button v-if=!edit type="primary">确认创建</van-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      province: '',
      city: '',
      district: '',
      specific: '',
      showSuccess: false,
      showFail: false
    }
  },
  onLoad (opp) {
    if (opp.addrId) {
      this.editAddress(opp.addrId)
    } else {
      this.createAddress()
    }
  },
  onUnload () {
    this.clearCache()
  },
  methods: {
    clearCache () {
      this.amount = 0
      this.goodsLists = []
    },
    editAddress (addrId) {
      const db = wx.cloud.database()
      console.log('addrId:', addrId)
      db.collection('location').doc(addrId).update({
        data: {
          province: this.province,
          city: this.city,
          district: this.district,
          specific: this.specific
        }
      }).then(res => {
        console.log(res)
        this.showSuccess = true
      }).catch(err => {
        console.log(err)
        this.showFail = true
      })
    },
    createAddress () {
      const db = wx.cloud.database()
      db.collection('location').add({
        data: {
          province: this.province,
          city: this.city,
          district: this.district,
          specific: this.specific
        }
      }).then(res => {
        console.log(res)
        this.showSuccess = true
      }).catch(err => {
        console.log(err)
        this.showFail = true
      })
    }
  }
}
</script>

<style scoped>

</style>
