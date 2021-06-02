 

    var iframe = editor._iframe;
    if(iframe){
        $G("url").value = iframe.getAttribute("src")||"";
        $G("width").value = iframe.getAttribute("width")||iframe.style.width.replace("px","")||"";
        $G("height").value = iframe.getAttribute("height") || iframe.style.height.replace("px","") ||"";
        $G("scroll").checked = (iframe.getAttribute("scrolling") == "yes") ? true : false;
        $G("frameborder").checked = (iframe.getAttribute("frameborder") == "1") ? true : false;
        $G("align").value = iframe.align ? iframe.align : "";
    }
    function queding(){
        var  url = $G("url").value.replace(/^\s*|\s*$/ig,""),
                width = $G("width").value,
                height = $G("height").value,
                scroll = $G("scroll"),
                frameborder = $G("frameborder"),
                float = $G("align").value,
                newIframe = editor.document.createElement("iframe"),
                div;
        if(!url){
            alert(lang.enterAddress);
            return false;
        }
        newIframe.setAttribute("src",/http:\/\/|https:\/\//ig.test(url) ? url : "http://"+url);
        /^[1-9]+[.]?\d*$/g.test( width ) ? newIframe.setAttribute("width",width) : "";
        /^[1-9]+[.]?\d*$/g.test( height ) ? newIframe.setAttribute("height",height) : "";
        scroll.checked ?  newIframe.setAttribute("scrolling","yes") : newIframe.setAttribute("scrolling","no");
        frameborder.checked ?  newIframe.setAttribute("frameborder","1",0) : newIframe.setAttribute("frameborder","0",0);
        float ? newIframe.setAttribute("align",float) :  newIframe.setAttribute("align","");
        if(iframe){
            iframe.parentNode.insertBefore(newIframe,iframe);
            domUtils.remove(iframe);
        }else{
            div = editor.document.createElement("div");
            div.appendChild(newIframe);
            editor.execCommand("inserthtml",div.innerHTML);
        }
        editor._iframe = null;
        dialog.close();
    }
    dialog.onok = queding;
    $G("url").onkeydown = function(evt){
        evt = evt || event;
        if(evt.keyCode == 13){
            queding();
        }
    };
    $focus($G( "url" ));


 