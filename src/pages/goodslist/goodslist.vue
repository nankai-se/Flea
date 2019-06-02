<template>
  <div @click="handle">
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
      :thumb="imageURL"
    />

    <van-card
      num="2"
      tag="标签1"
      price="10.00"
      desc="描述信息"
      title="商品标题"
      :thumb="imageURL"
    >
      <view slot="footer">
        <van-button size="mini" :style="{ marginRight: '8px' }">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </view>8
    </van-card>
  </div>
</template>

<script>

export default {
  name: 'goodslist',
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

</style>
