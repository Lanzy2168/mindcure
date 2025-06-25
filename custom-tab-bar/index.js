Component({
  data: {
    selected: 0,
    list: [
      {
 
   
        pagePath: '/pages/index/index'
      },
      {
    
        text: '树洞',
        pagePath: '/pages/treehole/treehole'
      },
      {
   
        text: '我的',
        pagePath: '/pages/profile/profile'
      }
    ]
  },

  methods: {
    onTabTap(e) {
      const index = e.currentTarget.dataset.index;
      const tab = this.data.list[index];
      
      this.setData({
        selected: index
      });

      wx.switchTab({
        url: tab.pagePath
      });
    }
  }
}); 