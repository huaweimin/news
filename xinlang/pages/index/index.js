//index.js
//获取应用实例
const app = getApp()
var wxrequest = require('../../utils/wxrequest.js')

Page({
  data: {
    newsData:[],   
    loadover:false,
    page:1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  lower(e){      
    var that = this;
    if(that.data.loadover) return;
    that.setData({
      page: that.data.page+1
    })
    that.getNewsData(that.data.page)
  },
  //进入新闻详情页
  onNewTap: function(event){
    var id = event.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../news/news?id='+id,
    })
  },
  //获取新闻数据
  getNewsData(page){
    var that = this;
    var url = '/api/news/list?page=' + page;
    wxrequest.request(url, [], 'GET', function(res){
      if (!res.data.length || res.data.length < app.globalData.pageSize) {
        that.setData({
          loadover: true
        })
      }
      that.setData({
        newsData: that.data.newsData.concat(res.data)
      })
             
    }, function(){
      console.log("信息获取失败！")
    })
  },
  onLoad: function () {
    this.getNewsData(1)
  }
})