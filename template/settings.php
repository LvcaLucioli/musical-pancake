<div class="long form-wrapper">
    <div class="long-form">
        <h2>edit profile</h2>
        <form action="api/api-update-info.php" method="POST">
            <div class="row fields">
                <div id="first-column">
                    <label for="username">
                        <span class="error-icon d-none"><img src="resources/cross.png" title="username already taken" alt="username already taken"></span>
                        <input type="text" id="username" name="username" placeholder="&nbsp;" value="<?php echo isset($_SESSION['username']) ? $_SESSION['username'] : ''; ?>" required minlength="8" maxlength="50">
                        <span class="label">username</span>
                    </label>
                    <label for="email">
                        <span class="error-icon d-none"><img src="resources/cross.png" title="email already exists" alt="email already exists"></span>
                        <input type="email" id="email" name="email" placeholder="&nbsp;" value="<?php echo isset($_SESSION['email']) ? $_SESSION['email'] : ''; ?>" required>
                        <span class="label">email</span>
                    </label>
                    <label for="password">
                        <span class="error-icon d-none"><img src="resources/cross.png" title="username already taken" alt="username already taken"></span>
                        <input type="password" id="password" name="password" placeholder="&nbsp;" minlength="8" maxlength="72">
                        <span class="label">password</span>
                    </label>
                    <label for="new-password">
                        <input type="password" id="new-password" name="new-password" placeholder="&nbsp;" minlength="8" maxlength="72">
                        <span class="label">new password</span>
                    </label>

                    <label for="bio" id="bio-label">bio</label>
                    <div class="textarea-wrapper">
                        <textarea rows=6 id="bio" name="bio" placeholder="write about yourself" maxlength="144"></textarea>
                    </div>
                </div>
                <div id="second-column">
                    <div class="custom__image-container">
                        <label id="add-img-label" for="add-single-img">profile picture</label>
                        <label id="add-img-btn" for="add-single-img" class="img-container">+</label>
                        <input name="image" class="image" type="file" id="add-single-img" accept="image/*" hidden />
                    </div>
                    <div class="discoverable">
                        <label for="discoverable" id="discoverable-label">discoverable</label>
                        <label class="switch">
                            <input type="checkbox" id="discoverable" name="discoverable" value="0">
                            <span class="slider round"></span>
                        </label>
                    </div>

                </div>
            </div>
            <div class="row submit-button">
                <button type="submit">save changes</button>
            </div>
        </form>
        <div class="error-message d-none">

        </div>
    </div>
</div>