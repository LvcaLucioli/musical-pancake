<div class="login">
    <h2>signup</h2>
    <form action="api/api-signup.php" method="POST">
        <label for="username">
            <input type="text" id="username" name="username" placeholder="&nbsp;" required minlength="8" maxlength="50">
            <span class="label">username</span>
        </label>
        <label for="email">
            <input type="email" id="email" name="email" placeholder="&nbsp;" required>
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
        <div>
            <button type="submit">singup</button>
        </div>
    </form>
</div>