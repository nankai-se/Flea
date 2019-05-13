<template>
  <div @click="clickHandle">
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
          <view class="theme-box" v-for="(img,index) in theme_img_one" :key="img.id">
            <img class="theme-img" :src="img"/>
            <label class="theme-title">{{theme_title_one[index]}}</label>
          </view>
        </view>
        <view class="theme-row">
          <view class="theme-box" v-for="(img,index) in theme_img_two" :key="img.id">
            <img class="theme-img" :src="img"/>
            <label class="theme-title">{{theme_title_two[index]}}</label>
          </view>
        </view>
      </div>
      <img id="gift_package" :src="gift_package" mode="aspectFill"/>
    </div>
    <view class="panel">
      <div class="beforeItem" v-text="before_item_text"></div>
      <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
      <view class="item-panel" v-if="hasGoods">
        <itemcard v-for="goods in goodsLists" :key="goods.id" :img="goods['img']" :price="goods['price']"></itemcard>
      </view>
      <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div>
    </view>
  </div>
</template>

<script>
import itemcard from '../../components/itemcard.vue'

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
      gift_package: 'cloud://idwc.6964-idwc/static/images/gift_package.png',
      before_item_text: '--- 好物推荐 ---',
      noGoods: '暂时没有商品，过会再来吧~',
      noMoreGoods: '没有更多商品啦~',
      amount: 0,
      goodsLists: [],
      hasGoods: false,
      isNoMore: false
    }
  },
  components: {
    itemcard
  },
  onLoad () {
    wx.cloud.init({
      env: 'idwc',
      traceUser: true
    })
    this.getGoods(0)
  },
  onUnload () {
    this.clearCache()
  },
  onPullDownRefresh () {
    this.clearCache()
    this.getGoods(0)
  },
  onReachBottom () {
    this.getGoods(this.amount)
  },
  methods: {
    clearCache () {
      this.amount = 0
      this.goodsLists = []
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    getGoods (amount) {
      const MAX_LIMIT = 12
      const db = wx.cloud.database()
      db.collection('test_yunfan').doc('613a1989-b100-4904-85fe-2528cbb3a9b5')
        .get({
          success (res) {
            console.log('success')
          }
        })
      db.collection('goods').orderBy('release_time', 'asc').skip(this.amount).limit(MAX_LIMIT)
        .get()
        .then(res => {
          console.log('res: ', res)
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.goodsLists.push({
                'img': res.data[i]['fileID'],
                'price': res.data[i]['price']
              })
            }
            this.amount += res.data.length
          } else {
            this.isNoMore = true
          }
          this.hasGoods = this.amount > 0
        })
        .catch(err => {
          console.error(err)
        })
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

.beforeItem {
  margin-top: 10px;
  font-size: 18px;
  color:rgb(200, 67, 67);
}

.item-panel {
  width: 95%;
}

.noGoods-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 200px;
  margin-top: 50px;
}

.noMoreGoods-panel {
  color: rgb(177, 177, 177);
  background-color: rgb(249, 250, 250);
  height: 50px;
  margin-top: 20px;
  font-size: 15px;
}


#gift_package {
  max-height: 50px;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
