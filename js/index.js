const DICT = {
    true: "#followers",
    false: "#discovery"
}

const N_POST = 1;
const N_BLOCK_DISC = 2;

const LOAD_BTN = ` 
    <button onclick="loadMore();">
        view more
        <img src="./resources/load_white.png" alt="load more item">
    </button>`;
const LOAD_BTN_DISABLED = `
    <button disabled>
        <img src="./resources/nomore.png" alt="No more item to view">
    </button>`;


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
        document.querySelector(DICT[!tab]).setAttribute("aria-pressed", false);
        document.querySelector(DICT[tab]).setAttribute("aria-pressed", true);
        homeStatus = tab;

        if (tab) {
            prevDisc[0] = section.innerHTML;
            prevDisc[1] = scrollable.scrollTop;
            prevDisc[2] = scrollable.clientHeight * 2 / 1000 + scrollable.clientWidth * 2 / 1000;
            section.innerHTML = prevPosts[0];
            scrollable.scrollTop = prevPosts[1] - prevPosts[2];

            if (lastPost == "finish") {
                document.querySelector('.scrollable_feed > footer')
                    .innerHTML = LOAD_BTN_DISABLED;
            } else {
                document.querySelector('.scrollable_feed > footer')
                    .innerHTML = LOAD_BTN;
            }
            section.classList.remove("discovery");
            section.classList.add("followers");
        } else {
            prevPosts[0] = section.innerHTML;
            prevPosts[1] = scrollable.scrollTop;
            prevPosts[2] = scrollable.clientHeight * 2 / 1000 + scrollable.clientWidth * 2 / 1000;
            section.innerHTML = prevDisc[0];
            scrollable.scrollTop = prevDisc[1] - prevDisc[2];
            document.querySelector('.scrollable_el > footer')
                .innerHTML = LOAD_BTN;
            section.classList.remove("followers");
            section.classList.add("discovery");
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
                            <img src="${posts[i]["propic"]}" alt="Profile picture" />
                        </a>
                    </div>
                    <div class="col-8">
                        <a href="user.php?username=${posts[i]["user"]}">${posts[i]["user"]}</a>
                    </div>
                </div>
            </header>
            <section>
                <a href="./post.php?id=${posts[i]["id"]}&target=post" >
                    <img src="${posts[i]["img_name"]}" alt="Post picture" />
                </a>
            </section>
            <section>
                <div class="row">
                    <div class="col-4">
                        <button onClick="likeClick(this, ${posts[i]["is_liked"]}, ${posts[i]["id"]})">
                            <img src="resources/like_button_${posts[i]["is_liked"]}.png" alt="Like button" />
                        </button>
                        <a href="./post.php?id=${posts[i]["id"]}&target=like" >
                            ${posts[i]["n_likes"]} likes
                        </a>
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                        <a href="./post.php?id=${posts[i]["id"]}&target=comments" >
                            ${posts[i]["n_likes"]} likes
                            <img src="resources/like_button_${posts[i]["is_liked"]}.png" alt="Like button" />
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <p>${posts[i]["description"]}</p>
            </section>
            <footer>
                <pre>Published on ${posts[i]["date"]}</pre>
            </footer>
        </article>
        `;
        result += post;
    }

    if (posts[posts.length - 1]) {
        document.querySelector('.scrollable_feed > footer')
            .innerHTML = LOAD_BTN_DISABLED;
        lastPost = "finish";
    } else {
        lastPost = posts[posts.length - 2]["id"];
    }
    return result;
}

function generateDiscovery(posts) {
    let result = ``;
    let colCount = 0;

    for (let i = 0; i < posts.length; i++) {
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
        section.innerHTML = section.innerHTML + generatePosts(response.data);
    } else {
        formData.append('n_block_disc', N_BLOCK_DISC);
        const response = await axios.post('api/api-discovery.php', formData);
        section.innerHTML = section.innerHTML + generateDiscovery(response.data);
    }
}

function showNotificationSection() {
    if(document.querySelector(".col-lg-7 .search-section")){
        document.querySelector(".col-lg-7 .search-section").outerHTML = "";
    }
    if (document.querySelector(".col-lg-7 .notifications-section")) {
        document.querySelector(".col-lg-7 .notifications-section").outerHTML = "";
        document.querySelector(".scrollable_feed").classList.remove("d-none");
    } else {
        aside.sections[1].retrieve(".row main");
        document.querySelector(".scrollable_feed").classList.add("d-none");
    }

}

function showSearchSection() {
    if(document.querySelector(".col-lg-7 .notifications-section")){
        document.querySelector(".col-lg-7 .notifications-section").outerHTML = "";
    }
    if (document.querySelector(".col-lg-7 .search-section")) {
        document.querySelector(".col-lg-7 .search-section").outerHTML = "";
        document.querySelector(".scrollable_feed").classList.remove("d-none");
    } else {
        aside.sections[0].retrieve(".row main");
        document.querySelector(".scrollable_feed").classList.add("d-none");
    }
}

$(document).ready(function() {
    function handleResize() {
      var windowWidth = $(window).width();

      if ((windowWidth > 768) && (document.querySelector(".scrollable_feed").classList.contains("d-none"))) {
        $('.scrollable_feed').removeClass('d-none');
      }
    }
    $(window).on('load resize', handleResize);
  });

let homeStatus = true;
let prevPosts = [``, 0, 0];
let prevDisc = [``, 0, 0];
let lastPost = -1;

const formData = new FormData();
formData.append('n_block_disc', N_BLOCK_DISC);
axios.post('api/api-discovery.php', formData).then(response => {
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
    if (IS_MOBILE) {
        document.querySelector(".scrollable_feed").style.paddingRight = "21px";
    }
}