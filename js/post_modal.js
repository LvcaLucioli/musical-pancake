function modalLoadMore() {
    modalHelper.loadMore();
}

function switchPostSection(btn) {
    modalHelper.switchSection(btn);
}



let modalHelper = undefined;

$('#postModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let postId = button.data('postid');
    let modal = $(this);
    console.log("ciao"),
    modalHelper = new ModalPostHelper(postId, modal);
})

$('#postModal').on('hidden.bs.modal', function (event) {
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