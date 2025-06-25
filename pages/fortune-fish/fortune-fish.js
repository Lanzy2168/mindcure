// pages/fortune-fish/fortune-fish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merit: 0,
    fishAnimation: false,
    tapping: false,
    tapCount: 0,
    timer: null,
    timeLeft: 60,
    roundResult: '',
    history: [],
    element: '',
    bgImage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化功德值
    const merit = wx.getStorageSync('merit') || 0;
    const history = wx.getStorageSync('meritHistory') || [];
    
    // 统一从全局状态获取背景图和五行属性
    const app = getApp();
    const element = app.getCurrentElementName();
    const bgImage = app.getCurrentBackgroundImage();
    
    this.setData({ merit, history, element, bgImage });
    console.log('积福鱼页面背景设置为:', bgImage);
  },
  
  onShow() {
    // 页面显示时同步背景图
    const app = getApp();
    const bgImage = app.getCurrentBackgroundImage();
    const element = app.getCurrentElementName();
    
    this.setData({ 
      bgImage: bgImage,
      element: element 
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    if (this.data.timer) clearInterval(this.data.timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.timer) clearInterval(this.data.timer);
    // 页面卸载时重置当前功德值
    this.setData({ merit: 0 });
    wx.setStorageSync('merit', 0);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  tapMeritFish() {
    // 播放音效
    wx.playBackgroundAudio({
      dataUrl: '/audios/敲打木鱼.mp3',
      title: '敲打木鱼',
      coverImgUrl: ''
    });
    // 计时与敲击逻辑
    if (!this.data.tapping) {
      this.setData({ tapping: true, tapCount: 1, timeLeft: 60 });
      this.startTimer();
    } else {
      this.setData({ tapCount: this.data.tapCount + 1 });
    }
    const newMerit = this.data.merit + 1;
    this.setData({
      merit: newMerit,
      fishAnimation: true
    });
    wx.setStorageSync('merit', newMerit);
    setTimeout(() => {
      this.setData({ fishAnimation: false });
    }, 300);
  },

  startTimer() {
    this.setData({ timeLeft: 60 });
    this.data.timer = setInterval(() => {
      let t = this.data.timeLeft - 1;
      this.setData({ timeLeft: t });
      if (t <= 0) {
        clearInterval(this.data.timer);
        this.finishRound();
      }
    }, 1000);
  },

  finishRound() {
    const count = this.data.tapCount;
    let result = '';
    if (count >= 40 && count <= 50) {
      result = '积福啦！！';
    } else {
      result = '再努力噢！！';
    }
    this.setData({ tapping: false, roundResult: result });
    // 保存历史
    const history = this.data.history || [];
    const now = new Date();
    history.unshift({
      time: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      count,
      result
    });
    wx.setStorageSync('meritHistory', history);
    this.setData({ history });
    wx.showModal({
      title: '本轮结果',
      content: `敲击次数：${count}\n评价：${result}`,
      showCancel: false
    });
  },

  viewHistory() {
    let msg = '';
    if (!this.data.history || this.data.history.length === 0) {
      msg = '暂无历史记录';
    } else {
      msg = this.data.history.slice(0, 10).map(item => `${item.time}  ${item.count}次  ${item.result}`).join('\n');
    }
    wx.showModal({
      title: '历史记录',
      content: msg,
      showCancel: false
    });
  }
})