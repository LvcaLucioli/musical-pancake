class PostsDrawer{
    static STATES = { 
        0 : "closed",
        1 : "open"
    }
    static N_POST = 36;

    constructor(user){
        this.user = user;
        this.lastPost = -1;
        this.currentState = PostsDrawer.STATES[1];
        this.topHeight =  document.querySelector("body header").getBoundingClientRect().bottom + (IS_MOBILE ? 40 : 40);
        this.duration = 300;

        const button = document.querySelector("#slide_button .num_posts");
        const formData = new FormData();

        formData.append('username', this.user);
        formData.append('n_posts', "target");

        axios.post('api/api-user-posts.php', formData).then(response => {
            button.innerHTML = response.data;
        });

        if(iOS() && !IS_MOBILE){
          document.querySelector(".scrollable_div").style.width = "69.5vw";
          document.querySelector(".scrollable_div").style.paddingLeft = "0.5%";
          document.querySelector(".scrollable_div").style.paddingRight = "1%";
        }
        if(iOS() && IS_MOBILE){
          if(window.innerWidth < 768) {
            document.querySelector(".scrollable_div").style.width = "103vw";
            document.querySelector(".scrollable_div").style.paddingLeft = "3%";
            document.querySelector(".scrollable_div").style.paddingRight = "1.5%";
          }else{
            document.querySelector(".scrollable_div").style.paddingLeft = "0%";
            document.querySelector(".scrollable_div").style.width = "98.5vw";
            document.querySelector(".scrollable_div").style.paddingRight = "2%";
          }
        }

        this.loadMore();
    }

    slideDownDrawer() {
        let div = $("#drawer");
        let duration = 400;
        
        let targetPosition = window.innerHeight - document.querySelector(".slide_button").offsetHeight + 4;
        if(!IS_MOBILE){
          targetPosition -= 50;
        }else{
          targetPosition -= 5;
        }
        $(".swipe_down-btn").animate({ 
          opacity: "0"
        }, { 
          duration : 300, 
          step: function(now, fx) {     
            $(this).css('opacity', now);
          },
          queue : false
        });
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

        $(".scrollable_user").css("overflow-y", "scroll");
        $(".user_header").css("opacity", "1");
        $(".scrollable_user").css("paddingTop", "0%");
        $("#userlist_section").css("opacity", "1");
        $("main nav[aria-label='followers/following-nav']").css("opacity", "1");
        
        
        if(IS_MOBILE && document.querySelector(".scrollable_user").scrollTop == 0)
          document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "none";

        $(".scrollable_user").css("backgroundColor", "white");
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
            marginLeft: "-5.5vw"
          }, { 
            duration : 1200, 
            step: function(now, fx) {
              $(this).css('marginLeft', now);
            },
            queue : false
          });
          $(".add_icon").animate({ 
            marginLeft: "6.5vw"
          }, { 
            duration : 1200, 
            step: function(now, fx) {
              $(this).css('marginLeft', now);
            },
            queue : false
          });
        }else{
          $(".profile-aside").css("transition-duration", "0.6s");
          $("body>div>div.col-lg-8").css("transition-duration", "0.6s");
          $(".profile-aside").css("backgroundColor", "white");
          $("body>div>div.col-lg-8").css("backgroundColor", "white");
          
        }

        
        document.querySelector("main header nav").classList.add("active");
        this.currentState = PostsDrawer.STATES[0];
        this.duration = 400;
    } 
      
    slideUpDrawer() {
        let div = $("#drawer");
        let duration = this.duration;
      
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
            document.querySelector("#drawer").style.boxShadow = "0 -6px 4px -3px rgba(0, 0, 0, 0.3)";
            $(this).css('top', now);
          },
          queue : false
        });
        

        if (IS_MOBILE){
          $(".user_header").css("opacity", "0");
          $("#userlist_section").css("opacity", "0");
          $("main nav[aria-label='followers/following-nav']").css("opacity", "0");

          let px = window.innerWidth < 768 ? "40px" : "60px";
          $("#drawer").animate({ 
            borderTopLeftRadius: px,
            borderTopRightRadius: px,
            borderBottomLeftRadius: px,
            borderBottomRightRadius: px
          }, { 
            duration : duration, 
            step: function(now, fx) {
              $(this).css('borderRadius', now);
            },
            queue : false
          });
          $(".posts_count").animate({ 
            marginLeft: "0%"
          }, { 
            duration : duration, 
            step: function(now, fx) {
              $(this).css('marginLeft', now);
            },
            queue : false
          });
          $(".add_icon").animate({ 
            marginLeft: "0%"
          }, { 
            duration : duration, 
            step: function(now, fx) {
              $(this).css('marginLeft', now);
            },
            queue : false
          });

          document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
        }else{
          $(".profile-aside").css("backgroundColor", "rgb(210, 210, 210)");
          $("body>div>div.col-lg-8").css("backgroundColor", "rgb(210, 210, 210)");
        }
        
        $(".scrollable_user").css("paddingTop", "30%");

        document.querySelector("main header nav").classList.remove("active");
        this.currentState = PostsDrawer.STATES[1];

        setTimeout(function() {
            $(".swipe_down-btn").animate({ 
              opacity: "1"
            }, { 
              duration : 500, 
              step: function(now, fx) {
                $(".scrollable_user").css("overflow-y", "hidden");
                $(".scrollable_user").css("padding-right", "20px");
                $(this).css('opacity', now);
              },
              queue : false,
              complete: function() {
                
              }
            });
        }, 450);
        $(".scrollable_user").css("backgroundColor", "rgb(210, 210, 210)");
    }      

    loadMore(){
        const section = document.querySelector("#posts_section");
        const formData = new FormData();
        formData.append('username', this.user);
        formData.append('n_posts', PostsDrawer.N_POST);
        formData.append('last_id', this.lastPost);
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
                .innerHTML = `
                <button disabled>
                    <img src="./resources/nomore_white.png" alt="no more item to view">
                </button>`;
      }

      this.lastPost = posts[posts.length-2]["id"];
      return result;
    }
}