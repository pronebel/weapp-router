// index.js
// 获取应用实例
const app = getApp()
import {RouterCreate} from 'weapp-router-vue'
Page({
  data: {
    routerInfo:null
  },
  // 事件处理函数
  goLog() {
    console.log(this)
    this.$router.push({
      path:'/pages/logs/logs'
    })
  },
  onLoad(options) {
    console.log(this.methods)
    
    console.log(options)
    RouterCreate.apply(this)
    console.log(this.router)
    this.setData({
      routerInfo:{
        path:this.$route.path,
        query:JSON.stringify(this.$route.query),
        fullPath:this.$route.fullPath
      }
    })
  
  }
})
