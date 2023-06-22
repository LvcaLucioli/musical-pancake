<div class="login">
    <h2>login</h2>
    <form action="api/api-login.php" method="POST">
        <label for="username">
            <input type="text" id="username" name="username" placeholder="&nbsp;" value="<?php echo isset($_SESSION['username']) ? $_SESSION['username'] : ''; ?>" required minlength="8" maxlength="50">
            <span class="label">username</span>
        </label>
        <label for="password">
            <input type="password" id="password" name="password" placeholder="&nbsp;" required minlength="8" maxlength="72">
            <span class="label">password</span>
        </label>
        <div>
            <button type="submit">login</button>
        </div>
    </form>
</div>