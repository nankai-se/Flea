<template>
  <div class="itemcard">
    <view class="item-img-box">
      <img class="item-img" :src="img" mode="aspectFill"/>
    </view>
    <div class="item-tag">
      <span class="detail" v-text="detail"></span>
      <span class="price-tag">￥</span><span class="price" v-text="price"></span>
      <span class="favorite">156人收藏</span>
      <div class="split-line"></div>
      <span class="username">username</span>
      <span class="location">八里台</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    price: Number,
    detail: String
  }
}
</script>

<style>
.itemcard {
  display: inline-block;
  width: calc(50% - 20px);
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px; 
  border-radius: 5%;
  background-color:rgb(240, 240, 240);
}

.item-img-box {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  position: relative;
  width: 100%;
  height:0%;
  padding-top: 100%
}

.item-img {
  border-radius:5%;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.detail {
  display: block;
  padding: 5px;
  font-size: 14px;
  color: black;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.price-tag {
  padding-left: 5px;
  font-size: 12px;
  color: rgb(241, 67, 36);
}

.price {
  font-size: 14px;
  font-weight: bold;
  color: rgb(241, 67, 36);
}

.favorite {
  font-size: 12px;
  padding-left: 6px;
  color: rgb(158, 158, 158);
}

.split-line{
  height: 1px;
  width: 92%;
  border-top: 1px solid rgba(221, 221, 221, 0.795);
  text-align: center;
  margin: 0 auto;
  padding-bottom: 2%;
}

.portrait-box {
  padding-top: 10px;
  padding-left: 6px;
  padding-bottom: 10px;
  display: inline;
}

.portrait {
  width: 40px; 
  height: 40px; 
  border-radius: 15%;
}

.username {
  float: left;
  padding-left: 6px;
  padding-bottom: 5px;
  font-size: 14px;
  color: rgb(34, 34, 34);
}

.location {
  float: right;
  padding-right: 6px;
  padding-bottom: 5px;
  font-size: 12px;
  color: rgb(158, 158, 158);
}
</style>
