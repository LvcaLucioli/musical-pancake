class UserHelper{
    static STATES = { 
        0 : "posts",
        1 : "follows"
    };

    static USER_BTN = {
        "following" : `
                                        <button class="user_btn following_btn" onCLick="clickUserBtn()">
                                            following
                                        <img src="./resources/following.png">
                                    </button>`,
                            
        "follow" : `
                                        <button class="user_btn follow_btn" onCLick="clickUserBtn()">
                                        follow
                                        <img src="./resources/follow.png">
                                    </button>`,

        "settings" : `
                                    <button class="user_btn settings_btn" onCLick="clickUserBtn()">
                                            settings
                                            <img src="./resources/settings.png">
                                    </button>`
    };
    

    constructor(){
        this.userBtn = "unset";
        this.user = this._get("username");
        this.currentState = UserHelper.STATES[0];
        this.init = true;

        const header = document.querySelector("main header");
        const formData = new FormData();

        formData.append('username', this.user);
        axios.post('api/api-user.php', formData).then(response => {
            header.innerHTML = this._generateUserPage(response.data);
        });

        this.postsDrawer = new PostsDrawer(this.user);

        if(iOS() && IS_MOBILE){
            if(window.innerWidth < 768) {
              document.querySelector(".scrollable_user").style.paddingRight = "20px";
            }
        } else if (iOS()){
            document.querySelector(".scrollable_user").style.marginTop = "-3%";
        }
    }

    loadMore(){
        this.postsDrawer.loadMore();
    }

    switchSection(target){
        if (this.currentState == UserHelper.STATES[0]){
            this.postsDrawer.slideDownDrawer();
        }
        
        document.querySelector('nav[aria-label="followers/following-nav"] button.active')
                .setAttribute("aria-pressed", false);
        document.querySelector('nav[aria-label="followers/following-nav"] button.active')
                .classList.remove("active");
        document.querySelector("#"+ target +"_button button")
                .setAttribute("aria-pressed", true);
        document.querySelector("#"+ target +"_button button")
                .classList.add("active");
        this.currentState = UserHelper.STATES[1];
    }

    slideDrawer() {
        if (this.currentState == UserHelper.STATES[0] && !this.init){
            this.postsDrawer.slideDownDrawer();
            this.currentState = UserHelper.STATES[1];
        }else{
            this.postsDrawer.slideUpDrawer();
            this.currentState = UserHelper.STATES[0];
            this.init = false;
        }
    }

    swipeUp(){
        if (this.init || this.currentState == UserHelper.STATES[1]){
            this.postsDrawer.slideUpDrawer();
            this.currentState = UserHelper.STATES[0];
            this.init = false;
        }
    }

    swipeDown(){
        if (this.init || this.currentState == UserHelper.STATES[0]){
            this.postsDrawer.slideDownDrawer();
            this.currentState = UserHelper.STATES[1];
            this.init = false;
        }
    }

    clickUserBtn(){
        const formData = new FormData();
        formData.append('username', this.user);
        
        switch (this.userBtn){
            case "settings" :
                window.location.href = "./settings.php";
                break;

            case "following":
                formData.append('action', "unfollow");
                axios.post('api/api-follow-unfollow.php', formData).then(response => {
                    document.querySelector("#btn_space").innerHTML = UserHelper.USER_BTN["follow"];
                });
                document.querySelector("#followers_button .num").innerHTML = parseInt(document.querySelector("#followers_button .num").innerHTML) -1;
                this.userBtn = "follow";
                break;

            case "follow":
                formData.append('action', "follow");
                axios.post('api/api-follow-unfollow.php', formData).then(response => {
                    document.querySelector("#btn_space").innerHTML = UserHelper.USER_BTN["following"];
                });
                document.querySelector("#followers_button .num").innerHTML = parseInt(document.querySelector("#followers_button .num").innerHTML) +1;
                this.userBtn = "following";
                break;
        }
    }
    
    _generateUserPage(user){
        let header = `
                <div class="user_header">
                    <div class="row ">
                        <div class="col-5 col-md-3">
                            <img class="propic" src="${user["propic"]}" alt="Profile picture" />
                        </div>
                        <div class="col-7 col-md-9 user_info">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <p class="text-wrap text-break username">${user["username"]}</p>
                                </div>
                                                           
                                <div class="col-12 col-md-6">
                                    <pre class="bio">${user["bio"]}</pre>
                                </div>

                                <div class="col-12 col-lg-6" id="btn_space">`
                                + UserHelper.USER_BTN[user["btn"]] + `
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <nav aria-label="followers/following-nav">
                    <ul>
                        <li id='followers_button'>
                            <button onClick="switchSection('followers')" class="active" aria-pressed="true">
                            <span class="num">${user["followers"]}</span> followers
                            </a>
                        </li>
                        <li id='following_button'>
                            <button onClick="switchSection('following')" aria-pressed="false">
                            <span class="num">${user["following"]}</span> following
                            </a>
                        </li>
                    </ul>
                </nav>`;
    
        this.userBtn = user["btn"];

        if (user["btn"] == "settings"){
            if (window.innerWidth < 768) {
                document.getElementsByClassName("nav-item")[1].innerHTML = `
                <div>
                    <a class="nav-link" href="logout.php">
                        <img src="./resources/logout.png" alt="Logout from your account" class="logout">
                    </a>
                    <span class="label d-none d-md-inline">logout</span>
                </div>`;
            } else {
                document.getElementsByClassName("navbar-nav")[0].innerHTML += `
                <li class="nav-item">
                    <div>
                        <a class="nav-link logout_lg" href="logout.php">
                            <img src="./resources/logout.png" alt="">
                            <span class="label d-none d-md-inline">logout</span>
                        </a>
                    </div>
                </li>`;
            }
            
        }
        return header;
    }

    _get(name){
        let params = new URL(window.location.href).searchParams;
        return params.get(name);;
    }
}