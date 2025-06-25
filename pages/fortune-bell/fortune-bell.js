Page({
  data: {
    fortunePoints: 0,
    todayPoints: 0,
    currentPoints: 0,
    isAnimating: false,
    showRipple: false,
    todayRecords: [],
    currentLevel: {
      name: '初心者',
      points: 0,
      benefits: ['基础功德积累']
    },
    nextLevel: {
      points: 100
    },
    levelProgress: 0,
    totalPoints: 0,
    totalDays: 0,
    maxStreak: 0
  },

  onLoad() {
    this.loadFortuneData()
    this.calculateLevel()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadFortuneData()
  },

  loadFortuneData() {
    // 从本地存储加载功德数据
    const fortuneData = wx.getStorageSync('fortuneData') || {
      totalPoints: 0,
      todayPoints: 0,
      todayRecords: [],
      totalDays: 0,
      maxStreak: 0,
      lastDate: null
    }

    // 检查是否是新的日期
    const today = new Date().toDateString()
    if (fortuneData.lastDate !== today) {
      // 新的一天，重置今日数据
      fortuneData.todayPoints = 0
      fortuneData.todayRecords = []
      fortuneData.lastDate = today
      
      // 更新连续天数
      if (fortuneData.lastDate) {
        const lastDate = new Date(fortuneData.lastDate)
        const currentDate = new Date(today)
        const diffTime = currentDate - lastDate
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === 1) {
          // 连续天数
          fortuneData.totalDays++
        } else if (diffDays > 1) {
          // 中断了，重置连续天数
          fortuneData.totalDays = 1
        }
      } else {
        fortuneData.totalDays = 1
      }
    }

    this.setData({
      fortunePoints: fortuneData.totalPoints,
      todayPoints: fortuneData.todayPoints,
      currentPoints: fortuneData.totalPoints,
      todayRecords: fortuneData.todayRecords,
      totalPoints: fortuneData.totalPoints,
      totalDays: fortuneData.totalDays,
      maxStreak: fortuneData.maxStreak
    })

    // 保存更新后的数据
    wx.setStorageSync('fortuneData', fortuneData)
  },

  calculateLevel() {
    const points = this.data.totalPoints
    const levels = [
      { name: '初心者', points: 0, benefits: ['基础功德积累'] },
      { name: '修行者', points: 100, benefits: ['功德翻倍', '解锁新功能'] },
      { name: '觉悟者', points: 500, benefits: ['功德翻倍', '解锁新功能', '特殊奖励'] },
      { name: '大德者', points: 1000, benefits: ['功德翻倍', '解锁新功能', '特殊奖励', '专属称号'] },
      { name: '圣者', points: 5000, benefits: ['功德翻倍', '解锁新功能', '特殊奖励', '专属称号', '终极福利'] }
    ]

    let currentLevel = levels[0]
    let nextLevel = levels[1]

    for (let i = 0; i < levels.length; i++) {
      if (points >= levels[i].points) {
        currentLevel = levels[i]
        nextLevel = levels[i + 1] || { points: currentLevel.points + 1000 }
      } else {
        nextLevel = levels[i]
        break
      }
    }

    const levelProgress = nextLevel.points > currentLevel.points 
      ? ((points - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100 
      : 100

    this.setData({
      currentLevel,
      nextLevel,
      levelProgress: Math.min(levelProgress, 100)
    })
  },

  tapWoodfish() {
    // 防止快速点击
    if (this.data.isAnimating) return

    const points = Math.floor(Math.random() * 10) + 1 // 1-10点功德
    const now = new Date()
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    // 更新数据
    const newTotalPoints = this.data.totalPoints + points
    const newTodayPoints = this.data.todayPoints + points
    const newTodayRecords = [
      { time: timeString, points: points },
      ...this.data.todayRecords.slice(0, 9) // 只保留最近10条记录
    ]

    // 更新最大连续天数
    const newMaxStreak = Math.max(this.data.maxStreak, this.data.totalDays)

    this.setData({
      fortunePoints: newTotalPoints,
      todayPoints: newTodayPoints,
      currentPoints: newTotalPoints,
      todayRecords: newTodayRecords,
      totalPoints: newTotalPoints,
      maxStreak: newMaxStreak,
      isAnimating: true,
      showRipple: true
    })

    // 保存数据
    const fortuneData = wx.getStorageSync('fortuneData') || {}
    fortuneData.totalPoints = newTotalPoints
    fortuneData.todayPoints = newTodayPoints
    fortuneData.todayRecords = newTodayRecords
    fortuneData.maxStreak = newMaxStreak
    wx.setStorageSync('fortuneData', fortuneData)

    // 重新计算等级
    this.calculateLevel()

    // 播放动画
    setTimeout(() => {
      this.setData({
        isAnimating: false,
        showRipple: false
      })
    }, 300)

    // 显示功德获得提示
    wx.showToast({
      title: `+${points} 功德`,
      icon: 'none',
      duration: 1000
    })

    // 震动反馈
    wx.vibrateShort()
  },

  shareFortune() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  resetFortune() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置所有功德数据吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          // 重置所有功德数据
          const resetData = {
            totalPoints: 0,
            todayPoints: 0,
            todayRecords: [],
            totalDays: 0,
            maxStreak: 0,
            lastDate: null
          }

          wx.setStorageSync('fortuneData', resetData)

          this.setData({
            fortunePoints: 0,
            todayPoints: 0,
            currentPoints: 0,
            todayRecords: [],
            totalPoints: 0,
            totalDays: 0,
            maxStreak: 0
          })

          this.calculateLevel()

          wx.showToast({
            title: '功德已重置',
            icon: 'success'
          })
        }
      }
    })
  }
}) 