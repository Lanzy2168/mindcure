Component({
  properties: {
    current: {
      type: Number,
      value: 0
    }
  },

  data: {
    currentTab: 0,
    tabs: [
 
      {
        icon: '💬',
        text: '树洞',
        path: '/pages/treehole/treehole'
      },
      {
        icon: '👤',
        text: '我的',
        path: '/pages/profile/profile'
      }
    ]
  },

  lifetimes: {
    attached() {
      this.setData({
        currentTab: this.properties.current
      });
    }
  },

  methods: {
    onTabTap(e) {
      const index = e.currentTarget.dataset.index;
      const tab = this.data.tabs[index];
      
      this.setData({
        currentTab: index
      });

      // 跳转到对应页面
      wx.switchTab({
        url: tab.path,
        fail: () => {
          // 如果 switchTab 失败，使用 navigateTo
          wx.navigateTo({
            url: tab.path
          });
        }
      });
    }
  }
}); 