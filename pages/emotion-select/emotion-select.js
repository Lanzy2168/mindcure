Page({
  data: {
    // 情绪列表（环形分布）
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
    
    selectedEmotion: null,
    mascotImage: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-bubble.png',
    mascotText: '小喵龙在这里等你选择情绪哦~',
    bg: '/images/discover-bg.jpg',

    emotionResources: {
      '喜': {
        image: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png',
        bg: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/fire-bg.jpg',
        emoji: '😊',
        text: '小喵龙感受到你的喜悦，一起分享快乐吧！'
      },
      '怒': {
        image: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-anger.png',
        bg: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/wood-bg.jpg',
        emoji: '😠',
        text: '小喵龙理解你的愤怒，让我们来调节一下~'
      },
      '思': {
        image: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-thought.png',
        bg: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/earth-bg.jpg',
        emoji: '🤔',
        text: '小喵龙看到你在思考，需要帮助吗？'
      },
      '忧': {
        image: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-sad.png',
        bg: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/metal-bg.jpg',
        emoji: '😔',
        text: '小喵龙感受到你的忧愁，让我来陪伴你~'
      },
      '恐': {
        image: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-fear.png',
        bg: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/water-bg.jpg',
        emoji: '😰',
        text: '小喵龙知道你在害怕，我们一起面对吧！'
      }
    },
  
    mascotImage: '',
    backgroundImage: ''
  },

  onLoad() {
    // 页面加载时的初始化
    this.setData({
      mascotImage: '',
      backgroundImage: ''
    })
    this.initPage()
  },

  // 初始化页面
  initPage() {
    // 添加入场动画
    this.addEntranceAnimations()
  },

  // 选择情绪
  selectEmotion(e) {
    const emotion = e.currentTarget.dataset.emotion
    
    // 添加点击动画
    this.addEmotionAnimation(emotion.id)
    
    const resources = this.data.emotionResources[emotion.character] || {}

    this.setData({
      selectedEmotion: emotion,
      mascotImage: resources.image || '',
      backgroundImage: resources.bg || '',
      mascotEmoji: resources.emoji || '🐉',
      mascotText: resources.text || '小喵龙在这里等你选择情绪哦~'
    })
    
    // 更新小喵龙状态
    this.updateMascot(emotion)
  },

  // 确认选择
  onConfirmEmotion() {
    if (!this.data.selectedEmotion) {
      wx.showToast({
        title: '请先选择一种情绪',
        icon: 'none'
      });
      return;
    }
    wx.setStorageSync('selectedEmotion', this.data.selectedEmotion);
    wx.showToast({
      title: '选择成功！',
      icon: 'success',
      duration: 1000
    });
    setTimeout(() => {
      wx.reLaunch({ url: '/pages/index/index' });
    }, 1000);
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
    }, 600)
  },

  // 更新小喵龙状态
  updateMascot(emotion) {
    const emotionEmojis = {
      1: '😊', // 喜
      2: '😠', // 怒
      3: '🤔', // 思
      4: '😔', // 忧
      5: '😰'  // 恐
    }
    
    const emotionTexts = {
      1: '小喵龙感受到你的喜悦，一起分享快乐吧！',
      2: '小喵龙理解你的愤怒，让我们来调节一下~',
      3: '小喵龙看到你在思考，需要帮助吗？',
      4: '小喵龙感受到你的忧愁，让我来陪伴你~',
      5: '小喵龙知道你在害怕，我们一起面对吧！'
    }
    
    this.setData({
      mascotEmoji: emotionEmojis[emotion.id] || '🐉',
      mascotText: emotionTexts[emotion.id] || '小喵龙在这里等你选择情绪哦~'
      
    })
  },

  // 添加入场动画
  addEntranceAnimations() {
    // 依次显示情绪按钮
    this.data.emotions.forEach((emotion, index) => {
      setTimeout(() => {
        const emotions = this.data.emotions.map((item, i) => ({
          ...item,
          animation: i === index
        }))
        this.setData({ emotions })
        
        // 重置动画状态
        setTimeout(() => {
          const resetEmotions = this.data.emotions.map(item => ({
            ...item,
            animation: false
          }))
          this.setData({ emotions: resetEmotions })
        }, 500)
      }, index * 200)
    })
  }
}) 