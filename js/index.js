const dict = {
    true : "#followers",
    false : "#discovery"
}

function switchHome(tab){
    if (tab != home_status){
        const section = document.querySelector("main section");
        document.querySelector(dict[!tab]).classList.remove("active");
        document.querySelector(dict[tab]).classList.add("active");
        home_status = tab;
        if (tab){
            prev_disc = section.innerHTML;
            section.innerHTML = prev_posts;
        }else{
            prev_posts = section.innerHTML;
            section.innerHTML = prev_disc;
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
    if (home_status){
        axios.get('api/api-follow.php').then(response => {
            section.innerHTML = section.innerHTML + generatePosts(response.data);
        });
    }else{
        axios.get('api/api-discovery.php').then(response => {
            section.innerHTML = section.innerHTML + generateDiscovery(response.data);
        });
    }
}

let home_status = true;
let prev_posts = '';
let prev_disc = '';

axios.get('api/api-discovery.php').then(response => {
    prev_disc = generateDiscovery(response.data);
});

axios.get('api/api-follow.php').then(response => {
    let posts = generatePosts(response.data);
    const followers = document.querySelector("main section");
    followers.innerHTML = posts;
});