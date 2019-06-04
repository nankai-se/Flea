<template>
  <div @click="handle">
    <div class="outer-split-line"></div>
    <div class="detail">
      <div class="userinfo">
        <van-row>
          <van-col span="3">
            <view class="portrait-box">
              <img class="portrait" src="cloud://idwc.6964-idwc/static/images/cat.jpg"/>
            </view>
          </van-col>
          <van-col span="10">
            <table>
              <tr>
                <td><span class="username">username</span></td>
                <td><span class="location">八里台</span></td>
              </tr>
            </table>
          </van-col>
        </van-row>
      </div>

      <div class="split-line"></div>

      <div class="goodsinfo">
        <van-tag v-if="hasTag" type="danger">全新</van-tag>
        <span class="goodsdetail" v-text="good['detail']"></span>

        <view class="swiper-view">
          <swiper class="swiper" indicator-dots="true" circular>
            <block v-for="img in good['img']" v-bind:key="img.id">
              <swiper-item>
                  <img mode="aspectFit" :src="img"/>
              </swiper-item>
            </block>
          </swiper>
        </view>
        <div class="split-line"></div>
        <span class="location">3人收藏</span>
      </div>
    </div>
    <div class="outer-split-line"></div>
    
    <div class="comment-box">
      <div class="outer-split-line"></div>
      <span class="comment">留言</span>
      <div class="outer-split-line"></div>

      <div class="comment">
        <div v-for="comment in commentList" :key="comment">
            <van-cell title="username" value="2018" :label="comment" border=false />
        </div>
        <van-cell-group>
          <van-field
            :focus="keyboard"
            cursor-spacing=10
            center
            clearable
            placeholder="有什么想问问宝贝主人？"
            border=false
            use-button-slot
          >
            <van-button slot="button" size="small" type="warning">留言</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <div class="outer-split-line"></div>
    </div>
    <div class="goodsAction">
      <van-goods-action>
        <van-goods-action-icon
        icon="chat-o"
        text="留言"
        @click="clickComment"
        />
        <van-goods-action-icon
        icon="star-o"
        text="收藏"
        @click="onClickIcon"
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
import itemdetail from '../../components/itemdetail.vue'

export default {
  name: 'goodsdetail',
  components: {
    itemdetail
  },
  data () {
    return {
      advertises: [
        'cloud://idwc.6964-idwc/static/goods_images/cookies.jpg',
        'cloud://idwc.6964-idwc/static/goods_images/english.jpg',
        'cloud://idwc.6964-idwc/static/images/cat.jpg'
      ],
      hasTag: true,
      detail: '一只猫猫wwwwwwwdmkqdmkqmkqmqkmkqdmqldmlqdqld lqdlqd',
      isComment: true,
      good: {},
      commentList: ['1111', '22222', '3333'],
      keyboard: false
    }
  },
  onLoad: function (options) {
    console.log(options.goodId)
    wx.cloud.init({
      env: 'idwc',
      traceUser: true
    })
    let goodId = '0d3b0eeb-0750-4f6f-904f-3f023c91c26a'
    this.getGood(goodId)
    // this.getComment(goodId)
  },
  mounted () {
    console.log('detail page mounted!')
    // let goodId = '0d3b0eeb-0750-4f6f-904f-3f023c91c26a'
    // this.getGood(goodId)
  },
  methods: {
    getComment (goodId) {
    },
    getGood (goodId) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        _id: goodId
      }).get()
        .then(res => {
          console.log('res: ', res)
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.good['img'] = res.data[i]['fileID']
              this.good['price'] = res.data[i]['price']
              this.good['detail'] = res.data[i]['detail']
            }
          }
          console.log(this.good['detail'])
        })
        .catch(err => {
          console.error(err)
        })
    },
    handle () {
      console.log('detail')
    },
    onClickLeft () {
      wx.showToast({title: '点击返回', icon: 'none'})
    },
    clickComment () {
      this.keyboard = true
    },
    onClickButton () {
      wx.showToast({title: '点返回', icon: 'none'})
    }
  }
}
</script>

<style scoped>
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
}

swiper-item image {
  width:100%;
  align-items: center;
}

.comment-box {
  padding-bottom: 60px;
}
</style>
