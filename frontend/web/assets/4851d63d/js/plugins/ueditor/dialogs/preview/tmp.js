 

        document.getElementById('preview').innerHTML = editor.getContent();
        uParse('#preview',{
            rootPath : '../../',
            chartContainerHeight:500
        })
        dialog.oncancel = function(){
            document.getElementById('preview').innerHTML = '';
        }
    
 