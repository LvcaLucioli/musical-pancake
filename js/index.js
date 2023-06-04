const DICT = {
    true: "#followers",
    false: "#discovery"
}
const N_POST = 4;
const N_BLOCK_DISC = 36;


function iOS() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.userAgent) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

async function switchHome(tab) {
    if (tab != homeStatus) {
        const section = document.querySelector("main section");
        const scrollable = document.querySelector(".scrollable_feed");
        document.querySelector(DICT[!tab]).classList.remove("active");
        document.querySelector(DICT[tab]).classList.add("active");
        homeStatus = tab;

        if (tab) {
            prevDisc[0] = section.innerHTML;
            prevDisc[1] = scrollable.scrollTop;
            prevDisc[2] = scrollable.clientHeight * 2 / 1000 + scrollable.clientWidth * 2 / 1000;
            section.innerHTML = prevPosts[0];
            scrollable.scrollTop = prevPosts[1] - prevPosts[2];
        } else {
            prevPosts[0] = section.innerHTML;
            prevPosts[1] = scrollable.scrollTop;
            prevPosts[2] = scrollable.clientHeight * 2 / 1000 + scrollable.clientWidth * 2 / 1000;
            section.innerHTML = prevDisc[0];
            scrollable.scrollTop = prevDisc[1] - prevDisc[2];
        }
    }
}

function likeClick(button, isLiked, postId) {
    const formData = new FormData();
    formData.append('id', postId);
    let path = button.querySelector("img").getAttribute("src");

    if (isLiked) {
        formData.append('action', 'remove');
        path = path.replace("true", "false");
        button.setAttribute("onClick", "likeClick(this, false, " + postId + ")");

    } else {
        formData.append('action', 'add');
        path = path.replace("false", "true");
        button.setAttribute("onClick", "likeClick(this, true, " + postId + ")");
    }
    button.querySelector("img").setAttribute("src", path);
    axios.post('api/api-like.php', formData).then(response => {});
}

function generatePosts(posts) {
    let result = '';

    for (let i = 0; i < posts.length - 1; i++) {
        let post = `
        <article>
            <header>
                <div class="row">
                    <div class="col-3">
                        <a href="user.php?username=${posts[i]["user"]}">
                        <!--<img src="${posts[i]["propic"]}" alt="Profile picture" />-->
                        </a>
                    </div>
                    <div class="col-9">
                        <a href="user.php?username=${posts[i]["user"]}">${posts[i]["user"]}</a>
                    </div>
                </div>
            </header>
            <section>
                <img src="${posts[i]["img_name"]}" alt="Post picture" />
                <p>${posts[i]["description"]}</p>
            </section>
            <section>
                <div class="row">
                    <div class="col-4">
                        <button class="like_btn" onClick="likeClick(this, ${posts[i]["is_liked"]}, ${posts[i]["id"]})">
                            <img src="resources/like_button_${posts[i]["is_liked"]}.png" alt="Like button" />
                        </button>
                    </div>
                    <div class="col-4">
                        <p>${posts[i]["n_likes"]} likes</p>
                    </div>
                    <div class="col-4">
                        <p>Published on ${posts[i]["date"]}</p>
                    </div>
                </div>
            </section>
            <footer>
                <button onClick="switchHome(false)">Show comments</button>
            </footer>
        </article>
        `;
        result += post;
    }

    if (posts[posts.length - 1]) {
        document.querySelector('.scrollable_feed footer')
            .innerHTML = `
                <button disabled>
                    <img src="./resources/nomore_white.png">
                </button>
                `;
    }

    lastPost = posts[posts.length - 2]["id"];
    return result;
}

function generateDiscovery(posts) {
    let result = ``;
    let colCount = 0;

    for (let i = 0; i < posts.length - 1; i++) {
        colCount++;
        if (colCount == 1) {
            result += `<div class="row">`
        }

        let post = `
        <article class="col-4">
            <img src="${posts[i]["img_name"]}" alt="Post image" />
        </article>
        `;
        result += post;

        if (colCount == 3) {
            colCount = 0;
            result += `</div>`
        }
    }
    return result;
}

async function loadMore() {
    const section = document.querySelector("main section");
    const formData = new FormData();

    if (homeStatus) {
        formData.append('n', N_POST);
        formData.append('last_id', lastPost);
        const response = await axios.post('api/api-posts-followed.php', formData);
        console.log(response.data);
        section.innerHTML = section.innerHTML + generatePosts(response.data);
    } else {
        formData.append('n_block_disc', N_BLOCK_DISC);
        const response = await axios.post('api/api-discovery.php', formData);
        section.innerHTML = section.innerHTML + generateDiscovery(response.data);
    }
}

function showNotificationSection() {
    if (document.querySelector(".col-lg-6 #notifications-section")) {
        document.querySelector(".col-lg-6 #notifications-section").outerHTML = "";
        document.querySelector(".scrollable_feed").classList.remove("d-none");
    } else {
        const notificationsSection = new NotificationsSection(".row main");
        notificationsSection.retrieve();
        document.querySelector(".scrollable_feed").classList.add("d-none");
    }

}

function showSearchSection() {
    if (document.querySelector(".col-lg-6 #search-section")) {
        document.querySelector(".col-lg-6 #search-section").outerHTML = "";
        document.querySelector(".scrollable_feed").classList.remove("d-none");
    } else {
        const searchSection = new SearchSection(".row main");
        searchSection.retrieve();
        document.querySelector(".scrollable_feed").classList.add("d-none");
    }
}


let homeStatus = true;
let prevPosts = [``, 0, 0];
let prevDisc = [``, 0, 0];
let lastPost = -1;

const formData = new FormData();
formData.append('n_block_disc', N_BLOCK_DISC);
axios.post('api/api-discovery.php', formData).then(response => {
    console.log(response.data);
    prevDisc[0] = generateDiscovery(response.data);
});

loadMore();

// set posts scrollbar
let scrollableDivMain = document.querySelectorAll('.scrollable_feed')[0];
let isScrollingMain;
const screenWidth = window.innerWidth;

scrollableDivMain.addEventListener('scroll', function() {
    window.clearTimeout(isScrollingMain);
    scrollableDivMain.classList.add('show-scrollbar');
    isScrollingMain = setTimeout(function() {
        scrollableDivMain.classList.remove('show-scrollbar');
    }, 700);

    let header = document.querySelector('header[aria-label="primary-menu"]');
    let nav_feed = document.querySelector('nav[aria-label="feed-menu"]');
    if (IS_MOBILE) {
        if (scrollableDivMain.scrollTop > nav_feed.scrollHeight) {
            header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.boxShadow = "none";
        }
    }
});

if (iOS()) {
    let scroll_els = document.querySelectorAll('.scrollable_el');
    for (var i = 0; i < scroll_els.length; i++) {
        scroll_els[i].style.paddingRight = "40px";
    }

    if (IS_MOBILE) {
        document.querySelector('.scroll-wrap footer button')
            .style
            .marginBottom = "20vh";
    } else {
        document.querySelector('.scroll-wrap footer button')
            .style
            .marginBottom = "12vh";
    }
}