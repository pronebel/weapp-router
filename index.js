const queryString = function (queryObj = {}) {
    let propStr = []
    for (let prop in queryObj) {
        propStr.push(prop + '=' + queryObj[prop])
    }
    let str = propStr.join('&')
    return str ? '?' + str : ''
}

function assembleLink(options){
    if (typeof options == "string") {
        options = {
            path: options,
            query: {}
        }
    }

    let {path, query} = options

    let url = path + queryString(query)
    return url
}


 class Router {
    constructor() {
        this._query = {}
        this._app = getApp()
        this._pages = getCurrentPages()
        this.$deepth= this._pages.length;
        if (this._pages.length > 0) {
            this.$page = this._pages[this._pages.length - 1]
        } else {
            this.$page = {}
        }
        let url = this.$page.route
        if (url.indexOf("/") != 0) {
            url = '/' + url
        }
        this.$route = {
            query: Object.assign({}, this.$page.options),
            path: url
        }
    }

    /**
     * 生成小程序的url
     */
    toString() {
        let {path, query} = this.$route

        return path + queryString(query)
    }

    
    push(options = {}) { 
     
        wx.navigateTo({
            url:assembleLink(options),
            fail: function (e) {
                console.log(e)
            }
        })
    }

    replace(options = {}) {
       
        wx.redirectTo({
            url:assembleLink(options),
            fail: function (e) {
                console.log(e)
            }
        })
    }

    back(pageNum = 1) {
        wx.navigateBack({
            delta: pageNum
        })
    }

    switchTab(options) {
         
        wx.switchTab({
            url:assembleLink(options),
            fail: function (e) {
                console.log(e)
            }
        })
    }

    reLanunch(options) {
        let url ;
        if (typeof options == "string") {
            url= options
        }else{
            let {path, query} = options
            url = path + queryString(query)
        }  
    
        wx.reLaunch({
            url:assembleLink(options),
          })
    }

    update(query = {}) {
        this.$route.query = Object.assign({}, this.$route.query, query)
    }

}

module.exports= {
    Router : Router,
    RouterCreate:function(){
        this.$router = new Router()
        this.$route = this.$router.$route
    }
}
