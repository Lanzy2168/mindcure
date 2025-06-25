// pages/breathing-adjust/breathing-adjust.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentElement: null,
    isBreathing: false,
    breathStep: 0,
    breathSteps: [
      { label: '吸气', duration: 4 },
      { label: '屏息', duration: 2 },
      { label: '呼气', duration: 4 },
      { label: '停息', duration: 2 }
    ],
    timer: null,
    breathDesc: '',
    elementDesc: '',
    elementColor: '#98FB98',
    elementName: '',
    elementCharacter: '',
    backgroundImage: '',
    wavePhase: 0,
    wavePath: '',
    waveTimer: null,
    breathStepRemain: 0,
    ballImage: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserElement()
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
    this.updateWavePath()
    // 页面显示时同步背景图
    this.loadUserElement();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.timer) clearTimeout(this.data.timer)
    if (this.data.waveTimer) clearInterval(this.data.waveTimer)
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

  loadUserElement() {
    // 统一从全局状态获取五行属性
    const app = getApp();
    const elementName = app.getCurrentElementName();
    const backgroundImage = app.getCurrentBackgroundImage();
    
    // 五行描述
    const descMap = {
      '木': '木行呼吸法：舒展身心，感受生机。建议吸气时想象绿色能量流入全身。',
      '火': '火行呼吸法：激发活力，温暖心灵。建议呼气时想象红色光芒扩散。',
      '土': '土行呼吸法：稳定情绪，增强安全感。呼吸时关注腹部起伏。',
      '金': '金行呼吸法：清新净化，释放压力。呼吸时想象白色气流净化全身。',
      '水': '水行呼吸法：流动柔和，安抚情绪。呼吸时想象蓝色水流环绕。'
    }
    const colorMap = {
      '木': '#98FB98', '火': '#FFB6C1', '土': '#FFE4B5', '金': '#E6E6FA', '水': '#B0E0E6'
    }
    const mascotMap = {
      '木': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-anger.png',
      '火': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png',
      '土': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-thought.png',
      '金': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-sad.png',
      '水': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-fear.png'
    }
    
    this.setData({
      breathDesc: descMap[elementName] || '',
      elementDesc: descMap[elementName] || '',
      elementColor: colorMap[elementName] || '#98FB98',
      elementName: elementName,
      elementCharacter: elementName,
      backgroundImage: backgroundImage,
      ballImage: mascotMap[elementName] || 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png'
    });
    
    console.log('呼吸调页面背景设置为:', backgroundImage);
  },

  startBreath() {
    if (this.data.isBreathing) return
    this.setData({ isBreathing: true, breathStep: 0 })
    this.runBreathStep(0)
    this.startWaveAnim()
  },

  pauseBreath() {
    this.setData({ isBreathing: false })
    if (this.data.timer) clearTimeout(this.data.timer)
    if (this.data.waveTimer) clearInterval(this.data.waveTimer)
    this.setData({ breathStepRemain: 0 })
  },

  runBreathStep(step) {
    if (!this.data.isBreathing) return
    const steps = this.data.breathSteps
    const current = steps[step]
    this.setData({ breathStep: step, breathStepRemain: current.duration })
    // 倒计时
    const countdown = () => {
      if (!this.data.isBreathing) return
      if (this.data.breathStepRemain > 0) {
        this.setData({ breathStepRemain: this.data.breathStepRemain - 1 })
        this.data.timer = setTimeout(countdown, 1000)
      } else {
        const nextStep = (step + 1) % steps.length
        this.runBreathStep(nextStep)
      }
    }
    countdown()
  },

  startWaveAnim() {
    if (this.data.waveTimer) clearInterval(this.data.waveTimer)
    this.setData({ wavePhase: 0 })
    this.data.waveTimer = setInterval(() => {
      let phase = this.data.wavePhase + 0.15
      if (phase > Math.PI * 2) phase = 0
      this.setData({ wavePhase: phase })
      this.updateWavePath()
    }, 40)
  },

  updateWavePath() {
    // 生成简单正弦波路径
    const A = 20 // 振幅
    const H = 100 // 波高中心
    const W = 200 // 宽度
    const phase = this.data.wavePhase
    let path = `M0,${H}`
    for (let x = 0; x <= W; x += 5) {
      const y = H + A * Math.sin((x / W) * 2 * Math.PI + phase)
      path += ` L${x},${y}`
    }
    path += ` L200,200 L0,200 Z`
    this.setData({ wavePath: path })
  },

  toggleBreath() {
    if (this.data.isBreathing) {
      this.pauseBreath()
    } else {
      this.startBreath()
    }
  }
})