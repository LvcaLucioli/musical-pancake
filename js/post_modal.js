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



let modalHelper = undefined;

$('#postModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let postId = button.data('postid');
    let modal = $(this);
    modalHelper = new ModalPostHelper(postId, modal);
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