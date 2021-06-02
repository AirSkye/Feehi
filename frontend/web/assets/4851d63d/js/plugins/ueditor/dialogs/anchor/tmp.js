 

            var anchorInput = $G('anchorName'),
                node = editor.selection.getRange().getClosedNode();
            if(node && node.tagName == 'IMG' && (node = node.getAttribute('anchorname'))){
                anchorInput.value = node;
            }
            anchorInput.onkeydown = function(evt){
                evt = evt || window.event;
                if(evt.keyCode == 13){
                    editor.execCommand('anchor', anchorInput.value);
                    dialog.close();
                    domUtils.preventDefault(evt)
                }
            };
            dialog.onok = function (){
                editor.execCommand('anchor', anchorInput.value);
                dialog.close();
            };
            $focus(anchorInput);
        
 