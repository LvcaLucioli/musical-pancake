<?php
function isIconActive($pagename)
{
    if (basename($_SERVER['PHP_SELF']) == $pagename) {
        if ($pagename != "user.php") {
            echo '-active';
        } else if ($_SESSION["username"] == $_GET["username"]) {
            echo '-active';
        }
    }
}

function isActive($pagename)
{
    if (basename($_SERVER['PHP_SELF']) == $pagename) {
        if ($pagename != "user.php") {
            echo 'aria-current="page"';
        } else if ($_SESSION["username"] == $_GET["username"]) {
            echo 'aria-current="page"';
        }
    }
}

function logUserIn($username)
{
    $_SESSION["username"] = $username;
}

function isLoggedIn()
{
    if (!isset($_SESSION["username"])) {
        header("Location: ./login.php");
    }
}
