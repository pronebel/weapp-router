# weapp-router-vue
router like vue

### 介绍

- 不改变原生的实现，通过类库提供进行小程序的 vue-router的风格的使用

- 实现了基本的方法，满足普通实现

  



#### 意义：

- 目前：

  只起到语法糖的作用

- 后继：

  扩展导航守卫的功能，可以支持更多的路由行为周期的控制



*TODO:  后继   vue-router功能，能实现的都尝试实现下*







### 更新日志

- v1.0 实现基本功能







### 使用

在页面的初始化的onLoad方法中实例化router，如果有自己封装  Page的工厂类，可以在工厂类中引入使用

- Router： 实现的类vue-router的小程序路由封装类

- RouterCreate(page): 给页面绑定 Router

	
	
	
	
	```
	import {Router,RouterCreate} from 'weapp-router-vue'
	Page({
	    ...
	    onLoad(){
	        RouterCreate(this);
	    },
	    gotoUserInfo(){
	        this.$router.push({
	            path:"/pages/user/info",
	            query:{
	                userId:1,
	                userType:2
	            }
	        })
	    }
	})
	```
	
	







# API 参考


### 路有对象： this.\$router

- 对象的命名 **$router**

    小程序page页面已有 router属性，重命名为$router 

- 方法  

- - $router.push(options = {})： 

    封装 wx.navigateTo

  - $router.replace(options = {})

    封装 wx.redirectTo

  - $router.back(pageNum = 1)

    封装 wx.navigateBack

  - $router.switchTab(options = {})

    封装 wx.switchTab

  - $router.reLanunch(options = {})

    封装 wx.reLaunch

 

- 方法的参数

  方法的参数options统一封装为：

  ```
  {
   	path:"", //  程序的页面路径
  	query: { // 页面的query参数
  	}
  }
  ```

  比如：

  ```
  跳转到：/pages/user/info?test=1&a=2
  this.$router.push({
  	path:'/pages/user/info',
  	query:{ //页面的query参数
  		userId:1,
  		userType:2
  	}
  })
  
  ```

  





### 路由对象属性: this.\$route 

  当前激活的路由信息对象。
通过 this.$route 来获取页面的路径，query参数等。

- **\$route.path**

  - 类型: `string`

    字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`。


- **\$route.query**

  - 类型: `Object`

    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。


- **\$route.fullPath**

  - 类型: `string`

    完成解析后的 URL，包含查询参数和 hash 的完整路径。






### TODO: 

### 导航守卫的实现

- **beforeRouteEnter**
- **beforeRouteUpdate**
- **beforeRouteLeave**
