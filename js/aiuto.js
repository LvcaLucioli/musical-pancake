
function get(name){
    let params = new URL(window.location.href).searchParams;
    return params.get(name);;
}

function slideDownDrawer() {
    let div = $("main").children().eq(2);
    div.animate({top: '90%'}, 500);
    div.css({overflowY: "hidden"});
}

function slideUpDrawer() {
    let div = $("main").children().eq(2);
    let topHeight = header.scrollHeight + 
                    document.querySelector("body header").scrollHeight;
    div.animate({top: topHeight}, 500);
    div.css({overflowY: "scroll"});
    document.querySelector("#"+ currentState[0] +"_button")
            .classList.remove("active");
}

function slideDrawer() {
    // manca gestione del bottone di slide

    if (currentState[0] == STATES[0]){
        switchSection(currentState[1]);
    }else{
        slideUpDrawer();
        currentState[1] = currentState[0];
        currentState[0] = STATES[0];
    }
}

function switchSection(target){
    if (currentState[0] == STATES[0]){
        slideDownDrawer();
    }
    if ((currentState[0] != target) && (currentState[1] != target)){
        //carica follow
    }
    currentState[0] = target;
    currentState[1] = target;
}

function generateUserPage(user){
    let header = `
            <div class="row">
                <div class="col-4">
                    <img src="${user["propic"]}" alt="Profile picture" />
                </div>
                <div class="col-8">
                    <p>${user["username"]}</p>
                </div>
            </div>

            <nav aria-label="followers/following-nav">
                <ul>
                    <li id='followers_button'>
                        <button onClick="switchSection('${STATES[1]}')">
                            ${user["followers"]} followers
                        </button>
                    </li>
                    <li id='following_button'>
                        <button onClick="switchSection('${STATES[2]}')">
                            ${user["following"]} following
                        </button>
                    </li>
                </ul>
            </nav>`;

    return header;
}

function checkSwipe() {
    if (currentState[0] != STATES[0]){
        if (touchEndY - touchStartY < -SWIPE_TH) {
            slideDrawer();
        }
    }else{
        if (touchEndY - touchStartY > SWIPE_TH) {
            slideDrawer();
        }
    }
}

function loadMore(){
    const section = document.querySelector("#posts_section");
    formData.append('n_posts', N_POST);
    formData.append('i', lastPost);
    lastPost+=N_POST;
    axios.post('api/api-user-posts.php', formData).then(response => {
        section.innerHTML = section.innerHTML + generatePosts(response.data);
    });
}

class user{
    static N_POST = 4;
    static STATES = { 
        0 : "posts",
        1 : "followers",
        2 : "following"
    };
    static SWIPE_TH = 1;


    constructor(){
        this.lastPost = 0;


    }
}
// init posts drawer 
let lastPost = 0;
let currentState = [STATES[0], STATES[1]];
let user = get("username");

const header = document.querySelector("main header");
const formData = new FormData();
formData.append('username', user);
axios.post('api/api-user.php', formData).then(response => {
    header.innerHTML = generateUserPage(response.data);
});

const section = document.querySelector("#posts_section");
const row_posts_button = section.previousElementSibling
                                .childNodes[1];
formData.append('n_posts', N_POST);
formData.append('i', lastPost);
lastPost+=N_POST;
axios.post('api/api-user-posts.php', formData).then(response => {
    section.innerHTML = generatePosts(response.data);
    row_posts_button.childNodes[1] 
                    .innerHTML = String(response.data.length) + " posts";
});


// set drawer touch event
var touchStartY = 0;
var touchEndY = 0;
const button = section.previousElementSibling;
button.addEventListener("touchstart", function(event) {
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

button.addEventListener("touchend", function(event) {
    touchEndY = event.changedTouches[0].screenY;
    checkSwipe();
}, { passive: true });

let div = $("main").children().eq(2);
div.on("touchmove", function(e) {
    e.preventDefault();
});


// init follows section
let prevFollower = [``, 0, 0];
let prevFollowed = [``, 0, 0];
const follows = document.querySelector("#userlist_section");
formData.append('target', STATES[1])