// 五行属性
const fiveElements = [
  {
    id: 1,
    name: '金',
    elementId: 1,
    music: [
      { 
        title: '金石之声', 
        artist: '秋日私语',
        url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/389440_%E5%B9%B4%E4%BB%A3%E7%9A%84%E5%9B%9E%E5%A3%B0.mp3',
        cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/metal-cover1.jpg'
      },
      { 
        title: '丰收庆典', 
        artist: '金色麦浪',
        url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/3619_Ecological%20trust.mp3',
        cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/metal-cover2.jpg'
      },
      { 
        title: '暮色钟声', 
        artist: '寂静山谷',
        url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/3599_More%20than%20words%20can%20say.mp3',
        cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/metal-cover3.jpg'
      }
    ]
  },
  {
    id: 2,
    name: '木',
    elementId: 2,
    music: [
      { 
        title: '森林耳语', 
        artist: '晨露之声',
        url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/wood.mp3',
        cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/wood-cover1.jpg'
      },
    ]
  },
  {
    id: 3,
    name: '水',
    elementId: 3,
    music: [
      { title: '水之心音', artist: '未知', url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/water.mp3',
     cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/water-cover1.jpg' }
    ]
  },
  {
    id: 4,
    name: '火',
    elementId: 4,
    music: [
      { title: '火之律动', artist: '未知', url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/fire.mp3', 
      cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/fire-cover1.jpg' }
    ]
  },
  {
    id: 5,
    name: '土',
    elementId: 5,
    music: [
      { title: '土之安宁', artist: '未知', url: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/earth.mp3',
         cover: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/earth-cover1.jpg' }
    ]
  }
];

// 情绪与五行映射
const emotions = [
  { id: 1, character: '怒', name: '怒', elementId: 2 }, // 木
  { id: 2, character: '喜', name: '喜', elementId: 4 }, // 火
  { id: 3, character: '思', name: '思', elementId: 5 }, // 土
  { id: 4, character: '忧', name: '忧', elementId: 1 }, // 金
  { id: 5, character: '恐', name: '恐', elementId: 3 }  // 水
];

module.exports = {
  fiveElements,
  emotions
}; 