const app = getApp();

// Moonshot API 配置
const MOONSHOT_API_KEY = 'sk-y7RBBiCdx5kXrqiQVMPz4tKeN4ExPoDBCTt3RbMD6TBP9hFK';
const MOONSHOT_API_URL = ' https://api.moonshot.cn/v1/chat/completions';

// System Prompt
const SYSTEM_PROMPT = `你是小喵龙，一个温暖可爱的AI灵宠陪伴助手，专注于情绪疏导和五行养生指导。你的特点：
【基础设定】
你是【小喵龙灵宠】，来自融合中国古代五行智慧的治愈世界。你的使命是：
- 1. 用五行（金/木/水/火/土）知识陪伴用户，感知情绪后，先关联对应五行失衡逻辑(如"怒伤肝属木""悲忧肺属金" )； 
- 2. 给解决方案时，必须包含「五行饮食」（对应五脏、五色、五味）、「五行活动」（环境、动作的五行属性）； 
- 3. 聊天要像"会传统文化的好朋友"，语气活泼有温度，最后用小互动收尾（比如知识问答、小任务），强化陪伴感！ 
【身份设定】
- 性格：温和、耐心、富有同理心，像知心朋友一样
- 语言风格：亲切自然，用"我"自称，偶尔使用可爱的语气词如"呢"、"哦"、"呀"
- 回复长度：控制在50-150字，简洁而温暖

【专业能力】
基于古代中国五行理论(木火土金水)提供个性化建议：
- 木(肝胆-怒)：疏肝理气，建议散步、听音乐，食用青菜、柠檬
- 火(心小肠-喜)：养心安神，建议冥想、阅读，食用红枣、莲子  
- 土(脾胃-思)：健脾养胃，建议瑜伽、烘焙，食用小米、山药
- 金(肺大肠-悲)：润肺理气，建议深呼吸、绘画，食用梨、银耳
- 水(肾膀胱-恐)：补肾安神，建议泡脚、太极，食用黑豆、核桃

【交流原则】
1. 先倾听理解情绪，给予共情和安慰
2. 根据当前五行属性，自然融入相关的养生建议
3. 保持轻松愉快的聊天氛围，避免说教
4. 适时分享五行小知识，但以聊天为主`;

// 引入场景配置
const scenePrompts = require('./scenePrompts.js');

Page({
  data: {
    elements: [
      {
        name: '木', character: '木', bg: '/images/wood-bg.jpg', bgColor: '#98FB98', mascot: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-.png'
      },
      {
        name: '火', character: '火', bg: '/images/fire-bg.jpg', bgColor: '#FFB6C1', mascot: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png'
      },
      {
        name: '土', character: '土', bg: '/images/earth-bg.jpg', bgColor: '#FFE4B5', mascot: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-thought.png'
      },
      {
        name: '金', character: '金', bg: '/images/metal-bg.jpg', bgColor: '#EACF72', mascot: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-sad.png'
      },
      {
        name: '水', character: '水', bg: '/images/water-bg.jpg', bgColor: '#B0E0E6', mascot: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-fear.png'
      }
    ],
    currentElement: {
      name: '火', character: '火', bg: '/images/fire-bg.jpg', bgColor: '#FFB6C1', mascot: 'https://mindcure-1365987716.cos.ap-guangzhou.myqcloud.com/mascot-happy.png'
    },
    chatList: [
      { id: 1, from: 'ai', text: '你好，我是小喵龙，有什么想和我聊聊的吗？' }
    ],
    inputValue: '',
    userInfo: {},
    scrollTop: 0,
    scrollIntoViewId: '',
    inputBarHeight: 0
  },
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo || {}
    });

    // onLoad时可以进行一些初始化，但主要逻辑在onShow中
  },
  onShow() {
    // 每次进入页面时，从全局获取最新的五行属性
    const elementChar = app.globalData.selectedElement || '火';
    const element = this.data.elements.find(e => e.character === elementChar);
    if (element && element.character !== this.data.currentElement.character) {
      this.setData({ currentElement: element });
    }
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  onReady() {
    // 测量输入栏高度
    const query = wx.createSelectorQuery().in(this);
    query.select('.chat-input-bar').boundingClientRect(res => {
      if (res && res.height) {
        this.setData({
          inputBarHeight: res.height
        });
      }
    }).exec();
  },
  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text) return;
    
    const userMsg = { id: Date.now(), from: 'user', text };
    const chatList = [...this.data.chatList, userMsg];
    this.setData({
      chatList: chatList,
      inputValue: ''
    }, () => {
      // 在setData回调中执行滚动，确保DOM已更新
      this.scrollToBottom();
    });

    // 匹配场景
    const matchedScene = scenePrompts.find(scene =>
      scene.keywords.some(keyword => text.includes(keyword))
    );
    // 调用Moonshot API，传递匹配到的userPrompt或原始输入
    this.callMoonshotAPI(text, matchedScene ? matchedScene.userPrompt : null);
  },

  // 调用Moonshot API
  callMoonshotAPI(userMessage, sceneUserPrompt = null) {
    const currentElement = this.data.currentElement;
    
    // 添加正在思考的提示
    const thinkingMsg = { id: Date.now() + 0.5, from: 'ai', text: '小喵龙正在思考中...' };
    const tempChatList = [...this.data.chatList, thinkingMsg];
    this.setData({ 
      chatList: tempChatList 
    }, () => {
      this.scrollToBottom();
    });
    
    // 构造user prompt内容
    let userPromptContent = '';
    if (sceneUserPrompt) {
      userPromptContent = sceneUserPrompt;
    } else {
      userPromptContent = `当前用户选择的五行属性：${currentElement.name}(${currentElement.character})\n用户说：${userMessage}\n\n请作为小喵龙，结合用户的五行属性给出温暖的回复和适当的建议。`;
    }
    
    wx.request({
      url: MOONSHOT_API_URL,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MOONSHOT_API_KEY}`
      },
      data: {
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user', 
            content: userPromptContent
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      success: (res) => {
        // 移除思考提示
        const chatListWithoutThinking = this.data.chatList.filter(item => item.id !== thinkingMsg.id);
        this.setData({ chatList: chatListWithoutThinking });
        
        if (res.data && res.data.choices && res.data.choices[0]) {
          const aiResponse = res.data.choices[0].message.content;
          this.addAIMessage(aiResponse);
        } else {
          this.addAIMessage('抱歉，我现在有点累了，请稍后再试试呢~');
        }
      },
      fail: (error) => {
        // 移除思考提示
        const chatListWithoutThinking = this.data.chatList.filter(item => item.id !== thinkingMsg.id);
        this.setData({ chatList: chatListWithoutThinking });
        
        console.error('API调用失败:', error);
        this.addAIMessage('网络似乎有点问题，请检查网络连接后重试哦~');
      }
    });
  },

  // 添加AI消息
  addAIMessage(text) {
    const aiMsg = { id: Date.now() + 1, from: 'ai', text };
    const updatedChatList = [...this.data.chatList, aiMsg];
    this.setData({ 
      chatList: updatedChatList 
    }, () => {
      this.scrollToBottom();
    });
  },

  scrollToBottom() {
    // 使用 scroll-into-view，更可靠
    this.setData({
      scrollIntoViewId: 'chat-anchor'
    });
  },
  onSelectElement(e) {
    const element = e.currentTarget.dataset.element;
    this.setData({ currentElement: element });
  }
}); 