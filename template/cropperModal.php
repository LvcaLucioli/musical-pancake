        <div class="modal fade" id="cropper-modal" tabindex="-1" role="dialog" aria-labelledby="cropModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header row" id="cropModalLabel">
                        <div class="col-3">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <h5 class="modal-title" id="modalLabel">crop image</h5>
                        </div>
                        <div class="col-3 d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" id="crop" onclick="crop()">done</button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="img-container">
                            <img id="image" src="" alt="cropping image">
                        </div>
                    </div>
                </div>
            </div>
        </div>