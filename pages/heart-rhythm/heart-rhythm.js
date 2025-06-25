const { fiveElements } = require('../../utils/data.js')

Page({
  data: {
    currentElement: fiveElements[0],
    fiveElements: fiveElements,
    musicTracks: [],
    currentTrack: { title: '未选择音乐' },
    isPlaying: false,
    progress: 0,
    currentTime: '0:00',
    totalTime: '0:00',
    audioContext: null,
    isLoop: false,
    backgroundImage: '',
    playModeIcon: '🔁', // '🔁' for list loop, '🔂' for single loop, '➡️' for play in order
    playMode: 'loop-all', // 'loop-all', 'loop-one', 'order'
  },

  onLoad(options) {
    // 根据五行属性设置背景图
    this.setBackgroundByElement()
    
    this.initializeAudio()
    this.loadUserElement(() => {
      this.loadMusicTracks()
      // 不自动播放音乐，等待用户点击播放按钮
    })
  },
  
  onShow() {
    // 页面显示时同步背景图
    this.setBackgroundByElement();
  },

  // 统一从全局状态获取背景图
  setBackgroundByElement() {
    const app = getApp();
    const backgroundImage = app.getCurrentBackgroundImage();
    
    this.setData({
      backgroundImage: backgroundImage
    });
    
    console.log('心韵页面背景设置为:', backgroundImage);
  },

  onUnload() {
    // 页面卸载时停止音频
    if (this.data.audioContext) {
      this.data.audioContext.stop()
    }
    // 页面卸载时返回上一页
    wx.navigateBack({
      delta: 1
    })
  },

  initializeAudio() {
    // 初始化音频上下文
    const audioContext = wx.createInnerAudioContext()
    audioContext.onPlay(() => {
      this.setData({ isPlaying: true })
    })
    audioContext.onPause(() => {
      this.setData({ isPlaying: false })
    })
    audioContext.onStop(() => {
      this.setData({ isPlaying: false })
    })
    audioContext.onTimeUpdate(() => {
      const { currentTime, duration } = audioContext;
      const progress = (currentTime / duration) * 100;
      this.setData({
        progress: progress,
        currentTime: this.formatTime(currentTime),
        totalTime: this.formatTime(duration),
      });
    })
    audioContext.onEnded(() => {
      this.onAudioEnded()
    })

    this.setData({ audioContext })
  },

  loadUserElement(callback) {
    // 从本地存储获取用户选择的情绪对应的五行元素
    const selectedEmotion = wx.getStorageSync('selectedEmotion')
    if (selectedEmotion) {
      const emotion = require('../../utils/data.js').emotions.find(e => e.id === selectedEmotion.id)
      if (emotion) {
        const element = require('../../utils/data.js').fiveElements.find(e => e.elementId === emotion.elementId)
        if (element) {
          this.setData({ currentElement: element }, callback)
          return
        }
      }
    }
    if (callback) callback()
  },

  loadMusicTracks(callback) {
    // 根据当前五行元素加载对应的音乐
    const tracks = this.data.currentElement.music || []
    this.setData({ 
      musicTracks: tracks,
      currentTrack: tracks.length > 0 ? tracks[0] : { title: '暂无音乐' },
      isPlaying: false,
      progress: 0,
      currentTime: '0:00',
      totalTime: '0:00'
    }, callback)
    // 停止当前播放
    if (this.data.audioContext) {
      this.data.audioContext.stop()
    }
  },

  autoPlayFirstTrack() {
    if (this.data.musicTracks.length > 0) {
      this.setData({ currentTrack: this.data.musicTracks[0] })
      this.playTrack()
    }
  },

  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  },

  switchElement(e) {
    const element = e.currentTarget.dataset.element
    this.setData({ currentElement: element })
    this.loadMusicTracks()
    // 停止当前播放
    if (this.data.audioContext) {
      this.data.audioContext.stop()
    }
    this.setData({ 
      isPlaying: false,
      progress: 0,
      currentTime: '0:00',
      totalTime: '0:00'
    })
    wx.showToast({
      title: `切换到${element.name}元素`,
      icon: 'none'
    })
  },

  selectTrack(e) {
    const track = e.currentTarget.dataset.track
    this.setData({ currentTrack: track, isPlaying: false, progress: 0, currentTime: '0:00', totalTime: '0:00' })
    if (this.data.audioContext) {
      this.data.audioContext.stop()
    }
    // 不自动播放，等待用户点击播放按钮
  },

  togglePlay() {
    if (!this.data.currentTrack || !this.data.currentTrack.url) {
      wx.showToast({
        title: '请先选择音乐',
        icon: 'none'
      })
      return
    }
    if (this.data.isPlaying) {
      this.pauseTrack()
    } else {
      this.playTrack()
    }
  },

  toggleLoop() {
    this.setData({ isLoop: !this.data.isLoop })
    wx.showToast({
      title: this.data.isLoop ? '循环播放已开启' : '循环播放已关闭',
      icon: 'none'
    })
  },

  playTrack() {
    // 真正播放音乐
    if (!this.data.currentTrack || !this.data.currentTrack.url) return
    if (this.data.audioContext) {
      this.data.audioContext.src = this.data.currentTrack.url
      this.data.audioContext.play()
    }
    this.setData({ isPlaying: true })
  },

  pauseTrack() {
    if (this.data.audioContext) {
      this.data.audioContext.pause()
    }
    this.setData({ isPlaying: false })
    wx.showToast({
      title: '暂停播放',
      icon: 'none'
    })
  },

  simulateProgress() {
    // 模拟音乐播放进度
    let currentProgress = 0
    this.progressTimer = setInterval(() => {
      if (this.data.isPlaying) {
        currentProgress += 1
        if (currentProgress > 100) {
          currentProgress = 0
          this.nextTrack()
        } else {
          this.setData({ progress: currentProgress })
        }
      }
    }, 1000)
  },

  previousTrack() {
    const tracks = this.data.musicTracks
    if (tracks.length === 0) return

    const currentIndex = tracks.findIndex(t => t.title === this.data.currentTrack.title)
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1
    const previousTrack = tracks[previousIndex]

    this.setData({ currentTrack: previousTrack })
    this.restartTrack()
  },

  nextTrack() {
    const tracks = this.data.musicTracks
    if (tracks.length === 0) return

    const currentIndex = tracks.findIndex(t => t.title === this.data.currentTrack.title)
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0
    const nextTrack = tracks[nextIndex]

    this.setData({ currentTrack: nextTrack })
    this.restartTrack()
  },

  restartTrack() {
    if (this.data.audioContext && this.data.currentTrack && this.data.currentTrack.url) {
      this.data.audioContext.stop()
      this.data.audioContext.src = this.data.currentTrack.url
      this.data.audioContext.play()
      this.setData({ isPlaying: true })
    }
  },

  addToFavorites() {
    wx.showToast({
      title: '已添加到收藏',
      icon: 'success'
    })
  },

  shareMusic() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 重放当前歌曲
  replayTrack() {
    this.data.audioContext.seek(0);
    if (!this.data.isPlaying) {
      this.togglePlay();
    }
  },

  // 切换播放模式
  changePlayMode() {
    let newMode;
    let newIcon;
    switch (this.data.playMode) {
      case 'loop-all':
        newMode = 'loop-one';
        newIcon = '🔂';
        break;
      case 'loop-one':
        newMode = 'order';
        newIcon = '➡️';
        break;
      case 'order':
      default:
        newMode = 'loop-all';
        newIcon = '🔁';
        break;
    }
    this.setData({
      playMode: newMode,
      playModeIcon: newIcon,
    });
    // 根据新模式设置循环属性
    this.data.audioContext.loop = (newMode === 'loop-one');
    wx.showToast({
      title: `切换为${newIcon === '🔁' ? '列表循环' : newIcon === '🔂' ? '单曲循环' : '顺序播放'}`,
      icon: 'none'
    });
  },

  // 监听音乐自然播放结束
  onAudioEnded() {
    if (this.data.playMode === 'loop-one') {
      // 单曲循环模式下，seek到0即可自动重播
      this.replayTrack();
    } else if (this.data.playMode === 'loop-all') {
      // 列表循环
      this.nextTrack();
    } else if (this.data.playMode === 'order') {
      // 顺序播放，播完最后一首就停止
      const currentIndex = this.data.musicTracks.findIndex(t => t.title === this.data.currentTrack.title);
      if (currentIndex < this.data.musicTracks.length - 1) {
        this.nextTrack();
      } else {
        // 是最后一首，停止播放
        this.setData({ isPlaying: false });
      }
    }
  },

  // 进度条拖动
  onSliderChange(e) {
    const value = e.detail.value;
    const duration = this.data.audioContext.duration;
    const seekTime = (value / 100) * duration;
    this.data.audioContext.seek(seekTime);
  },
}) 