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
      imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },
  created () {
    console.log('goodslist page created!')
  },
  mounted () {
    console.log('goodslist page mounted!')
  },
  methods: {
    handle () {
      console.log('ddd')
    }
  }
}
</script>

<style>
.search {
  padding-bottom:15%
}
</style>
