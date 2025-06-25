Page({
  data: {
    discoverItems: [
      {
        id: 1,
        title: "冥想练习",
        description: "通过冥想找到内心的平静",
        image: "/images/meditation.jpg"
      },
      {
        id: 2,
        title: "呼吸练习",
        description: "学习正确的呼吸方法",
        image: "/images/breathing.jpg"
      },
      {
        id: 3,
        title: "音乐疗法",
        description: "用音乐治愈心灵",
        image: "/images/music.jpg"
      },
      {
        id: 4,
        title: "自然疗法",
        description: "感受大自然的力量",
        image: "/images/nature.jpg"
      }
    ]
  },

  onLoad() {
    // 页面加载时执行
  },

  handleItemClick(e) {
    const item = e.currentTarget.dataset.item
    
    wx.showToast({
      title: `点击了${item.title}`,
      icon: 'none',
      duration: 2000
    })
  }
}) 