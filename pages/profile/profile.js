Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    menuItems: [
      {
        id: 'history',
        icon: '/images/icons/usage-record.png',
        title: '使用记录',
        desc: '回顾你的心路历程'
      },
      {
        id: 'settings',
        icon: '/images/icons/settings.png',
        title: '应用设置',
        desc: '个性化你的使用体验'
      },
      {
        id: 'feedback',
        icon: '/images/icons/feedback.png',
        title: '意见反馈',
        desc: '帮助我们做得更好'
      },
      {
        id: 'about',
        icon: '/images/icons/about-us.png',
        title: '关于我们',
        desc: '了解「心愈」的故事'
      }
    ],
    stats: {
      totalDays: 7,
      totalSessions: 23,
      totalMinutes: 156
    }
  },

  onLoad() {
    // 页面加载时执行
    this.getUserInfo()
  },

  getUserInfo() {
    // 获取用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  },

  login() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        wx.setStorageSync('userInfo', res.userInfo)
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.log('获取用户信息失败', err)
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        })
      }
    })
  },

  loginAccount() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        wx.setStorageSync('userInfo', res.userInfo)
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.log('获取用户信息失败', err)
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        })
      }
    })
  },

  handleMenuClick(e) {
    const item = e.currentTarget.dataset.item
    
    wx.showToast({
      title: `点击了${item.title}`,
      icon: 'none',
      duration: 2000
    })

    // 根据菜单项执行不同操作
    switch (item.id) {
      case 'history':
        // 使用记录
        wx.navigateTo({
          url: '/pages/usage-record/usage-record'
        })
        break
      case 'settings':
        // 设置
        wx.navigateTo({
          url: '/pages/settings/settings'
        })
        break
      case 'feedback':
        // 意见反馈
        wx.navigateTo({
          url: '/pages/feedback/feedback'
        })
        break
      case 'about':
        // 关于我们
        wx.navigateTo({
          url: '/pages/about/about'
        })
        break
      default:
        break
    }
  }
}) 