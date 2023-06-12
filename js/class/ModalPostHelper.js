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
        this.state = ModalPostHelper.STATES[0];
        this.reply = ["img", postID];
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
        
            body.find('section[aria-label="posts section"] img').attr("src", `${response.data["img_name"]}`);
            body.find('section[aria-label="posts section"] p').text(response.data["description"]);

            body.find('nav[aria-label="comments/likes-menu"] #comments_button .num').text(response.data["n_likes"]);
            body.find('nav[aria-label="comments/likes-menu"] #likes_button .num').text(response.data["n_comments"]);

            body.find("#like_click_btn").html(response.data["is_liked"]
                ? ModalPostHelper.LIKED_BTN
                : ModalPostHelper.LIKE_BTN);
            
            this.isLiked = response.data["is_liked"];
            modal.removeClass('d-none');
        });

        this.loadMore();
    }

    loadMore() {
        const formData = new FormData();
        formData.append('post_id', this.postID);
        formData.append('n', ModalPostHelper.N_ITEMS);
        formData.append('last_id', this.prevSwitchable[this.state]["last_id"]);

        axios.post(`api/api-post-${this.state}.php`, formData).then(response => {
            const elemetns = response.data;
            let append = "";
            switch (this.state) {
                case ModalPostHelper.STATES[0]:
                    append = this._generateComments(response.data);
                    break;
                case ModalPostHelper.STATES[1]:
                    
                    break;
            }

            if(elemetns[elemetns.length-1]){
                append += ModalPostHelper.LOAD_DISABLED_BTN;
            } else {
                append += ModalPostHelper.LOAD_BTN;
            }
        
            document.querySelector(`#switchable`).removeChild(document.querySelector(`#switchable footer`));
            document.querySelector(`#switchable`).innerHTML += append;
            this.prevSwitchable[this.state]["last_id"] = elemetns[elemetns.length-2]["id"];
        });
    }

    switchSection(btn) {
        let target = $(btn).data('target');
        if (this.state != target) {
            let body = this.modal.find('.modal-body');
            let nav_pos = body.find("nav").position().top + body.find("nav").height() + 50;

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
            this.prevSwitchable[this.state]["scroll"] = scrollable.scrollTop 
                - scrollable.clientHeight * 2 / 1000 
                + scrollable.clientWidth * 2 / 1000;
            section.innerHTML = this.prevSwitchable[target]["body"];
            scrollable.scrollTop = this.prevSwitchable[target]["scroll"] < nav_pos
                ? nav_pos
                : this.prevSwitchable[target]["scroll"];
            
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
    }
    
    getPostId() {
        return this.postID;
    }
    
    _generateComments(comments){
       
    }
}