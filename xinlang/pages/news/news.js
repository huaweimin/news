// pages/news.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var wxrequest = require('../../utils/wxrequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:{}    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    wxrequest.request('/api/news?id='+id, [], 'GET', function (res) {
      if (!res.data) {
        wx.navigateTo({
          url: '../news/list',
        })
      } else {
        that.setData({
          news: res.data
        });
        WxParse.wxParse('article', 'html', that.data.news.content, that, 5);   // 实例化对象  
      }   
    }, function () {
      console.log("信息获取失败！")
    })   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("pull")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var id = that.data.news.id;
    return {
      title: that.data.news.title,
      path: `pages/news/news?id=${id}`, // 分享后打开的页面
      imageUrl: that.data.news.pic_img ? that.data.news.pic_img : "../../images/logo.png"
    }
  }
})