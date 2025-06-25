# 图标文件说明

本文件夹包含小程序底部导航栏所需的图标文件。

## 图标规格要求

- **尺寸**：建议 81x81px（27px @3x）
- **格式**：PNG（支持透明背景）
- **风格**：扁平化设计，简洁明了
- **颜色**：
  - 普通状态：灰色 (#999999)
  - 选中状态：主题色 (#667eea)

## 所需图标文件

### 首页图标
- `home.png` - 首页普通状态图标
- `home-active.png` - 首页选中状态图标

### 发现页图标
- `discover.png` - 发现页普通状态图标
- `discover-active.png` - 发现页选中状态图标

### 树洞页图标
- `treehole.png` - 树洞页普通状态图标
- `treehole-active.png` - 树洞页选中状态图标

### 个人页图标
- `profile.png` - 个人页普通状态图标
- `profile-active.png` - 个人页选中状态图标

## 临时解决方案

如果您暂时没有图标文件，可以：

1. 使用在线图标生成工具创建图标
2. 从图标库下载合适的图标
3. 暂时移除 tabBar 配置，使用页面跳转导航

## 推荐图标资源

- [Iconfont](https://www.iconfont.cn/)
- [Feather Icons](https://feathericons.com/)
- [Material Icons](https://material.io/icons/)
- [Font Awesome](https://fontawesome.com/)

## 注意事项

- 确保图标文件大小控制在 10KB 以内
- 图标设计要符合小程序整体风格
- 选中和未选中状态要有明显区别
- 建议使用矢量图标以确保清晰度 

.mascot-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 260rpx;
  height: 260rpx;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(152,251,152,0.5) 0%, rgba(255,255,255,0.1) 80%);
  filter: blur(16rpx);
  z-index: 1;
  pointer-events: none;
}
.mascot-img {
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
  z-index: 2;
}
.mascot-circle {
  position: relative;
  z-index: 2;
} 