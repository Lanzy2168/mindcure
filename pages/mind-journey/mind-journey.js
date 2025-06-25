const { fiveElements } = require('../../utils/data.js')

Page({
  data: {
    currentElement: fiveElements[0],
    fiveElements: fiveElements,
    recommendedActivities: [],
    activityHistory: []
  },

  // 五行-最近活动映射表
  activityHistoryMap: {
    '木': [
      { icon: '🌳', title: '户外植树', date: '今天 09:00', rating: 9 },
      { icon: '🧘', title: '练习八段锦', date: '昨天 18:00', rating: 8 },
      { icon: '🌱', title: '园艺修剪', date: '前天 15:00', rating: 8 }
    ],
    '火': [
      { icon: '🧘‍♀️', title: '瑜伽冥想', date: '今天 10:00', rating: 9 },
      { icon: '✍️', title: '书法临摹', date: '昨天 20:00', rating: 8 },
      { icon: '🚶‍♂️', title: '傍晚散步', date: '前天 17:30', rating: 8 }
    ],
    '土': [
      { icon: '🏺', title: '陶艺制作', date: '今天 14:00', rating: 9 },
      { icon: '🍰', title: '制作手工糕点', date: '昨天 16:00', rating: 8 },
      { icon: '🤝', title: '参加社区活动', date: '前天 19:00', rating: 8 }
    ],
    '金': [
      { icon: '🎼', title: '聆听古典音乐', date: '今天 13:00', rating: 9 },
      { icon: '🔨', title: '金属工艺品制作', date: '昨天 15:00', rating: 8 },
      { icon: '🏖️', title: '沙滩漫步', date: '前天 18:00', rating: 8 }
    ],
    '水': [
      { icon: '♨️', title: '温泉浴', date: '今天 11:00', rating: 9 },
      { icon: '📚', title: '阅读书籍', date: '昨天 21:00', rating: 8 },
      { icon: '🎨', title: '绘画创作', date: '前天 16:00', rating: 8 }
    ]
  },

  onLoad() {
    this.loadUserElement()
    this.loadRecommendedActivities()
    this.loadActivityHistory()
  },
  
  onShow() {
    // 页面显示时同步背景图和五行属性
    this.loadUserElement();
  },

  loadUserElement() {
    // 统一从全局状态获取五行属性
    const app = getApp();
    const elementName = app.getCurrentElementName();
    const backgroundImage = app.getCurrentBackgroundImage();
    
    // 根据五行名称找到对应的元素数据
    const element = fiveElements.find(e => e.name === elementName) || fiveElements[0];
    
    this.setData({ 
      currentElement: element,
      backgroundImage: backgroundImage
    });
    
    console.log('心游境页面背景设置为:', backgroundImage);
  },

  loadRecommendedActivities() {
    // 根据当前五行元素加载推荐活动
    const activities = this.data.currentElement.activities || []
    const recommendedActivities = activities.map((activity, index) => ({
      title: activity,
      description: this.getActivityDescription(activity),
      duration: this.getActivityDuration(activity),
      icon: this.getActivityIcon(activity)
    }))

    this.setData({ recommendedActivities })
  },

  getActivityDescription(activity) {
    const descriptions = {
      '户外散步': '在自然环境中漫步，感受大地的能量',
      '植物护理': '照料植物，培养耐心和责任感',
      '伸展运动': '温和的伸展动作，舒展筋骨',
      '绘画创作': '通过绘画表达内心情感',
      '温和瑜伽': '舒缓的瑜伽体式，平衡身心',
      '阅读': '沉浸在文字的世界中',
      '听音乐': '让音乐抚慰心灵',
      '泡温泉': '在温暖的水中放松身心',
      '按摩': '通过按摩缓解身体紧张',
      '园艺': '在花园中劳作，连接大地',
      '烹饪': '制作美食，享受过程',
      '整理空间': '整理环境，整理心情',
      '写作': '用文字记录内心感受',
      '唱歌': '通过歌声释放情感',
      '舞蹈': '让身体随音乐舞动',
      '艺术创作': '通过艺术表达自我',
      '游泳': '在水中自由畅游',
      '冥想': '静心冥想，寻找内在平静',
      '听雨声': '聆听雨声的自然音乐',
      '泡澡': '在温暖的水中放松'
    }
    return descriptions[activity] || '适合当前情绪的活动'
  },

  getActivityDuration(activity) {
    const durations = {
      '户外散步': '30-60分钟',
      '植物护理': '15-30分钟',
      '伸展运动': '20-30分钟',
      '绘画创作': '60-120分钟',
      '温和瑜伽': '45-60分钟',
      '阅读': '30-60分钟',
      '听音乐': '20-40分钟',
      '泡温泉': '60-90分钟',
      '按摩': '30-60分钟',
      '园艺': '30-60分钟',
      '烹饪': '45-90分钟',
      '整理空间': '30-60分钟',
      '写作': '30-60分钟',
      '唱歌': '20-40分钟',
      '舞蹈': '30-60分钟',
      '艺术创作': '60-120分钟',
      '游泳': '30-60分钟',
      '冥想': '15-30分钟',
      '听雨声': '20-40分钟',
      '泡澡': '30-60分钟'
    }
    return durations[activity] || '30分钟'
  },

  getActivityIcon(activity) {
    const icons = {
      '户外散步': '🚶‍♀️',
      '植物护理': '🌱',
      '伸展运动': '🧘‍♀️',
      '绘画创作': '🎨',
      '温和瑜伽': '🧘‍♂️',
      '阅读': '📚',
      '听音乐': '🎵',
      '泡温泉': '♨️',
      '按摩': '💆‍♀️',
      '园艺': '🌿',
      '烹饪': '👨‍🍳',
      '整理空间': '🧹',
      '写作': '✍️',
      '唱歌': '🎤',
      '舞蹈': '💃',
      '艺术创作': '🎭',
      '游泳': '🏊‍♀️',
      '冥想': '🧘‍♀️',
      '听雨声': '🌧️',
      '泡澡': '🛁'
    }
    return icons[activity] || '🌟'
  },

  loadActivityHistory() {
    // 根据当前五行属性动态设置最近活动
    const elementName = this.data.currentElement.name;
    const history = this.activityHistoryMap[elementName] || [];
    this.setData({ activityHistory: history });
  },

  switchElement(e) {
    const element = e.currentTarget.dataset.element
    this.setData({ currentElement: element })
    this.loadRecommendedActivities()
    this.loadActivityHistory() // 切换五行时同步最近活动

    wx.showToast({
      title: `切换到${element.name}元素`,
      icon: 'none'
    })
  },

  selectActivity(e) {
    const activity = e.currentTarget.dataset.activity
    
    wx.showModal({
      title: '开始活动',
      content: `确定要开始"${activity.title}"吗？`,
      success: (res) => {
        if (res.confirm) {
          // 记录活动开始
          this.recordActivity(activity)
          
          wx.showToast({
            title: '活动已开始',
            icon: 'success'
          })
        }
      }
    })
  },

  recordActivity(activity) {
    // 记录活动到历史
    const now = new Date()
    const timeString = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
    
    const newHistory = [
      {
        icon: activity.icon,
        title: activity.title,
        date: timeString,
        rating: Math.floor(Math.random() * 3) + 7 // 7-9分
      },
      ...this.data.activityHistory.slice(0, 4) // 保留最近5条
    ]
    
    this.setData({ activityHistory: newHistory })
  },

  addToFavorites() {
    wx.showToast({
      title: '已添加到收藏',
      icon: 'success'
    })
  },

  shareActivity() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }
}) 