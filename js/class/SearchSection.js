class SearchSection extends AbstractSection {
    static class = ".search-section";
    static itemClass = "search";
    static buttonText = "button";
    static N_SEARCH_RESULT = 10;
    searchResults = [];
    // lastSearchResult = -1;
    // isLoading = false;
    abortController = new AbortController();

    // constructor(container){
    //     super();
    //     this.container = container;
    // }

    static USER_BTN = {
        "following": `
                                        <button class="user_btn following_btn" onCLick="container.sections[0].clickUserBtn(this)">
                                            following
                                        <img src="./resources/following.png">
                                    </button>`,

        "follow": `
                                        <button class="user_btn follow_btn" onCLick="container.sections[0].clickUserBtn(this)">
                                        follow
                                        <img src="./resources/follow.png">
                                    </button>`,

        "settings": `
                                    <button class="user_btn settings_btn" onCLick="container.sections[0].clickUserBtn(this)">
                                            settings
                                            <img src="./resources/settings.png">
                                    </button>`
    };

    static LOAD_BTN = ` 
    <button onclick="container.sections[0].loadMore();">
        view more
        <img src="./resources/load_white.png" alt="load more item">
    </button>`;

    loadMore() {
        // if (!isLoading) {
        //     isLoading = true;

        // if(document.querySelector(SearchSection.class + ' footer button')){
        //     console.log("loading footer");
        //     document.querySelector(SearchSection.class + ' footer button').innerHTML = `
        //     loading...
        //     <div class="spinner-border text-light" role="status">
        //       <span class="sr-only">loading...</span>
        //     </div>`;

        //     console.log(document.querySelector(SearchSection.class + ' footer'));
        // }else{
        //     var child = document.createElement("footer");
        //     document.querySelector(SearchSection.class).appendChild(child);
        //     child.innerHTML = `
        //     loading...
        //     <div class="spinner-border text-light" role="status">
        //       <span class="sr-only">loading...</span>
        //     </div>`;
        //     console.log(document.querySelector(SearchSection.class + ' footer'));
        // }

        // document.querySelector(SearchSection.class).innerHTML = "";
        // this.show();
        

        // add items to searchlist
        this.searchResults.slice(0, SearchSection.N_SEARCH_RESULT).forEach(element => {
            var child = document.createElement("div");
            document.querySelector(SearchSection.class).appendChild(child);
            child.outerHTML = element.getHTMLItem();
        });

        this.searchResults = this.searchResults.slice(SearchSection.N_SEARCH_RESULT, this.searchResults.length);

        // this.lastSearchResult = this.searchResults.slice(0, SearchSection.N_SEARCH_RESULT).length - 1;

        if (document.querySelector(SearchSection.class + ' footer')) {
            document.querySelector(SearchSection.class + ' footer').outerHTML = "";
        }

        var child = document.createElement("footer");
        document.querySelector(SearchSection.class).appendChild(child);
        if (this.searchResults.length == 0) {
            child.innerHTML = SearchSection.LOAD_BTN_DISABLED;
        } else {
            child.innerHTML = SearchSection.LOAD_BTN;
        }

        //     isLoading = false;
        // }
    }

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

    async retrieve(searchQuery) {

        this.searchResults = [];

        this.abortController.abort();
        this.abortController = new AbortController();
        // reset search area
        const searchSection = document.querySelector(SearchSection.class);
        searchSection.querySelectorAll("." + SearchSection.itemClass).forEach(function (row) {
            row.remove();
        });

        // reset if nothing is found
        if (searchQuery == "") return;

        const formData = new FormData();
        formData.append('q', searchQuery);
        try {
            const response = await axios.post('api/api-search.php', formData, { signal: this.abortController.signal });
            if (response.data.length > 0) {
                for (const element of response.data) {
                    const formData = new FormData();
                    formData.append('username', element["username"]);

                    const userResponse = await axios.post('api/api-user.php', formData, { signal: this.abortController.signal });
                    const button = SearchSection.USER_BTN[userResponse.data["btn"]];

                    this.searchResults.push(new AsideItem(SearchSection.itemClass, element["propic"], element["username"], [element["username"]], "user.php?username=" + element["username"], button));
                }
            }
        } catch (error) {}


    }


    show() {
        this.container.innerHTML += `<section class="search-section">
         <header>
             <div>
                 <input type="search" placeholder="search" aria-label="search" oninput="container.sections[0].search(this); ">
             </div>
         </header></section>`;
    }

    async search(querySection) {
        await this.retrieve(querySection.value);
        this.loadMore();

    }


}