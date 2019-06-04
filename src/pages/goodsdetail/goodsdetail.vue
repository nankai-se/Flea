<template>
  <div>
    <div class="outer-split-line"></div>
    <div class="detail" @click="handle">
      <div class="userinfo">
        <van-row>
          <van-col span="3">
            <view class="portrait-box">
              <img class="portrait" :src="portrait"/>
            </view>
          </van-col>
          <van-col span="10">
            <table>
              <tr>
                <td><span class="username" v-text="ownerName"></span></td>
                <td><span class="location" v-text="location"></span></td>
              </tr>
            </table>
          </van-col>
        </van-row>
      </div>

      <div class="split-line"></div>

      <div class="goodsinfo">
        <span class="price-tag">￥</span><span class="price" v-text="price"></span><br>
        <van-tag v-if="hasTag" type="danger">全新</van-tag>
        <span class="goodsdetail" v-text="detail"></span>

        <view class="swiper-view">
          <swiper class="swiper" indicator-dots="true" circular>
            <block v-for="img in imgs" v-bind:key="img.id">
              <swiper-item>
                  <img mode="aspectFit" :src="img"/>
              </swiper-item>
            </block>
          </swiper>
        </view>
        <div class="split-line"></div>
        <span class="location" v-text="favorite">人收藏</span>
      </div>
    </div>
    <div class="outer-split-line"></div>
    
    <!-- <div class="comment-box" @click="handle">
      <div class="outer-split-line"></div>
      <span class="comment">留言</span>
      <div class="outer-split-line"></div>

      <div class="comment">
        <div v-for="comment in commentList" :key="comment">
            <van-cell :title="comment['username']" :value="comment['date']" :label="comment['content']" border=false />
        </div>
        <div v-if="keyboard">
          <input
          :focus="keyboard"
          type="text"
          v-model="myComment"
          cursor-spacing=0
          placeholder="有什么想问问宝贝主人？"/>
        </div>
      </div>
      <div class="outer-split-line"></div>
    </div> -->

    <div class="goodsAction">
      <van-goods-action>
        <van-goods-action-icon
        icon="chat-o"
        text="留言"
        @click="clickComment"
        />
        <van-goods-action-icon
        :icon="star"
        text="收藏"
        @click="clickStar"
        />
        <van-goods-action-button
        text="聊一聊"
        type="warning"
        @click="onClickButton"
        />
        <van-goods-action-button
        text="马上买"
        @click="onClickButton"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import store from '../index/store'

export default {
  name: 'goodsdetail',
  data () {
    return {
      ownerName: 'null',
      portrait: '',
      goodId: '',
      hasTag: true,
      detail: '暂无商品信息哦~',
      imgs: [],
      price: 0,
      commentList: [],
      myComment: '',
      keyboard: false,
      star: 'star-o',
      isStar: false,
      location: '',
      favorite: 0
    }
  },
  onLoad: function (options) {
    console.log(options.goodId)
    this.goodId = options.goodId
    wx.cloud.init({
      env: 'idwc',
      traceUser: true
    })
    // let goodId = '0d3b0eeb-0750-4f6f-904f-3f023c91c26a'
    this.getGood(this.goodId)
    this.getComment(this.goodId)
    this.getStar()
  },
  mounted () {
  },
  beforeDestroy () {
    this.clearCache()
  },
  methods: {
    clearCahe () {
      this.imgs = []
      this.commentList = []
    },
    changeComment (value) {
      console.log(value)
    },
    getComment (goodId) {
      const db = wx.cloud.database()
      // 查询该商品的所有留言
      db.collection('comment').where({
        goods_id: goodId
      }).orderBy('time', 'asc').get()
        .then(resC => {
          // console.log('comment: ', resC)
          if (resC.data.length > 0) {
            for (let i = 0; i < resC.data.length; i++) {
              let id = resC.data[i]['sender_id']
              // 查询该条留言的用户名
              db.collection('user').where({
                _id: id
              }).get()
                .then(resU => {
                  if (resU.data.length > 0) {
                    this.commentList.push({
                      'content': resC.data[i]['content'],
                      'date': resC.data[i]['time'].toLocaleString(),
                      'username': resU.data[0]['nickName']
                    })
                  }
                })
                .catch(err => {
                  console.error(err)
                })
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getGood (goodId) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        _id: goodId
      }).get()
        .then(res => {
          // console.log('gooddetail: ', res)
          if (res.data.length > 0) {
            this.price = res.data[0]['price']
            this.detail = res.data[0]['detail']
            this.favorite = res.data[0]['favorite']
            this.imgs.push(res.data[0]['imgs'])
            let id = res.data[0]['owner_id']
            db.collection('user').where({
              _id: id
            }).get()
              .then(resU => {
                if (resU.data.length > 0) {
                  this.ownerName = resU.data[0]['nickName']
                  this.portrait = resU.data[0]['portrait']
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
    },
    getStar () {
      const db = wx.cloud.database()
      db.collection('favorites').where({
        user_id: store.state.userId
      }).get()
        .then(res => {
          // console.log('favorites: ', res)
          if (res.data.length > 0) {
            let goodsId = res.data[0]['goods_id']
            let index = goodsId.indexOf(this.goodId)
            if (index === -1) {
              this.isStar = false
              this.star = 'star-o'
            } else {
              this.isStar = true
              this.star = 'star'
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handle () {
      this.keyboard = false
    },
    clickComment () {
      console.log(this.myComment)
      this.keyboard = true
      // const db = wx.cloud.database()
      // db.collection('comment').add({
      //   // data 字段表示需新增的 JSON 数据
      //   data: {
      //     content: this.myComment,
      //     goods_id: '0d3b0eeb-0750-4f6f-904f-3f023c91c26a',
      //     sender_id: store.state.userId,
      //     time: new Date()
      //   },
      //   success (res) {
      //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      //     console.log(res)
      //   }
      // })
    },
    onClickButton () {
      wx.showToast({title: '点返回', icon: 'none'})
    },
    clickStar () {
      this.isStar = !this.isStar
      if (this.isStar) {
        this.star = 'star'
        wx.showToast({
          icon: 'none',
          title: '收藏成功~'
        })
      } else {
        this.star = 'star-o'
        wx.showToast({
          icon: 'none',
          title: '取消收藏~'
        })
      }
      const db = wx.cloud.database()
      db.collection('favorites').where({
        user_id: store.state.userId
      }).get()
        .then(res => {
          console.log('favorites: ', res)
          if (res.data.length > 0) {
            let goodsId = res.data[0]['goods_id']
            let favoId = res.data[0]['_id']
            let index = goodsId.indexOf(this.goodId)
            console.log('index: ', index)
            if (index === -1) {
              console.log('push')
              goodsId.push(this.goodId)
            } else {
              console.log('remove')
              goodsId.splice(index, 1)
            }
            console.log(goodsId)
            db.collection('favorites').doc(favoId).update({
              data: {
                goods_id: goodsId
              }
            }).then(res => {
              console.log(res)
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>
input {
  margin: 2%;
  padding-left: 2%;
  font-size: 20px;
}

.detail {
  padding: 5px;
  font-size: 14px;
  white-space:pre-wrap;
  box-shadow:3px 3px 1px rgba(0, 0, 0, 0.11);
}

.userinfo {
  padding-left: 1%;
  padding-right: 1%;
  padding-bottom: 2%;
}

.portrait-box {
  display: inline;
}

.portrait {
  width: 40px; 
  height: 40px;
  border-radius: 5%;
}

.username {
  font-weight: bold;
  padding-left: 5px;
  padding-bottom: 25px;
  font-size: 14px;
  color: rgb(34, 34, 34);
}

.location {
  padding-left: 5px;
  padding-bottom: 25px;
  font-size: 12px;
  color: rgb(158, 158, 158);
}

.price-tag {
  font-size: 12px;
  color: rgb(241, 67, 36);
}

.price {
  font-size: 14px;
  font-weight: bold;
  color: rgb(241, 67, 36);
}

.outer-split-line {
  height: 1px;
  width: 100%;
  border-top: 1px solid rgba(221, 221, 221, 0.795);
  text-align: center;
  margin: 0 auto;
  padding-bottom: 2%;
}

.split-line{
  height: 1px;
  width: 98%;
  border-top: 1px solid rgba(221, 221, 221, 0.658);
  text-align: center;
  margin: 0 auto;
  padding-bottom: 1%;
  padding-top: 2%;
}

.goodsinfo {
  padding-left: 2%;
  padding-right: 2%;
}

.goodsdetail {
  padding: 5px;
  font-size: 14px;
  white-space:pre-wrap;
}

.swiper-view {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 0;
  padding-top: 2%;
}

swiper-item image {
  width:100%;
  align-items: center;
}

.comment-box {
  padding-bottom: 60px;
}
</style>
