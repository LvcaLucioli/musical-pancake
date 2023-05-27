class PostsDrawer{
    static STATES = { 
        0 : "closed",
        1 : "open"
    }
    static N_POST = 18;

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

        if(iOS() && !IS_MOBILE){
          document.querySelectorAll(".scrollable_div")[1].style.width = "69.5vw";
          document.querySelectorAll(".scrollable_div")[1].style.paddingLeft = "0.5%";
          document.querySelectorAll(".scrollable_div")[1].style.paddingRight = "1%";
        }
        if(iOS() && IS_MOBILE){
          if(window.innerWidth < 768) {
            document.querySelectorAll(".scrollable_div")[1].style.width = "103vw";
            document.querySelectorAll(".scrollable_div")[1].style.paddingLeft = "3%";
            document.querySelectorAll(".scrollable_div")[1].style.paddingRight = "1.5%";
          }else{
            document.querySelectorAll(".scrollable_div")[1].style.paddingLeft = "0%";
            document.querySelectorAll(".scrollable_div")[1].style.width = "98.5vw";
            document.querySelectorAll(".scrollable_div")[1].style.paddingRight = "2%";
          }
        }

        this.loadMore();
    }

    slideDownDrawer() {
        this.topHeight =  document.querySelector("#drawer").getBoundingClientRect().top;
        let div = $("main").children().eq(2);
        let duration = 600;
        
        let targetPosition = window.innerHeight - document.querySelector(".slide_button").offsetHeight;
        if(!IS_MOBILE){
          targetPosition -= 60;
        }
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

        if (IS_MOBILE){
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
            marginLeft: "-3vw"
          }, { 
            duration : 1200, 
            step: function(now, fx) {
              $(this).css('marginLeft', now);
            },
            queue : false
          });
          $(".add_icon").animate({ 
            marginRight: "-7vw"
          }, { 
            duration : 1200, 
            step: function(now, fx) {
              $(this).css('marginRight', now);
            },
            queue : false
          });
        }

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

        if (IS_MOBILE){
          let px = window.innerWidth < 768 ? "40px" : "60px";
          $("#drawer").animate({ 
            borderTopLeftRadius: px,
            borderTopRightRadius: px,
            borderBottomLeftRadius: px,
            borderBottomRightRadius: px
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
          $(".add_icon").animate({ 
            marginRight: "0%"
          }, { 
            duration : 600, 
            step: function(now, fx) {
              $(this).css('marginRight', now);
            },
            queue : false
          });
        }

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
      let result = ``;
      let count = 0;
      let row = posts.length % 6 == 0 
        ? Math.floor(posts.length / 6)
        : Math.floor(posts.length / 6) +1;
  
      for (let j = 1; j <= row; j++) {
        result += `<div class="row">`
        
        for (let i = 0; (i < 6) && (count < posts.length-1); i++) {
          result += `
          <article class="col-4 col-lg-2">
              <a href="post.php?id=${posts[count]["id"]}" >
              <img src="${posts[count]["img_name"]}" alt="Post by ${posts[count]["username"]} on ${posts[count]["date"]}" />
              </a>
          </article>
          `;
          count++;
        }

        if (j != row)
          result += `</div>`
      }

      let missCol = count % 6;
      if (missCol != 0){
        for (let i = 0; i < 6-missCol; i++) {
          result += `
          <article class="col-4 col-lg-2">
          </article>
          `;
        }
        result += `</div>`
      }

      if(posts[posts.length-1]){
        document.getElementById('posts_section')
                .closest('.scrollable_div')
                .querySelector('footer')
                .innerHTML = "finito";
      }

      return result;
    }
}