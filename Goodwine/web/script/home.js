var winheight, docheight, trackLength, throttlescroll;
function getmeasurements(){
    winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
    docheight = getDocHeight();
    trackLength = docheight - winheight;
}
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}
function amountscrolled(){
    var scrollTop = window.pageYOffset || 
            (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var percentageScrolled = Math.floor(scrollTop/trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    changeTopAppearance(percentageScrolled);
    
}
 
getmeasurements();
 
window.addEventListener("resize", function(){
    getmeasurements();
}, false);
 
window.addEventListener("scroll", function(){
    clearTimeout(throttlescroll);
        throttlescroll = setTimeout(function(){ // throttle code inside scroll to once every 50 milliseconds
        amountscrolled();
    }, 1);
}, false);


function changeTopAppearance(percentageScrolled){
     var linkholder = document.querySelector(".navigation");
    if(percentageScrolled > 1){   
       linkholder.classList.remove("nav-return");
       linkholder.classList.add("nav-move");
        
    }else{
         linkholder.classList.add("nav-return");
         linkholder.classList.remove("nav-move");
    }
   
}







document.getElementById("show-sidebar").onclick = function(){
    document.getElementById("sidebar").style.display = "block";
    
};
document.getElementById("hide-sidebar").onclick = function(){
    document.getElementById("sidebar").style.display = "none";
};