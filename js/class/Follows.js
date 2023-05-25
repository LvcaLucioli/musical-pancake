class Follows{
    static STATES = { 
        0 : "posts",
        1 : "follows",
    };

    constructor(user){
        this.user = user;
        this.prevFollower = [``, 0, 0];
        this.prevFollowed = [``, 0, 0];

        const follows = document.querySelector("#userlist_section");
        const formData = new FormData();
        formData.append('target', STATES[1]);
        
    }
}