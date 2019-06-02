<template>
  <div>
    <van-search :value="search_value" placeholder="请输入搜索关键词"></van-search>
    <view class="swiper-view">
      <swiper class="swiper" indicator-dots="true" circular autoplay="true" interval="5000" duration="1000">
        <block v-for="img in advertises" v-bind:key="img.id">
          <swiper-item>
            <view class="swiper-box">
              <img :src="img" class="slide-image" mode="aspectFill"/>
            </view>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <div class="panel">
      <div class="theme-panel">
        <view class="theme-row">
          <view class="theme-box" @click="navigate(theme_title_one[index])" v-for="(img,index) in theme_img_one" :key="img.id">
            <img class="theme-img" :src="img"/>
            <label class="theme-title">{{theme_title_one[index]}}</label>
          </view>
        </view>
        <view class="theme-row">
          <view class="theme-box" @click="navigate(theme_title_one[index])" v-for="(img,index) in theme_img_two" :key="img.id">
            <img class="theme-img" :src="img"/>
            <label class="theme-title">{{theme_title_two[index]}}</label>
          </view>
        </view>
      </div>
      <img id="gift_package" :src="gift_package" mode="aspectFill"/>
    </div>
    <div class="panel">
      <div class="item-panel">
        <div class="item-img-box">
          <img class="item-img" src="cloud://idwc.6964-idwc/static/images/jeans.jpg" mode="aspectFill"/>
        </div>
        <div class="item-img-box">
          <img class="item-img" src="cloud://idwc.6964-idwc/static/images/jeans.jpg" mode="aspectFill"/>
        </div>
      </div>
    </div>
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="000000000
      +userinfo-avatar" src="cloud://idwc.6964-idwc/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      search_value: '想搜啥呀',
      advertises: [
        'cloud://idwc.6964-idwc/static/images/adve1.jpg',
        'cloud://idwc.6964-idwc/static/images/adve2.jpg',
        'cloud://idwc.6964-idwc/static/images/adve3.jpg'
      ],
      theme_img_one: [
        'cloud://idwc.6964-idwc/static/images/books.png',
        'cloud://idwc.6964-idwc/static/images/clothes.png',
        'cloud://idwc.6964-idwc/static/images/electric.png',
        'cloud://idwc.6964-idwc/static/images/food.png'
      ],
      theme_title_one: [
        '教辅',
        '服饰',
        '电器',
        '食物'
      ],
      theme_img_two: [
        'cloud://idwc.6964-idwc/static/images/makeup.png',
        'cloud://idwc.6964-idwc/static/images/transformation.png',
        'cloud://idwc.6964-idwc/static/images/wallet.png',
        'cloud://idwc.6964-idwc/static/images/see_more.png'
      ],
      theme_title_two: [
        '彩妆',
        '交通',
        '数码',
        '更多'
      ],
      gift_package: 'cloud://idwc.6964-idwc/static/images/gift_package.png'
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    navigate (e) {
      console.log(e)
      const url = '../goodslist/main'
      mpvue.navigateTo({ url })
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.swiper-view {
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  z-index: 0;
}

swiper-item image {
  width: 100%;
  align-items: center;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(249, 250, 250);
}

.theme-panel {
  width: 95%;
  margin-top: -7px;
  z-index: 1;
  border-radius: 3%;
  background-color: white;
}

.theme-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.theme-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.theme-img {
  max-height: 60px;
  max-width: 60px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
}

.theme-title {
  color: rgb(77, 77, 77);
  font-size: 15px;
  margin-left: 29px;
  margin-right: 29px;
  margin-bottom: 5px;
}

.item-panel {
  display: flex;
  flex-direction: row;
  width: 95%;
}


.item-img-box {
  position: relative;
  width: calc(50% - 10px);
  height: 0px;
  padding-bottom: calc(50% - 10px);
  margin-right: 5px;
  margin-left:5px;
}

.item-img {
  position: absolute;
  width: 100%;
  height: 100%;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

#gift_package {
  max-height: 50px;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
