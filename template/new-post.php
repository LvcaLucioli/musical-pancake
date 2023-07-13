        <div class="new-post-form">
            <header class="row">
                <h1 class="col-6">new post</h1>
            </header>
            <div class="row btn-row">
                <div class="offset-8 col-4 d-flex justify-content-end">
                    <button onclick="publish()">publish</button>
                </div>
            </div>
            
            <section class="custom__image-container">
                <label id="add-img-label" for="add-single-img">select image</label>
                <label id="add-img-btn" for="add-single-img" class="img-container">+</label>
                <input class="image" type="file" id="add-single-img" accept="image/*" hidden/>
            </section>  

            <section class="description-container">
                <label id="add-desc-label" for="add-description">description</label>
                <textarea id="add-description" oninput="autoResize()" placeholder="write your description..."></textarea>
            </section>
        </div>