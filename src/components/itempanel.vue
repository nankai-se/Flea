<template>
  <div>
    <itemcard
      v-for="goods in goodsLists"
      :key="goods.id"
      :img="goods['img']"
      :price="goods['price']"
      :id="goods['id']"
      @emitGoodId="emitGoodId"></itemcard>
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
  },
  methods: {
    emitGoodId (id) {
      console.log('emit twice:', id)
      this.$emit('goGoodsDetail', id)
    }
  }
}
</script>

<style>

</style>
