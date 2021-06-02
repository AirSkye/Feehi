 

    var settings = {
        drawBrushSize:3, //画笔初始大小
        drawBrushColor:"#4bacc6", //画笔初始颜色
        colorList:['c00000', 'ff0000', 'ffc000', 'ffff00', '92d050', '00b050', '00b0f0', '0070c0', '002060', '7030a0', 'ffffff',
            '000000', 'eeece1', '1f497d', '4f81bd', 'c0504d', '9bbb59', '8064a2', '4bacc6', 'f79646'], //画笔选择颜色
        saveNum:10  //撤销次数
    };

    var scrawlObj = new scrawl( settings );
    scrawlObj.isCancelScrawl = false;

    dialog.onok = function () {
        exec( scrawlObj );
        return false;
    };
    dialog.oncancel = function () {
        scrawlObj.isCancelScrawl = true;
    };

 