
function initCropperModal() {
    $("body").on("change", ".image", function(e) {
        var files = e.target.files;
        var done = function(url) {
            image.src = url;
            bs_modal.modal('show');
        };
    
    
        if (files && files.length > 0) {
            file = files[0];
    
            if (URL) {
                done(URL.createObjectURL(file));
            } else if (FileReader) {
                reader = new FileReader();
                reader.onload = function(e) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    });
    
    bs_modal.on('shown.bs.modal', function() {
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            minCropBoxWidth: 100,
        });
        image.style.opacity = 1;
    }).on('hidden.bs.modal', function() {
        cropper.destroy();
        cropper = null;
        image.style.opacity = 0;
    });
}

function crop() {
    const imgContainer = document.querySelector(".img-container");
    const input = document.querySelector("#add-single-img");
    let url;
    let canvas = cropper.getCroppedCanvas();

    imgContainer.innerHTML = `
        <div class="spinner-border text-dark" role="status">
            <span class="sr-only">loading...</span>
        </div>`;
    input.disabled = true;
    bs_modal.modal('hide');

    canvas.toBlob(function(blob) {
        url = URL.createObjectURL(blob);
        const newImg = document.createElement("img");

        newImg.src = url;
        newImg.alt = "selected cropped image";
        newImg.id = "img-to-save"
        imgContainer.replaceChildren(newImg);
        input.disabled = false;
    });
}



let bs_modal = $('#cropper-modal');
let image = document.getElementById('image');
let cropper,reader,file;

initCropperModal();
