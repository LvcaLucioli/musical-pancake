
function autoResize() {
    const textarea = document.getElementById("add-description");
    textarea.style.height = "auto";
    if (htext != textarea.scrollHeight)
        textarea.style.height = (textarea.scrollHeight+7) + "px";
    
    htext = textarea.scrollHeight;
}

function publish() {
    let img = document.getElementById("img-to-save");
    if (img != null) {
        var url = img.src;

        fetch(url)
        .then(response => response.blob())
        .then(blob => {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                var textarea = $("#add-description");
                var base64data = reader.result;
                const formData = new FormData();

                formData.append("image", base64data);
                formData.append("desc", textarea.val().trim());
                axios.post('api/api-upload-post.php', formData, {
                    headers: {
                      'Content-Type': `multipart/form-data`
                    },
                    maxBodyLength: Infinity,
                    maxContentLength: Infinity,
                }).then(function(response) {
                    window.location.href = `./user.php?username=${response.data["user"]}`;
                });
            };
        });
    } else {
        Swal.fire({
            title: 'No image selected!',
            text: "Select the image to post first",
            icon: 'error',
        })
    }
}

let htext = document.getElementById("add-description").scrollHeight;
document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";