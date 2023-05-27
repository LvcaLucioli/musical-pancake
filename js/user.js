const SWIPE_TH = 1;


function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.userAgent)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function loadMore(){
    base.loadMore();
}

function checkSwipe() {
    if (base.currentState != UserHelper.STATES[0]){
        if (touchEndY - touchStartY < -SWIPE_TH) {
            base.slideDrawer();
        }
    }else{
        if (touchEndY - touchStartY > SWIPE_TH) {
            base.slideDrawer();
        }
    }
}

function slideDrawer(){
    base.slideDrawer();
}

function switchSection(target){
    base.switchSection(target);
}



const base = new UserHelper();

// set drawer touch event
var touchStartY = 0;
var touchEndY = 0;
const section = document.querySelector("#posts_section");
const button = document.querySelector("#slide_button");
button.addEventListener("touchstart", function(event) {
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

button.addEventListener("touchend", function(event) {
    touchEndY = event.changedTouches[0].screenY;
    checkSwipe();
}, { passive: true });



// set posts scrollbar
let scrollableDiv = document.querySelectorAll('.scrollable_div')[1];
let isScrolling;
let header = document.querySelector('.slide_button');

scrollableDiv.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    scrollableDiv.classList.add('show-scrollbar');
    isScrolling = setTimeout(function() {
        scrollableDiv.classList.remove('show-scrollbar');
    }, 700);
});

// if (iOS()){
//     let scroll_els = document.querySelectorAll('.scrollable_el');
//     scroll_els[0].style.paddingRight = "80px";
//     for (var i = 0; i < scroll_els.length; i++) {
//         scroll_els[i].style.paddingRight = "40px";
//     }

//     if (IS_MOBILE){
//         document.querySelector('#drawer footer button')
//                 .style
//                 .marginBottom = "20vh";
//     }else{
//         document.querySelector('#drawer footer button')
//                 .style
//                 .marginBottom = "12vh";
//     }
    
// }