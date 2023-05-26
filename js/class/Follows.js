class Follows{
    static STATES = { 
        0 : "follower",
        1 : "followed",
    };
    static N_USERS = 3;

    constructor(user, isLogged){
        this.user = user;
        this.prevFollowers = {
            "html" : ``, 
            "pos": 0, 
            "step": 0,
            "last" : 0
        };
        this.prevFollowed = {
            "html" : ``, 
            "pos": 0, 
            "step": 0,
            "last" : 0
        };
        this.isLogged = isLogged;
        this.currentState = Follows.STATES[0];
        

        
    }

    loadMore(){
            
    }

    _loadMoreFollowers(){
        const follows = document.querySelector("#userlist_section");
        const formData = new FormData();

        formData.append('username', this.user);
        formData.append('i', this.prevFollowers["last"]);
        formData.append('n', Follows.N_USERS);
        this.prevFollowers["last"]+=Follows.N_USERS;
        axios.post('api/api-followers.php', formData).then(response => {
            follows.innerHTML = follows.innerHTML + this.generateList(response.data);
        });
    }

    _loadMoreFollowed(){
        const follows = document.querySelector("#userlist_section");
        const formData = new FormData();

        formData.append('username', this.user);
        formData.append('i', this.prevFollowers["last"]);
        formData.append('n', Follows.N_USERS);
        this.prevFollowers["last"]+=Follows.N_USERS;
        axios.post('api/api-followers.php', formData).then(response => {
            follows.innerHTML = follows.innerHTML + this.generateList(response.data);
        });
    }
}