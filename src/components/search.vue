<template>
  <view class="search-wrapper">
    <van-search
      :value="searchValue"
      placeholder="请输入搜索关键词"
      use-action-slot
      :search="onSearch">
    <view slot="action" @click="onSearch">搜索</view>
    </van-search>
  </view>
</template>

<script>
export default {
  props: {
    img: String,
    price: Number
  },
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onSearch () {
      console.log('click on onsearch')
      // this.goSearchResult()
      this.triggerEvent('goSearchResult', this.searchValue)
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
