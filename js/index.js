const dict = {
    true : "#followers",
    false : "#discovery"
}

function switchHome(tab){
    const section = document.querySelector("main section");
    console.log(dict[tab]);
    document.querySelector(dict[!tab]).classList.remove("active");
    document.querySelector(dict[tab]).classList.add("active");
    if (tab){
            section.innerHTML = "follow";
    }else{
            section.innerHTML = "disc";
    }
}

function generaArticoli(articoli){
    let result = "";

    for(let i=0; i < articoli.length; i++){
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
    }
    return result;
}
/*
axios.get('api-articolo.php').then(response => {
    console.log(response);
    let articoli = generaArticoli(response.data);
    const main = document.querySelector("main");
    main.innerHTML = articoli;
});*/