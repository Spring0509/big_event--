// 入口函数
$(function () {
    // 1.获取用户信息
    getUserInfo()

    

    //2.退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function(){
        //使用框架询问框（内置模块- 弹出层-内置方法）
        layer.confirm('是否确认退出！', {icon: 3, title:'提示'}, function(index){
            //1.删除 token
            localStorage.removeItem('token')
            //2.页面跳转
            location.href = '/login.html'
            
            //关闭询问框（layer自带）
            layer.close(index);
          });
    })
})

//获取用户信息 封装在入口函数外面
  //原因： 放在外面是全局变量， 后面其他页面能够调用到，若在入口函数内部 为局部变量
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo' ,
        // headers 请求头配置对象
        // headers: {
        //    Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            // 判断状态码
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            // 请求成功， 渲染用户头部信息
            renderAvatar(res.data)
        }
    })
}

// 封装用户头像渲染函数
function renderAvatar(user){
    // 1.用户名 （先昵称后username）
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //2.用户头像
    if(user.user_pic !== null){
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avater').hide()

    }else{
        //无头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avater').html(text).show()
    }
}