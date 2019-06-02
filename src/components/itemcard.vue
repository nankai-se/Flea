<template>
  <div class="itemcard">
    <view class="item-img-box">
      <img class="item-img" :src="img" mode="aspectFill"/>
    </view>
    <div class="item-tag">
      <span class="price-tag">￥</span><strong class="price-tag" v-text="price"></strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    price: Number
  }
}
</script>

<style>
.itemcard {
  display: inline-block;
  width: calc(50% - 20px);
  margin-top: 10px;
  margin-right: 10px;
  margin-left:10px;
}

.item-img-box {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  position:relative;
  width: 100%;
  height:0%;
  padding-top:100%
}

.item-img {
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
}

.price-tag {
  display: inline;
  font-size: 16px;
  color: rgb(241, 67, 36);
}
</style>
