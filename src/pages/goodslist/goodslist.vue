<template>
  <div @click="handle">
    <div class="search">
      <search></search>
    </div>
    <div class="itempanel">
      <itempanel></itempanel>
    </div>
  </div>
</template>

<script>
import itempanel from '../../components/itempanel.vue'
import search from '../../components/search.vue'

export default {
  name: 'goodslist',
  components: {
    itempanel,
    search
  },
  data () {
    return {
    }
  },
  methods: {
    handle () {
      console.log('ddd')
      // wx.getUserInfo({
      //   success: function (res) {
      //     var userInfo = res.userInfo // 用户基本信息
      //     // var nickName = userInfo.nickName // 用户名
      //     // var avatarUrl = userInfo.avatarUrl // 头像链接
      //     // var gender = userInfo.gender // 性别 0：未知、1：男、2：女
      //     // var province = userInfo.province // 所在省
      //     // var city = userInfo.city // 所在市
      //     // var country = userInfo.country // 所在国家
      //     console.log(userInfo)
      //   }
      // })
      const url = `/pages/goodsdetail/main?goodsId=10`
      mpvue.navigateTo({
        url
      })
    }
  }
}
</script>

<style>
.search {
  padding-bottom:15%
}
</style>
