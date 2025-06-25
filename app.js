App({
  globalData: {
    userInfo: null,
    selectedEmotion: null,
    selectedElement: null,
    // 新增：当前五行属性和背景图
    currentElementName: '火', // 默认火元素
    currentBackgroundImage: '/images/fire-bg.jpg'
  },
  
  // 统一的五行背景图映射
  ELEMENT_BG_MAP: {
    '木': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/wood-bg.jpg',
    '火': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/fire-bg.jpg', 
    '土': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/earth-bg.jpg',
    '金': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/metal-bg.jpg',
    '水': 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/water-bg.jpg'
  },
  
  // 情绪到五行的映射
  EMOTION_TO_ELEMENT_MAP: {
    '喜': '火',
    '怒': '木', 
    '思': '土',
    '忧': '金',
    '恐': '水'
  },
  
  // 更新全局五行状态
  updateGlobalElement(emotionCharacter) {
    const elementName = this.EMOTION_TO_ELEMENT_MAP[emotionCharacter] || '火';
    const backgroundImage = this.ELEMENT_BG_MAP[elementName] || '/images/fire-bg.jpg';
    
    this.globalData.currentElementName = elementName;
    this.globalData.currentBackgroundImage = backgroundImage;
    this.globalData.selectedElement = elementName;
    
    // 同时保存到本地存储，确保页面刷新后状态不丢失
    wx.setStorageSync('currentElementName', elementName);
    wx.setStorageSync('currentBackgroundImage', backgroundImage);
    
    console.log('全局元素状态更新:', { elementName, backgroundImage });
  },
  
  // 获取当前背景图
  getCurrentBackgroundImage() {
    // 优先从本地存储读取，保证一致性
    const storedBg = wx.getStorageSync('currentBackgroundImage');
    if (storedBg) {
      this.globalData.currentBackgroundImage = storedBg;
      return storedBg;
    }
    return this.globalData.currentBackgroundImage;
  },
  
  // 获取当前五行元素名称
  getCurrentElementName() {
    const storedElement = wx.getStorageSync('currentElementName');
    if (storedElement) {
      this.globalData.currentElementName = storedElement;
      return storedElement;
    }
    return this.globalData.currentElementName;
  },
  
  onLaunch() {
    // 小程序启动时执行
    console.log('小程序启动')
    
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res
      }
    })
    
    // 初始化全局状态
    this.initGlobalState();
  },
  
  // 初始化全局状态
  initGlobalState() {
    // 从本地存储恢复状态
    const storedElement = wx.getStorageSync('currentElementName');
    const storedBg = wx.getStorageSync('currentBackgroundImage');
    
    if (storedElement && storedBg) {
      this.globalData.currentElementName = storedElement;
      this.globalData.currentBackgroundImage = storedBg;
      this.globalData.selectedElement = storedElement;
    }
  },
  
  onShow() {
    // 小程序显示时执行
    console.log('小程序显示')
  },
  
  onHide() {
    // 小程序隐藏时执行
    console.log('小程序隐藏')
  },
  
  onError(msg) {
    // 小程序发生错误时执行
    console.error('小程序错误:', msg)
  }
}) 