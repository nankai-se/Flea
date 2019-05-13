require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(16);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_492ea4e0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-492ea4e0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_492ea4e0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-492ea4e0", Component.options)
  } else {
    hotAPI.reload("data-v-492ea4e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 17:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_card__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      search_value: '想搜啥呀',
      advertises: ['cloud://idwc.6964-idwc/static/images/adve1.jpg', 'cloud://idwc.6964-idwc/static/images/adve2.jpg', 'cloud://idwc.6964-idwc/static/images/adve3.jpg'],
      theme_img_one: ['cloud://idwc.6964-idwc/static/images/books.png', 'cloud://idwc.6964-idwc/static/images/clothes.png', 'cloud://idwc.6964-idwc/static/images/electric.png', 'cloud://idwc.6964-idwc/static/images/food.png'],
      theme_title_one: ['教辅', '服饰', '电器', '食物'],
      theme_img_two: ['cloud://idwc.6964-idwc/static/images/makeup.png', 'cloud://idwc.6964-idwc/static/images/transformation.png', 'cloud://idwc.6964-idwc/static/images/wallet.png', 'cloud://idwc.6964-idwc/static/images/see_more.png'],
      theme_title_two: ['彩妆', '交通', '数码', '更多'],
      gift_package: 'cloud://idwc.6964-idwc/static/images/gift_package.png'
    };
  },


  components: {
    card: __WEBPACK_IMPORTED_MODULE_0__components_card__["a" /* default */]
  },

  methods: {
    bindViewTap: function bindViewTap() {
      var url = '../logs/main';
      if (global.mpvuePlatform === 'wx') {
        global.mpvue.switchTab({ url: url });
      } else {
        global.mpvue.navigateTo({ url: url });
      }
    },
    clickHandle: function clickHandle(ev) {
      console.log('clickHandle:', ev);
      // throw {message: 'custom test'}
    }
  },

  created: function created() {
    // let app = getApp()
  }
});

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.clickHandle
    }
  }, [_c('van-search', {
    attrs: {
      "value": _vm.search_value,
      "placeholder": "请输入搜索关键词",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('view', {
    staticClass: "swiper-view"
  }, [_c('swiper', {
    staticClass: "swiper",
    attrs: {
      "indicator-dots": "true",
      "circular": "",
      "autoplay": "true",
      "interval": "5000",
      "duration": "1000"
    }
  }, _vm._l((_vm.advertises), function(img, index) {
    return _c('block', {
      key: img.id
    }, [_c('swiper-item', {
      attrs: {
        "mpcomid": '1_' + index
      }
    }, [_c('view', {
      staticClass: "swiper-box"
    }, [_c('img', {
      staticClass: "slide-image",
      attrs: {
        "src": img,
        "mode": "aspectFill"
      }
    })])])], 1)
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "panel"
  }, [_c('div', {
    staticClass: "theme-panel"
  }, [_c('view', {
    staticClass: "theme-row"
  }, _vm._l((_vm.theme_img_one), function(img, index) {
    return _c('view', {
      key: img.id,
      staticClass: "theme-box"
    }, [_c('img', {
      staticClass: "theme-img",
      attrs: {
        "src": img
      }
    }), _vm._v(" "), _c('label', {
      staticClass: "theme-title"
    }, [_vm._v(_vm._s(_vm.theme_title_one[index]))])], 1)
  })), _vm._v(" "), _c('view', {
    staticClass: "theme-row"
  }, _vm._l((_vm.theme_img_two), function(img, index) {
    return _c('view', {
      key: img.id,
      staticClass: "theme-box"
    }, [_c('img', {
      staticClass: "theme-img",
      attrs: {
        "src": img
      }
    }), _vm._v(" "), _c('label', {
      staticClass: "theme-title"
    }, [_vm._v(_vm._s(_vm.theme_title_two[index]))])], 1)
  }))]), _vm._v(" "), _c('img', {
    attrs: {
      "id": "gift_package",
      "src": _vm.gift_package,
      "mode": "aspectFill"
    }
  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "userinfo",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.bindViewTap
    }
  }, [(_vm.userInfo.avatarUrl) ? _c('img', {
    staticClass: "userinfo-avatar",
    attrs: {
      "src": _vm.userInfo.avatarUrl,
      "background-size": "cover"
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "000000000\n    +userinfo-avatar",
    attrs: {
      "src": "cloud://idwc.6964-idwc/static/images/user.png",
      "background-size": "cover"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "userinfo-nickname"
  }, [_c('card', {
    attrs: {
      "text": _vm.userInfo.nickName,
      "mpcomid": '2'
    }
  })], 1)])], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel"
  }, [_c('div', {
    staticClass: "item-panel"
  }, [_c('div', {
    staticClass: "item-img-box"
  }, [_c('img', {
    staticClass: "item-img",
    attrs: {
      "src": "cloud://idwc.6964-idwc/static/images/jeans.jpg",
      "mode": "aspectFill"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "item-img-box"
  }, [_c('img', {
    staticClass: "item-img",
    attrs: {
      "src": "cloud://idwc.6964-idwc/static/images/jeans.jpg",
      "mode": "aspectFill"
    }
  })])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-492ea4e0", esExports)
  }
}

/***/ })

},[15]);