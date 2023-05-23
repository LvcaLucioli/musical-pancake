const DICT = {
    true : "#followers",
    false : "#discovery"
}
const N_POST = 2;
const N_BLOCK_DISC = 36;


async function switchHome(tab){
    if (tab != homeStatus){
        const section = document.querySelector("main section");
        const scrollable = document.querySelector(".scrollable_div");
        document.querySelector(DICT[!tab]).classList.remove("active");
        document.querySelector(DICT[tab]).classList.add("active");
        homeStatus = tab;
        
        if (tab){
            prevDisc[0] = section.innerHTML;
            prevDisc[1] = scrollable.scrollTop;
            prevDisc[2] = scrollable.clientHeight*2/1000 + scrollable.clientWidth*2/1000;
            section.innerHTML = prevPosts[0];
            scrollable.scrollTop = prevPosts[1] - prevPosts[2];
        }else{
            prevPosts[0] = section.innerHTML;
            prevPosts[1] = scrollable.scrollTop;
            prevPosts[2] = scrollable.clientHeight*2/1000 + scrollable.clientWidth*2/1000;
            section.innerHTML = prevDisc[0];
            scrollable.scrollTop = prevDisc[1] - prevDisc[2];
        }
    }
}

function generateDiscovery(posts){
    let result = ``;
    let colCount = 0;

    for(let i=0; i < posts.length; i++){
        colCount++;
        if (colCount == 1){
            result += `<div class="row">`
        }

        let post = `
        <article class="col-4">
            <img src="${posts[i]["img_name"]}" alt="Post image" />
        </article>
        `;
        result += post;

        if (colCount == 3){
            colCount = 0;
            result += `</div>`
        }
    }
    return result;
}

async function loadMore(){
    const section = document.querySelector("main section");
    const formData = new FormData();

    if (homeStatus){
        formData.append('i', lastPost);
        formData.append('n', N_POST);
        lastPost+=N_POST;
        const response = await axios.post('api/api-posts-followed.php', formData);
        section.innerHTML = section.innerHTML + generatePosts(response.data);
    }else{
        formData.append('n_block_disc', N_BLOCK_DISC);
        const response = await axios.post('api/api-discovery.php', formData);
        section.innerHTML = section.innerHTML + generateDiscovery(response.data);
    }
}

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