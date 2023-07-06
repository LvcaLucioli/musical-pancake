<?php
require_once '..\bootstrap.php';

$result["logineseguito"] = false;
$result["username"] = $_POST["username"];
if(isset($_POST["username"]) && isset($_POST["password"])){
    $login_result = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if(!$login_result){
        $result["errorelogin"] = "error on username or password";
    }
    else{
        logUserIn($_POST["username"]);
        $result["logineseguito"] = true;
    }
    header('Content-Type: application/json');
    echo json_encode($result);
}
