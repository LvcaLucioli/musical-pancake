class SearchSection extends AbstractSection {
    static sectionId = "#search-section";
    static itemClass = "search";
    static buttonText = "button";

    retrieve() {
        let child = document.querySelector(".profile-aside-container").querySelector("#notifications-section");
        document.querySelector(".profile-aside-container").innerHTML += `<section id="search-section" class="search-section">
         <header>
             <div>
                 <input type="search" placeholder="search" aria-label="search" oninput="aside.sections[0].search(this); ">
             </div>
         </header></section>`;
    }

    displaySearchResult(searchResult) {
        let markup = "";
        searchResult.forEach(element => {
            this.items[i] = new AsideItem(SearchSection.itemClass, element["propic"], element["username"], element["username"], "", SearchSection.buttonText, "");
            markup += this.items[i].getHTMLItem();
        });
        return markup;
    }

    search(querySection) {
        const formData = new FormData();
        let searchQuery = querySection.value;
        // reset search area
        let allSections = document.querySelector(SearchSection.sectionId).querySelectorAll(".row.search");
        allSections.forEach(function(section) {
            section.remove();
        });

        if (searchQuery === "") return;
        console.log("ciao");
        let toRemove = document.querySelector(SearchSection.sectionId).querySelectorAll(".row.search");
        toRemove.forEach(function(element) {
            element.remove();
        });
        formData.append('q', searchQuery);
        axios.post('api/api-search.php', formData).then(response => {
            document.querySelector(SearchSection.sectionId).innerHTML += aside.sections[aside.activeSection].displaySearchResult(response.data);

            document.querySelector(SearchSection.sectionId + " input").value = searchQuery;
            document.querySelector(SearchSection.sectionId + " input").focus();
        });
    }
}