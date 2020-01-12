var app = getApp();
function request(url, postData, method,doSuccess, doFail, doComplete) {
  var api_url = app.globalData.api_url;
  wx.request({
    url: api_url + url,
    data: postData,
    method: method,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (typeof doSuccess == "function") {
        doSuccess(res);
      }
    },
    fail: function () {
      if (typeof doFail == "function") {
        doFail();
      }
    },
    complete: function () {
      if (typeof doComplete == "function") {
        doComplete();
      }
    }
  });
};
module.exports.request = request;