const app = getApp()

Page({
  data: {
    // 当前选中的情绪
    currentEmotion: {
      id: 1,
      character: '喜',
      name: '喜',
      description: '喜悦、快乐、兴奋',
      element: '火'
    },
    
    // 当前显示的五行属性
    currentElement: {
      character: '火',
      name: '喜',
      description: '热情、活力、温暖',
      animation: false
    },
    
    // 情绪列表（半圆分布）
    emotions: [
      {
        id: 1,
        character: '喜',
        name: '火',
        description: '喜悦、快乐、兴奋',
        element: '火',
        angle: -90, // 上中
        animation: false
      },
      {
        id: 2,
        character: '怒',
        name: '木',
        description: '愤怒、生气、激动',
        element: '木',
        angle: -45, // 上右
        animation: false
      },
      {
        id: 3,
        character: '思',
        name: '土',
        description: '思考、忧虑、沉思',
        element: '土',
        angle: 0, // 右中
        animation: false
      },
      {
        id: 4,
        character: '忧',
        name: '金',
        description: '忧愁、悲伤、忧郁',
        element: '金',
        angle: 45, // 下右
        animation: false
      },
      {
        id: 5,
        character: '恐',
        name: '水',
        description: '恐惧、害怕、焦虑',
        element: '水',
        angle: 90, // 下中
        animation: false
      }
    ],
    
    // 五行属性映射
    elements: {
      '木': {
        character: '木',
        name: '怒',
        angle: 0,
        description: '生长、向上、伸展',
        color: '#98FB98'
      },
      '火': {
        character: '火',
        name: '喜',
        description: '热情、活力、温暖',
        color: '#FFB6C1'
      },
      '土': {
        character: '土',
        name: '思',
        description: '稳定、包容、滋养',
        color: '#FFE4B5'
      },
      '金': {
        character: '金',
        name: '忧',
        description: '收敛、肃杀、坚韧',
        color: '#E6E6FA'
      },
      '水': {
        character: '水',
        name: '恐',
        description: '流动、智慧、适应',
        color: '#B0E0E6'
      }
    },
    
    // 小喵龙表情
    mascotEmoji: '🐉',
    // 新增：小喵龙图片
    mascotImage: '',
    
    // 功能按钮
    functionButtons: [
      {
        id: 1,
        name: '心韵',
        description: '音疗调节，能量共振',
        icon: '🎵',
        color: 'linear-gradient(135deg, #FFB6C1, #E6E6FA)',
        path: '/pages/heart-rhythm/heart-rhythm',
        animation: false
      },
      {
        id: 2,
        name: '积福鱼',
        description: '正念冥想',
        icon: '🐠',
        color: 'linear-gradient(135deg, #98FB98, #FFE4B5)',
        path: '/pages/fortune-fish/fortune-fish',
        animation: false
      },
      {
        id: 3,
        name: '心灵之旅',
        description: '情绪探索',
        icon: '🧭',
        color: 'linear-gradient(135deg, #B0E0E6, #E6E6FA)',
        path: '/pages/mind-journey/mind-journey',
        animation: false
      },
      {
        id: 4,
        name: '树洞',
        description: '倾诉空间',
        icon: '🌳',
        color: 'linear-gradient(135deg, #FFE4B5, #98FB98)',
        path: '/pages/treehole/treehole',
        animation: false
      }
    ],
    
    // 今日建议
    dailySuggestions: [
      '保持积极心态，享受当下的美好时光',
      '适当运动，释放身体和心灵的压力',
      '与朋友分享快乐，让喜悦传递'
    ],
    // 新增：背景图
    backgroundImage: '',
    // 五大疗愈模块
    healingModules: [],
    // 当前底部导航tab
    currentTab: 0
  },

  onLoad() {
    // 页面加载时的初始化
    // 新增：读取本地存储的情绪
    const selectedEmotion = wx.getStorageSync('selectedEmotion')
    if (selectedEmotion && selectedEmotion.id) {
      this.setCurrentEmotion(selectedEmotion)
    } else {
      this.initPage()
    }
  },

  onShow() {
    // 页面显示时的处理
    this.updateMascotEmoji()
  },

  // 初始化页面
  initPage() {
    // 设置默认情绪和五行属性
    this.setCurrentEmotion(this.data.emotions[0])
    
    // 添加动画效果
    this.addAnimations()
  },

  // 选择情绪
  selectEmotion(e) {
    const emotion = e.currentTarget.dataset.emotion
    
    // 添加点击动画
    this.addEmotionAnimation(emotion.id)
    
    // 更新当前情绪
    this.setCurrentEmotion(emotion)
    
    // 更新小喵龙表情
    this.updateMascotEmoji()
  },

  // 设置当前情绪
  setCurrentEmotion(emotion) {
    const element = this.data.elements[emotion.element]
    
    // 更新全局五行状态
    app.updateGlobalElement(emotion.character);
    // 从全局状态获取背景图
    const backgroundImage = app.getCurrentBackgroundImage();
    
    // 新增：情绪-小喵龙图片映射
    const mascotImageMap = {
      '喜': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png',
      '怒': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-anger.png',
      '思': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-thought.png',
      '忧': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-sad.png',
      '恐': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-fear.png'
    }
    // 新增：五行专属四大疗愈模块（去除味觉疗）
    const modulesMap = {
      '火': [
        { id: 1, name: '心韵', description: '音疗调节，能量共振', path: '/pages/heart-rhythm/heart-rhythm' },
        { id: 2, name: '积福鱼', description: '敲击木鱼，积德养心', path: '/pages/fortune-fish/fortune-fish' },
        { id: 3, name: '呼吸调', description: '调整呼吸，静心凝神', path: '/pages/breathing-adjust/breathing-adjust' },
        { id: 4, name: '心游境', description: '解压灵感，疗愈心境', path: '/pages/mind-journey/mind-journey' },
      ],
      '木': [
        { id: 1, name: '心韵', description: '音疗调节，能量共振', path: '/pages/heart-rhythm/heart-rhythm' },
        { id: 2, name: '积福鱼', description: '敲击木鱼，积德养心', path: '/pages/fortune-fish/fortune-fish' },
        { id: 3, name: '呼吸调', description: '木行呼吸，静心凝神', path: '/pages/breathing-adjust/breathing-adjust' },
        { id: 4, name: '心游境', description: '木行解压，疗愈心境', path: '/pages/mind-journey/mind-journey' },
      ],
      '土': [
        { id: 1, name: '心韵', description: '音疗调节，能量共振', path: '/pages/heart-rhythm/heart-rhythm' },
        { id: 2, name: '积福鱼', description: '敲击木鱼，积德养心', path: '/pages/fortune-fish/fortune-fish' },
        { id: 3, name: '呼吸调', description: '土行呼吸训练法', path: '/pages/breathing-adjust/breathing-adjust' },
        { id: 4, name: '心游境', description: '解压灵感，疗愈心境', path: '/pages/mind-journey/mind-journey' },
      ],
      '金': [
        { id: 1, name: '心韵', description: '音疗调节，能量共振', path: '/pages/heart-rhythm/heart-rhythm' },
        { id: 2, name: '积福鱼', description: '敲击木鱼，积德养心', path: '/pages/fortune-fish/fortune-fish' },
        { id: 3, name: '呼吸调', description: '调整呼吸，静心凝神', path: '/pages/breathing-adjust/breathing-adjust' },
        { id: 4, name: '心游境', description: '金行解压，疗愈心境', path: '/pages/mind-journey/mind-journey' },
      ],
      '水': [
        { id: 1, name: '心韵', description: '音疗调节，能量共振', path: '/pages/heart-rhythm/heart-rhythm' },
        { id: 2, name: '积福鱼', description: '敲击木鱼，积德养心', path: '/pages/fortune-fish/fortune-fish' },
        { id: 3, name: '呼吸调', description: '调整呼吸，静心凝神', path: '/pages/breathing-adjust/breathing-adjust' },
        { id: 4, name: '心游境', description: '水行情绪活动推荐', path: '/pages/mind-journey/mind-journey' },
      ]
    }
    // 新增：同步写入本地存储，供心韵等页面读取
    wx.setStorageSync('selectedEmotion', emotion);
    this.setData({
      currentEmotion: emotion,
      currentElement: {
        ...element,
        animation: true
      },
      backgroundImage: backgroundImage,
      mascotImage: mascotImageMap[emotion.character] || '',
      healingModules: modulesMap[emotion.element] || []
    })
    // 重置动画状态
    setTimeout(() => {
      this.setData({
        'currentElement.animation': false
      })
    }, 500)
  },

  // 添加情绪动画
  addEmotionAnimation(emotionId) {
    const emotions = this.data.emotions.map(item => ({
      ...item,
      animation: item.id === emotionId
    }))
    
    this.setData({ emotions })
    
    // 重置动画状态
    setTimeout(() => {
      const resetEmotions = this.data.emotions.map(item => ({
        ...item,
        animation: false
      }))
      this.setData({ emotions: resetEmotions })
    }, 1000)
  },

  // 更新小喵龙表情
  updateMascotEmoji() {
    const emotionEmojis = {
      1: '😊', // 喜
      2: '😠', // 怒
      3: '🤔', // 思
      4: '😔', // 忧
      5: '😰'  // 恐
    }
    
    const emoji = emotionEmojis[this.data.currentEmotion.id] || '🐉'
    this.setData({ mascotEmoji: emoji })
  },

  // 添加页面动画
  addAnimations() {
    // 为功能按钮添加动画
    const functionButtons = this.data.functionButtons.map((item, index) => ({
      ...item,
      animation: true
    }))
    
    this.setData({ functionButtons })
    
    // 重置动画状态
    setTimeout(() => {
      const resetButtons = this.data.functionButtons.map(item => ({
        ...item,
        animation: false
      }))
      this.setData({ functionButtons: resetButtons })
    }, 1000)
  },

  // 导航到功能模块
  navigateToModule(e) {
    const module = e.currentTarget.dataset.module
    
    wx.navigateTo({
      url: module.path,
      success: () => {
        console.log('导航到模块:', module.name)
      },
      fail: (error) => {
        console.error('导航失败:', error)
        wx.showToast({
          title: '页面开发中',
          icon: 'none'
        })
      }
    })
  },

  // 导航到树洞
  navigateToTreehole() {
    wx.switchTab({
      url: '/pages/treehole/treehole'
    })
  },

  // 导航到个人中心
  navigateToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: 'MindCure - 你的心灵疗愈伙伴',
      path: '/pages/index/index',
      imageUrl: '/public/placeholder-logo.png'
    }
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    if (index === 0) {
      wx.switchTab({ url: '/pages/index/index' });
    } else if (index === 1) {
      wx.switchTab({ url: '/pages/treehole/treehole' });
    } else if (index === 2) {
      wx.switchTab({ url: '/pages/profile/profile' });
    }
  },
}) 