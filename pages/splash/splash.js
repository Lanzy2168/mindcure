Page({
  data: {
    showContent: false,
    loadingProgress: 0,
    loadingText: '正在加载...',
    mascotAnimation: false,
    progress: 0,
    progressTip: '正在加载中...'
  },

  onLoad() {
    this.startSplashAnimation()
    let p = 0;
    const tips = ['正在加载中...', '正在唤醒小喵龙...', '准备进入心灵疗愈世界...'];
    let tipIdx = 0;
    this.setData({ progressTip: tips[tipIdx] });
    this.timer = setInterval(() => {
      if (p < 100) {
        p += Math.random() * 8 + 2;
        if (p > 100) p = 100;
        if (p > 40 && tipIdx === 0) { tipIdx = 1; this.setData({ progressTip: tips[tipIdx] }); }
        if (p > 80 && tipIdx === 1) { tipIdx = 2; this.setData({ progressTip: tips[tipIdx] }); }
        this.setData({ progress: p });
      } else {
        clearInterval(this.timer);
        // 加载完成后跳转到情绪选择页面
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/emotion-select/emotion-select'
          })
        }, 1000)
      }
    }, 300);
  },

  onUnload() {
    clearInterval(this.timer);
  },

  startSplashAnimation() {
    // 延迟显示内容
    setTimeout(() => {
      this.setData({
        showContent: true
      })
    }, 500)

    // 小喵龙动画
    setTimeout(() => {
      this.setData({
        mascotAnimation: true
      })
    }, 1500)

    // 模拟加载进度
    this.simulateLoading()
  },

  simulateLoading() {
    const loadingSteps = [
      { progress: 20, text: '初始化中...' },
      { progress: 40, text: '加载资源...' },
      { progress: 60, text: '准备界面...' },
      { progress: 80, text: '即将完成...' },
      { progress: 100, text: '欢迎使用 MindCure' }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        this.setData({
          loadingProgress: step.progress,
          loadingText: step.text
        })
        currentStep++
      } else {
        clearInterval(interval)
        // 加载完成后跳转到情绪选择页面
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/emotion-select/emotion-select'
          })
        }, 1000)
      }
    }, 400)
  }
}) 