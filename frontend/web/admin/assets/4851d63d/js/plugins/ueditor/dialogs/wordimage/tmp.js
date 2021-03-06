 

        editor.setOpt({
            wordImageFieldName:"upfile",
            compressSide:0,
            maxImageSideLength:900
        });

            //全局变量
        var imageUrls = [],          //用于保存从服务器返回的图片信息数组
            selectedImageCount = 0,  //当前已选择的但未上传的图片数量
            optImageUrl = editor.getActionUrl(editor.getOpt('imageActionName')),
            optImageFieldName = editor.getOpt('imageFieldName'),
            optImageCompressBorder = editor.getOpt('imageCompressEnable') ? editor.getOpt('imageCompressBorder'):null,
            maxSize = editor.getOpt('imageMaxSize') / 1024,
            extension = editor.getOpt('imageAllowFiles').join(';').replace(/\./g, '*.');

        /* 添加额外的GET参数 */
        var params = utils.serializeParam(editor.queryCommandValue('serverparam')) || '',
            urlWidthParams = optImageUrl + (optImageUrl.indexOf('?') == -1 ? '?':'&') + params;

        utils.domReady(function(){
            //创建Flash相关的参数集合
            var flashOptions = {
                container:"flashContainer",                                                    //flash容器id
                url:urlWidthParams,                                           // 上传处理页面的url地址
                ext:editor.queryCommandValue('serverParam') || {},                                 //可向服务器提交的自定义参数列表
                fileType:'{"description":"'+lang.fileType+'", "extension":"' + extension + '"}',     //上传文件格式限制
                flashUrl:'imageUploader.swf',                                                  //上传用的flash组件地址
                width:600,          //flash的宽度
                height:272,         //flash的高度
                gridWidth:120,     // 每一个预览图片所占的宽度
                gridHeight:120,    // 每一个预览图片所占的高度
                picWidth:100,      // 单张预览图片的宽度
                picHeight:100,     // 单张预览图片的高度
                uploadDataFieldName: optImageFieldName,    // POST请求中图片数据的key
                picDescFieldName:'pictitle',      // POST请求中图片描述的key
                maxSize: maxSize,                         // 文件的最大体积,单位M
                compressSize:1,                   // 上传前如果图片体积超过该值，会先压缩,单位M
                maxNum:32,                         // 单次最大可上传多少个文件
                compressSide: 0,                 //等比压缩的基准，0为按照最长边，1为按照宽度，2为按照高度
                compressLength: optImageCompressBorder        //能接受的最大边长，超过该值Flash会自动等比压缩
            };
            //回调函数集合，支持传递函数名的字符串、函数句柄以及函数本身三种类型
            var callbacks={
                selectFileCallback: function(selectFiles){                // 选择文件的回调
                    selectedImageCount += selectFiles.length;
                    if(selectedImageCount) baidu.g("upload").style.display = "";
                    dialog.buttons[0].setDisabled(true); //初始化时置灰确定按钮
                },
                deleteFileCallback: function(delFiles){                 // 删除文件的回调
                    selectedImageCount -= delFiles.length;
                    if (!selectedImageCount) {
                        baidu.g("upload").style.display = "none";
                        dialog.buttons[0].setDisabled(false);         //没有选择图片时重新点亮按钮
                    }
                },
                uploadCompleteCallback: function(data){               // 单个文件上传完成的回调
                    try{var info = eval("(" + data.info + ")");
                    info && imageUrls.push(info);
                    selectedImageCount--;
                    }catch(e){}
                },
                uploadErrorCallback: function (data){         // 单个文件上传失败的回调,
                    console && console.log(data);
                },
                allCompleteCallback: function(){              // 全部上传完成时的回调
                    dialog.buttons[0].setDisabled(false);    //上传完毕后点亮按钮
                }
                //exceedFileCallback: 'exceedFileCallback',   // 文件超出限制的最大体积时的回调
                //startUploadCallback: startUploadCallback    // 开始上传某个文件时的回调
            };
            wordImage.init(flashOptions,callbacks);
        });

    
 