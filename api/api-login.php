<?php
require_once '..\bootstrap.php';

$result["logineseguito"] = false;

if(isset($_POST["username"]) && isset($_POST["password"])){
    $login_result = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if(!$login_result){
        $result["errorelogin"] = "error on username or password";
        $_SESSION["form_username"] = $_POST["username"];
        header("Location: ../login.php");
    }
    else{
        logUserIn($_POST["username"]);
        header("Location: ../user.php?username=" . $_POST["username"]);
    }
}
