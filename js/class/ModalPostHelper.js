class ModalPostHelper {
    static N_ITEMS = 3;
    static STATES = {
        0: "comments",
        1: "likes"
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


    constructor(postID, modal, from, display) {
        this.isLoading = false;
        this.navPos = 0;
        this.commentForm = "";
        this.state = ModalPostHelper.STATES[0];
        this.reply = [postID, -1];
        this.isLiked = false;
        this.user = undefined;
        this.prevSwitchable = {
            "comments": {
                "body": ``,
                "scroll": 0,
                "last_id": -1
            },
            "likes": {
                "body": ``,
                "scroll": 0,
                "last_id": -1
            }
        };
        this.modal = modal;
        this.postID = postID;
        this.from = from;
        this.display = display;

        let header = this.modal.find('.modal-header');
        let body = this.modal.find('.modal-body');

        const formData = new FormData();
        formData.append('id', this.postID);
        axios.post('api/api-single-post.php', formData).then(response => {
            header.find('.profile_pic a').attr("href", `user.php?username=${response.data["user"]}`);
            header.find('.profile_pic img').attr("src", `${response.data["propic"]}`);
            
            this.user = response.data["user"];
            header.find('.user a').text(response.data["user"]);
            header.find('.user a').attr("href", `user.php?username=${response.data["user"]}`);
            
            header.find('.date pre').text("Published on " + response.data["date"].split(" ")[0]);
        
            body.find('section[aria-label="post section"] img').attr("src", `${response.data["img_name"]}`);
            body.find('section[aria-label="post section"] pre').text(response.data["description"]);
            body.find('section[aria-label="post description"] pre').text(response.data["description"]);

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

            if (response.data["owned"]) {
                header.find('.edit-btn').html(`
                    <button aria-label="" onclick="deletePost()">
                        <img src="./resources/bin-btn.png" alt="click to delete your post">
                    </button>
                `);
            }

            body.find("#like_click_btn").html(response.data["is_liked"]
                ? ModalPostHelper.LIKED_BTN
                : ModalPostHelper.LIKE_BTN);
        
            this.isLiked = response.data["is_liked"];
            this.modal.removeClass('d-none');
        });
    }

    loadMore() {
        if (!this.isLoading) {
            this.isLoading = true;
            document.querySelector(`#switchable > footer button`)
                .innerHTML = `
                    loading...
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">loading...</span>
                    </div>`;

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

                if (elements[elements.length - 1]) {
                    append += ModalPostHelper.LOAD_DISABLED_BTN;
                } else {
                    append += ModalPostHelper.LOAD_BTN;
                }

                document.querySelector(`#switchable`).removeChild(document.querySelector(`#switchable > footer`));
                document.querySelector(`#switchable`).innerHTML += append;
                this.prevSwitchable[this.state]["last_id"] = elements[elements.length - 2]["id"];
                this.isLoading = false;

                switch (this.display) {
                    case "comments":
                        setTimeout(function () {
                            document.querySelector('nav[aria-label="comments/likes-menu"]').scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                                scrollTimingFunction: "ease-in-out",
                                scrollDuration: 300
                            });
                        }, 500);
                        this.display = "";
                        break;
                    case "likes":
                        let btn = document.querySelector('nav[aria-label="comments/likes-menu"] #likes_button button');
                        this.switchSection(btn);
                        setTimeout(function () {
                            document.querySelector('nav[aria-label="comments/likes-menu"]').scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                                scrollTimingFunction: "ease-in-out",
                                scrollDuration: 300
                            });
                        }, 500);
                        this.display = "";
                        break;
                }
            });
        }
    }

    loadReplies(commentID, lastID) {
        if (!this.isLoading) {
            this.isLoading = true;
            document.querySelector(`#comment-${commentID} .comment-reply footer div button`)
                .innerHTML = `
                <span></span>loading...&nbsp;&nbsp;&nbsp;&nbsp;`;

            const formData = new FormData();
            formData.append('post_id', this.postID);
            formData.append('n', ModalPostHelper.N_ITEMS);
            formData.append('cmt_id', commentID);
            formData.append('last_id', lastID);

            axios.post(`api/api-comment-replies.php`, formData).then(response => {
                let elements = response.data;
                let comments = this._generateCommentReplies(elements);

                document.querySelector(`#comment-${commentID} .comment-reply`).removeChild(document.querySelector(`#comment-${commentID} .comment-reply footer`));;
                if (!elements[elements.length - 1]) {
                    comments += `
                    <footer class="col-5 offset-2">
                        <div class="col-6">
                            <button onclick="loadReplies(this)" data-cmtid="${commentID}" data-lstid="${elements[elements.length - 2]["id"]}"><span></span>view replies</button>
                        </div>
                    </footer>`;
                }

                document.querySelector(`#comment-${commentID} .comment-reply`).innerHTML += comments;
                this.isLoading = false;
            });
        }
    }

    switchSection(btn) {
        if (!this.isLoading) {
            let body = this.modal.find('.modal-body');
            if (this.navPos < 100) {
                this.navPos = body.find('nav').position().top + body.find('section[aria-label="post section"] pre').height() + 50;
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
        if (this.state == "likes") {
            this.searchContainer = new Container(`.likes-section`, [new SearchSection("likes", this.postID)], this.modal[0].querySelector('[title="likes area"]'));

            this.searchContainer.sections[this.searchContainer.activeSection].show();
            this.searchContainer.sections[this.searchContainer.activeSection].search(this.modal[0].querySelector("input"));

        }
    }

    clear() {
        let btn = document.createElement("button");
        btn.setAttribute("data-target", "comments");
        this.switchSection(btn);
        document.querySelector(`#switchable`).innerHTML = "<footer><button></button></footer>";

        this.modal.find('.comments-input').addClass('comments-base');
        this.modal.find('.comments-input').removeClass('comments-reply');
        this.modal.find('.comments-input .reply-wrapper').addClass("d-none");

        this.modal.find("#comment_textarea").val("");
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
            axios.post('api/api-like.php', formData).then(response => { });
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

    getUsername() {
        return this.user;
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

            axios.post('api/api-leave-comment.php', formData).then(response => {
                if (this.reply[1] == -1) {
                    if (this.getNComments() != 0) {
                        document.querySelector(`#switchable`).innerHTML =
                            this._generateComments(response.data)
                            + document.querySelector(`#switchable`).innerHTML;
                    } else {
                        document.querySelector(`#switchable`).innerHTML =
                            this._generateComments(response.data);
                    }
                } else {
                    document.querySelector(`#comment-${this.reply[1]} .comment-reply`).innerHTML =
                        this._generateCommentReplies(response.data)
                        + document.querySelector(`#comment-${this.reply[1]} .comment-reply`).innerHTML;
                    this.clearReply();
                }

                let targetElement = document.querySelector(`#comment-${response.data[0]["id"]}`);
                if (IS_MOBILE) {
                    document.querySelector(`.modal`).scrollTo({
                        top: targetElement.offsetTop + 2*document.querySelector('section[aria-label="post section"] img').height,
                        behavior: 'smooth'
                    });
                } else {
                    document.querySelector(`.modal`).scrollTo({
                        top: targetElement.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }

                targetElement.setAttribute("aria-label", "your new comment");
                targetElement.style.backgroundColor = "rgb(193, 214, 225)";
                setTimeout(function () {
                    targetElement.style.backgroundColor = "rgb(230, 230, 231)";
                }, 1500);

                let nComment = this.modal.find('nav[aria-label="comments/likes-menu"] #comments_button .num');
                nComment.text(parseInt(nComment.text()) + 1);
            });

            textarea.val("");
        }
    }

    replyTo(commentId, user) {
        if (this.reply[1] == -1) {
            this.modal.find('.comments-input').removeClass('comments-base');
            this.modal.find('.comments-input').addClass('comments-reply');
            this.modal.find('.comments-input .reply-wrapper').removeClass("d-none");
        }
        this.modal.find('.comments-input .reply-wrapper a').html("reply to @" + user);
        this.modal.find('.comments-input .reply-wrapper a').attr("href", `#comment-${commentId}`);

        this.reply[1] = commentId;
        this.modal.find("#comment_textarea").focus();
        let targetElement = document.querySelector(`#comment-${commentId}`);
        targetElement.style.backgroundColor = "rgb(193, 214, 225)";
        setTimeout(function () {
            targetElement.style.backgroundColor = "rgb(230, 230, 231)";
        }, 1500);
    }

    getReplyId() {
        return this.reply[1];
    }

    clearReply() {
        this.modal.find('.comments-input').addClass('comments-base');
        this.modal.find('.comments-input').removeClass('comments-reply');
        this.modal.find('.comments-input .reply-wrapper').addClass("d-none");
        this.reply[1] = -1;
    }

    deleteComment(id) {
        if (this.reply[1] == id)
            this.clearReply();

        let formData = new FormData();
        formData.append("comment_id", id);
        formData.append("post_id", this.postID);

        axios.post('api/api-delete-comment.php', formData).then(response => {
            this.modal.find('nav[aria-label="comments/likes-menu"] #comments_button .num')
                .text(response.data);
        });

        document.querySelector(`#comment-${id}`).remove();
    }

    deletePost() {
        let formData = new FormData();
        formData.append("id", this.postID);

        axios.post('api/api-delete-post.php', formData).then(response => {
            console.log(response.data);
        });
        this.modal.modal("hide");
    }

    _generateComments(comments) {
        let result = '';

        for (let i = 0; i < comments.length - 1; i++) {
            let comment = `
            <article id="comment-${comments[i]["id"]}" aria-labe="comment by ${comments[i]["user"]}">
                <div class="row comment-body">
                    <div class="col-2 propic">`;

            if (comments[i]["owned"]) {
                comment += `
                        <button aria-label="click to delete your comment" onclick="deleteComment(this)" data-id="${comments[i]["id"]}">
                        <img src="./resources/bin-btn.png" alt="click to delete your comment">
                        </button>`;
            } else {
                comment += `
                        <img src="${comments[i]["propic"]}" alt="profile picture of comment's user">`;
            }


            comment += `  
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
                            <button onclick="replyTo(${comments[i]["id"]}, '${comments[i]["user"]}')">reply&nbsp;
                            <img src="./resources/reply-arrow.png" alt="reply to comment">
                            </button>
                        </div>
                    </footer>
                </div>

                <section class="row comment-reply" aria-label="replies of ${comments[i]["user"]} comment">`;

            if (comments[i]["has_replies"])
                comment += `
                    <footer class="col-5 offset-2">
                        <div class="col-6">
                            <button onclick="loadReplies(this)" data-cmtid="${comments[i]["id"]}" data-lstid="-1"><span></span>view replies</button>
                        </div>
                    </footer>`;


            result += comment + `
                </section>
            </article>`;
        }

        return result;
    }

    _generateCommentReplies(comments) {
        let result = '';

        for (let i = 0; i < comments.length - 1; i++) {
            let comment = `
            <article id="comment-${comments[i]["id"]}" class="col-11" aria-labe="comment by ${comments[i]["user"]}">
                <div class="row comment-body">
                    <div class="col-2 propic">`;

            if (comments[i]["owned"]) {
                comment += `
                        <button aria-label="click to delete your comment" onclick="deleteComment(this)" data-id="${comments[i]["id"]}">
                            <img src="./resources/bin-btn.png" alt="click to delete your comment">
                        </button>`;
            } else {
                comment += `
                        <img src="${comments[i]["propic"]}" alt="profile picture of comment's user">`;
            }

            comment += `  
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
                </div>
            </article>`;

            result += comment;
        }
        return result;
    }
}