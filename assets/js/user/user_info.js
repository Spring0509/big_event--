// 入口函数
$(function(){
    // 1.自定义检验规则
    var form = layui.form
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称长度为 1 ~ 6 位之间'
            }
        }
    })

    //2.获取用户信息
    initUserInfo()
    var layer = layui.layer
    function initUserInfo(){
        $.ajax({
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }

                //成功 把用户信息渲染到 form表单中
                /* 表单赋值、取值
                    语法：form.val('filter', object)
                    用于给指定表单集合的元素赋值和取值。如果 object 参数存在，则为赋值；如果 object 参数不存在，则为取值
                    filter为所在元素属性 lay-filter="" 对应的值*/
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.重置表单
    $('#btnReset').on('click', function(e){
        // 阻止默认行为
        e.preventDefault()
        // 重新渲染页面
        initUserInfo()
    })

    // 4.修改用户信息
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }

                layer.msg(res.message)
                // 调用父页面中的 更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })


})