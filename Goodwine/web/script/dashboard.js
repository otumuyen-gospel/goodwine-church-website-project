
document.getElementById("menu").onclick = function(){
    document.getElementById("mobile").style.display="block";
};

$(document).mouseup(function(e) 
{
    var container = $("#mobile .sidebar");

    var main_container = $("#mobile");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        main_container.hide();
    }
});
//call addModalEvent
addModalCloseEvent();
function addModalCloseEvent(){
    var close = document.querySelectorAll("#close");
    for(var i = 0; i < close.length; i++){
        close[i].onclick = function(){
            document.querySelector("#mymodal").style.display="none";
        };
    }
}

$(document).mouseup(function(e) 
{
    var container = $("#mymodal .message-holder");

    var main_container = $("#mymodal");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        main_container.hide();
    }
});
