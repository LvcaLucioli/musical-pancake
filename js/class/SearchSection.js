class SearchSection extends AbstractSection {
    static sectionId = ".search-section";
    static itemClass = "search";
    static buttonText = "button";

    static USER_BTN = {
        "following": `
                                        <button class="user_btn following_btn" onCLick="aside.sections[aside.activeSection].clickUserBtn(this)">
                                            following
                                        <img src="./resources/following.png">
                                    </button>`,

        "follow": `
                                        <button class="user_btn follow_btn" onCLick="aside.sections[aside.activeSection].clickUserBtn(this)">
                                        follow
                                        <img src="./resources/follow.png">
                                    </button>`,

        "settings": `
                                    <button class="user_btn settings_btn" onCLick="aside.sections[aside.activeSection].clickUserBtn(this)">
                                            settings
                                            <img src="./resources/settings.png">
                                    </button>`
    };

    clickUserBtn(userBtn) {
        const formData = new FormData();
        formData.append('username', userBtn.parentNode.querySelector("p").textContent);
        if (userBtn.textContent.includes("settings")) {
            window.location.href = "./settings.php";
        } else if (userBtn.textContent.includes("following")) {
            formData.append('action', "unfollow");
            axios.post('api/api-follow-unfollow.php', formData).then(response => {
                userBtn.outerHTML = SearchSection.USER_BTN["follow"];
            });
        } else if (userBtn.textContent.includes("follow")) {
            formData.append('action', "follow");
            axios.post('api/api-follow-unfollow.php', formData).then(response => {
                userBtn.outerHTML = SearchSection.USER_BTN["following"];
            });
        }
    }

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
        var i = 0;

        searchResult.forEach(element => {
            var button;
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            this.date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            this.user = element["username"];

            const formData = new FormData();

            formData.append('username', this.user);
            formData.append('date', this.date);

            axios.post('api/api-user.php', formData).then(response => {
                button = SearchSection.USER_BTN[response.data["btn"]];
                this.items[i] = new AsideItem(SearchSection.itemClass, element["propic"], element["username"], element["username"], "", button);
                var child = document.createElement("div");
                document.querySelector(SearchSection.sectionId).appendChild(child);
                child.outerHTML = this.items[i].getHTMLItem();
            });
            i++;
        });
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
        let toRemove = document.querySelector(SearchSection.sectionId).querySelectorAll(".row.search");
        toRemove.forEach(function(element) {
            element.remove();
        });
        formData.append('q', searchQuery);
        axios.post('api/api-search.php', formData).then(response => {
            this.displaySearchResult(response.data);
        });
    }

}