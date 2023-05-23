const SWIPE_TH = 1;

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

let div = $(".scrollable_div:eq(1)");
div.on("touchmove", function(e) {
    e.preventDefault();
});

// set posts scrollbar
let scrollableDiv = document.querySelectorAll('.scrollable_div')[1];
let isScrolling;

scrollableDiv.addEventListener('scroll', function() {
  window.clearTimeout(isScrolling);
  scrollableDiv.classList.add('show-scrollbar');
  isScrolling = setTimeout(function() {
    scrollableDiv.classList.remove('show-scrollbar');
  }, 400);
});

window.onunload = function () { console.log("ciao") };