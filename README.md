# MindCure 情绪疗愈小程序

## 🌟 项目简介

MindCure 是本项目是基于微信小程序 + AI 智能体开发的创意产品，旨在通过中医五行哲学下的传统文化智慧与语言模型的生成能力，帮助用户调节情绪、缓解压力，实现心灵疗愈。


## 🎯 目标用户

- **年龄**：20-40岁
- **职业**：都市白领、学生、自由职业者
- **需求**：情绪调节、压力缓解、心理健康
- **偏好**：传统文化、自然疗愈、萌系设计


## 🎯 核心功能

1. **心韵**：音疗调节，能量共振
2. **积福鱼**：敲击木鱼，积德养心
3. **呼吸调**：五行呼吸法，可视化呼吸节奏
4. **心游境**：提供情绪匹配的户外活动建议
5。 **小喵龙情绪陪伴AI**：提供个性化的心理支持与互动


## 🏗️ 技术架构

### 数据结构
```
utils/data.js
├── emotions (五行情绪数据)
├── fiveElements (五行元素配置)
├── functionButtons (功能模块)
├── mascotResponses (AI对话数据)
└── achievements (成就系统)
```

### 项目结构说明
```
pages/
├── splash/ (开屏动画)
├── emotion-select/ (情绪选择)
├── index/ (主界面)
├── heart-rhythm/ (心韵)
├── fortune-bell/ (积福鱼)
├── breathing-adjust/ (呼吸调)
├── mind-journey/ (心游境)
├── treehole/ (树洞)
└── profile/ (个人中心)
README.md # 项目说明文件

### 技术栈
```
- 微信小程序（前端界面）
-  API（自然语言生成）
- Cursor IDE（AI辅助开发）
- Moonshot（自动部署流程）
- Figma （界面原型设计）


##环境要求
- 微信开发者工具
- 微信小程序基础库 2.0+

## 使用说明
1. 打开微信 → 扫码进入小程序  
2. 选择当前情绪状态进入功能界面
3. 点击选项开始情绪疗愈交互  

## 项目链接
- 微信小程序预览扫描二维码
- GitHub 项目仓库：[点击进入]（https://github.com/Lanzy2168/mindcure.git）


## 智能体设定摘要
- 角色：基于中医五行哲学的AI灵宠“小喵龙”
- 性格：温和、耐心、富有同理心，像知心朋友一样，带情感识别能力
- 任 务：根据用户输入，输出符合情感/功能目标的语句，建议内容结构如下：

> “你好，我是小喵龙，有什么想和我聊聊的吗?”

##安装步骤
1. 克隆项目到本地
2. 使用微信开发者工具打开项目
3. 配置小程序 AppID
4. 编译运行

### 开发配置
```json
{
  "pages": [
    "pages/splash/splash",
    "pages/emotion-select/emotion-select",
    "pages/index/index"
  ],
  "window": {
    "navigationBarTitleText": "MindCure",
    "backgroundColor": "#FFE5F1"
  }
}
```


## 运行方法
1. 克隆本项目至本地
2. 使用微信开发者工具打开 `/miniprogram5` 文件夹
3. 填入 `treehole\treehole.js` 文件中的 API KEY
4. 运行并调试（推荐真机测试）

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

