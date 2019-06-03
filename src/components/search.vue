<template>
  <view class="search-wrapper">
    <van-search
      v-bind:value="searchValue"
      placeholder="请输入搜索关键词"
      use-action-slot
      @change="onChange">
    <view slot="action" @click="onSearch">搜索</view>
    </van-search>
  </view>
</template>

<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onSearch () {
      const searchValue = this.searchValue.split(' ')
      console.log('click on onsearch:', searchValue[0])
      // this.goSearchResult()
      this.$emit('goSearch', searchValue[0])
    },
    onChange (e) {
      // console.log('change target:', e.target)
      let value = ''
      for (let i = 0; ; i++) {
        if (e.target[i]) {
          value += e.target[i]
        } else {
          break
        }
      }
      this.searchValue = value
    }
  }
}
</script>

<style>
.search-wrapper {
  position: fixed;
  top: 0px;
  left: 0;
  width: 95%;
  z-index: 999;
  margin-left: calc(2.5%);
}
</style>
