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
    ].includes(navigator.userAgent)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

async function switchHome(tab){
    if (tab != homeStatus){
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
        formData.append('i', lastPost);
        formData.append('n', N_POST);
        formData.append('date', date);
        lastPost+=N_POST;
        const response = await axios.post('api/api-posts-followed.php', formData);
        section.innerHTML = section.innerHTML + generatePosts(response.data);
    } else {
        formData.append('n_block_disc', N_BLOCK_DISC);
        const response = await axios.post('api/api-discovery.php', formData);
        section.innerHTML = section.innerHTML + generateDiscovery(response.data);
    }
}

function search(targetSection, querySection) {
    const formData = new FormData();
    let searchQuery = querySection.value;
    // reset search area
    let allSections = document.querySelectorAll(targetSection + " section");
    allSections.forEach(function(section) {
        section.remove();
    });

    if (searchQuery === "") return;

    formData.append('q', searchQuery);
    axios.post('api/api-search.php', formData).then(response => {


        document.querySelector(targetSection).innerHTML += displaySearchResult(response.data);

        document.querySelector(targetSection + " input").value = searchQuery;
        document.querySelector(targetSection + " input").focus();
    });
}

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
let homeStatus = true;
let prevPosts = [``, 0, 0];
let prevDisc = [``, 0, 0];
let lastPost = 0;

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
    if (IS_MOBILE){
        if (scrollableDivMain.scrollTop > nav_feed.scrollHeight){
            header.style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
        } else {
            header.style.boxShadow = "none";
        }
    }
});

if (iOS()){
    let scroll_els = document.querySelectorAll('.scrollable_el');
    for (var i = 0; i < scroll_els.length; i++) {
        scroll_els[i].style.paddingRight = "40px";
    }

    if (IS_MOBILE){
        document.querySelector('.scroll-wrap footer button')
                .style
                .marginBottom = "20vh";
    }else{
        document.querySelector('.scroll-wrap footer button')
                .style
                .marginBottom = "12vh";
    }
}