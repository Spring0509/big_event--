// 入口函数
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    //2.点击按钮选择文件
    $('#btnChooseImage').click(function () {
        $('#file').click()
    })

    //3.更换裁剪区域图片 (步骤123为cropper提供做法)
    var layer = layui.layer
    $('#file').on('change', function (e) {
        // 1.获取上传图片
        //无论上传多少张，files属性都是一个伪数组
        var file = e.target.files[0]

        /* （mywrite）非空校验 */
        if (file === undefined) {
            return layer.msg('请选择图片！')
        }

        // 2.在内存中生成虚拟路径
        var newImgURL = URL.createObjectURL(file)
        //3.先销毁旧的裁剪区域， 再重新设置图片路径
        $('#image')
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //4..上传头像
    $('#btnUpload').on('click', function () {
        // 1.获取base64位图片 （cropper提供做法）
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            
        // 2.发送ajax请求
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('头像上传成功！')
                window.parent.getUserInfo()
            }
        })
    
    
    })
})