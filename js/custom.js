var cs = jQuery.noConflict();

cs(document).ready(function(){

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    // code goes here when document is ready

    cs(window).load(function(){
    
        // code goes here when window has finish loading

    });

});