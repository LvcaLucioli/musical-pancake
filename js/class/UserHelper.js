class UserHelper{
    static STATES = { 
        0 : "posts",
        1 : "follows"
    };

    constructor(){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        this.date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        this.user = this._get("username");
        this.currentState = UserHelper.STATES[0];
        this.isLogged = false;

        const header = document.querySelector("main header");
        const formData = new FormData();

        axios.get('api/api-check-login.php', formData).then(response => {
            if (response.data == this.user)
                this.isLogged = true;
        });

        formData.append('username', this.user);
        formData.append('date', this.date);
        axios.post('api/api-user.php', formData).then(response => {
            header.innerHTML = this._generateUserPage(response.data);
        });

        this.postsDrawer = new PostsDrawer(this.user, this.isLogged, this.date);
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
                <div class="user_header">
                    <div class="row ">
                        <div class="col-5">
                            <img src="${user["propic"]}" alt="Profile picture" />
                        </div>
                        <div class="col-7 user_info">
                            <div class="row">
                                <div class="col-10">
                                    <p class="username">${user["username"]}</p>
                                </div>
                                <div class="col-2 edit_user_btn">
                                    bt
                                </div>
                            </div>
                            <div class="row bio">
                                <pre class="bio">${user["bio"]}</pre>
                            </div>
                        </div>
                    </div>
                </div>
    
                <nav aria-label="followers/following-nav">
                    <ul>
                        <li id='followers_button'>
                            <a onClick="switchSection('${UserHelper.STATES[1]}')" class="active">
                            <span class="num">${user["followers"]}</span> followers
                            </a>
                        </li>
                        <li id='following_button'>
                            <a onClick="switchSection('${UserHelper.STATES[2]}')">
                            <span class="num">${user["following"]}</span> following
                            </a>
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