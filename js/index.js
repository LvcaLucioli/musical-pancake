const DICT = {
    true: "#followers",
    false: "#discovery"
}
const N_POST = 2;
const N_BLOCK_DISC = 36;


function switchHome(tab) {
    if (tab != homeStatus) {
        const section = document.querySelector("main section");
        const scrollable = document.querySelector("#scrollable_div");
        document.querySelector(DICT[!tab]).classList.remove("active");
        document.querySelector(DICT[tab]).classList.add("active");
        homeStatus = tab;
        scrollStep = scrollable.scrollHeight / 28;
        if (tab) {
            prevDisc[0] = section.innerHTML;
            prevDisc[1] = scrollable.scrollTop;
            section.innerHTML = prevPosts[0];
            scrollable.scrollTop = prevPosts[1] - scrollStep;
        } else {
            prevPosts[0] = section.innerHTML;
            prevPosts[1] = scrollable.scrollTop;
            section.innerHTML = prevDisc[0];
            scrollable.scrollTop = prevDisc[1] - scrollStep;
        }
    }
}

function setIconActive(target) {
    let substring = "-active";
    let buttons = document.querySelectorAll('[aria-label="profile-nav"] ul li button');
    buttons.forEach(button => {
        console.log(button);
        let icon = button.querySelector('img');
        let path = icon.getAttribute('src');
        let new_path = path;
        let offset = path.length - 4;
        if (button === target) {
            new_path = path.slice(0, offset) + substring + path.slice(offset);
        } else {
            new_path = path.slice(0, offset - substring.length) + path.slice(offset);
        }
        icon.setAttribute('src', new_path);
    });

}

function switchNotificationSearch(targetButton, target) {
    if (!targetButton.classList.contains("active")) {
        let buttons = document.querySelectorAll('[aria-label="profile-nav"] ul li button');

        buttons.forEach(button => {
            if (button === targetButton) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        document.querySelectorAll('.profile-aside>section').forEach(function(section) {
            section.classList.add('d-none');
        });
        document.querySelector('#' + target).classList.remove('d-none');
        setIconActive(targetButton);
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

function loadMore() {
    const section = document.querySelector("main section");
    const formData = new FormData();

    if (homeStatus) {
        formData.append('i', lastPost);
        formData.append('n', N_POST);
        lastPost += N_POST
        axios.post('api/api-follow.php', formData).then(response => {
            section.innerHTML = section.innerHTML + generatePosts(response.data);
        });
    } else {
        formData.append('n_block_disc', N_BLOCK_DISC);
        axios.post('api/api-discovery.php', formData).then(response => {
            section.innerHTML = section.innerHTML + generateDiscovery(response.data);
        });
    }
}

function displayNotification(notifications) {
    let notificationSection = document.querySelector("#notifications-section");
    if (window.innerWidth <= 768) {
        // TODO:
    }
    notificationSection.innerHTML = notificationSection.innerHTML + showNotifications(notifications);
}

function search() {
    const formData = new FormData();

    let searchSection = document.querySelector("#search-section");
    let searchQuery = document.querySelector("#search-section input").value;

    formData.append('q', searchQuery);
    axios.post('api/api-search.php', formData).then(response => {
        let allSections = document.querySelectorAll("#search-section section");
        allSections.forEach(function(section) {
            section.remove();
        });
        console.log(searchSection.innerHTML);
        searchSection.innerHTML = searchSection.innerHTML + displaySearchResult(response.data);
        document.querySelector("#search-section input").value = searchQuery;
        document.querySelector("#search-section input").focus();
        console.log(searchSection.innerHTML);
    });

}

let homeStatus = true;
let prevPosts = [``, 0];
let prevDisc = [``, 0];
let lastPost = 0;

const formDataDisc = new FormData();
formDataDisc.append('n_block_disc', N_BLOCK_DISC);
axios.post('api/api-discovery.php', formDataDisc).then(response => {
    prevDisc[0] = generateDiscovery(response.data);
});

const formDataPost = new FormData();
formDataPost.append('i', lastPost);
formDataPost.append('n', N_POST);
lastPost += N_POST;
axios.post('api/api-follow.php', formDataPost).then(response => {
    let posts = generatePosts(response.data);
    const followers = document.querySelector("main div div section");
    followers.innerHTML = posts;
});

axios.post('api/api-notification.php').then(response => {
    displayNotification(response.data);
});