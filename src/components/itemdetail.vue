<template>
  <div @click="handle">
    <van-nav-bar
      left-text="返回"
      left-arrow
      bind:click-left="onClickLeft"
    />
    <van-tag type="danger">标签</van-tag>
    <div class="goodsAction">
      <van-goods-action>
        <van-goods-action-icon
        icon="chat-o"
        text="客服"
        bind:click="onClickIcon"
        />
        <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        bind:click="onClickIcon"
        />
        <van-goods-action-button
        text="加入购物车"
        type="warning"
        bind:click="onClickButton"
        />
        <van-goods-action-button
        text="立即购买"
        bind:click="onClickButton"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>

export default {
  name: 'itemdetail',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    handle () {
      console.log('item')
    }
  }
}
</script>

<style>

</style>
