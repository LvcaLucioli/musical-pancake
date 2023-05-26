class PostsDrawer{
    static STATES = { 
        0 : "closed",
        1 : "open"
    }
    static N_POST = 6;

    constructor(user, isLogged, date){
        this.date = date;
        this.user = user;
        this.lastPost = 0;
        this.currentState = PostsDrawer.STATES[1];
        this.isLogged = isLogged;
        this.topHeight =  0;

        const button = document.querySelector("#slide_button .num_posts");
        const formData = new FormData();

        formData.append('username', this.user);
        formData.append('date', this.date);
        formData.append('n_posts', "target");

        axios.post('api/api-user-posts.php', formData).then(response => {
            button.innerHTML = response.data;
        });
    }

    slideDownDrawer() {
        this.topHeight =  document.querySelector("#drawer").getBoundingClientRect().top;
        let div = $("main").children().eq(2);
        let duration = 600;
        
        let targetPosition = window.innerHeight - document.querySelector(".slide_button").offsetHeight;

        $(".swipe_div").animate({ 
          opacity: "1"
        }, { 
          duration : 500, 
          step: function(now, fx) {
            $(this).css('opacity', now);
          },
          queue : false
        });
        div.animate({ 
          top: targetPosition
        }, {
          duration: duration,
          step: function(now, fx) {
            $(this).css('top', now);
          },
          complete: function() {
            document.querySelector("#drawer").style.boxShadow = "0px -2px 4px rgba(0, 0, 0, 0.1)";
          },
          queue : false
        });
        $("#drawer").animate({ 
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px"
        }, { 
          duration : 1200, 
          step: function(now, fx) {
            $(this).css('borderRadius', now);
          },
          queue : false
        });
        $(".posts_count").animate({ 
          marginLeft: "-10%"
        }, { 
          duration : 1200, 
          step: function(now, fx) {
            $(this).css('marginLeft', now);
          },
          queue : false
        });
        $(".add_button").animate({ 
          marginLeft: "33%"
        }, { 
          duration : 1200, 
          step: function(now, fx) {
            $(this).css('marginLeft', now);
          },
          queue : false
        });

        document.querySelector("main header nav").classList.add("active");
        this.currentState = PostsDrawer.STATES[0];
    } 
      
    slideUpDrawer() {
        let div = $("main").children().eq(2);
        let duration = 600;
      
        $(".swipe_div").animate({ 
          opacity: "0"
        }, { 
          duration : 300, 
          step: function(now, fx) {
            $(this).css('opacity', now);
          },
          queue : false
        });
        div.animate({ top: this.topHeight }, {
          duration: duration,
          step: function(now, fx) {
            document.querySelector("#drawer").style.boxShadow = "0 -4px 8px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.15)";
            $(this).css('top', now);
          },
          queue : false
        });
        $("#drawer").animate({ 
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px"
        }, { 
          duration : 600, 
          step: function(now, fx) {
            $(this).css('borderRadius', now);
          },
          queue : false
        });
        $(".posts_count").animate({ 
          marginLeft: "0%"
        }, { 
          duration : 600, 
          step: function(now, fx) {
            $(this).css('marginLeft', now);
          },
          queue : false
        });
        $(".add_button").animate({ 
          marginLeft: "22%"
        }, { 
          duration : 600, 
          step: function(now, fx) {
            $(this).css('marginLeft', now);
          },
          queue : false
        });

        document.querySelector("main header nav").classList.remove("active");
        this.currentState = PostsDrawer.STATES[1];
    }      

    loadMore(){
        const section = document.querySelector("#posts_section");
        const formData = new FormData();
        formData.append('username', this.user);
        formData.append('n_posts', PostsDrawer.N_POST);
        formData.append('i', this.lastPost);
        formData.append('date', this.date);
        this.lastPost += PostsDrawer.N_POST;
        axios.post('api/api-user-posts.php', formData).then(response => {
            section.innerHTML = section.innerHTML + this._generatePosts(response.data);
        });
    }

    _generatePosts(posts){
      console.log("ciao");
      let result = ``;
      let colCount = 0;
      let row = posts.length % 3 == 0 
        ? posts.length % 3 
        : (posts.length % 3) +1;
  
      for (let j = 0; j < row; j++) {
        result += `<div class="row">`

        for (let i = 0; i < posts.length; i++) {
          colCount++;
  
          let post = `
          <article class="col-4">
              <img src="${posts[i]["img_name"]}" alt="Post image" />
          </article>
          `;
          result += post;
        }

        let missCol = colCount % 3;
        if (missCol == 0){
          colCount = 0;
        }else{
          for (let i = 0; i < missCol; i++) {
            result += `
            <article class="col-4">
            </article>
            `;
          }
        }

        result += `</div>`
      }
      return result;
    }
}