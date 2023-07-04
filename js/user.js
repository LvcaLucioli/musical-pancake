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

function loadMorePost(){
    base.loadMorePost();
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
    followersFollowingContainer.activeSection = Math.abs(followersFollowingContainer.activeSection - 1);
    followersFollowingContainer.sections[followersFollowingContainer.activeSection].target = target;
    followersFollowingContainer.sections[followersFollowingContainer.activeSection].show();
    followersFollowingContainer.sections[followersFollowingContainer.activeSection].search(document.querySelector(followersFollowingContainer.container + " input"));
}

function clickUserpageBtn(){
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

scrollableDiv.addEventListener('scroll', function() {
    if(init) {
        base.swipeUp();
        init = false;
    }
});


window.addEventListener('resize', function() {
    base.setLogoutBtn();
    if (IS_MOBILE){
        if (scrollableUser.scrollTop > 10){
            header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.boxShadow = "none";
        }
    } else {
        header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
    }
});

let scrollableUser = document.querySelector('.scrollable_user');
let header = document.querySelector('header[aria-label="primary-menu"]');
scrollableUser.addEventListener('scroll', function() {
    if (IS_MOBILE){
        if (scrollableUser.scrollTop > 10){
            header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.boxShadow = "none";
        }
    } else {
        header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
    }

    if(init){
        base.swipeDown();
        init = false;
    }
});

var followersFollowingContainer = new Container(".scrollable_user #userlist_section", [new SearchSection("followers", null, base.user), new SearchSection("following", null, base.user)], document.querySelectorAll("scrollable_user nav button"));
followersFollowingContainer.sections[followersFollowingContainer.activeSection].show();
followersFollowingContainer.sections[followersFollowingContainer.activeSection].search(document.querySelector(followersFollowingContainer.container + " input"));

// followersFollowingContainer.sections[followersFollowingContainer.activeSection].show();