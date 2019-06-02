<template>
  <div>
    <itemcard v-for="goods in goodsLists" :key="goods.id" :img="goods['img']" :price="goods['price']"></itemcard>
  </div>
</template>

<script>
import itemcard from './itemcard.vue'
export default {
  props: {
    goodsLists: ['goodsLists']
  },
  components: {
    itemcard
  }
}
</script>

<style>

</style>
