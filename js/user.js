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
        if (touchEndY - touchStartY < -SWIPE_TH) {
            base.swipeUp();
        } else if (touchEndY - touchStartY > SWIPE_TH) {
            base.swipeDown();
        }
}

function slideDrawer(){
    base.slideDrawer();
}

function slideDownDrawer(){
    base.swipeDown();
}

function switchSection(target){
    base.switchSection(target);
}

function clickUserBtn(){
    base.clickUserBtn();
}



const base = new UserHelper();

// set drawer touch event
var touchStartY = 0;
var touchEndY = 0;
const section = document.querySelector("#posts_section");
const button = document.querySelector(".slide_button");
button.addEventListener("touchstart", function(event) {
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

button.addEventListener("touchend", function(event) {
    touchEndY = event.changedTouches[0].screenY;
    checkSwipe();
}, { passive: true });



// set scrolling effects scrollbar
let init = true;
let scrollableDiv = document.querySelector('.scrollable_div');
let isScrolling;

scrollableDiv.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    scrollableDiv.classList.add('show-scrollbar');
    isScrolling = setTimeout(function() {
        scrollableDiv.classList.remove('show-scrollbar');
    }, 700);

    if(init) {
        base.swipeUp();
        init = false;
    }
});

let scrollableUser = document.querySelector('.scrollable_user');
let isScrollingUser;

let header = document.querySelector('header[aria-label="primary-menu"]');
scrollableUser.addEventListener('scroll', function() {
    if (IS_MOBILE){
        if (scrollableUser.scrollTop > 10){
            header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.boxShadow = "none";
        }
    }

    if(init){
        base.swipeDown();
        init = false;
    }
});