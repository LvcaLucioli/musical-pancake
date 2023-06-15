const DICT = {
    true: "#followers",
    false: "#discovery"
}

const N_POST = 2;
const N_BLOCK_DISC = 2;

const LOAD_BTN = ` 
    <button onclick="loadMore();">
        view more
        <img src="./resources/load_white.png" alt="load more item">
    </button>`;
const LOAD_BTN_DISABLED = `
    <button aria-label="no more item to view" disabled>
        <img src="./resources/nomore.png" alt="no more item to view">
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

function alt_like_btn(state) {
    if (state) {
        return "liked post, click to unlike";
    } else {
        return "click to like the post"
    }
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
            section.setAttribute("aria-label", "posts from followed users");
        } else {
            prevPosts[0] = section.innerHTML;
            prevPosts[1] = scrollable.scrollTop;
            prevPosts[2] = scrollable.clientHeight * 2 / 1000 + scrollable.clientWidth * 2 / 1000;
            section.innerHTML = prevDisc[0];
            scrollable.scrollTop = prevDisc[1] - prevDisc[2];
            document.querySelector('.scrollable_feed > footer')
                .innerHTML = LOAD_BTN;
            section.classList.remove("followers");
            section.classList.add("discovery");
            section.setAttribute("aria-label", "discover posts");
        }
    }
}

function likeClick(button, isLiked, postId) {
    const formData = new FormData();
    formData.append('id', postId);
    let path = button.querySelector("img").getAttribute("src");
    let text = document.querySelectorAll(".like_block button")[1];
    console.log(text.innerHTML.trim());
    let n_likes = parseInt(text.innerHTML.trim().split(" ")[0]);

    if (isLiked) {
        formData.append('action', 'remove');
        path = path.replace("true", "false");
        button.setAttribute("onClick", "likeClick(this, false, " + postId + ")");
        text.innerHTML = (n_likes - 1) + " likes";
    } else {
        formData.append('action', 'add');
        path = path.replace("false", "true");
        button.setAttribute("onClick", "likeClick(this, true, " + postId + ")");
        text.innerHTML = (n_likes + 1) + " likes";
    }
    button.setAttribute("aria-pressed", !isLiked);
    button.setAttribute("aria-label", alt_like_btn(!isLiked));
    button.querySelector("img").setAttribute("src", path);
    button.querySelector("img").setAttribute("alt", alt_like_btn(!isLiked));
    axios.post('api/api-like.php', formData).then(response => {});
}

function generatePosts(posts) {
    if (posts.length > 1) {
        let result = '';

        for (let i = 0; i < posts.length - 1; i++) {
            let post = `
            <article class="shadow-lg" aria-labe="post by ${posts[i]["user"]}">
                <header>
                    <div class="row">
                        <div class="col-3">
                            <a href="user.php?username=${posts[i]["user"]}" alt="view user details">
                                <img src="${posts[i]["propic"]}" alt="profile picture" />
                            </a>
                        </div>
                        <div class="col-8">
                            <a href="user.php?username=${posts[i]["user"]}" alt="view user details">${posts[i]["user"]}</a>
                        </div>
                    </div>
                </header>
                <section>
                    <button type="button" data-toggle="modal" data-target="#postModal" data-postid="${posts[i]["id"]}" data-target="post" alt="open post pop-up page">
                        <img src="${posts[i]["img_name"]}" alt="post picture" />
                    </button>
                </section>
                <section>
                    <div class="row">
                        <div class="col-6 like_block">
                            <button onClick="likeClick(this, ${posts[i]["is_liked"]}, ${posts[i]["id"]})" aria-pressed="${posts[i]["is_liked"]}" alt="${alt_like_btn(posts[i]["is_liked"])}">
                                <img src="resources/like_button_${posts[i]["is_liked"]}.png" alt="${alt_like_btn(posts[i]["is_liked"])}">
                            </button>
                            <button type="button" data-toggle="modal" data-target="#postModal" data-postid="${posts[i]["id"]}" data-target="like" alt="show post likes">
                                ${posts[i]["n_likes"]} likes
                            </button>
                        </div>
                        <div class="col-6 comments_block text-right">
                            <button type="button" data-toggle="modal" data-target="#postModal"  data-postid="${posts[i]["id"]}" data-target="comments" alt="show post comments">
                                <span>add comment</span> &nbsp;&nbsp;${posts[i]["n_comments"]}
                                <img src="resources/comment.png" alt="view and add commens">
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <p>${posts[i]["description"]}</p>
                </section>
                <footer>
                    <pre>Published on ${posts[i]["date"].split(" ")[0]}</pre>
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
            document.querySelector('.scrollable_feed > footer')
                .innerHTML = LOAD_BTN;
        }
        return result;
    } else {
        document.querySelector('.scrollable_feed > footer')
            .innerHTML = ``;
        return "<pre class='no-feed-posts text-center'>no posts to view</pre>";
    }
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
    if (!isLoading) {
        isLoading = true;
        document.querySelector('.scrollable_feed > footer button')
            .innerHTML = `
            loading...
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">loading...</span>
            </div>`;

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
            document.querySelector('.scrollable_feed > footer')
                .innerHTML = LOAD_BTN;
        }
        isLoading = false;
    }
}

function showNotificationSection() {
    if (document.querySelector("main .search-section")) {
        document.querySelector("main .search-section").outerHTML = "";
    }
    if (document.querySelector("main .notifications-section")) {
        document.querySelector("main .notifications-section").outerHTML = "";
        document.querySelector(".scrollable_feed").classList.remove("d-none");
    } else {
        aside.sections[1].show(".row main");
        document.querySelector(".scrollable_feed").classList.add("d-none");
        console.log(document.querySelector(".notifications-section"));
    }

}

function showSearchSection() {
    if (document.querySelector("main .notifications-section")) {
        document.querySelector("main .notifications-section").outerHTML = "";
    }
    if (document.querySelector("main .search-section")) {
        document.querySelector("main .search-section").outerHTML = "";
        document.querySelector(".scrollable_feed").classList.remove("d-none");
    } else {
        aside.sections[0].show(".row main");
        document.querySelector(".scrollable_feed").classList.add("d-none");
    }
}

$(document).ready(function() {
    function handleResize() {
        var windowWidth = $(window).width();

        if ((windowWidth > 992) && (document.querySelector(".scrollable_feed").classList.contains("d-none"))) {
            $('.scrollable_feed').removeClass('d-none');
        }

        if ((windowWidth > 992) && (document.querySelector("main .search-section"))) {
            document.querySelector("main .search-section").outerHTML = "";
        }
        if ((windowWidth > 992) && (document.querySelector("main .notifications-section"))) {
            document.querySelector("main .notifications-section").outerHTML = "";
        }
    }
    $(window).on('load resize', handleResize);
});

let homeStatus = true;
let prevPosts = [``, 0, 0];
let prevDisc = [``, 0, 0];
let lastPost = -1;
let isLoading = false;

const formData = new FormData();
formData.append('n_block_disc', N_BLOCK_DISC);
axios.post('api/api-discovery.php', formData).then(response => {
    prevDisc[0] = generateDiscovery(response.data);
});

loadMore();

// set posts scroll shadow 
let scrollableDivMain = document.querySelectorAll('.scrollable_feed')[0];
let isScrollingMain;
const screenWidth = window.innerWidth;

scrollableDivMain.addEventListener('scroll', function() {
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

if (iOS() && window.innerWidth < 768) {
    document.querySelector("main div.scrollable_feed > footer").style.marginBottom = "50%";
}