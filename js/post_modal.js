
$('#postModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let postId = button.data('postid');
    let modal = $(this);
    let header = modal.find('.modal-header');
    let body = modal.find('.modal-body');

    const formData = new FormData();
    formData.append('id', postId);
    axios.post('api/api-single-post.php', formData).then(response => {
        header.find('.profile_pic a').attr("href", `user.php?username=${response.data["user"]}`);
        header.find('.profile_pic img').attr("src", `${response.data["propic"]}`);
        
        header.find('.user a').text(response.data["user"]);
        header.find('.user a').attr("href", `user.php?username=${response.data["user"]}`);
        
        header.find('.date pre').text("Published on " + response.data["date"].split(" ")[0]);
    
        body.find('img:first').attr("src", `${response.data["img_name"]}`);

        modal.removeClass('d-none');
    });
})

let modal_br = true
document.querySelector(".modal").addEventListener('scroll', function() {
    if (this.scrollTop > 100 && modal_br) {
        console.log("ciao");
        document.querySelector(".modal-header").style.setProperty("border-radius", "0px", "important");
        modal_br = false;
    }
    if (this.scrollTop < 70 && !modal_br) {
        console.log("ciao");
        document.querySelector(".modal-header").style.removeProperty("border-radius");
        modal_br = true;
    }
});