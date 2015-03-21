$(document).ready(function(){
    /*
    $('#title').focus();
    $('#text').autosize();
    */
    var food = ["BANANA","APPLE"];
    var len = food.length;
    for (var i=0;i<len;i++){

        food.push(food[i].toLowerCase());

    }
    var re;
    var c = $("#li").val();
    
    for(var i=0; i<food.length;i++){

        re = new RegExp("\\b"+food[i]+"\\b", "g");
        c = c.replace(re, "<span class=\"keyword\">"+food[i]+"</span>");

    }
});