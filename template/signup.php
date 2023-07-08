<div class="login-wrapper">
    <div class="login">
        <h2>signup</h2>
        <form action="api/api-signup.php" method="POST">
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
                <input type="password" id="password" name="password" placeholder="&nbsp;" required minlength="8" maxlength="72">
                <span class="label">password</span>
            </label>
            <label for="confirm-password">
                <input type="password" id="confirm-password" name="confirm-password" placeholder="&nbsp;" required minlength="8" maxlength="72">
                <span class="label">confirm password</span>
            </label>
            <div class="custom__image-container">
                <label id="add-img-label" for="add-single-img">profile picture</label>
                <label id="add-img-btn" for="add-single-img" class="img-container">+</label>
                <input class="image" type="file" id="add-single-img" accept="image/*" hidden />
            </div>
            <label for="bio" id="bio-label">bio</label>
            <div class="textarea-wrapper">
                <textarea rows=3 id="bio" name="bio" placeholder="write about yourself" maxlength="144"></textarea>
            </div>


            <div>
                <button type="submit">singup</button>
            </div>
        </form>

    </div>
    <div class="login-signup">
        <span>have an account already? <a href="login.php">login</a></span>
    </div>
    <div class="error-message d-none">

    </div>
</div>