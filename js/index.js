const DICT = {
    true : "#followers",
    false : "#discovery"
}
const N_POST = 2;

function switchHome(tab){
    if (tab != homeStatus){
        const section = document.querySelector("main section");
        document.querySelector(DICT[!tab]).classList.remove("active");
        document.querySelector(DICT[tab]).classList.add("active");
        homeStatus = tab;
        if (tab){
            prevDisc = section.innerHTML;
            section.innerHTML = prevPosts;
        }else{
            prev_posts = section.innerHTML;
            section.innerHTML = prevDisc;
        }
    }
}

function generateDiscovery(posts){
    let result = posts;

    /*for(let i=0; i < articoli.length; i++){
        let articolo = `
        <article>
            <header>
                <div>
                    <img src="${articoli[i]["imgarticolo"]}" alt="" />
                </div>
                <h2>${articoli[i]["titoloarticolo"]}</h2>
                <p>${articoli[i]["nome"]} - ${articoli[i]["dataarticolo"]}</p>
            </header>
            <section>
                <p>${articoli[i]["anteprimaarticolo"]}</p>
            </section>
            <footer>
                <a href="articolo.php?id=${articoli[i]["idarticolo"]}">Leggi tutto</a>
            </footer>
        </article>
        `;
        result += articolo;
    }*/
    return result;
}

function loadMore(){
    const section = document.querySelector("main section");
    if (homeStatus){
        formData.append('i', lastPost);
        formData.append('n', N_POST);
        lastPost+=N_POST
        axios.post('api/api-follow.php', formData).then(response => {
            section.innerHTML = section.innerHTML + generatePosts(response.data);
        });
    }else{
        axios.get('api/api-discovery.php').then(response => {
            section.innerHTML = section.innerHTML + generateDiscovery(response.data);
        });
    }
}

let homeStatus = true;
let prevPosts = '';
let prevDisc = '';
let lastPost = 0;

axios.get('api/api-discovery.php').then(response => {
    prevDisc = generateDiscovery(response.data);
});

const formData = new FormData();
formData.append('i', lastPost);
formData.append('n', N_POST);
lastPost+=N_POST
axios.post('api/api-follow.php', formData).then(response => {
    console.log(response.data, lastPost);
    let posts = generatePosts(response.data);
    const followers = document.querySelector("main section");
    followers.innerHTML = posts;
});