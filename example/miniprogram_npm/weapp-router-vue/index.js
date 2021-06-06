const queryString = function (queryObj = {}) {
    let propStr = []
    for (let prop in queryObj) {
        propStr.push(prop + '=' + queryObj[prop])
    }
    let str = propStr.join('&')
    return str ? '?' + str : ''
}
const parseQueryString = function(routerStr){
    let optArr = options.split("?")
    let path = optArr[0]
    let query = {}
    if(optArr[1]){
        let keyVals = optArr[1].split("&")
        keyVals.forEach(param => {
            let props = param.split("=")
            query[props[0]]= props[1]
        });
    }
    return {
        path: path,
        query:query
    }
}

function assembleLink(options){
    if (typeof options == "string") {
        options = parseQueryString(options)
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
        this.$route['fullPath'] = this.toString()
    }

    /**
     * 生成小程序的url
     */
    toString() {
        let {path, query} = this.$route

        return path + queryString(query)
    }

    
    push(options = {}) { 
     
        return wx.navigateTo({
            url:assembleLink(options)
        })
    }

    replace(options = {}) {
       
        return wx.redirectTo({
            url:assembleLink(options)
        })
    }

    back(pageNum = 1) {
        return wx.navigateBack({
            delta: pageNum
        })
    }

    switchTab(options) {
         
        return wx.switchTab({
            url:assembleLink(options)
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
    
        return wx.reLaunch({
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
