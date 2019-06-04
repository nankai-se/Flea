<template>
  <div>
    <div class="search">
      <search></search>
    </div>
    <div class="itempanel" @click="handle">
      <itempanel></itempanel>
    </div>
  </div>
</template>

<script>
import itempanel from '../../components/itempanel.vue'
import search from '../../components/search.vue'
import store from '../index/store'

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
      const url = `/pages/goodsdetail/main?goodId=` + store.state.curGoodId
      console.log(url)
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
