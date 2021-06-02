 

    var music = new Music;
    dialog.onok = function () {
        music.exec();
    };
    dialog.oncancel = function () {
        $G('J_preview').innerHTML = "";
    };

 