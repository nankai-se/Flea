<template>
  <div class="itemcard" @click="onClick">
    <view class="item-img-box">
      <img class="item-img" :src="img" mode="aspectFill"/>
    </view>
    <div class="item-tag">
      <span class="detail" v-text="detail"></span>
      <span class="price-tag">￥</span><span class="price" v-text="price"></span>
      <span class="favorite" v-text="favorite">人收藝</span>
      <div class="split-line"></div>
      <span class="username" v-text="ownerName"></span>
      <span class="location" v-text="location"></span>
    </div>
  </div>
</template>

<script>
// import store from '../pages/index/store'

export default {
  props: {
    id: String,
    img: String,
    price: Number,
    detail: String,
    favorite: Number
  },
  data () {
    return {
      ownerName: '',
      location: ''
    }
  },
  methods: {
    onClick () {
      console.log('click on card:', this.id)
      // this.goSearchResult()
      this.$emit('emitGoodId', this.id)
    }
  },
  mounted () {
    wx.cloud.init({
      env: 'idwc',
      traceUser: true
    })
    const db = wx.cloud.database()
    db.collection('goods').where({
      _id: this.id
    }).get()
      .then(res => {
        if (res.data.length > 0) {
          let id = res.data[0]['owner_id']
          db.collection('user').where({
            _id: id
          }).get()
            .then(resU => {
              if (resU.data.length > 0) {
                this.ownerName = resU.data[0]['nickName']
                this.location = resU.data[0]['location']
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style scoped>
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
