// 开发环境地址
var baseUrl = 'http://ajax.frontend.itheima.net'

// $.ajaxPrefilter()要绑定在 所有Ajax 之前
// 此方法会在ajax请求执行后再触发
// 只有这个方法执行完毕， ajax才会真正发送
$.ajaxPrefilter(function (options) {
    options.url = baseUrl + options.url
})