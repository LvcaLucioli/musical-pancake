class PostsDrawer{
    static STATES = { 
        0 : "closed",
        1 : "open"
    }
    static N_POST = 6;

    constructor(user){
        this.user = user;
        this.lastPost = 0;
        this.currentState = PostsDrawer.STATES[1];
        const section = document.querySelector("#posts_section");
        const button = document.querySelector("#slide_button");
        
        const formData = new FormData();
        formData.append('username', this.user);
        formData.append('n_posts', PostsDrawer.N_POST);
        formData.append('i', this.lastPost);
        this.lastPost+=PostsDrawer.N_POST;
        axios.post('api/api-user-posts.php', formData).then(response => {
            section.innerHTML = generatePosts(response.data);
            button.children[0].children[0].innerHTML = String(response.data.length) + " posts";
        });
    }

    slideDownDrawer() {
        let div = $("main").children().eq(2);
        let duration = 600;
        let targetPosition = '97%';
      
        div.animate({ top: targetPosition }, {
          duration: duration,
          step: function(now, fx) {
            $(this).css('top', now);
          },
          complete: function() {
            $(this).css({ overflowY: 'hidden' });
            $(this).children().eq(1).css({ overflowY: 'hidden' });
          }
        });
      
        this.currentState = PostsDrawer.STATES[0];
    }
      
    slideUpDrawer() {
        let div = $("main").children().eq(2);
        const header = $("main header");
        let topHeight = header.outerHeight() + $("body header").outerHeight();
        let duration = 600;
      
        div.animate({ top: topHeight }, {
          duration: duration,
          step: function(now, fx) {
            $(this).css('top', now);
          },
          complete: function() {
            $(this).children().eq(1).css({ overflowY: 'scroll' });
          }
        });
      
        this.currentState = PostsDrawer.STATES[1];
    }      

    loadMore(){
        const section = document.querySelector("#posts_section");
        const formData = new FormData();
        formData.append('username', this.user)
        formData.append('n_posts', PostsDrawer.N_POST);
        formData.append('i', this.lastPost);
        this.lastPost += PostsDrawer.N_POST;
        axios.post('api/api-user-posts.php', formData).then(response => {
            section.innerHTML = section.innerHTML + generatePosts(response.data);
        });
    }
}