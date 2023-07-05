class SearchSection extends AbstractSection {
    static class = ".search-section";
    static itemClass = "search";
    static buttonText = "button";
    static N_SEARCH_RESULT = 4;
    searchResults = [];
    // lastSearchResult = -1;
    isLoading = false;
    abortController = new AbortController();

    constructor(target, postId, username) {
        super();
        if (postId) this.postId = postId;
        if (username) this.username = username;

        this.target = target;
        this.LOAD_BTN = ` 
    <button data-target="${this.target}" onclick="loadMoreSection(this);">
        view more
        <img src="./resources/load_white.png" alt="load more item">
    </button>`;
    }

    static USER_BTN = {
        "following": `
                                        <button class="user_btn following_btn" onCLick="clickUserBtn(this)">
                                            following
                                        <img src="./resources/following.png" alt="following">
                                    </button>`,

        "follow": `
                                        <button class="user_btn follow_btn" onCLick="clickUserBtn(this)">
                                        follow
                                        <img src="./resources/follow.png" alt="follow">
                                    </button>`,

        "settings": `
                                    <button class="user_btn settings_btn" onCLick="clickUserBtn(this)">
                                            settings
                                            <img src="./resources/settings.png" alt="settings">
                                    </button>`
    };

    loadMore() {
        if (!this.isLoading) {
            this.isLoading = true;
            // if (!document.querySelector(this.container + " " + SearchSection.class + ' footer')) {
            //     var child = document.createElement("footer");
            //     document.querySelector(this.container + " " + SearchSection.class).appendChild(child);
            // }
            // document.querySelector(this.container + " " + SearchSection.class + ' footer')
            //     .innerHTML = `
            //                 <button onclick="loadMore();">
            //                     loading...
            //                     <div class="spinner-border text-light" role="status">
            //                         <span class="sr-only">loading...</span>
            //                     </div>
            //                 </button>`;

            
            // add items to searchlist
            this.searchResults.slice(0, SearchSection.N_SEARCH_RESULT).forEach(element => {
                var child = document.createElement("div");
                document.querySelector(this.container + " " + SearchSection.class).appendChild(child);
                child.outerHTML = element;
            });

            this.searchResults = this.searchResults.slice(SearchSection.N_SEARCH_RESULT, this.searchResults.length);

            if (document.querySelector(this.container + " " + SearchSection.class + ' footer')) {
                document.querySelector(this.container + " " + SearchSection.class + ' footer').outerHTML = "";
            }

            var child = document.createElement("footer");
            document.querySelector(this.container + " " + SearchSection.class).appendChild(child);
            if (this.searchResults.length == 0) {
                child.innerHTML = this.LOAD_BTN_DISABLED;
            } else {
                child.innerHTML = this.LOAD_BTN;
            }

            this.isLoading = false;
        }
    }

    clickUserBtn(userBtn) {
        const formData = new FormData();
        formData.append('username', userBtn.parentNode.querySelector("button span").textContent);
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

    async retrieve(searchQuery) {

        this.searchResults = [];

        this.abortController.abort();
        this.abortController = new AbortController();

        // reset if nothing is found
        // if ((searchQuery == "") && (this.target == "users")) return;

        const formData = new FormData();
        formData.append('q', searchQuery);
        formData.append('target', this.target);
        if (this.postId) formData.append('postId', this.postId);
        if (this.username) formData.append('username', this.username);

        try {
            const response = await axios.post('api/api-search.php', formData, { signal: this.abortController.signal });
            if (response.data.length > 0) {
                for (const element of response.data) {
                    const formData = new FormData();
                    formData.append('username', element["username"]);

                    const userResponse = await axios.post('api/api-search-user.php', formData, { signal: this.abortController.signal });
                    const button = SearchSection.USER_BTN[userResponse.data["btn"]];

                    this.searchResults.push(`<div class="row ${SearchSection.itemClass}">
                                                <button tabindex="0" type="button" class="content" onClick="redirectToPage('user.php?username=${element["username"]}')">
                                                        <img src="./uploads/${userResponse.data["propic"]}" alt="${element["username"]} propic">
                                                        <span class="content-copy">${element["username"]}</span>
                                                </button>
                                                ${button}
                                            </div>`);
                }
            }
        } catch (error) {
            return error;
        }
    }


    show() {
        var section = document.createElement("div");
        var content = ``;
        document.querySelector(this.container).appendChild(section);
        
        switch (this.target) {
            case "likes":
                content = ` <section class="search-section">
                                <header>
                                    <div>
                                        <input type="search" placeholder="search" aria-label="search" data-target="${this.target}" onload="search(this)" oninput="modalHelper.searchContainer.sections[modalHelper.searchContainer.activeSection].search(this); ">
                                    </div>
                                </header>
                            </section>`;
                break;
            case "users":
            case "followers":
            case "following":
                content = `<section class="search-section">
                <header>
                    <div>
                        <input type="search" placeholder="search" aria-label="search" data-target="${this.target}" onload="search(this)" oninput="search(this); ">
                    </div>
                </header></section>`;
                break;
        }
        section.outerHTML = content;
    }

    resetArea() {
        const searchSection = document.querySelector(this.container + " " + SearchSection.class);
        searchSection.querySelectorAll("." + SearchSection.itemClass).forEach(function (row) {
            row.remove();
        });
        if (searchSection.querySelector("footer")) searchSection.querySelector("footer").outerHTML = "";
    }

    async search(querySection) {

        if ((querySection.value == "") && (this.target == "users")) this.resetArea();

        if ((querySection.value != "") || (this.target != "users")) {
            if (!document.querySelector(this.container + " " + SearchSection.class + ' footer')) {
                var child = document.createElement("footer");
                document.querySelector(this.container + " " + SearchSection.class).appendChild(child);
            }
            document.querySelector(this.container + " " + SearchSection.class + ' footer')
                .innerHTML = `
                            <button onclick="loadMore();">
                                loading...
                                <div class="spinner-border text-light" role="status">
                                    <span class="sr-only">loading...</span>
                                </div>
                            </button>`;
            var error = await this.retrieve(querySection.value);
            this.resetArea();
            if (!error) this.loadMore();
        }

    }


}