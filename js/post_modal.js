function modalLoadMore() {
    modalHelper.loadMore();
}

function switchPostSection(btn) {
    modalHelper.switchSection(btn);
}

function postComment() {
    modalHelper.postComment();
}

function modalLikeClick(isLiked) {
    let indexBtn = document.querySelectorAll(`main .scrollable_feed 
        .followers #post-${modalHelper.getPostId()} .like_block button`)[0];
    if (indexBtn != null) { 
        likeClick(indexBtn,
            isLiked,
            modalHelper.getPostId());
        modalHelper.likeClick(false);
    } else {
        modalHelper.likeClick(true);
    }
}

function replyTo(commentId, user) {
    modalHelper.replyTo(commentId, user);
}

function scrollToReply() {
    setTimeout(function() {
        document.querySelector(".modal").scrollTop -= 150;

        let targetElement = document.querySelector(`#comment-${modalHelper.getReplyId()}`);
        targetElement.style.backgroundColor = "rgb(193, 214, 225)";
        setTimeout(function() {
            targetElement.style.backgroundColor = "rgb(230, 230, 231)";
        }, 1500);
    }, 10);
}

function clearReply(){
    modalHelper.clearReply();
}



let modalHelper = undefined;

$('#postModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let postId = button.data('postid');
    let from = button.data('from');
    let display = button.data('display');
    let modal = $(this);
    modalHelper = new ModalPostHelper(postId, modal, from, display);
})

$('#postModal').on('hidden.bs.modal', function (event) {
    let commentsBtn = document.querySelector(`main .scrollable_feed 
        .followers #post-${modalHelper.getPostId()} .comments_block button`);
    if (commentsBtn != null) {
        commentsBtn.innerHTML = "<span>add comment</span> &nbsp;&nbsp;" 
            + modalHelper.getNComments()
            + ' <img src="resources/comment.png" alt="view and add commens">';
    }
    modalHelper.clear();
    modalHelper = undefined;
});
  


let modal_br = true
document.querySelector(".modal").addEventListener('scroll', function() {
    if (this.scrollTop > 100 && modal_br) {
        document.querySelector(".modal-header").style.setProperty("border-radius", "0px", "important");
        modal_br = false;
    }
    if (this.scrollTop < 70 && !modal_br) {
        document.querySelector(".modal-header").style.removeProperty("border-radius");
        modal_br = true;
    }
});