$( document ).ready(function(){
    $(".game-persona").hide();
});

$("#stats").click(function(){
    if ($(".game-character").is(":hidden")) {
        $(".game-persona").fadeOut();
        setTimeout(function(){$(".game-character").fadeIn();},405);
    }
});

$("#persona").click(function(){
    if ($(".game-persona").is(":hidden")) {
        $(".game-character").fadeOut();
        setTimeout(function(){$(".game-persona").fadeIn();},405);
    }

})
