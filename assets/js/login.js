$(function () {
    //1. 登录 注册页面切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    // 2.自定义校验规则 
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if(value !== pwd){
                return '两次密码输入不一致，请重新输入!'
            }
        }
    })

    // 3.注册功能
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url:'/api/reguser',
            data: {
                username: $('#form-reg input[name=username]').val(),
                password: $('#form-reg input[name=password]').val()
            },
            success: function (res) {
                // 判断返回内容的状态码
                if(res.status !== 0){
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                // alert(res.message)
                layer.msg(res.message)
                // 自动触发点击事件，切换登录页面
                $('#link_login').click()
                //清空注册表单数据： 是原生DOM方法
                $('#form-reg')[0].reset()
            }
        })
    })

    // 4.登录功能
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功啦！')
                // 保存token
                localStorage.setItem('token', res.token)
                // 页面跳转
                location.href = '/index.html'

            }
        })
    })





})
