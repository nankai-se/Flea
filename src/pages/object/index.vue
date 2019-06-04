<template>
  <div>
    <van-toast id="van-toast" />
    <div>
      <div class="tabs">
        <van-tabs :active="active" @change="onChange">
          <van-tab title="全部">
            <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
            <div v-if="hasGoods">
            <view v-for="item in goodsList" :key="item">
              <view>
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb"
                    :tag="item.tag"
                  >
                    <view slot="footer" >
                      <van-button size="mini" round="true" @click="editGoods(item.goods_id)">编辑</van-button>
                      <van-button size="mini" round="true" @click="removeGoods(item.goods_id)">下架</van-button>
                    </view>
                </van-card>
              </view>
            </view>
            </div>
          <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div> 
          </van-tab>


          <van-tab title="待售">
            <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
            <div v-if="hasGoods">
            <view v-for="item in goodsList" :key="item">
              <view>
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb"
                    :tag="item.tag"
                  >
                    <view slot="footer" >
                      <van-button size="mini" round="true" @click="editGoods(item.goods_id)">编辑</van-button>
                      <van-button size="mini" round="true" @click="removeGoods(item.goods_id)">下架</van-button>
                    </view>
                </van-card>
              </view>
            </view>
            </div>
          <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div> 
          </van-tab>


          <van-tab title="我卖出的">
            <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
            <div v-if="hasGoods">
            <view v-for="item in goodsList" :key="item">
              <view>
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb"
                    :tag="item.tag"
                  >
                    <view slot="footer" >
                      <van-button size="mini" round="true" disabled="true">编辑</van-button>
                      <van-button size="mini" round="true" disabled="true">下架</van-button>
                    </view>
                </van-card>
              </view>
            </view>
            </div>
          <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div> 
          </van-tab>

          
          <van-tab title="下架商品">
            <div class="noGoods-panel" v-if="!hasGoods" v-text="noGoods"></div>
            <div v-if="hasGoods">
              <view v-for="item in goodsList" :key="item">
                <view>
                  <van-card
                      :num="item.num"
                      :price="item.price"
                      :desc="item.desc"
                      :title="item.title"
                      :thumb="item.thumb"
                      :tag="item.tag"
                    >
                      <view slot="footer" >
                        <van-button size="mini" round="true" @click="editGoods(item.goods_id)">编辑</van-button>
                        <van-button size="mini" round="true" disabled="true">下架</van-button>
                      </view>
                  </van-card>
                </view>
              </view>
            </div>
          <div class="noMoreGoods-panel" v-if="isNoMore" v-text="noMoreGoods"></div> 
          </van-tab>
          </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../../../static/vant/toast/toast'
export default {
  components: {

  },

  data () {
    return {
      goodsList: [

      ],
      hasGoods: false,
      isNoMore: false,
      amount: 0,
      owner_id: '1',
      active: 0,
      pageSize: 10,
      noGoods: '暂时没有商品，过会再来吧~',
      noMoreGoods: '没有更多商品啦~',
      success: '操作成功',
      fail: '操作失败',
      openid: 'of4Oa5Z5Rs-LOgvzd_p9HwuW2rLk'
    }
  },
  computed: {
  },
  created () {

  },
  onReachBottom () {
    switch (parseInt(this.active)) {
      case 0:
        this.getMyGoods()
        break
      case 1:
        this.getGoods('待售')
        break
      case 2:
        this.getGoods('已卖出')
        break
      case 3:
        this.getGoods('下架')
        break
    }
  },
  onLoad (options) {
    this.active = options.active
    let temp = this.active
    switch (parseInt(temp)) {
      case 0:
        this.getMyGoods()
        break
      case 1:
        this.getGoods('待售')
        break
      case 2:
        this.getGoods('已卖出')
        break
      case 3:
        this.getGoods('下架')
        break
    }
  },
  onUnload () {
    this.clearCache()
  },
  methods: {
    /**
     * @function
     * 清除页面加载的数据
     */
    clearCache () {
      this.goodsList = []
      this.amount = 0
      this.hasGoods = false
      this.isNoMore = false
    },
    /**
     * @function
     * 每次变化时要请求数据？
     * 或者打开这个页面的时候请求一次
     * 不同的tab使用filter从orderlist中选取
     */
    onChange (event) {
      let index = event.target.index
      this.clearCache()
      switch (parseInt(index)) {
        case 0:
          this.getMyGoods()
          break
        case 1:
          this.getGoods('待售')
          break
        case 2:
          this.getGoods('已卖出')
          break
        case 3:
          this.getGoods('下架')
          break
      }
    },

    /**
     * @function
     * 获取我的所有类型商品的列表
     */
    getMyGoods () {
      const db = wx.cloud.database()
      db.collection('goods').where({
        owner_id: this.owner_id
      }).skip(this.amount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            console.log('all goods res', res)
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.goodsList.push(
                  {
                    'tag': res.data[i]['state'],
                    'price': res.data[i]['price'],
                    'title': res.data[i]['type'],
                    'desc': res.data[i]['detail'],
                    'thumb': res.data[i]['headimg'],
                    'goods_id': res.data[i]['_id']
                  }
                )
              }
              this.amount += res.data.length
            } else {
              this.isNoMore = true
            }
            this.hasGoods = this.amount > 0
          }
        ).catch(err => {
          console.error(err)
        })
    },
    /**
     * @function
     * 获取其他类型的商品列表
     */
    getGoods (type) {
      const db = wx.cloud.database()
      db.collection('goods').where({
        owner_id: this.owner_id,
        state: type
      }).skip(this.amount)
        .limit(this.pageSize)
        .get()
        .then(
          res => {
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                this.goodsList.push(
                  {
                    'tag': res.data[i]['state'],
                    'price': res.data[i]['price'],
                    'title': res.data[i]['type'],
                    'desc': res.data[i]['detail'],
                    'thumb': res.data[i]['headimg'],
                    'goods_id': res.data[i]['_id']
                  }
                )
              }
              this.amount += res.data.length
            } else {
              this.isNoMore = true
            }
            this.hasGoods = this.amount > 0
          }
        )
    },
    editGoods (goodsId) {
      wx.navigateTo({
        url: '../object/main?goodsId=' + goodsId
      })
    },
    removeGoods (goodsId) {
      const db = wx.cloud.database()
      console.log('goodsId', goodsId)
      db.collection('goods')
        .doc(goodsId)
        .update({
          data: {
            state: '下架'
          }
        })
        .then(res => {
          console.log(res)
          Toast.success({
            message: this.success,
            duration: 1000})
        })
        .catch(err => {
          console.log('then err', err)
          Toast.fail({
            message: this.fail,
            duration: 1000
          })
        })
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
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
  font-size: 15px;
}
</style>
