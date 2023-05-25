class UserHelper{
    static STATES = { 
        0 : "posts",
        1 : "follows",
    };

    constructor(){
        this.user = this._get("username");
        this.currentState = UserHelper.STATES[0];

        const header = document.querySelector("main header");
        const formData = new FormData();
        formData.append('username', this.user);
        axios.post('api/api-user.php', formData).then(response => {
            header.innerHTML = this._generateUserPage(response.data);
        });

        this.postsDrawer = new PostsDrawer(this.user);
    }

    loadMore(){
        this.postsDrawer.loadMore();
    }

    switchSection(target){
        if (this.currentState == UserHelper.STATES[0]){
            this.postsDrawer.slideDownDrawer();
        }
        
        this.currentState = target;
    }

    slideDrawer() {
        // manca gestione del bottone di slide
    
        if (this.currentState == UserHelper.STATES[0]){
            this.postsDrawer.slideDownDrawer();
            this.currentState = UserHelper.STATES[1];
        }else{
            this.postsDrawer.slideUpDrawer();
            this.currentState = UserHelper.STATES[0];
        }

        //document.querySelector("#"+ currentState[0] +"_button")
                //.classList.remove("active");
    }
    
    _generateUserPage(user){
        let header = `
                <div class="row">
                    <div class="col-4">
                        <img src="${user["propic"]}" alt="Profile picture" />
                    </div>
                    <div class="col-8">
                        <p>${user["username"]}</p>
                    </div>
                </div>
    
                <nav aria-label="followers/following-nav">
                    <ul>
                        <li id='followers_button'>
                            <button onClick="switchSection('${UserHelper.STATES[1]}')">
                                ${user["followers"]} followers
                            </button>
                        </li>
                        <li id='following_button'>
                            <button onClick="switchSection('${UserHelper.STATES[2]}')">
                                ${user["following"]} following
                            </button>
                        </li>
                    </ul>
                </nav>`;
    
        return header;
    }

    _get(name){
        let params = new URL(window.location.href).searchParams;
        return params.get(name);;
    }
}