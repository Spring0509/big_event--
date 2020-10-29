// 开发环境地址
var baseUrl = 'http://ajax.frontend.itheima.net'

// $.ajaxPrefilter()要绑定在 所有Ajax 之前
// 此方法会在ajax请求 post请求 get请求 执行后再触发
// 只有这个方法执行完毕， ajax才会真正发送
$.ajaxPrefilter(function (options) {
    // 1.配置url地址
    options.url = baseUrl + options.url

    //2. 对需要权限的接口配置头信息
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
           Authorization: localStorage.getItem('token') || ''
        }
    }

    // 3.登录拦截
    options.complete = function(res){
        var obj = res.responseJSON
        if(obj.status === 1 && obj.message === '身份认证失败！'){
            // 销毁token 强制跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }




})