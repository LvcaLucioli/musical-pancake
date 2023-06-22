class ModalPostHelper{
    static N_ITEMS = 3;
    static STATES = { 
        0 : "comments",
        1 : "likes"
    };
    static LOAD_BTN = `
        <footer>
            <button onclick="modalLoadMore();">
                view more
                <img src="./resources/load_white.png" alt="load more items">
            </button>
        </footer>`;
    static LOAD_DISABLED_BTN = `
        <footer>
            <button aria-label="no more item to view" disabled>
            <img src="./resources/nomore.png" alt="no more item to view">
            </button>
        </footer>`;
    static LIKE_BTN = `
        <button onClick="modalLikeClick(false)" aria-pressed="false" alt="click to like the post">
            <img src="resources/like_button_white_false.png" alt="post not liked">
        </button>`;
    static LIKED_BTN = `
        <button onClick="modalLikeClick(true)" aria-pressed="true" alt="liked post, click to unlike">
            <img src="resources/like_button_white_true.png" alt="liked post">
        </button>`;
    

    constructor(postID, modal){
        this.navPos = 0;
        this.commentForm = "";
        this.state = ModalPostHelper.STATES[0];
        this.reply = [postID, -1];
        this.isLiked = false;
        this.prevSwitchable = {
            "comments" : {
                "body" : ``,
                "scroll" : 0,
                "last_id" : -1
            },
            "likes" : {
                "body" : ``,
                "scroll" : 0,
                "last_id" : -1
            }
        };
        this.modal = modal;
        this.postID = postID;

        let header = this.modal.find('.modal-header');
        let body = this.modal.find('.modal-body');

        const formData = new FormData();
        formData.append('id', this.postID);
        axios.post('api/api-single-post.php', formData).then(response => {
            header.find('.profile_pic a').attr("href", `user.php?username=${response.data["user"]}`);
            header.find('.profile_pic img').attr("src", `${response.data["propic"]}`);
            
            header.find('.user a').text(response.data["user"]);
            header.find('.user a').attr("href", `user.php?username=${response.data["user"]}`);
            
            header.find('.date pre').text("Published on " + response.data["date"].split(" ")[0]);
        
            body.find('section[aria-label="post section"] img').attr("src", `${response.data["img_name"]}`);
            body.find('section[aria-label="post section"] pre').text(response.data["description"]);

            body.find('nav[aria-label="comments/likes-menu"] #comments_button .num').text(response.data["n_comments"]);
            if (response.data["n_likes"] == 0) {
                this.prevSwitchable["likes"]["body"] = "<pre class='no-element text-center'>no likes yet</pre>";
                this.prevSwitchable["likes"]["last_id"] = null;
            } 

            body.find('nav[aria-label="comments/likes-menu"] #likes_button .num').text(response.data["n_likes"]);
            if (response.data["n_comments"] == 0) {
                body.find("#switchable").html("<pre class='no-element text-center mt-5'>leave the first comment</pre>")
            } else {
                this.loadMore();
            }

            body.find("#like_click_btn").html(response.data["is_liked"]
                ? ModalPostHelper.LIKED_BTN
                : ModalPostHelper.LIKE_BTN);
            
            this.isLiked = response.data["is_liked"];
            modal.removeClass('d-none');
        });
    }

    loadMore() {
        const formData = new FormData();
        formData.append('post_id', this.postID);
        formData.append('n', ModalPostHelper.N_ITEMS);
        formData.append('last_id', this.prevSwitchable[this.state]["last_id"]);

        axios.post(`api/api-post-${this.state}.php`, formData).then(response => {
            const elements = response.data;
            let append = "";
            switch (this.state) {
                case ModalPostHelper.STATES[0]:
                    append = this._generateComments(response.data);
                    break;
                case ModalPostHelper.STATES[1]:
                    
                    break;
            }

            if(elements[elements.length-1]){
                append += ModalPostHelper.LOAD_DISABLED_BTN;
            } else {
                append += ModalPostHelper.LOAD_BTN;
            }
        
            document.querySelector(`#switchable`).removeChild(document.querySelector(`#switchable > footer`));
            document.querySelector(`#switchable`).innerHTML += append;
            this.prevSwitchable[this.state]["last_id"] = elements[elements.length-2]["id"];
        });
    }

    switchSection(btn) {
        let body = this.modal.find('.modal-body');
        if (this.navPos == 0) {
            this.navPos = body.find('section[aria-label="post section"]').position().top + body.find('section[aria-label="post section"]').height() + 50;
        }

        let target = $(btn).data('target');
        if (this.state != target) {
            body.find(`nav[aria-label="comments/likes-menu"] #${this.state}_button button`).attr("aria-pressed", false);
            body.find(`nav[aria-label="comments/likes-menu"] #${this.state}_button button`).removeClass("active");
            body.find(`nav[aria-label="comments/likes-menu"] #${target}_button button`).addClass("active");
            body.find(`nav[aria-label="comments/likes-menu"] #${target}_button button`).attr("aria-pressed", true);
            
            body.find(`#switchable`).removeClass();
            body.find(`#switchable`).addClass(`${target}-section`);
            body.find(`#switchable`).attr("aria-label", `users ${target}`);

            const section = document.querySelector(`#switchable`);
            const scrollable = document.querySelector(".modal");

            this.prevSwitchable[this.state]["body"] = section.innerHTML;
            this.prevSwitchable[this.state]["scroll"] = scrollable.scrollTop - scrollable.clientHeight * 360 / 1000;

                console.log(this.navPos);
            section.innerHTML = this.prevSwitchable[target]["body"];
            scrollable.scrollTop = this.prevSwitchable[target]["scroll"] < this.navPos
                ? this.navPos
                : this.prevSwitchable[target]["scroll"];

            if (target == ModalPostHelper.STATES[1]) {
                body.find(".comments-input").addClass("d-none");
            } else {
                body.find(".comments-input").removeClass("d-none")
            }
            
            this.state = target;
        }
    }

    clear() {
        let btn = document.createElement("button");
        btn.setAttribute("data-target", "comments");
        this.switchSection(btn);
        document.querySelector(`#switchable`).innerHTML = "<footer></footer>";
    }

    likeClick(modifyDB) {
        if (modifyDB) {
            const formData = new FormData();
            formData.append('id', this.postID);
            if (this.isLiked) {
                formData.append('action', 'remove');
            } else {
                formData.append('action', 'add');
            }
            axios.post('api/api-like.php', formData).then(response => {});
        }
        this.isLiked = !this.isLiked;
        this.modal.find("#like_click_btn").html(this.isLiked
                ? ModalPostHelper.LIKED_BTN
                : ModalPostHelper.LIKE_BTN);

        let nLikes = this.modal.find('nav[aria-label="comments/likes-menu"] #likes_button .num');
        if (this.isLiked) {
            nLikes.text(parseInt(nLikes.text()) + 1);
        } else {
            nLikes.text(parseInt(nLikes.text()) - 1);
        }
    }
    
    getPostId() {
        return this.postID;
    }

    getNComments() {
        return this.modal.find('nav[aria-label="comments/likes-menu"] #comments_button .num').text();
    }

    postComment() {
        let textarea = this.modal.find("#comment_textarea");
        let text = textarea.val().trim();
        if (text.length != 0) {
            var date = new Date();
            var year = date.getFullYear();
            var month = String(date.getMonth() + 1).padStart(2, '0');
            var day = String(date.getDate()).padStart(2, '0');
            var hours = String(date.getHours()).padStart(2, '0');
            var minutes = String(date.getMinutes()).padStart(2, '0');
            var seconds = String(date.getSeconds()).padStart(2, '0');

            let dateForm = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            let formData = new FormData();
            formData.append("text", text);
            formData.append("date", dateForm);
            formData.append("post-id", this.reply[0]);
            formData.append("replied-id", this.reply[1]);

            if (this.reply[1] == -1) {
                axios.post('api/api-leave-comment.php', formData).then(response => {
                    console.log(response.data);
                    document.querySelector(`#switchable`).innerHTML =
                        this._generateComments(response.data)
                        + document.querySelector(`#switchable`).innerHTML;
                    
                    let targetElement = document.querySelector(`#comment-${response.data[0]["id"]}`);
                    document.querySelector(`.modal`).scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: 'smooth'
                    });

                    targetElement.setAttribute("aria-label", "your new comment");
                    targetElement.style.backgroundColor = "rgb(193, 214, 225)";
                    setTimeout(function() {
                        targetElement.style.backgroundColor = "rgb(230, 230, 231)";
                    }, 1500);                      
                });
            } else {
                document.querySelector(`#comment-${response.data[0]["id"]}`);
            }

            textarea.val("");
            let nComment = this.modal.find('nav[aria-label="comments/likes-menu"] #comments_button .num');
            nComment.text(parseInt(nComment.text()) + 1);
        }
    }
    
    _generateComments(comments){
        let result = '';
        
        for (let i = 0; i < comments.length - 1; i++) {
            let comment = `
            <article id="comment-${comments[i]["id"]}" aria-labe="comment by ${comments[i]["user"]}">
                <div class="row comment-body">
                    <div class="col-2 propic">
                        <img src="${comments[i]["propic"]}" alt="profile picture of comment's user">
                    </div>

                    <div class="col-10">
                        <div class="row">
                            <div class="col-8 comment-username">
                                <p aria-label="username of comment's user">${comments[i]["user"]}</p>
                            </div>

                            <div class="col-4 comment-date">
                                <pre aria-label="date of publication">${comments[i]["datetime"].split(" ")[0]}</pre>
                            </div>

                            <div class="col-12 comment-text">
                                <pre aria-label="text of the comment">${comments[i]["text"]}</pre>
                            </div>
                        </div>
                    </div>

                    <footer class="col-10 offset-2">
                        <div class="col-6 offset-6">
                            <button></button>
                        </div>
                    </footer>
                </div>`;

            if (comments[i]["has_replies"])
                comment += `
                <section class="row comment-reply" aria-label="replies of ${comments[i]["user"]} comment">
                    <footer class="col-10 offset-2">
                        <div class="col-6">
                            <button></button>
                        </div>
                    </footer>
                </section>`;

            
            result += comment + `
            </article>`;;
        }

        return result;
    }
}